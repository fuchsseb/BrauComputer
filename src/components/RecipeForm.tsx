import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

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

interface RecipeFormProps {
  recipe?: Recipe | null;
  onSave: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ recipe, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    style: '',
    abv: 0,
    ibu: 0,
    srm: 0,
    og: 0,
    fg: 0,
    ingredients: {
      malt: [{ name: '', amount: 0, unit: 'kg' }],
      hops: [{ name: '', amount: 0, unit: 'g', time: 0 }],
      yeast: ''
    },
    notes: ''
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name,
        style: recipe.style,
        abv: recipe.abv,
        ibu: recipe.ibu,
        srm: recipe.srm,
        og: recipe.og,
        fg: recipe.fg,
        ingredients: recipe.ingredients,
        notes: recipe.notes
      });
    }
  }, [recipe]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIngredientChange = (type: 'malt' | 'hops', index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      ingredients: {
        ...prev.ingredients,
        [type]: prev.ingredients[type].map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const addIngredient = (type: 'malt' | 'hops') => {
    const newIngredient = type === 'malt' 
      ? { name: '', amount: 0, unit: 'kg' }
      : { name: '', amount: 0, unit: 'g', time: 0 };
    
    setFormData(prev => ({
      ...prev,
      ingredients: {
        ...prev.ingredients,
        [type]: [...prev.ingredients[type], newIngredient]
      }
    }));
  };

  const removeIngredient = (type: 'malt' | 'hops', index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: {
        ...prev.ingredients,
        [type]: prev.ingredients[type].filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {recipe ? 'Rezept bearbeiten' : 'Neues Rezept erstellen'}
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
              Rezeptname
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bierstil
            </label>
            <select
              value={formData.style}
              onChange={(e) => handleInputChange('style', e.target.value)}
              className="input-field"
              required
            >
              <option value="">Bitte wählen</option>
              <option value="IPA">IPA</option>
              <option value="Lager">Lager</option>
              <option value="Pilsner">Pilsner</option>
              <option value="Stout">Stout</option>
              <option value="Porter">Porter</option>
              <option value="Wheat">Weizenbier</option>
              <option value="Ale">Ale</option>
            </select>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ABV (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.abv}
              onChange={(e) => handleInputChange('abv', parseFloat(e.target.value))}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IBU
            </label>
            <input
              type="number"
              value={formData.ibu}
              onChange={(e) => handleInputChange('ibu', parseInt(e.target.value))}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SRM
            </label>
            <input
              type="number"
              value={formData.srm}
              onChange={(e) => handleInputChange('srm', parseInt(e.target.value))}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OG
            </label>
            <input
              type="number"
              step="0.001"
              value={formData.og}
              onChange={(e) => handleInputChange('og', parseFloat(e.target.value))}
              className="input-field"
            />
          </div>
        </div>

        {/* Malt Ingredients */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Malz</h3>
            <button
              type="button"
              onClick={() => addIngredient('malt')}
              className="btn-secondary text-sm"
            >
              Malz hinzufügen
            </button>
          </div>
          <div className="space-y-3">
            {formData.ingredients.malt.map((malt, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Malzart
                  </label>
                  <input
                    type="text"
                    value={malt.name}
                    onChange={(e) => handleIngredientChange('malt', index, 'name', e.target.value)}
                    className="input-field"
                    placeholder="z.B. Pilsner Malz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Menge
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={malt.amount}
                    onChange={(e) => handleIngredientChange('malt', index, 'amount', parseFloat(e.target.value))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Einheit
                  </label>
                  <select
                    value={malt.unit}
                    onChange={(e) => handleIngredientChange('malt', index, 'unit', e.target.value)}
                    className="input-field"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                  </select>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => removeIngredient('malt', index)}
                    className="btn-secondary w-full"
                  >
                    Entfernen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hops Ingredients */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Hopfen</h3>
            <button
              type="button"
              onClick={() => addIngredient('hops')}
              className="btn-secondary text-sm"
            >
              Hopfen hinzufügen
            </button>
          </div>
          <div className="space-y-3">
            {formData.ingredients.hops.map((hop, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hopfensorte
                  </label>
                  <input
                    type="text"
                    value={hop.name}
                    onChange={(e) => handleIngredientChange('hops', index, 'name', e.target.value)}
                    className="input-field"
                    placeholder="z.B. Hallertauer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Menge
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={hop.amount}
                    onChange={(e) => handleIngredientChange('hops', index, 'amount', parseFloat(e.target.value))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Einheit
                  </label>
                  <select
                    value={hop.unit}
                    onChange={(e) => handleIngredientChange('hops', index, 'unit', e.target.value)}
                    className="input-field"
                  >
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zeit (min)
                  </label>
                  <input
                    type="number"
                    value={hop.time}
                    onChange={(e) => handleIngredientChange('hops', index, 'time', parseInt(e.target.value))}
                    className="input-field"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => removeIngredient('hops', index)}
                    className="btn-secondary w-full"
                  >
                    Entfernen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yeast */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hefe
          </label>
          <input
            type="text"
            value={formData.ingredients.yeast}
            onChange={(e) => handleInputChange('ingredients', { ...formData.ingredients, yeast: e.target.value })}
            className="input-field"
            placeholder="z.B. Safale US-05"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notizen
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="input-field"
            rows={4}
            placeholder="Besondere Hinweise zum Rezept..."
          />
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
            {recipe ? 'Aktualisieren' : 'Erstellen'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
