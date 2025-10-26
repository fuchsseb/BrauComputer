import React from 'react';
import { PencilIcon, CalendarIcon, ClockIcon, BeakerIcon } from '@heroicons/react/24/outline';

interface BrewingSession {
  id: string;
  recipeName: string;
  date: Date;
  batchNumber: string;
  volume: number; // Liter
  og: number;
  fg: number;
  abv: number;
  ibu: number;
  srm: number;
  mashTemp: number;
  boilTime: number;
  fermentationTemp: number;
  fermentationDays: number;
  notes: string;
  status: 'planned' | 'brewing' | 'fermenting' | 'conditioning' | 'ready' | 'consumed';
  createdAt: Date;
}

interface BrewingSessionCardProps {
  session: BrewingSession;
  onEdit: () => void;
}

const BrewingSessionCard: React.FC<BrewingSessionCardProps> = ({ session, onEdit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-gray-100 text-gray-800';
      case 'brewing': return 'bg-blue-100 text-blue-800';
      case 'fermenting': return 'bg-yellow-100 text-yellow-800';
      case 'conditioning': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'consumed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planned': return 'Geplant';
      case 'brewing': return 'Am Brauen';
      case 'fermenting': return 'Gärt';
      case 'conditioning': return 'Reift';
      case 'ready': return 'Fertig';
      case 'consumed': return 'Getrunken';
      default: return 'Unbekannt';
    }
  };

  const getSRMColor = (srm: number) => {
    if (srm <= 2) return 'bg-yellow-100 text-yellow-800';
    if (srm <= 4) return 'bg-yellow-200 text-yellow-900';
    if (srm <= 6) return 'bg-amber-200 text-amber-900';
    if (srm <= 8) return 'bg-orange-200 text-orange-900';
    if (srm <= 12) return 'bg-amber-300 text-amber-900';
    if (srm <= 16) return 'bg-orange-300 text-orange-900';
    if (srm <= 20) return 'bg-red-300 text-red-900';
    return 'bg-gray-800 text-white';
  };

  const getDaysSinceBrewing = () => {
    const now = new Date();
    const brewDate = new Date(session.date);
    const diffTime = Math.abs(now.getTime() - brewDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{session.recipeName}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                {getStatusLabel(session.status)}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                {new Date(session.date).toLocaleDateString('de-DE')}
              </span>
              <span className="flex items-center gap-1">
                <BeakerIcon className="w-4 h-4" />
                Batch {session.batchNumber}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-lg">🍺</span>
                {session.volume}L
              </span>
            </div>
          </div>
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Bearbeiten"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{session.abv}%</p>
            <p className="text-xs text-gray-600">ABV</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{session.ibu}</p>
            <p className="text-xs text-gray-600">IBU</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{session.srm}</p>
            <p className="text-xs text-gray-600">SRM</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{session.og.toFixed(3)}</p>
            <p className="text-xs text-gray-600">OG</p>
          </div>
        </div>

        {/* Process Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-2xl">🌡️</span>
            <span className="text-gray-600">Maische:</span>
            <span className="font-medium">{session.mashTemp}°C</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ClockIcon className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Kochzeit:</span>
            <span className="font-medium">{session.boilTime} Min</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-2xl">🌡️</span>
            <span className="text-gray-600">Gärtemp:</span>
            <span className="font-medium">{session.fermentationTemp}°C</span>
          </div>
        </div>

        {/* Color and Progress */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Farbe:</span>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-3 rounded ${getSRMColor(session.srm)}`} />
              <span className="text-sm font-medium">{session.srm} SRM</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span>Vor {getDaysSinceBrewing()} Tagen gebraut</span>
          </div>
        </div>

        {/* Notes */}
        {session.notes && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-2">{session.notes}</p>
          </div>
        )}

        {/* Progress Bar for Active Sessions */}
        {(session.status === 'fermenting' || session.status === 'conditioning') && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Gärfortschritt</span>
              <span>{getDaysSinceBrewing()} / {session.fermentationDays} Tage</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((getDaysSinceBrewing() / session.fermentationDays) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Final Gravity for Completed Sessions */}
        {session.status === 'ready' && session.fg > 0 && (
          <div className="text-sm text-gray-600">
            <span>Endstammwürze: </span>
            <span className="font-medium">{session.fg.toFixed(3)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrewingSessionCard;
