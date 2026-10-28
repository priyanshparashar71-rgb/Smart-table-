import React, { useState, useEffect } from 'react';
import { Sliders, Cloud, Image as ImageIcon, Trash2, Radio, Check, Info } from 'lucide-react';
import { MenuItem } from '../types';
import { DietaryIcon } from './DietaryIcon';

interface ItemStudioProps {
  item: MenuItem | null;
  onSave: (updatedItem: MenuItem) => void;
  onCancel: () => void;
}

export const ItemStudio: React.FC<ItemStudioProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState<MenuItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({ ...item });
    }
  }, [item]);

  if (!formData) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400">
        <Sliders className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm font-semibold">Select a menu item to edit in Studio</p>
      </div>
    );
  }

  const handleToggleAllergen = (flag: string) => {
    setFormData((prev) => {
      if (!prev) return null;
      const exists = prev.allergens.includes(flag);
      const updated = exists
        ? prev.allergens.filter((a) => a !== flag)
        : [...prev.allergens, flag];
      return { ...prev, allergens: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setIsSaving(true);
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }, 300);
  };

  const allergenOptions = ['Dairy', 'Nuts', 'Gluten', 'Shellfish', 'Soy', 'Vegan'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0f766e] flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 leading-tight">
              Item Studio
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              Live sync to Guest Mobile Menu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-[#15803d] text-xs font-bold rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#15803d] animate-pulse" />
          <span>Auto-Saving</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Food Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Food Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 text-xs font-semibold text-slate-900 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0f766e] focus:bg-white transition-colors"
            required
          />
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as MenuItem['category'],
                })
              }
              className="w-full px-3 py-2 text-xs font-semibold text-slate-900 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0f766e] focus:bg-white transition-colors"
            >
              <option value="Starters">Starters</option>
              <option value="Main Course">Main Course</option>
              <option value="Wood-fired Pizza">Wood-fired Pizza</option>
              <option value="Gourmet Burgers">Gourmet Burgers</option>
              <option value="Artisanal Beverages">Artisanal Beverages</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Price (USD $) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">
                $
              </span>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                }
                className="w-full pl-6 pr-3 py-2 text-xs font-bold text-slate-900 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0f766e] focus:bg-white transition-colors tabular-nums"
                required
              />
            </div>
          </div>
        </div>

        {/* Dietary Nature (Veg / Non-Veg) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Dietary Nature
          </label>
          <div className="flex items-center gap-3">
            <label
              onClick={() => setFormData({ ...formData, dietary: 'vegetarian' })}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                formData.dietary === 'vegetarian'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-2xs'
                  : 'border-slate-200 bg-[#f9f9fc] text-slate-600 hover:bg-slate-100'
              }`}
            >
              <DietaryIcon type="vegetarian" />
              <span>Vegetarian</span>
            </label>

            <label
              onClick={() => setFormData({ ...formData, dietary: 'non-veg' })}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                formData.dietary === 'non-veg'
                  ? 'border-red-600 bg-red-50 text-red-900 shadow-2xs'
                  : 'border-slate-200 bg-[#f9f9fc] text-slate-600 hover:bg-slate-100'
              }`}
            >
              <DietaryIcon type="non-veg" />
              <span>Non-Veg</span>
            </label>
          </div>
        </div>

        {/* Culinary Description */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700">
              Culinary Description
            </label>
            <span className="text-[11px] font-mono text-slate-400">
              {formData.description.length}/250
            </span>
          </div>
          <textarea
            rows={3}
            maxLength={250}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3 py-2 text-xs text-slate-800 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0f766e] focus:bg-white transition-colors leading-relaxed"
          />
        </div>

        {/* Allergens & Dietary Flags */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Allergens & Dietary Flags
          </label>
          <div className="flex flex-wrap gap-1.5">
            {allergenOptions.map((opt) => {
              const active = formData.allergens.includes(opt);
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleToggleAllergen(opt)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                    active
                      ? 'bg-amber-100/90 text-amber-900 border border-amber-300'
                      : 'bg-[#f3f3f6] text-slate-600 border border-transparent hover:bg-slate-200/80'
                  }`}
                >
                  {active && <Check className="w-3 h-3 text-amber-700" />}
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gastronomy Photography */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Gastronomy Photography
          </label>
          <div className="flex items-center gap-3 p-2 bg-[#f9f9fc] border border-slate-200 rounded-xl">
            <img
              src={formData.image}
              alt={formData.name}
              className="w-12 h-12 rounded-lg object-cover border border-slate-200"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-800 truncate">
                {formData.fileDetails || 'dish-photo-artisan.webp'}
              </div>
              <button
                type="button"
                onClick={() => {
                  alert('Photo manager is synced with the gastronomy media library.');
                }}
                className="text-[11px] font-semibold text-[#0f766e] hover:underline"
              >
                Replace Photo
              </button>
            </div>
            <button
              type="button"
              className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
              title="Delete Photo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live sync note */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2.5 text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            Changes reflect immediately on guest phones without page refresh via the websocket channel.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-[0.98]"
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>{justSaved ? 'Saved to Live Menu!' : isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="py-2.5 px-4 bg-[#f3f3f6] hover:bg-slate-200/80 text-slate-700 text-xs font-bold rounded-xl transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
