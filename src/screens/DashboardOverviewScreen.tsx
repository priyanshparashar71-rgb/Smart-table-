import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  Sparkles,
  QrCode,
  Flame,
  Utensils,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import { TableItem, MenuItem } from '../types';

interface DashboardOverviewScreenProps {
  tables: TableItem[];
  menuItems: MenuItem[];
  onNavigate: (screen: any) => void;
}

export const DashboardOverviewScreen: React.FC<DashboardOverviewScreenProps> = ({
  tables,
  menuItems,
  onNavigate,
}) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-[#0f766e] tracking-wider uppercase mb-1">
            Realtime Shift Metrics
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dinner Service Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            The Rustic Olive — Main St. • Service Shift: Evening (17:00 – 23:30)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('kitchen-kds')}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-[#0f766e] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#115e59] transition-all"
          >
            <span>Open Kitchen Display</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Hero KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Today's QR Sales
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1 tabular-nums">
            $4,892.50
          </div>
          <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24.6% vs last Thursday</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total QR Scans
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1 tabular-nums">
            412 Sessions
          </div>
          <div className="text-xs font-semibold text-[#0f766e] flex items-center gap-1 mt-1">
            <span>Average 3.4 diners/table</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Avg Turn Time
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1 tabular-nums">
            46 mins
          </div>
          <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
            <span>12 mins faster than paper menus</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Current Floor Occupancy
          </div>
          <div className="text-2xl font-extrabold text-[#0f766e] tracking-tight mt-1 tabular-nums">
            84% (21/25 Tables)
          </div>
          <div className="text-xs font-semibold text-slate-500 mt-1">
            4 tables available for walk-in
          </div>
        </div>
      </div>

      {/* Middle Grid: Live Zone Status & Top Sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Zone Heatmap & Tables Snapshot */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900">
              Live Dining Zones
            </h2>
            <button
              onClick={() => onNavigate('tables-qr')}
              className="text-xs font-bold text-[#0f766e] hover:underline"
            >
              Manage QR Stands →
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Main Dining Room', tables: 12, occupied: 11, diners: 42, color: 'bg-emerald-500' },
              { name: 'Patio Terrace Garden', tables: 8, occupied: 7, diners: 20, color: 'bg-[#ea580c]' },
              { name: 'Bar Lounge & High Tops', tables: 5, occupied: 3, diners: 6, color: 'bg-teal-600' },
            ].map((z) => (
              <div key={z.name} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1.5">
                  <span>{z.name}</span>
                  <span className="text-slate-500 font-normal">
                    {z.occupied}/{z.tables} Tables • {z.diners} Diners
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${z.color} h-full rounded-full transition-all`}
                    style={{ width: `${(z.occupied / z.tables) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 cols: Chef Specials & Top Velocity */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900">
              Top Selling QR Dishes
            </h2>
            <button
              onClick={() => onNavigate('menu-management')}
              className="text-xs font-bold text-[#0f766e] hover:underline"
            >
              Catalog →
            </button>
          </div>

          <div className="space-y-3">
            {menuItems.slice(0, 4).map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <span className="w-6 text-center font-extrabold text-xs text-slate-400">
                  #{idx + 1}
                </span>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-slate-900 truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {item.soldThisWeek} orders • ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="text-xs font-black text-[#0f766e]">
                  ${(item.price * item.soldThisWeek).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
