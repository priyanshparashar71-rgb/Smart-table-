import React, { useState } from 'react';
import { UtensilsCrossed, ChevronDown, Bell, BellOff, Smartphone, QrCode, Store } from 'lucide-react';
import { playChime } from '../utils/audio';

interface TopNavProps {
  audioAlertsOn: boolean;
  onToggleAudioAlerts: () => void;
  onOpenGuestSimulator: () => void;
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  audioAlertsOn,
  onToggleAudioAlerts,
  onOpenGuestSimulator,
  currentLocation,
  onSelectLocation,
}) => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const locations = [
    'The Rustic Olive - Main St.',
    'The Rustic Olive - Downtown Arts',
    'The Rustic Olive - North Beach',
  ];

  const handleAudioToggle = () => {
    onToggleAudioAlerts();
    if (!audioAlertsOn) {
      playChime(true);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-6 flex items-center justify-between sticky top-0 z-40 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Left: Brand & Location */}
      <div className="flex items-center gap-6">
        {/* Brand logo lockup */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0f766e] flex items-center justify-center text-white shadow-xs">
            <QrCode className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-1">
            SmartTable <span className="text-[#0f766e]">QR</span>
          </span>
        </div>

        {/* Location selector dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
          >
            <Store className="w-3.5 h-3.5 text-[#0f766e]" />
            <span>{currentLocation}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showLocationDropdown && (
            <div className="absolute left-0 mt-1.5 w-60 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Restaurant Branch
              </div>
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    onSelectLocation(loc);
                    setShowLocationDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    loc === currentLocation ? 'text-[#0f766e] font-semibold bg-emerald-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>{loc}</span>
                  {loc === currentLocation && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Realtime Live Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50/80 border border-emerald-200/60 rounded-full text-xs font-semibold text-[#0f766e]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803d]"></span>
          </span>
          <span>Realtime Active</span>
        </div>

        {/* Audio Alerts Button */}
        <button
          onClick={handleAudioToggle}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            audioAlertsOn
              ? 'bg-amber-50/80 text-amber-900 border-amber-200 hover:bg-amber-100/80'
              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200/70'
          }`}
          title="Toggle kitchen chime alerts"
        >
          {audioAlertsOn ? (
            <>
              <Bell className="w-3.5 h-3.5 text-amber-700 animate-bounce" />
              <span>Audio Alerts On</span>
            </>
          ) : (
            <>
              <BellOff className="w-3.5 h-3.5 text-slate-500" />
              <span>Audio Muted</span>
            </>
          )}
        </button>

        {/* Interactive Guest View Preview Button */}
        <button
          onClick={onOpenGuestSimulator}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0f766e]/10 text-[#0f766e] hover:bg-[#0f766e]/20 transition-all border border-[#0f766e]/30"
          title="Simulate Guest Scanning QR code on Mobile Phone"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#0f766e]" />
          <span className="hidden md:inline">Guest QR Scan View</span>
          <span className="md:hidden">Guest</span>
        </button>

        {/* Profile Avatar & Title */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-900 leading-tight">Elena Rostova</div>
            <div className="text-[11px] font-medium text-slate-500">Floor Manager</div>
          </div>
          <img
            src="/src/assets/images/elena_avatar_1792735881809.jpg"
            alt="Elena Rostova"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-600/20 shadow-xs"
          />
        </div>
      </div>
    </header>
  );
};
