import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlusIcon, PlayIcon, PauseIcon, StopIcon } from '@heroicons/react/24/outline';
import MashCurveForm from '../components/MashCurveForm';

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

const MashCurves: React.FC = () => {
  const [curves, setCurves] = useState<MashCurve[]>([]);
  const [selectedCurve, setSelectedCurve] = useState<MashCurve | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(0);

  useEffect(() => {
    loadCurves();
  }, []);

  const loadCurves = async () => {
    try {
      const loadedCurves = await window.electronAPI.loadMashCurves();
      setCurves(loadedCurves);
    } catch (error) {
      console.error('Fehler beim Laden der Maische-Kurven:', error);
    }
  };

  const handleSaveCurve = async (curveData: Omit<MashCurve, 'id' | 'createdAt'>) => {
    try {
      const result = await window.electronAPI.saveMashCurve(curveData);
      if (result.success) {
        await loadCurves();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Maische-Kurve:', error);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setCurrentTemp(0);
    // Hier würde die Temperaturmessung gestartet werden
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Hier würde die Aufzeichnung gestoppt werden
  };

  const addTemperaturePoint = (temp: number) => {
    if (selectedCurve && isRecording) {
      const newPoint: MashPoint = {
        time: Date.now(),
        temperature: temp,
        step: 'Aufzeichnung'
      };
      
      setSelectedCurve(prev => prev ? {
        ...prev,
        points: [...prev.points, newPoint]
      } : null);
    }
  };

  const sampleData = [
    { time: 0, temperature: 20, step: 'Einmaischen' },
    { time: 5, temperature: 45, step: 'Proteinruhe' },
    { time: 15, temperature: 52, step: 'Proteinruhe' },
    { time: 25, temperature: 63, step: 'Maltoseruhe' },
    { time: 35, temperature: 68, step: 'Verzuckerungsruhe' },
    { time: 45, temperature: 72, step: 'Verzuckerungsruhe' },
    { time: 55, temperature: 78, step: 'Abmaischen' }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Maische-Kurven</h1>
          <p className="text-gray-600">Plane und überwache deine Maische-Temperaturen</p>
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
                <p className="text-sm">Erstelle deine erste Maische-Kurve</p>
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
                    {curve.points.length} Punkte • {new Date(curve.createdAt).toLocaleDateString('de-DE')}
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
                {selectedCurve ? selectedCurve.name : 'Maische-Temperaturverlauf'}
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

            {/* Temperature Display */}
            {isRecording && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Aktuelle Temperatur:</span>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={currentTemp}
                      onChange={(e) => setCurrentTemp(parseFloat(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      placeholder="°C"
                    />
                    <button
                      onClick={() => addTemperaturePoint(currentTemp)}
                      className="btn-primary text-sm"
                    >
                      Punkt hinzufügen
                    </button>
                  </div>
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
                    label={{ value: 'Zeit (Minuten)', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    label={{ value: 'Temperatur (°C)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value: any, name: string) => [`${value}°C`, 'Temperatur']}
                    labelFormatter={(label: any) => `Zeit: ${label} Min`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Curve Information */}
            {selectedCurve && (
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
                    {selectedCurve.points.length}
                  </p>
                  <p className="text-xs text-gray-600">Punkte</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.max(...selectedCurve.points.map(p => p.time))}
                  </p>
                  <p className="text-xs text-gray-600">Dauer (Min)</p>
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
            <MashCurveForm
              onSave={handleSaveCurve}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MashCurves;
