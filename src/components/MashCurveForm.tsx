import React, { useState } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface MashPoint {
  time: number;
  temperature: number;
  step: string;
}

interface MashCurve {
  id: string;
  name: string;
  description: string;
  points: MashPoint[];
  createdAt: Date;
}

interface MashCurveFormProps {
  onSave: (curve: Omit<MashCurve, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const MashCurveForm: React.FC<MashCurveFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    points: [
      { time: 0, temperature: 20, step: 'Einmaischen' },
      { time: 5, temperature: 45, step: 'Proteinruhe' },
      { time: 15, temperature: 52, step: 'Proteinruhe' },
      { time: 25, temperature: 63, step: 'Maltoseruhe' },
      { time: 35, temperature: 68, step: 'Verzuckerungsruhe' },
      { time: 45, temperature: 72, step: 'Verzuckerungsruhe' },
      { time: 55, temperature: 78, step: 'Abmaischen' }
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
        time: lastPoint.time + 10,
        temperature: lastPoint.temperature,
        step: 'Neuer Schritt'
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

  const stepOptions = [
    'Einmaischen',
    'Proteinruhe',
    'Maltoseruhe',
    'Verzuckerungsruhe',
    'Abmaischen',
    'Rast',
    'Andere'
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Neue Maische-Kurve</h2>
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
              placeholder="z.B. Helles Bier Standard"
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
              placeholder="Kurze Beschreibung der Kurve"
            />
          </div>
        </div>

        {/* Temperature Points */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Temperaturpunkte</h3>
            <button
              type="button"
              onClick={addPoint}
              className="btn-secondary flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              Punkt hinzufügen
            </button>
          </div>

          <div className="space-y-3">
            {formData.points.map((point, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zeit (Min)
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperatur (°C)
                  </label>
                  <input
                    type="number"
                    value={point.temperature}
                    onChange={(e) => handlePointChange(index, 'temperature', parseInt(e.target.value))}
                    className="input-field"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schritt
                  </label>
                  <select
                    value={point.step}
                    onChange={(e) => handlePointChange(index, 'step', e.target.value)}
                    className="input-field"
                  >
                    {stepOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => removePoint(index)}
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                    disabled={formData.points.length <= 1}
                  >
                    <TrashIcon className="w-4 h-4" />
                    Entfernen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vorschau</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Temperaturverlauf</h4>
                <div className="space-y-1">
                  {formData.points.map((point, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{point.time} Min</span>
                      <span className="font-medium">{point.temperature}°C</span>
                      <span className="text-gray-600">{point.step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Statistiken</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Min. Temp:</span>
                    <span className="font-medium">
                      {Math.min(...formData.points.map(p => p.temperature))}°C
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max. Temp:</span>
                    <span className="font-medium">
                      {Math.max(...formData.points.map(p => p.temperature))}°C
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gesamtdauer:</span>
                    <span className="font-medium">
                      {Math.max(...formData.points.map(p => p.time))} Min
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

export default MashCurveForm;
