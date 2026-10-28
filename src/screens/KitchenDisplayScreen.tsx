import React, { useState, useEffect } from 'react';
import {
  Clock,
  RotateCw,
  Bell,
  Settings,
  AlertTriangle,
  ClipboardList,
  CookingPot,
  TrendingUp,
  Sliders,
  Sparkles,
  Undo2,
} from 'lucide-react';
import { KitchenTicketData } from '../types';
import { KitchenTicket } from '../components/KitchenTicket';
import { playChime } from '../utils/audio';

interface KitchenDisplayScreenProps {
  tickets: KitchenTicketData[];
  onUpdateStatus: (ticketId: string, newStatus: KitchenTicketData['status']) => void;
  audioAlertsOn: boolean;
  onToggleAudioAlerts: () => void;
}

export const KitchenDisplayScreen: React.FC<KitchenDisplayScreenProps> = ({
  tickets,
  onUpdateStatus,
  audioAlertsOn,
  onToggleAudioAlerts,
}) => {
  const [selectedStation, setSelectedStation] = useState<string>('All Stations');
  const [touchScreenMode, setTouchScreenMode] = useState(true);
  const [lastBumpedTicket, setLastBumpedTicket] = useState<KitchenTicketData | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('23:15:24');

  // Live clock simulation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${h}:${m}:${s}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const stationFilters = [
    { label: 'All Stations', count: tickets.length },
    { label: 'Grill', count: 3 },
    { label: 'Pizza Oven', count: 2 },
    { label: 'Salad / Cold', count: 2 },
    { label: 'Fryer & Sides', count: 4 },
  ];

  const filteredTickets = tickets.filter((t) => {
    if (selectedStation === 'All Stations') return true;
    return t.stationTag.toLowerCase().includes(selectedStation.toLowerCase());
  });

  const overdueCount = tickets.filter((t) => t.status === 'overdue').length;

  const handleStatusChange = (ticketId: string, newStatus: KitchenTicketData['status']) => {
    if (newStatus === 'delivered') {
      const found = tickets.find((t) => t.id === ticketId);
      if (found) setLastBumpedTicket(found);
    }
    onUpdateStatus(ticketId, newStatus);
    if (audioAlertsOn) {
      playChime(true);
    }
  };

  const handleRecallLastBumped = () => {
    if (lastBumpedTicket) {
      onUpdateStatus(lastBumpedTicket.id, 'ready');
      setLastBumpedTicket(null);
      alert(`Recalled Order #${lastBumpedTicket.id} back to Plated/Ready pass!`);
    } else {
      alert('No recently bumped tickets in the active memory buffer.');
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Header Live Feed Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
        {/* Left: Clock & Expedite Feed */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/90 rounded-xl font-mono text-sm font-extrabold text-slate-800 tabular-nums">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{currentTime}</span>
            <span className="text-[11px] font-sans font-black text-red-600 bg-red-100/80 px-2 py-0.5 rounded">
              EXPEDITE
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <RotateCw className="w-3.5 h-3.5 text-[#0f766e] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Station Feed: <strong className="text-slate-900">Active Live Stream</strong></span>
          </div>
        </div>

        {/* Center/Right Metrics */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Active Tickets */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
            <ClipboardList className="w-4 h-4 text-[#0f766e]" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Active Tickets</div>
              <div className="text-xs font-black text-slate-900 tabular-nums">{tickets.length} Orders</div>
            </div>
          </div>

          {/* Avg Prep Time */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
            <Clock className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Prep Time</div>
              <div className="text-xs font-black text-slate-900 tabular-nums">12m <span className="text-emerald-600 text-[10px]">(-2m)</span></div>
            </div>
          </div>

          {/* Critical Overdue Alert */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-red-50 border border-red-200 rounded-xl text-red-900">
            <AlertTriangle className="w-4 h-4 text-red-600 animate-bounce" />
            <div>
              <div className="text-[10px] text-red-600 font-bold uppercase">Critical Overdue</div>
              <div className="text-xs font-black text-red-700 tabular-nums">{overdueCount} Ticket</div>
            </div>
          </div>

          {/* Audio Chime Toggle */}
          <button
            onClick={onToggleAudioAlerts}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
              audioAlertsOn
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Chime {audioAlertsOn ? 'ON' : 'OFF'}</span>
          </button>

          {/* Station Settings */}
          <button
            onClick={() => alert('Station Settings: Expediter display, auto-bump delay: 30s, font scale: 100%')}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#005c55] hover:bg-[#0f766e] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Station Settings</span>
          </button>
        </div>
      </div>

      {/* Line Filter & Throughput Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Line Filter:
          </span>
          {stationFilters.map((st) => (
            <button
              key={st.label}
              onClick={() => setSelectedStation(st.label)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedStation === st.label
                  ? 'bg-[#0f766e] text-white shadow-xs'
                  : 'bg-[#f3f3f6] text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {st.label} ({st.count})
            </button>
          ))}
        </div>

        {/* Throughput Sparkline Graphic */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-bold text-slate-500">Throughput (1h):</span>
          <svg className="w-28 h-6 stroke-[#0f766e] fill-none stroke-[2.5]" viewBox="0 0 100 24">
            <path d="M 0 18 Q 15 22 25 15 T 50 12 T 75 8 T 100 4" />
          </svg>
        </div>
      </div>

      {/* KDS 4-Column Ticket Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {filteredTickets.map((ticket) => (
          <KitchenTicket
            key={ticket.id}
            ticket={ticket}
            onUpdateStatus={handleStatusChange}
          />
        ))}

        {filteredTickets.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl p-12 border border-slate-200 text-center text-slate-500">
            <CookingPot className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <h3 className="font-bold text-base text-slate-800">All tickets cleared for this station!</h3>
            <p className="text-xs text-slate-500 mt-1">Select "All Stations" or place a new order from the Guest QR View simulator.</p>
          </div>
        )}
      </div>

      {/* Bottom Floor Runner Sync & Bump Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Runner info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0f766e] flex items-center justify-center shrink-0">
            <CookingPot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-900">
              Floor Runner Sync : Elena Rostova • Area A & B
            </div>
            <div className="text-[11px] text-slate-500">
              Tables T01–T14 assigned to Window Pass 1. Average pickup lag: 45 seconds.
            </div>
          </div>
        </div>

        {/* Right toggles */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <div
            onClick={() => setTouchScreenMode(!touchScreenMode)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#f9f9fc] border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer select-none"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                touchScreenMode ? 'bg-[#ea580c] animate-pulse' : 'bg-slate-400'
              }`}
            />
            <span>Touch Screen Mode {touchScreenMode ? 'active' : 'off'}</span>
          </div>

          <button
            onClick={handleRecallLastBumped}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-2xs active:scale-98"
          >
            <Undo2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Recall Last Bumped</span>
          </button>
        </div>
      </div>
    </div>
  );
};
