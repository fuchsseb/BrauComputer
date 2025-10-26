import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import RecipeForm from '../components/RecipeForm';
import RecipeCard from '../components/RecipeCard';

interface Recipe {
  id: string;
  name: string;
  style: string;
  abv: number;
  ibu: number;
  srm: number;
  og: number;
  fg: number;
  ingredients: {
    malt: Array<{ name: string; amount: number; unit: string }>;
    hops: Array<{ name: string; amount: number; unit: string; time: number }>;
    yeast: string;
  };
  notes: string;
  createdAt: Date;
}

const RecipeManager: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const loadedRecipes = await window.electronAPI.loadRecipes();
      setRecipes(loadedRecipes);
    } catch (error) {
      console.error('Fehler beim Laden der Rezepte:', error);
    }
  };

  const handleSaveRecipe = async (recipeData: Omit<Recipe, 'id' | 'createdAt'>) => {
    try {
      const result = await window.electronAPI.saveRecipe(recipeData);
      if (result.success) {
        await loadRecipes();
        setShowForm(false);
        setEditingRecipe(null);
      }
    } catch (error) {
      console.error('Fehler beim Speichern des Rezepts:', error);
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    if (window.confirm('Möchten Sie dieses Rezept wirklich löschen?')) {
      // Hier würde die Lösch-Logik implementiert werden
      console.log('Deleting recipe:', id);
      await loadRecipes();
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    if (filter === 'all') return true;
    return recipe.style.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rezeptverwaltung</h1>
          <p className="text-gray-600">Erstelle und verwalte deine Bierrezepte</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Neues Rezept
        </button>
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
            onClick={() => setFilter('ipa')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'ipa' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            IPA
          </button>
          <button
            onClick={() => setFilter('lager')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'lager' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Lager
          </button>
          <button
            onClick={() => setFilter('stout')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'stout' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Stout
          </button>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Rezepte gefunden</h3>
            <p className="text-gray-600 mb-4">Erstelle dein erstes Bierrezept</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Rezept erstellen
            </button>
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={() => {
                setEditingRecipe(recipe);
                setShowForm(true);
              }}
              onDelete={() => handleDeleteRecipe(recipe.id)}
            />
          ))
        )}
      </div>

      {/* Recipe Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <RecipeForm
              recipe={editingRecipe}
              onSave={handleSaveRecipe}
              onCancel={() => {
                setShowForm(false);
                setEditingRecipe(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeManager;
