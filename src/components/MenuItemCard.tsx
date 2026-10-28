import React from 'react';
import { Flame, TrendingUp, Edit2, Copy, Trash2, AlertCircle } from 'lucide-react';
import { MenuItem } from '../types';
import { DietaryIcon } from './DietaryIcon';

interface MenuItemCardProps {
  item: MenuItem;
  isSelected: boolean;
  onSelect: (item: MenuItem) => void;
  onToggleStock: (item: MenuItem) => void;
  onDuplicate: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  isSelected,
  onSelect,
  onToggleStock,
  onDuplicate,
  onDelete,
}) => {
  return (
    <div
      onClick={() => onSelect(item)}
      className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer ${
        isSelected
          ? 'border-2 border-[#0f766e] shadow-md ring-2 ring-[#0f766e]/10'
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Dish Thumbnail */}
        <div className="relative w-full sm:w-36 h-36 rounded-xl overflow-hidden shrink-0 bg-slate-100">
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
              !item.inStock ? 'grayscale contrast-125' : ''
            }`}
          />

          {/* Category overlay pill at bottom left */}
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold rounded-md">
            {item.category}
          </div>

          {/* Out of Stock (86) overlay */}
          {!item.inStock && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-2 text-center">
              <span className="px-2.5 py-1 bg-red-600/95 text-white font-black text-xs rounded-md shadow-md tracking-wider">
                OUT OF STOCK (86)
              </span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="flex-1 space-y-2 min-w-0 w-full">
          {/* Top Title & Price */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DietaryIcon type={item.dietary} showLabel={true} />

                {item.isChefChoice && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#ea580c] text-white text-[11px] font-bold rounded-md shadow-2xs">
                    <Flame className="w-3 h-3" />
                    <span>Chef's Choice</span>
                  </span>
                )}
              </div>

              <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                {item.name}
              </h3>
            </div>

            {/* Price & Sold Stats */}
            <div className="text-right shrink-0">
              <div className="text-xl font-extrabold text-[#005c55] tracking-tight tabular-nums">
                ${item.price.toFixed(2)}
              </div>
              <div className="text-[11px] font-semibold text-slate-500 mt-0.5 flex items-center justify-end gap-1">
                {item.inStock ? (
                  <>
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span>{item.soldThisWeek} sold this wk</span>
                  </>
                ) : (
                  <span className="text-red-600 font-bold">
                    {item.stockNote || 'Depleted Kitchen Stock'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Badges / Allergens */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {item.allergens.map((alg) => (
              <span
                key={alg}
                className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-medium rounded-md"
              >
                {alg}
              </span>
            ))}

            {item.signaturePairing && (
              <span className="px-2 py-0.5 bg-amber-50 text-amber-900 text-[11px] font-semibold rounded-md border border-amber-200">
                Signature Pairing: {item.signaturePairing}
              </span>
            )}

            {!item.inStock && (
              <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[11px] font-bold rounded-md border border-red-200 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-red-600" />
                <span>Flagged by Expediter</span>
              </span>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            {/* Toggle Switch */}
            <div className="flex items-center gap-3">
              <label
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStock(item);
                }}
                className="flex items-center gap-2 cursor-pointer group select-none"
              >
                <div
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ${
                    item.inStock ? 'bg-[#0f766e]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      item.inStock ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-bold ${
                    item.inStock ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {item.inStock ? 'In Stock (QR Active)' : 'Hidden from Guests'}
                </span>
              </label>

              {!item.inStock && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStock(item);
                  }}
                  className="px-3 py-1 bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold rounded-lg transition-all"
                >
                  Mark Available Now
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(item);
                }}
                className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                title="Edit item in studio"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate(item);
                }}
                className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                title="Duplicate dish"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item);
                }}
                className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove dish"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
