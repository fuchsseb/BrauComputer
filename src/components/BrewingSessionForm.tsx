import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

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

interface BrewingSessionFormProps {
  session?: BrewingSession | null;
  onSave: (session: Omit<BrewingSession, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const BrewingSessionForm: React.FC<BrewingSessionFormProps> = ({ session, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    recipeName: '',
    date: new Date().toISOString().split('T')[0],
    batchNumber: '',
    volume: 20,
    og: 0,
    fg: 0,
    abv: 0,
    ibu: 0,
    srm: 0,
    mashTemp: 65,
    boilTime: 60,
    fermentationTemp: 20,
    fermentationDays: 14,
    notes: '',
    status: 'planned' as 'planned' | 'brewing' | 'fermenting' | 'conditioning' | 'ready' | 'consumed'
  });

  useEffect(() => {
    if (session) {
      setFormData({
        recipeName: session.recipeName,
        date: new Date(session.date).toISOString().split('T')[0],
        batchNumber: session.batchNumber,
        volume: session.volume,
        og: session.og,
        fg: session.fg,
        abv: session.abv,
        ibu: session.ibu,
        srm: session.srm,
        mashTemp: session.mashTemp,
        boilTime: session.boilTime,
        fermentationTemp: session.fermentationTemp,
        fermentationDays: session.fermentationDays,
        notes: session.notes,
        status: session.status
      });
    } else {
      // Generate batch number for new session
      const today = new Date();
      const year = today.getFullYear().toString().slice(-2);
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      setFormData(prev => ({
        ...prev,
        batchNumber: `B${year}${month}${day}`
      }));
    }
  }, [session]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sessionData = {
      ...formData,
      date: new Date(formData.date)
    };
    onSave(sessionData);
  };

  const statusOptions = [
    { value: 'planned', label: 'Geplant' },
    { value: 'brewing', label: 'Am Brauen' },
    { value: 'fermenting', label: 'Gärt' },
    { value: 'conditioning', label: 'Reift' },
    { value: 'ready', label: 'Fertig' },
    { value: 'consumed', label: 'Getrunken' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {session ? 'Brausitzung bearbeiten' : 'Neue Brausitzung'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rezeptname
            </label>
            <input
              type="text"
              value={formData.recipeName}
              onChange={(e) => handleInputChange('recipeName', e.target.value)}
              className="input-field"
              placeholder="z.B. IPA Classic"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Braudatum
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch-Nummer
            </label>
            <input
              type="text"
              value={formData.batchNumber}
              onChange={(e) => handleInputChange('batchNumber', e.target.value)}
              className="input-field"
              placeholder="z.B. B001"
              required
            />
          </div>
        </div>

        {/* Volume and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Volumen (Liter)
            </label>
            <input
              type="number"
              value={formData.volume}
              onChange={(e) => handleInputChange('volume', parseFloat(e.target.value))}
              className="input-field"
              min="1"
              max="100"
              step="0.5"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="input-field"
              required
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Beer Specifications */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bierspezifikationen</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stammwürze (OG)
              </label>
              <input
                type="number"
                step="0.001"
                value={formData.og}
                onChange={(e) => handleInputChange('og', parseFloat(e.target.value))}
                className="input-field"
                min="1.000"
                max="1.200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endstammwürze (FG)
              </label>
              <input
                type="number"
                step="0.001"
                value={formData.fg}
                onChange={(e) => handleInputChange('fg', parseFloat(e.target.value))}
                className="input-field"
                min="1.000"
                max="1.200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alkohol (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.abv}
                onChange={(e) => handleInputChange('abv', parseFloat(e.target.value))}
                className="input-field"
                min="0"
                max="20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IBU
              </label>
              <input
                type="number"
                value={formData.ibu}
                onChange={(e) => handleInputChange('ibu', parseInt(e.target.value))}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SRM
              </label>
              <input
                type="number"
                value={formData.srm}
                onChange={(e) => handleInputChange('srm', parseInt(e.target.value))}
                className="input-field"
                min="1"
                max="50"
              />
            </div>
          </div>
        </div>

        {/* Process Parameters */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Brauprozess</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maische-Temperatur (°C)
              </label>
              <input
                type="number"
                value={formData.mashTemp}
                onChange={(e) => handleInputChange('mashTemp', parseInt(e.target.value))}
                className="input-field"
                min="50"
                max="80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kochzeit (Minuten)
              </label>
              <input
                type="number"
                value={formData.boilTime}
                onChange={(e) => handleInputChange('boilTime', parseInt(e.target.value))}
                className="input-field"
                min="30"
                max="180"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gärtemperatur (°C)
              </label>
              <input
                type="number"
                value={formData.fermentationTemp}
                onChange={(e) => handleInputChange('fermentationTemp', parseInt(e.target.value))}
                className="input-field"
                min="5"
                max="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gärdauer (Tage)
              </label>
              <input
                type="number"
                value={formData.fermentationDays}
                onChange={(e) => handleInputChange('fermentationDays', parseInt(e.target.value))}
                className="input-field"
                min="1"
                max="90"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notizen
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="input-field"
            rows={4}
            placeholder="Besondere Beobachtungen, Probleme, Erfolge..."
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            {session ? 'Aktualisieren' : 'Erstellen'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrewingSessionForm;
