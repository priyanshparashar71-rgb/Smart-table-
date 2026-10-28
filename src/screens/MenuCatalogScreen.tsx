import React, { useState } from 'react';
import {
  UtensilsCrossed,
  LayoutGrid,
  List,
  RotateCw,
  Plus,
  Search,
  Flame,
  Zap,
  TrendingUp,
  Ban,
  Check,
} from 'lucide-react';
import { MenuItem } from '../types';
import { MenuItemCard } from '../components/MenuItemCard';
import { ItemStudio } from '../components/ItemStudio';

interface MenuCatalogScreenProps {
  menuItems: MenuItem[];
  selectedItem: MenuItem | null;
  onSelectItem: (item: MenuItem) => void;
  onSaveItem: (item: MenuItem) => void;
  onToggleStock: (item: MenuItem) => void;
  onDuplicateItem: (item: MenuItem) => void;
  onDeleteItem: (item: MenuItem) => void;
  onAddNewItem: () => void;
}

export const MenuCatalogScreen: React.FC<MenuCatalogScreenProps> = ({
  menuItems,
  selectedItem,
  onSelectItem,
  onSaveItem,
  onToggleStock,
  onDuplicateItem,
  onDeleteItem,
  onAddNewItem,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Dishes');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Filter checkboxes
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);
  const [chefSpecialsOnly, setChefSpecialsOnly] = useState(false);
  const [isBulkSyncing, setIsBulkSyncing] = useState(false);

  const categories = [
    { label: 'All Dishes', count: 48 },
    { label: 'Starters', count: 8 },
    { label: 'Main Course', count: 14 },
    { label: 'Wood-fired Pizza', count: 6 },
    { label: 'Gourmet Burgers', count: 5 },
    { label: 'Artisanal Beverages', count: 9 },
    { label: 'Desserts', count: 6 },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'All Dishes' || item.category === activeCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.allergens.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesVeg = !vegOnly || item.dietary === 'vegetarian';
    const matchesNonVeg = !nonVegOnly || item.dietary === 'non-veg';
    const matchesGlutenFree =
      !glutenFreeOnly || item.allergens.includes('Gluten-Free') || !item.allergens.includes('Gluten');
    const matchesChef = !chefSpecialsOnly || Boolean(item.isChefChoice);

    return matchesCategory && matchesSearch && matchesVeg && matchesNonVeg && matchesGlutenFree && matchesChef;
  });

  const activeCount = menuItems.filter((i) => i.inStock).length;
  const outOfStockCount = menuItems.filter((i) => !i.inStock).length;

  const handleBulkSync = () => {
    setIsBulkSyncing(true);
    setTimeout(() => {
      setIsBulkSyncing(false);
      alert('Bulk synchronized 48 dishes across all 25 active table QR terminals.');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0f766e] tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#0f766e]" />
            <span>Digital Culinary Matrix • Live on 25 QR Terminals</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Menu Catalog & Item Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Curate dishes, configure live pricing, allergens, and instantaneous floor 86-ing.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Grid / List switch */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleBulkSync}
            disabled={isBulkSyncing}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-2xs"
          >
            <RotateCw className={`w-3.5 h-3.5 text-slate-600 ${isBulkSyncing ? 'animate-spin' : ''}`} />
            <span>{isBulkSyncing ? 'Syncing...' : 'Bulk Sync'}</span>
          </button>

          <button
            onClick={onAddNewItem}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#005c55] hover:bg-[#0f766e] text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Menu Item</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#005c55] text-white shadow-xs'
                  : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Row */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish title, ingredients, SKU, allergens..."
            className="w-full pl-9 pr-3.5 py-2 text-xs font-semibold text-slate-800 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0f766e] focus:bg-white transition-colors"
          />
        </div>

        {/* Checkbox filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={(e) => {
                setVegOnly(e.target.checked);
                if (e.target.checked) setNonVegOnly(false);
              }}
              className="rounded text-[#0f766e] focus:ring-0 w-3.5 h-3.5"
            />
            <span className="w-2 h-2 rounded-full bg-[#15803d]" />
            <span>Veg Only</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
            <input
              type="checkbox"
              checked={nonVegOnly}
              onChange={(e) => {
                setNonVegOnly(e.target.checked);
                if (e.target.checked) setVegOnly(false);
              }}
              className="rounded text-[#0f766e] focus:ring-0 w-3.5 h-3.5"
            />
            <span className="w-2 h-2 rounded-full bg-[#991b1b]" />
            <span>Non-Veg</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
            <input
              type="checkbox"
              checked={glutenFreeOnly}
              onChange={(e) => setGlutenFreeOnly(e.target.checked)}
              className="rounded text-[#0f766e] focus:ring-0 w-3.5 h-3.5"
            />
            <span>Gluten-Free</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none px-2.5 py-1 rounded-lg bg-orange-50 text-[#a73a00] border border-orange-200">
            <input
              type="checkbox"
              checked={chefSpecialsOnly}
              onChange={(e) => setChefSpecialsOnly(e.target.checked)}
              className="rounded text-[#ea580c] focus:ring-0 w-3.5 h-3.5"
            />
            <Flame className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>Chef Specials</span>
          </label>
        </div>
      </div>

      {/* Main 2-Column Split: Dish Cards List & Item Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Menu Items */}
        <div className={`lg:col-span-8 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}`}>
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              isSelected={selectedItem?.id === item.id}
              onSelect={onSelectItem}
              onToggleStock={onToggleStock}
              onDuplicate={onDuplicateItem}
              onDelete={onDeleteItem}
            />
          ))}

          {filteredItems.length === 0 && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500">
              No menu items match your search or dietary filter.
            </div>
          )}
        </div>

        {/* Right Column: Item Studio Form */}
        <div className="lg:col-span-4 sticky top-20">
          <ItemStudio
            item={selectedItem}
            onSave={onSaveItem}
            onCancel={() => {}}
          />
        </div>
      </div>

      {/* Bottom Summary Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f766e] flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Active Menu Items
            </div>
            <div className="text-xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {activeCount} / {menuItems.length}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ea580c] flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Avg Order Velocity
            </div>
            <div className="text-xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              3.8 min/ticket
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#15803d] flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Chef Specials Revenue
            </div>
            <div className="text-xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              42.8%
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Ban className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Currently 86'd
            </div>
            <div className="text-xl font-extrabold text-red-600 tracking-tight">
              {outOfStockCount > 0 ? `${outOfStockCount} Item (Wagyu)` : 'None'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
