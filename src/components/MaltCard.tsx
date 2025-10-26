import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Malt {
  id: string;
  name: string;
  type: string;
  color: number; // EBC
  extract: number; // %
  moisture: number; // %
  protein: number; // %
  diastaticPower: number; // °L
  description: string;
  usage: string;
  createdAt: Date;
}

interface MaltCardProps {
  malt: Malt;
  onEdit: () => void;
  onDelete: () => void;
}

const MaltCard: React.FC<MaltCardProps> = ({ malt, onEdit, onDelete }) => {
  const getSRMFromEBC = (ebc: number) => {
    return Math.round(ebc * 0.508);
  };

  const getColorClass = (ebc: number) => {
    const srm = getSRMFromEBC(ebc);
    if (srm <= 2) return 'bg-yellow-100 text-yellow-800';
    if (srm <= 4) return 'bg-yellow-200 text-yellow-900';
    if (srm <= 6) return 'bg-amber-200 text-amber-900';
    if (srm <= 8) return 'bg-orange-200 text-orange-900';
    if (srm <= 12) return 'bg-amber-300 text-amber-900';
    if (srm <= 16) return 'bg-orange-300 text-orange-900';
    if (srm <= 20) return 'bg-red-300 text-red-900';
    return 'bg-gray-800 text-white';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Basis': return 'bg-blue-100 text-blue-800';
      case 'Spezial': return 'bg-purple-100 text-purple-800';
      case 'Röstmalz': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{malt.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(malt.type)}`}>
                {malt.type}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClass(malt.color)}`}>
                {malt.color} EBC ({getSRMFromEBC(malt.color)} SRM)
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Bearbeiten"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Löschen"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Color Preview */}
        <div className="mb-4">
          <div className="w-full h-6 rounded-lg overflow-hidden border border-gray-200">
            <div 
              className={`h-full ${getColorClass(malt.color)}`}
              style={{ width: '100%' }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Farbvorschau</p>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{malt.extract}%</p>
            <p className="text-xs text-gray-600">Extrakt</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{malt.moisture}%</p>
            <p className="text-xs text-gray-600">Feuchte</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{malt.protein}%</p>
            <p className="text-xs text-gray-600">Protein</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{malt.diastaticPower}°L</p>
            <p className="text-xs text-gray-600">Diast. Kraft</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">{malt.description}</p>
        </div>

        {/* Usage */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Verwendung</h4>
          <p className="text-xs text-gray-600">{malt.usage}</p>
        </div>

        {/* Created Date */}
        <div className="text-xs text-gray-500">
          Hinzugefügt: {new Date(malt.createdAt).toLocaleDateString('de-DE')}
        </div>
      </div>
    </div>
  );
};

export default MaltCard;
