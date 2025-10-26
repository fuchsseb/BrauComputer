import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlusIcon, PlayIcon, PauseIcon, StopIcon } from '@heroicons/react/24/outline';
import FermentationCurveForm from '../components/FermentationCurveForm';

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

const FermentationCurves: React.FC = () => {
  const [curves, setCurves] = useState<FermentationCurve[]>([]);
  const [selectedCurve, setSelectedCurve] = useState<FermentationCurve | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentData, setCurrentData] = useState({
    temperature: 0,
    gravity: 0,
    ph: 0,
    notes: ''
  });

  useEffect(() => {
    loadCurves();
  }, []);

  const loadCurves = async () => {
    try {
      const loadedCurves = await window.electronAPI.loadFermentationCurves();
      setCurves(loadedCurves);
    } catch (error) {
      console.error('Fehler beim Laden der Gärkurven:', error);
    }
  };

  const handleSaveCurve = async (curveData: Omit<FermentationCurve, 'id' | 'createdAt'>) => {
    try {
      const result = await window.electronAPI.saveFermentationCurve(curveData);
      if (result.success) {
        await loadCurves();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Gärkurve:', error);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setCurrentData({ temperature: 0, gravity: 0, ph: 0, notes: '' });
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const addDataPoint = () => {
    if (selectedCurve && isRecording) {
      const newPoint: FermentationPoint = {
        time: Date.now(),
        temperature: currentData.temperature,
        gravity: currentData.gravity,
        ph: currentData.ph,
        notes: currentData.notes
      };
      
      setSelectedCurve(prev => prev ? {
        ...prev,
        points: [...prev.points, newPoint]
      } : null);
      
      setCurrentData({ temperature: 0, gravity: 0, ph: 0, notes: '' });
    }
  };

  const sampleData = [
    { time: 0, temperature: 20, gravity: 1.050, ph: 5.2, notes: 'Gärung gestartet' },
    { time: 1, temperature: 22, gravity: 1.045, ph: 4.8, notes: 'Erste Bläschen' },
    { time: 2, temperature: 24, gravity: 1.040, ph: 4.5, notes: 'Starke Gärung' },
    { time: 3, temperature: 23, gravity: 1.035, ph: 4.2, notes: 'Gärung läuft' },
    { time: 4, temperature: 22, gravity: 1.030, ph: 4.0, notes: 'Gärung verlangsamt' },
    { time: 5, temperature: 21, gravity: 1.025, ph: 3.8, notes: 'Gärung fast beendet' },
    { time: 6, temperature: 20, gravity: 1.020, ph: 3.6, notes: 'Gärung beendet' }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gärkurven</h1>
          <p className="text-gray-600">Überwache und analysiere deine Gärung</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Neue Kurve
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Curve List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Gespeicherte Kurven</h2>
          <div className="space-y-3">
            {curves.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Keine Kurven gespeichert</p>
                <p className="text-sm">Erstelle deine erste Gärkurve</p>
              </div>
            ) : (
              curves.map((curve) => (
                <div
                  key={curve.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedCurve?.id === curve.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCurve(curve)}
                >
                  <h3 className="font-medium text-gray-900">{curve.name}</h3>
                  <p className="text-sm text-gray-600">{curve.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {curve.points.length} Messungen • {new Date(curve.createdAt).toLocaleDateString('de-DE')}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chart and Controls */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCurve ? selectedCurve.name : 'Gärverlauf'}
              </h2>
              <div className="flex gap-2">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="btn-primary flex items-center gap-2"
                  >
                    <PlayIcon className="w-4 h-4" />
                    Aufzeichnung starten
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <StopIcon className="w-4 h-4" />
                    Aufzeichnung stoppen
                  </button>
                )}
              </div>
            </div>

            {/* Data Input */}
            {isRecording && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Messdaten eingeben</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Temperatur (°C)
                    </label>
                    <input
                      type="number"
                      value={currentData.temperature}
                      onChange={(e) => setCurrentData(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                      className="input-field"
                      placeholder="20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stammwürze
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      value={currentData.gravity}
                      onChange={(e) => setCurrentData(prev => ({ ...prev, gravity: parseFloat(e.target.value) }))}
                      className="input-field"
                      placeholder="1.050"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      pH-Wert
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={currentData.ph}
                      onChange={(e) => setCurrentData(prev => ({ ...prev, ph: parseFloat(e.target.value) }))}
                      className="input-field"
                      placeholder="5.2"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={addDataPoint}
                      className="btn-primary w-full"
                    >
                      Messung hinzufügen
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notizen
                  </label>
                  <input
                    type="text"
                    value={currentData.notes}
                    onChange={(e) => setCurrentData(prev => ({ ...prev, notes: e.target.value }))}
                    className="input-field"
                    placeholder="z.B. Starke Gärung, viele Bläschen"
                  />
                </div>
              </div>
            )}

            {/* Chart */}
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedCurve?.points || sampleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    label={{ value: 'Zeit (Tage)', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value: any, name: string) => {
                      if (name === 'temperature') return [`${value}°C`, 'Temperatur'];
                      if (name === 'gravity') return [`${value}`, 'Stammwürze'];
                      if (name === 'ph') return [`${value}`, 'pH-Wert'];
                      return [value, name];
                    }}
                    labelFormatter={(label: any) => `Tag: ${label}`}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    name="Temperatur (°C)"
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="gravity" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    name="Stammwürze"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="ph" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                    name="pH-Wert"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Statistics */}
            {selectedCurve && selectedCurve.points.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.min(...selectedCurve.points.map(p => p.temperature))}°C
                  </p>
                  <p className="text-xs text-gray-600">Min. Temp.</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.max(...selectedCurve.points.map(p => p.temperature))}°C
                  </p>
                  <p className="text-xs text-gray-600">Max. Temp.</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedCurve.points[0]?.gravity?.toFixed(3)}
                  </p>
                  <p className="text-xs text-gray-600">Start-SW</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedCurve.points[selectedCurve.points.length - 1]?.gravity?.toFixed(3)}
                  </p>
                  <p className="text-xs text-gray-600">End-SW</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <FermentationCurveForm
              onSave={handleSaveCurve}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FermentationCurves;
