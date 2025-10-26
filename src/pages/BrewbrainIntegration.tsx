import React, { useState, useEffect } from 'react';
import { 
  CpuChipIcon, 
  WifiIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface FloatData {
  temperature: number;
  gravity: number;
  ph: number;
  timestamp: Date;
  battery: number;
  signal: number;
}

interface BrewbrainIntegrationProps {}

const BrewbrainIntegration: React.FC<BrewbrainIntegrationProps> = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [floatData, setFloatData] = useState<FloatData[]>([]);
  const [currentData, setCurrentData] = useState<FloatData | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');

  useEffect(() => {
    // Simulate connection check on component mount
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setConnectionStatus('connecting');
    try {
      // Simulate connection check
      await new Promise(resolve => setTimeout(resolve, 2000));
      const connected = Math.random() > 0.3; // 70% chance of successful connection
      setIsConnected(connected);
      setConnectionStatus(connected ? 'connected' : 'error');
    } catch (error) {
      setConnectionStatus('error');
    }
  };

  const connectToFloat = async () => {
    setConnectionStatus('connecting');
    try {
      const result = await window.electronAPI.connectToFloat();
      if (result.success) {
        setIsConnected(true);
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      console.error('Fehler beim Verbinden mit Float:', error);
      setConnectionStatus('error');
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Simulate data recording
    const interval = setInterval(() => {
      const newData: FloatData = {
        temperature: 20 + Math.random() * 5,
        gravity: 1.040 + Math.random() * 0.020,
        ph: 4.0 + Math.random() * 1.0,
        timestamp: new Date(),
        battery: 85 + Math.random() * 15,
        signal: 70 + Math.random() * 30
      };
      setCurrentData(newData);
      setFloatData(prev => [...prev, newData]);
    }, 5000);

    // Store interval ID for cleanup
    (window as any).floatInterval = interval;
  };

  const stopRecording = () => {
    setIsRecording(false);
    if ((window as any).floatInterval) {
      clearInterval((window as any).floatInterval);
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-600';
      case 'connecting': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected': return <CheckCircleIcon className="w-5 h-5" />;
      case 'connecting': return <div className="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />;
      case 'error': return <ExclamationTriangleIcon className="w-5 h-5" />;
      default: return <WifiIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brewbrain Float Integration</h1>
          <p className="text-gray-600">Verbinde und überwache deinen Brewbrain Float</p>
        </div>
        <div className="flex gap-4">
          {!isConnected ? (
            <button
              onClick={connectToFloat}
              disabled={connectionStatus === 'connecting'}
              className="btn-primary flex items-center gap-2"
            >
              <CpuChipIcon className="w-5 h-5" />
              Mit Float verbinden
            </button>
          ) : (
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
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Connection Status */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Verbindungsstatus</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Float Status</span>
                <div className={`flex items-center gap-2 ${getConnectionStatusColor()}`}>
                  {getConnectionStatusIcon()}
                  <span className="text-sm font-medium">
                    {connectionStatus === 'connected' ? 'Verbunden' :
                     connectionStatus === 'connecting' ? 'Verbinde...' :
                     connectionStatus === 'error' ? 'Fehler' : 'Getrennt'}
                  </span>
                </div>
              </div>

              {currentData && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Batterie</span>
                    <span className="text-sm font-medium text-gray-900">{currentData.battery.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Signal</span>
                    <span className="text-sm font-medium text-gray-900">{currentData.signal.toFixed(0)}%</span>
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={checkConnection}
                  className="btn-secondary w-full"
                >
                  Verbindung prüfen
                </button>
              </div>
            </div>
          </div>

          {/* Recording Status */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aufzeichnung</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Status</span>
                <span className={`text-sm font-medium ${isRecording ? 'text-green-600' : 'text-gray-600'}`}>
                  {isRecording ? 'Aktiv' : 'Gestoppt'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Messungen</span>
                <span className="text-sm font-medium text-gray-900">{floatData.length}</span>
              </div>
              {isRecording && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Letzte Messung</span>
                  <span className="text-sm font-medium text-gray-900">
                    {currentData ? new Date(currentData.timestamp).toLocaleTimeString('de-DE') : '-'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Current Data Display */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Aktuelle Messdaten</h2>
            
            {currentData ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-2xl">🌡️</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{currentData.temperature.toFixed(1)}°C</p>
                  <p className="text-sm text-blue-700">Temperatur</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <ChartBarIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-900">{currentData.gravity.toFixed(3)}</p>
                  <p className="text-sm text-green-700">Stammwürze</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-2xl">🧪</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">{currentData.ph.toFixed(1)}</p>
                  <p className="text-sm text-purple-700">pH-Wert</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <CpuChipIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Daten verfügbar</h3>
                <p className="text-gray-600">
                  {isConnected ? 'Starte die Aufzeichnung, um Daten zu erhalten' : 'Verbinde dich mit dem Float'}
                </p>
              </div>
            )}

            {/* Data History */}
            {floatData.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Messverlauf</h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <div className="space-y-2">
                    {floatData.slice(-10).reverse().map((data, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          {new Date(data.timestamp).toLocaleTimeString('de-DE')}
                        </span>
                        <div className="flex gap-4">
                          <span className="font-medium">{data.temperature.toFixed(1)}°C</span>
                          <span className="font-medium">{data.gravity.toFixed(3)}</span>
                          <span className="font-medium">pH {data.ph.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Brewbrain Float Setup</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Verbindung herstellen</h4>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Stelle sicher, dass der Float eingeschaltet ist</li>
              <li>2. Aktiviere Bluetooth auf deinem Mac</li>
              <li>3. Klicke auf "Mit Float verbinden"</li>
              <li>4. Warte auf die erfolgreiche Verbindung</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Daten aufzeichnen</h4>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Stelle den Float in dein Gärgefäß</li>
              <li>2. Starte die Aufzeichnung</li>
              <li>3. Überwache die Daten in Echtzeit</li>
              <li>4. Stoppe die Aufzeichnung wenn gewünscht</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrewbrainIntegration;
