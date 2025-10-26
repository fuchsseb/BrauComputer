import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

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

interface MaltFormProps {
  malt?: Malt | null;
  onSave: (malt: Omit<Malt, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const MaltForm: React.FC<MaltFormProps> = ({ malt, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Basis',
    color: 0,
    extract: 0,
    moisture: 0,
    protein: 0,
    diastaticPower: 0,
    description: '',
    usage: ''
  });

  useEffect(() => {
    if (malt) {
      setFormData({
        name: malt.name,
        type: malt.type,
        color: malt.color,
        extract: malt.extract,
        moisture: malt.moisture,
        protein: malt.protein,
        diastaticPower: malt.diastaticPower,
        description: malt.description,
        usage: malt.usage
      });
    }
  }, [malt]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

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

  const maltTypes = [
    { value: 'Basis', label: 'Basis-Malz' },
    { value: 'Spezial', label: 'Spezial-Malz' },
    { value: 'Röstmalz', label: 'Röstmalz' },
    { value: 'Karamellmalz', label: 'Karamellmalz' },
    { value: 'Rauchmalz', label: 'Rauchmalz' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {malt ? 'Malz bearbeiten' : 'Neues Malz hinzufügen'}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Malzname
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="input-field"
              placeholder="z.B. Pilsner Malz"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Malztyp
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="input-field"
              required
            >
              {maltTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Technical Specifications */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technische Daten</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farbe (EBC)
              </label>
              <input
                type="number"
                value={formData.color}
                onChange={(e) => handleInputChange('color', parseFloat(e.target.value))}
                className="input-field"
                min="0"
                max="1500"
                step="0.1"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                SRM: {getSRMFromEBC(formData.color)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extrakt (%)
              </label>
              <input
                type="number"
                value={formData.extract}
                onChange={(e) => handleInputChange('extract', parseFloat(e.target.value))}
                className="input-field"
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feuchte (%)
              </label>
              <input
                type="number"
                value={formData.moisture}
                onChange={(e) => handleInputChange('moisture', parseFloat(e.target.value))}
                className="input-field"
                min="0"
                max="20"
                step="0.1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Protein (%)
              </label>
              <input
                type="number"
                value={formData.protein}
                onChange={(e) => handleInputChange('protein', parseFloat(e.target.value))}
                className="input-field"
                min="0"
                max="20"
                step="0.1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diastatische Kraft (°L)
              </label>
              <input
                type="number"
                value={formData.diastaticPower}
                onChange={(e) => handleInputChange('diastaticPower', parseFloat(e.target.value))}
                className="input-field"
                min="0"
                max="200"
                step="1"
                required
              />
            </div>
          </div>
        </div>

        {/* Color Preview */}
        {formData.color > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Farbvorschau</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-8 rounded-lg overflow-hidden border border-gray-200">
                  <div 
                    className={`h-full ${getColorClass(formData.color)}`}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {formData.color} EBC ({getSRMFromEBC(formData.color)} SRM)
                  </p>
                  <p className="text-xs text-gray-600">
                    {formData.color < 10 ? 'Sehr hell' : 
                     formData.color < 25 ? 'Hell' :
                     formData.color < 50 ? 'Mittel' :
                     formData.color < 100 ? 'Dunkel' : 'Sehr dunkel'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Description and Usage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beschreibung
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="input-field"
              rows={4}
              placeholder="Beschreibung des Malzes, Geschmack, Eigenschaften..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verwendung
            </label>
            <textarea
              value={formData.usage}
              onChange={(e) => handleInputChange('usage', e.target.value)}
              className="input-field"
              rows={4}
              placeholder="Wofür wird dieses Malz verwendet? Welche Biersorten?"
            />
          </div>
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
            {malt ? 'Aktualisieren' : 'Hinzufügen'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MaltForm;
