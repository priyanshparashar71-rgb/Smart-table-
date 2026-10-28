import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Bell,
  Utensils,
  Check,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { MenuItem, TableItem } from '../types';
import { DietaryIcon } from './DietaryIcon';

interface GuestMobilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: TableItem;
  menuItems: MenuItem[];
  onPlaceOrder: (tableId: string, items: { item: MenuItem; count: number }[]) => void;
  onCallWaiter: (tableId: string, type: 'water' | 'bill' | 'server') => void;
}

export const GuestMobilePreviewModal: React.FC<GuestMobilePreviewModalProps> = ({
  isOpen,
  onClose,
  table,
  menuItems,
  onPlaceOrder,
  onCallWaiter,
}) => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [callAlertSent, setCallAlertSent] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Starters', 'Main Course', 'Wood-fired Pizza', 'Gourmet Burgers', 'Artisanal Beverages'];

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter((i) => i.category === activeCategory);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[id] > 1) {
        copy[id] -= 1;
      } else {
        delete copy[id];
      }
      return copy;
    });
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalCartPrice = Object.entries(cart).reduce((sum, [id, count]) => {
    const item = menuItems.find((i) => i.id === id);
    return sum + (item ? item.price * count : 0);
  }, 0);

  const handleSendOrder = () => {
    if (totalCartCount === 0) return;
    const orderList = Object.entries(cart).map(([id, count]) => ({
      item: menuItems.find((i) => i.id === id)!,
      count,
    }));
    onPlaceOrder(table.id, orderList);
    setOrderSuccess(true);
    setCart({});
    setTimeout(() => {
      setOrderSuccess(false);
    }, 3000);
  };

  const handleTriggerCall = (type: 'water' | 'bill' | 'server') => {
    onCallWaiter(table.id, type);
    setCallAlertSent(type);
    setTimeout(() => setCallAlertSent(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Mobile Phone Mockup Chassis */}
      <div className="relative w-full max-w-[390px] h-[780px] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-700 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Phone Speaker & Camera Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-800 rounded-full z-30" />

        {/* Phone Screen Canvas */}
        <div className="relative flex-1 bg-[#faf9f6] rounded-[38px] overflow-hidden flex flex-col">
          {/* Top Mobile Status Header */}
          <div className="bg-[#0f766e] text-white pt-7 pb-4 px-4 text-center shrink-0">
            <div className="flex items-center justify-between text-[11px] font-bold text-emerald-100 mb-1">
              <span>9:41</span>
              <span>Table {table.id}</span>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-full text-white"
                title="Close simulator"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-emerald-200" />
              <h1 className="font-extrabold text-base tracking-tight">The Rustic Olive</h1>
            </div>
            <p className="text-[10px] text-emerald-100/90 font-medium">
              Artisanal Hearth & Vine • {table.locationDetail}
            </p>

            {/* Quick Waiter Call Pills */}
            <div className="flex items-center justify-center gap-2 mt-3 pt-2 border-t border-white/10">
              <button
                onClick={() => handleTriggerCall('water')}
                className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white text-[10px] font-bold rounded-full transition-all flex items-center gap-1 active:scale-95"
              >
                <Bell className="w-2.5 h-2.5 text-cyan-200" />
                <span>Water Refill</span>
              </button>

              <button
                onClick={() => handleTriggerCall('server')}
                className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white text-[10px] font-bold rounded-full transition-all flex items-center gap-1 active:scale-95"
              >
                <Bell className="w-2.5 h-2.5 text-amber-200" />
                <span>Call Waiter</span>
              </button>

              <button
                onClick={() => handleTriggerCall('bill')}
                className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white text-[10px] font-bold rounded-full transition-all flex items-center gap-1 active:scale-95"
              >
                <Bell className="w-2.5 h-2.5 text-emerald-200" />
                <span>Request Bill</span>
              </button>
            </div>

            {callAlertSent && (
              <div className="mt-2 text-[10px] font-bold bg-white text-[#0f766e] py-1 px-2 rounded-lg animate-fade-in shadow-xs">
                ✓ Floor runner notified for Table {table.id}
              </div>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 px-3 py-2.5 bg-white border-b border-slate-200/80 overflow-x-auto no-scrollbar shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#0f766e] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dish List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {orderSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-900 space-y-1 animate-in zoom-in-95">
                <div className="font-extrabold text-xs">🎉 Order Placed to Kitchen!</div>
                <div className="text-[10px] text-emerald-700">
                  Kitchen display and table state updated in real-time.
                </div>
              </div>
            )}

            {filteredItems.map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-2xs flex gap-3 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <DietaryIcon type={item.dietary} />
                      <span className="font-bold text-xs text-slate-900 truncate">
                        {item.name}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.description}
                    </div>

                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs font-extrabold text-[#0f766e] tabular-nums">
                        ${item.price.toFixed(2)}
                      </span>

                      {!item.inStock ? (
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                          Sold Out (86)
                        </span>
                      ) : qty > 0 ? (
                        <div className="flex items-center gap-2 bg-[#0f766e] text-white rounded-lg px-2 py-0.5 text-xs font-bold">
                          <button onClick={() => removeFromCart(item.id)}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="tabular-nums">{qty}</span>
                          <button onClick={() => addToCart(item.id)}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item.id)}
                          className="px-2.5 py-1 bg-[#ea580c] hover:bg-[#c2410c] text-white text-[11px] font-bold rounded-lg transition-all active:scale-95"
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Bottom Cart Bar */}
          {totalCartCount > 0 && (
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
              <button
                onClick={handleSendOrder}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-[#0f766e] hover:bg-[#115e59] text-white rounded-xl font-extrabold text-xs shadow-md active:scale-98 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white text-[#0f766e] flex items-center justify-center text-[10px] font-black">
                    {totalCartCount}
                  </span>
                  <span>Send Order to Kitchen</span>
                </div>
                <span className="tabular-nums">${totalCartPrice.toFixed(2)}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
