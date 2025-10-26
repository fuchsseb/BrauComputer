import React, { useState } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface FermentationPoint {
  time: number;
  temperature: number;
  gravity: number;
  ph: number;
  notes: string;
}

interface FermentationCurve {
  id: string;
  name: string;
  description: string;
  points: FermentationPoint[];
  createdAt: Date;
}

interface FermentationCurveFormProps {
  onSave: (curve: Omit<FermentationCurve, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const FermentationCurveForm: React.FC<FermentationCurveFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    points: [
      { time: 0, temperature: 20, gravity: 1.050, ph: 5.2, notes: 'Gärung gestartet' },
      { time: 1, temperature: 22, gravity: 1.045, ph: 4.8, notes: 'Erste Bläschen' },
      { time: 2, temperature: 24, gravity: 1.040, ph: 4.5, notes: 'Starke Gärung' }
    ]
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePointChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      points: prev.points.map((point, i) => 
        i === index ? { ...point, [field]: value } : point
      )
    }));
  };

  const addPoint = () => {
    const lastPoint = formData.points[formData.points.length - 1];
    setFormData(prev => ({
      ...prev,
      points: [...prev.points, {
        time: lastPoint.time + 1,
        temperature: lastPoint.temperature,
        gravity: lastPoint.gravity,
        ph: lastPoint.ph,
        notes: ''
      }]
    }));
  };

  const removePoint = (index: number) => {
    setFormData(prev => ({
      ...prev,
      points: prev.points.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Neue Gärkurve</h2>
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
              Kurvenname
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="input-field"
              placeholder="z.B. IPA Gärung Winter 2024"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beschreibung
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="input-field"
              placeholder="Kurze Beschreibung der Gärung"
            />
          </div>
        </div>

        {/* Data Points */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Messpunkte</h3>
            <button
              type="button"
              onClick={addPoint}
              className="btn-secondary flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              Punkt hinzufügen
            </button>
          </div>

          <div className="space-y-4">
            {formData.points.map((point, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Tag {point.time}</h4>
                  <button
                    type="button"
                    onClick={() => removePoint(index)}
                    className="btn-secondary flex items-center gap-2"
                    disabled={formData.points.length <= 1}
                  >
                    <TrashIcon className="w-4 h-4" />
                    Entfernen
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tag
                    </label>
                    <input
                      type="number"
                      value={point.time}
                      onChange={(e) => handlePointChange(index, 'time', parseInt(e.target.value))}
                      className="input-field"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Temperatur (°C)
                    </label>
                    <input
                      type="number"
                      value={point.temperature}
                      onChange={(e) => handlePointChange(index, 'temperature', parseFloat(e.target.value))}
                      className="input-field"
                      min="0"
                      max="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stammwürze
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      value={point.gravity}
                      onChange={(e) => handlePointChange(index, 'gravity', parseFloat(e.target.value))}
                      className="input-field"
                      min="1.000"
                      max="1.200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      pH-Wert
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={point.ph}
                      onChange={(e) => handlePointChange(index, 'ph', parseFloat(e.target.value))}
                      className="input-field"
                      min="3.0"
                      max="7.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notizen
                    </label>
                    <input
                      type="text"
                      value={point.notes}
                      onChange={(e) => handlePointChange(index, 'notes', e.target.value)}
                      className="input-field"
                      placeholder="z.B. Starke Gärung"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vorschau</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Messdaten</h4>
                <div className="space-y-1">
                  {formData.points.map((point, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>Tag {point.time}:</span>
                      <span className="font-medium">
                        {point.temperature}°C, {point.gravity}, pH {point.ph}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Statistiken</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Gärdauer:</span>
                    <span className="font-medium">
                      {Math.max(...formData.points.map(p => p.time))} Tage
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temp. Bereich:</span>
                    <span className="font-medium">
                      {Math.min(...formData.points.map(p => p.temperature))}°C - {Math.max(...formData.points.map(p => p.temperature))}°C
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>SW Abfall:</span>
                    <span className="font-medium">
                      {formData.points[0]?.gravity?.toFixed(3)} → {formData.points[formData.points.length - 1]?.gravity?.toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
            Kurve speichern
          </button>
        </div>
      </form>
    </div>
  );
};

export default FermentationCurveForm;
