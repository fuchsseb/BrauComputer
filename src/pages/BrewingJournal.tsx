import React, { useState, useEffect } from 'react';
import { PlusIcon, CalendarIcon, ClockIcon, BeakerIcon } from '@heroicons/react/24/outline';
import BrewingSessionForm from '../components/BrewingSessionForm';
import BrewingSessionCard from '../components/BrewingSessionCard';

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

const BrewingJournal: React.FC = () => {
  const [sessions, setSessions] = useState<BrewingSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<BrewingSession[]>([]);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingSession, setEditingSession] = useState<BrewingSession | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    filterSessions();
  }, [sessions, filter]);

  const loadSessions = async () => {
    try {
      const loadedSessions = await window.electronAPI.loadBrewingSessions();
      setSessions(loadedSessions);
    } catch (error) {
      console.error('Fehler beim Laden der Brausitzungen:', error);
      // Sample data for demonstration
      const sampleSessions: BrewingSession[] = [
        {
          id: '1',
          recipeName: 'IPA Classic',
          date: new Date('2024-01-15'),
          batchNumber: 'B001',
          volume: 20,
          og: 1.065,
          fg: 1.012,
          abv: 6.9,
          ibu: 45,
          srm: 8,
          mashTemp: 65,
          boilTime: 60,
          fermentationTemp: 20,
          fermentationDays: 14,
          notes: 'Sehr gute Gärung, viel Hopfenaroma',
          status: 'ready',
          createdAt: new Date('2024-01-15')
        },
        {
          id: '2',
          recipeName: 'Helles Lager',
          date: new Date('2024-01-20'),
          batchNumber: 'B002',
          volume: 25,
          og: 1.048,
          fg: 1.010,
          abv: 5.0,
          ibu: 25,
          srm: 4,
          mashTemp: 63,
          boilTime: 90,
          fermentationTemp: 12,
          fermentationDays: 21,
          notes: 'Langsame Gärung bei niedriger Temperatur',
          status: 'conditioning',
          createdAt: new Date('2024-01-20')
        },
        {
          id: '3',
          recipeName: 'Stout Imperial',
          date: new Date('2024-02-01'),
          batchNumber: 'B003',
          volume: 15,
          og: 1.085,
          fg: 1.020,
          abv: 8.5,
          ibu: 60,
          srm: 35,
          mashTemp: 68,
          boilTime: 90,
          fermentationTemp: 22,
          fermentationDays: 28,
          notes: 'Sehr intensive Gärung, viel Schaum',
          status: 'fermenting',
          createdAt: new Date('2024-02-01')
        }
      ];
      setSessions(sampleSessions);
    }
  };

  const filterSessions = () => {
    let filtered = sessions;

    if (filter !== 'all') {
      filtered = filtered.filter(session => session.status === filter);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setFilteredSessions(filtered);
  };

  const handleSaveSession = async (sessionData: Omit<BrewingSession, 'id' | 'createdAt'>) => {
    try {
      const result = await window.electronAPI.saveBrewingSession(sessionData);
      if (result.success) {
        await loadSessions();
        setShowForm(false);
        setEditingSession(null);
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Brausitzung:', error);
    }
  };

  const handleEditSession = (session: BrewingSession) => {
    setEditingSession(session);
    setShowForm(true);
  };

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

  const getStats = () => {
    const totalBatches = sessions.length;
    const totalVolume = sessions.reduce((sum, session) => sum + session.volume, 0);
    const avgAbv = sessions.length > 0 ? sessions.reduce((sum, session) => sum + session.abv, 0) / sessions.length : 0;
    const readyBatches = sessions.filter(s => s.status === 'ready').length;

    return { totalBatches, totalVolume, avgAbv, readyBatches };
  };

  const stats = getStats();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brautagebuch</h1>
          <p className="text-gray-600">Dokumentiere deine Brausitzungen und verfolge den Fortschritt</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Neue Brausitzung
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BeakerIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Gesamt Batches</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBatches}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">🍺</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Gesamt Liter</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalVolume}L</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ø Alkohol</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgAbv.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Fertige Batches</p>
              <p className="text-2xl font-bold text-gray-900">{stats.readyBatches}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Alle
          </button>
          <button
            onClick={() => setFilter('planned')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'planned' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Geplant
          </button>
          <button
            onClick={() => setFilter('brewing')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'brewing' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Am Brauen
          </button>
          <button
            onClick={() => setFilter('fermenting')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'fermenting' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Gärt
          </button>
          <button
            onClick={() => setFilter('ready')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'ready' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Fertig
          </button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-6">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12">
            <BeakerIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Brausitzungen gefunden</h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all' ? 'Erstelle deine erste Brausitzung' : 'Keine Sitzungen mit diesem Status'}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Brausitzung erstellen
            </button>
          </div>
        ) : (
          filteredSessions.map((session) => (
            <BrewingSessionCard
              key={session.id}
              session={session}
              onEdit={() => handleEditSession(session)}
            />
          ))
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <BrewingSessionForm
              session={editingSession}
              onSave={handleSaveSession}
              onCancel={() => {
                setShowForm(false);
                setEditingSession(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BrewingJournal;
