import React from 'react';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

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

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: () => void;
  onDelete: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onEdit, onDelete }) => {
  const getSRMColor = (srm: number) => {
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
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{recipe.name}</h3>
            <p className="text-sm text-gray-600">{recipe.style}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Bearbeiten"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Löschen"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{recipe.abv}%</p>
            <p className="text-xs text-gray-600">ABV</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{recipe.ibu}</p>
            <p className="text-xs text-gray-600">IBU</p>
          </div>
        </div>

        {/* SRM Color Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Farbe (SRM)</span>
            <span className="text-sm text-gray-600">{recipe.srm}</span>
          </div>
          <div className="w-full h-4 rounded-lg overflow-hidden">
            <div 
              className={`h-full ${getSRMColor(recipe.srm)}`}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Gravity */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">OG</p>
            <p className="font-semibold text-gray-900">{recipe.og.toFixed(3)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">FG</p>
            <p className="font-semibold text-gray-900">{recipe.fg.toFixed(3)}</p>
          </div>
        </div>

        {/* Ingredients Summary */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Zutaten</h4>
          <div className="space-y-1">
            <div className="text-xs text-gray-600">
              <span className="font-medium">Malz:</span> {recipe.ingredients.malt.length} Sorten
            </div>
            <div className="text-xs text-gray-600">
              <span className="font-medium">Hopfen:</span> {recipe.ingredients.hops.length} Sorten
            </div>
            <div className="text-xs text-gray-600">
              <span className="font-medium">Hefe:</span> {recipe.ingredients.yeast}
            </div>
          </div>
        </div>

        {/* Notes Preview */}
        {recipe.notes && (
          <div className="mb-4">
            <p className="text-xs text-gray-600 line-clamp-2">{recipe.notes}</p>
          </div>
        )}

        {/* Created Date */}
        <div className="text-xs text-gray-500">
          Erstellt: {new Date(recipe.createdAt).toLocaleDateString('de-DE')}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
