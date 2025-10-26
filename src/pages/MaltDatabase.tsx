import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import MaltForm from '../components/MaltForm';
import MaltCard from '../components/MaltCard';

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

const MaltDatabase: React.FC = () => {
  const [malts, setMalts] = useState<Malt[]>([]);
  const [filteredMalts, setFilteredMalts] = useState<Malt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingMalt, setEditingMalt] = useState<Malt | null>(null);

  useEffect(() => {
    loadMalts();
  }, []);

  useEffect(() => {
    filterMalts();
  }, [malts, searchTerm, filterType]);

  const loadMalts = async () => {
    // Sample data for demonstration
    const sampleMalts: Malt[] = [
      {
        id: '1',
        name: 'Pilsner Malz',
        type: 'Basis',
        color: 3.5,
        extract: 82,
        moisture: 4.5,
        protein: 10.5,
        diastaticPower: 120,
        description: 'Helles, süßliches Malz für helle Biere',
        usage: 'Basis für Pilsner, Helles, Lager',
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Münchner Malz',
        type: 'Spezial',
        color: 15,
        extract: 80,
        moisture: 4.0,
        protein: 11.0,
        diastaticPower: 100,
        description: 'Mitteldunkles Malz mit malzigem Geschmack',
        usage: 'Für dunklere Biere, Vollbier',
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'Cara-Malz',
        type: 'Spezial',
        color: 25,
        extract: 75,
        moisture: 4.0,
        protein: 9.0,
        diastaticPower: 0,
        description: 'Karamellisiertes Malz für Farbe und Süße',
        usage: 'Farbe, Körper, Süße',
        createdAt: new Date()
      },
      {
        id: '4',
        name: 'Schwarzes Malz',
        type: 'Spezial',
        color: 1200,
        extract: 70,
        moisture: 4.0,
        protein: 8.0,
        diastaticPower: 0,
        description: 'Sehr dunkles Malz für Stout und Porter',
        usage: 'Farbe, Röstaromen',
        createdAt: new Date()
      }
    ];
    setMalts(sampleMalts);
  };

  const filterMalts = () => {
    let filtered = malts;

    if (searchTerm) {
      filtered = filtered.filter(malt => 
        malt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        malt.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        malt.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(malt => malt.type === filterType);
    }

    setFilteredMalts(filtered);
  };

  const handleSaveMalt = async (maltData: Omit<Malt, 'id' | 'createdAt'>) => {
    try {
      const newMalt: Malt = {
        ...maltData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      
      setMalts(prev => [...prev, newMalt]);
      setShowForm(false);
      setEditingMalt(null);
    } catch (error) {
      console.error('Fehler beim Speichern des Malzes:', error);
    }
  };

  const handleEditMalt = (malt: Malt) => {
    setEditingMalt(malt);
    setShowForm(true);
  };

  const handleDeleteMalt = (id: string) => {
    if (window.confirm('Möchten Sie dieses Malz wirklich löschen?')) {
      setMalts(prev => prev.filter(malt => malt.id !== id));
    }
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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Malz-Datenbank</h1>
          <p className="text-gray-600">Verwalte deine Malzsorten und deren Eigenschaften</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Neues Malz
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Malz suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-field"
            />
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input-field"
            >
              <option value="all">Alle Typen</option>
              <option value="Basis">Basis-Malze</option>
              <option value="Spezial">Spezial-Malze</option>
              <option value="Röstmalz">Röstmalze</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl">🌾</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Gesamt Malze</p>
              <p className="text-2xl font-bold text-gray-900">{malts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Basis-Malze</p>
              <p className="text-2xl font-bold text-gray-900">
                {malts.filter(m => m.type === 'Basis').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Spezial-Malze</p>
              <p className="text-2xl font-bold text-gray-900">
                {malts.filter(m => m.type === 'Spezial').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <span className="text-2xl">🎨</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Farbbereich</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.min(...malts.map(m => m.color))} - {Math.max(...malts.map(m => m.color))} EBC
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Malt Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMalts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <span className="text-6xl mb-4 block">🌾</span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Malze gefunden</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Versuche einen anderen Suchbegriff' : 'Füge dein erstes Malz hinzu'}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Malz hinzufügen
            </button>
          </div>
        ) : (
          filteredMalts.map((malt) => (
            <MaltCard
              key={malt.id}
              malt={malt}
              onEdit={() => handleEditMalt(malt)}
              onDelete={() => handleDeleteMalt(malt.id)}
            />
          ))
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <MaltForm
              malt={editingMalt}
              onSave={handleSaveMalt}
              onCancel={() => {
                setShowForm(false);
                setEditingMalt(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MaltDatabase;
