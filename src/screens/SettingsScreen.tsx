import React, { useState } from 'react';
import { Sliders, Save, Store, Bell, Printer, Wifi, Shield } from 'lucide-react';

interface SettingsScreenProps {
  restaurantName: string;
  onSaveRestaurantName: (name: string) => void;
  audioAlertsOn: boolean;
  onToggleAudioAlerts: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  restaurantName,
  onSaveRestaurantName,
  audioAlertsOn,
  onToggleAudioAlerts,
}) => {
  const [name, setName] = useState(restaurantName);
  const [tagline, setTagline] = useState('ARTISANAL HEARTH & VINE');
  const [standFormat, setStandFormat] = useState('a6');
  const [wifiName, setWifiName] = useState('RusticOlive_Guest');
  const [guestOrderingEnabled, setGuestOrderingEnabled] = useState(true);
  const [waiterCallChime, setWaiterCallChime] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveRestaurantName(name);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <div className="text-xs font-bold text-[#0f766e] tracking-wider uppercase mb-1">
          System Configuration
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Restaurant & Station Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Brand display, acrylic stand print templates, and live table ordering policies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand Information */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Store className="w-5 h-5 text-[#0f766e]" />
            <h2 className="font-extrabold text-base text-slate-900">
              Brand & Table Stand Printing
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Restaurant Trade Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-semibold text-slate-900 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:border-[#0f766e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Culinary Tagline (printed on stand)
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-semibold text-slate-900 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:border-[#0f766e] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Table Stand Paper Size
              </label>
              <select
                value={standFormat}
                onChange={(e) => setStandFormat(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-semibold text-slate-900 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:border-[#0f766e] focus:outline-none"
              >
                <option value="a6">A6 Portrait (105 × 148 mm)</option>
                <option value="4x6">4" × 6" Tent Stand</option>
                <option value="5x7">5" × 7" Double Sided</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Guest Wi-Fi SSID
              </label>
              <input
                type="text"
                value={wifiName}
                onChange={(e) => setWifiName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-semibold text-slate-900 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:border-[#0f766e] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Operational Policies */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Bell className="w-5 h-5 text-[#0f766e]" />
            <h2 className="font-extrabold text-base text-slate-900">
              Kitchen & Waiter Audio Notifications
            </h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Audio Chimes on Overdue Tickets & Waiter Calls
                </div>
                <div className="text-[11px] text-slate-500">
                  Plays restaurant acoustic chime through manager speaker when action is required
                </div>
              </div>
              <input
                type="checkbox"
                checked={audioAlertsOn}
                onChange={onToggleAudioAlerts}
                className="w-4 h-4 rounded text-[#0f766e] focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Enable Direct Guest Mobile Self-Ordering
                </div>
                <div className="text-[11px] text-slate-500">
                  Allows diners to submit orders directly to kitchen tickets without server approval
                </div>
              </div>
              <input
                type="checkbox"
                checked={guestOrderingEnabled}
                onChange={(e) => setGuestOrderingEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-[#0f766e] focus:ring-0"
              />
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {savedSuccess && (
            <span className="text-xs font-bold text-[#15803d]">
              ✓ Settings saved successfully
            </span>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 py-2.5 px-6 bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
