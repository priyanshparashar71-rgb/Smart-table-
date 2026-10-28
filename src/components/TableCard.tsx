import React from 'react';
import {
  MapPin,
  Eye,
  Download,
  RotateCw,
  Edit2,
  Bell,
  Check,
  Power,
  Sparkles,
} from 'lucide-react';
import { TableItem } from '../types';
import { TableQRCode } from './TableQRCode';

interface TableCardProps {
  table: TableItem;
  isSelected: boolean;
  onSelect: (table: TableItem) => void;
  onDownloadQR: (table: TableItem) => void;
  onSync: (table: TableItem) => void;
  onEdit: (table: TableItem) => void;
  onAcknowledgeAlert?: (table: TableItem) => void;
  onToggleStatus?: (table: TableItem) => void;
}

export const TableCard: React.FC<TableCardProps> = ({
  table,
  isSelected,
  onSelect,
  onDownloadQR,
  onSync,
  onEdit,
  onAcknowledgeAlert,
  onToggleStatus,
}) => {
  return (
    <div
      onClick={() => onSelect(table)}
      className={`relative bg-white rounded-2xl p-4 sm:p-5 transition-all cursor-pointer border ${
        isSelected
          ? 'border-2 border-[#0f766e] shadow-md ring-2 ring-[#0f766e]/10'
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      {/* Top right "Selected for Stand View" pill when selected */}
      {isSelected && (
        <div className="absolute -top-3 right-6 bg-[#0f766e] text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1.5 z-10">
          <Sparkles className="w-3 h-3 text-[#a3faef]" />
          <span>Selected for Stand View</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: QR + Table Info */}
        <div className="flex items-start gap-4">
          {/* Mini QR code */}
          <TableQRCode
            tableId={table.id}
            url={table.url}
            size={72}
          />

          <div className="space-y-1.5">
            {/* Title, Seats, Status */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-extrabold text-slate-900 tracking-tight">
                Table {table.id}
              </span>

              {/* Seats badge */}
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md">
                {table.label || `${table.seats} Seats`}
              </span>

              {/* Active / Inactive badge */}
              {table.status === 'active' ? (
                <span className="px-2 py-0.5 bg-emerald-50 text-[#15803d] text-xs font-bold rounded-md">
                  Active
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-md">
                  Inactive / Reserved
                </span>
              )}
            </div>

            {/* Location row */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{table.locationDetail}</span>
            </div>

            {/* State Badge / Alert */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              {table.hasCallAlert ? (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-lg border border-red-200">
                  <Bell className="w-3.5 h-3.5 text-red-600 animate-bounce" />
                  <span>{table.stateLabel}</span>
                </div>
              ) : table.occupancyState === 'live-session' ? (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100/80 text-emerald-900 text-xs font-bold rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>{table.stateLabel}</span>
                </div>
              ) : table.occupancyState === 'occupied' || table.occupancyState === 'bill-requested' ? (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-900 text-xs font-bold rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{table.stateLabel}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg">
                  <span>{table.stateLabel}</span>
                </div>
              )}

              {/* URL slug */}
              <span className="text-[11px] font-mono text-slate-400 truncate max-w-[150px]">
                {table.url}
              </span>
            </div>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          {table.hasCallAlert && onAcknowledgeAlert ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAcknowledgeAlert(table);
              }}
              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
              title="Acknowledge waiter alert"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : null}

          {table.status === 'inactive' && onToggleStatus ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleStatus(table);
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#0f766e] text-xs font-bold rounded-xl border border-emerald-200 transition-colors"
            >
              <Power className="w-3.5 h-3.5 text-[#0f766e]" />
              <span>Activate Table</span>
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(table);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                isSelected
                  ? 'bg-[#0f766e] text-white shadow-xs'
                  : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isSelected ? 'Active Preview' : 'Stand Preview'}</span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownloadQR(table);
            }}
            className="p-2 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 transition-colors"
            title="Download QR Code PNG"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSync(table);
            }}
            className="p-2 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 transition-colors"
            title="Force Realtime Sync"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(table);
            }}
            className="p-2 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 transition-colors"
            title="Edit Table Configuration"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
