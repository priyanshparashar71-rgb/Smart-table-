import React, { useState } from 'react';
import { X, Plus, QrCode } from 'lucide-react';
import { TableItem } from '../types';

interface AddTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTable: (newTable: TableItem) => void;
  existingCount: number;
}

export const AddTableModal: React.FC<AddTableModalProps> = ({
  isOpen,
  onClose,
  onAddTable,
  existingCount,
}) => {
  const nextNum = existingCount + 1;
  const nextId = `T${nextNum < 10 ? '0' + nextNum : nextNum}`;

  const [tableId, setTableId] = useState(nextId);
  const [seats, setSeats] = useState(4);
  const [zone, setZone] = useState<'Main Dining' | 'Patio Terrace' | 'Bar Lounge'>('Main Dining');
  const [locationDetail, setLocationDetail] = useState('Main Dining Room • Center Floor');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTable: TableItem = {
      id: tableId,
      seats,
      zone,
      locationDetail,
      status: 'active',
      occupancyState: 'ready',
      stateLabel: 'Ready for Guests',
      url: `/rustic-olive?table=${tableId}`,
      guestCount: 0,
    };
    onAddTable(newTable);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0f766e] flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <h2 className="text-base font-extrabold text-slate-900">
              Add New Dining Table & QR Station
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Table Identifier (e.g. T06, T25)
            </label>
            <input
              type="text"
              value={tableId}
              onChange={(e) => setTableId(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 text-xs font-semibold text-slate-900 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0f766e]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Seat Capacity
              </label>
              <select
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-semibold text-slate-900 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0f766e]"
              >
                <option value={2}>2 Seats (Bistro)</option>
                <option value={4}>4 Seats (Standard)</option>
                <option value={6}>6 Seats (Booth)</option>
                <option value={8}>8 Seats (Family)</option>
                <option value={10}>10 Seats (Banquet)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dining Zone
              </label>
              <select
                value={zone}
                onChange={(e) =>
                  setZone(e.target.value as 'Main Dining' | 'Patio Terrace' | 'Bar Lounge')
                }
                className="w-full px-3 py-2 text-xs font-semibold text-slate-900 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0f766e]"
              >
                <option value="Main Dining">Main Dining</option>
                <option value="Patio Terrace">Patio Terrace</option>
                <option value="Bar Lounge">Bar Lounge</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Floor Location Detail
            </label>
            <input
              type="text"
              value={locationDetail}
              onChange={(e) => setLocationDetail(e.target.value)}
              placeholder="e.g. Main Dining Room • Window Bay"
              className="w-full px-3 py-2 text-xs font-semibold text-slate-900 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0f766e]"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 py-2 px-4 bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Station</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
