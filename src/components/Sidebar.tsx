import React from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ChefHat,
  QrCode,
  Bell,
  MessageSquare,
  SlidersHorizontal,
  Armchair,
} from 'lucide-react';
import { ScreenType } from '../types';

interface SidebarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  pendingKitchenCount?: number;
  pendingWaiterCallsCount?: number;
  occupancyPercent?: number;
  tablesOccupied?: number;
  totalTables?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onSelectScreen,
  pendingKitchenCount = 12,
  pendingWaiterCallsCount = 3,
  occupancyPercent = 84,
  tablesOccupied = 21,
  totalTables = 25,
}) => {
  const navItems = [
    {
      id: 'dashboard-overview' as ScreenType,
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'kitchen-kds' as ScreenType,
      label: 'Live Orders & Kitchen',
      icon: ChefHat,
      badge: pendingKitchenCount > 0 ? pendingKitchenCount : undefined,
      badgeColor: 'bg-[#fd651e] text-white',
    },
    {
      id: 'menu-management' as ScreenType,
      label: 'Menu Management',
      icon: UtensilsCrossed,
    },
    {
      id: 'tables-qr' as ScreenType,
      label: 'Tables & QR Generator',
      icon: QrCode,
    },
    {
      id: 'waiter-calls' as ScreenType,
      label: 'Waiter Calls',
      icon: Bell,
      badge: pendingWaiterCallsCount > 0 ? pendingWaiterCallsCount : undefined,
      badgeColor: 'bg-[#ba1a1a] text-white',
    },
    {
      id: 'customer-reviews' as ScreenType,
      label: 'Customer Reviews',
      icon: MessageSquare,
    },
    {
      id: 'settings' as ScreenType,
      label: 'Restaurant Settings',
      icon: SlidersHorizontal,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] sticky top-16 select-none p-4">
      <div>
        {/* Operations Core Section Header */}
        <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-3 py-2">
          Operations Core
        </div>

        {/* Navigation list */}
        <nav className="space-y-1 mt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectScreen(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-[#0f766e] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      item.badgeColor || 'bg-slate-200 text-slate-700'
                    } ${isActive ? 'ring-2 ring-white/30' : ''}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Occupancy Progress Card */}
      <div className="bg-[#f3f3f6] border border-slate-200 rounded-xl p-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
          <div className="flex items-center gap-1.5">
            <Armchair className="w-4 h-4 text-[#0f766e]" />
            <span>Occupancy: {occupancyPercent}%</span>
          </div>
          <span className="font-bold text-slate-900 tabular-nums">
            {tablesOccupied}/{totalTables}
          </span>
        </div>

        {/* Progress meter */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#0f766e] h-full rounded-full transition-all duration-500"
            style={{ width: `${occupancyPercent}%` }}
          />
        </div>
      </div>
    </aside>
  );
};
