import React, { useState } from 'react';
import {
  QrCode,
  Printer,
  Download,
  Plus,
  Search,
  Armchair,
  Users,
  Smartphone,
  Bell,
  Sparkles,
} from 'lucide-react';
import { TableItem } from '../types';
import { TableCard } from '../components/TableCard';
import { AcrylicStandPreview } from '../components/AcrylicStandPreview';
import { BulkPrintModal } from '../components/BulkPrintModal';
import { AddTableModal } from '../components/AddTableModal';

interface TablesQRScreenProps {
  tables: TableItem[];
  selectedTable: TableItem;
  onSelectTable: (table: TableItem) => void;
  onAddTable: (table: TableItem) => void;
  onAcknowledgeAlert: (table: TableItem) => void;
  onToggleStatus: (table: TableItem) => void;
}

export const TablesQRScreen: React.FC<TablesQRScreenProps> = ({
  tables,
  selectedTable,
  onSelectTable,
  onAddTable,
  onAcknowledgeAlert,
  onToggleStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All Zones');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isBulkPrintOpen, setIsBulkPrintOpen] = useState(false);
  const [isAddTableOpen, setIsAddTableOpen] = useState(false);

  // Filter calculations
  const mainDiningCount = tables.filter((t) => t.zone === 'Main Dining').length;
  const patioCount = tables.filter((t) => t.zone === 'Patio Terrace').length;
  const barCount = tables.filter((t) => t.zone === 'Bar Lounge').length;
  const activeCount = tables.filter((t) => t.status === 'active').length;
  const inactiveCount = tables.filter((t) => t.status === 'inactive').length;
  const pendingCallsCount = tables.filter((t) => t.hasCallAlert).length;

  const filteredTables = tables.filter((table) => {
    const matchesSearch =
      table.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.locationDetail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.zone.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesZone =
      selectedZone === 'All Zones' || table.zone === selectedZone;

    const matchesStatus =
      statusFilter === 'all' || table.status === statusFilter;

    return matchesSearch && matchesZone && matchesStatus;
  });

  const handleDownloadQR = (table: TableItem) => {
    alert(`Downloading high-resolution vector QR code SVG/PNG for ${table.id}`);
  };

  const handleSyncTable = (table: TableItem) => {
    alert(`Realtime sync ping sent to Table ${table.id} websocket channel.`);
  };

  const handleEditTable = (table: TableItem) => {
    alert(`Opening configuration modal for Table ${table.id}`);
  };

  const handleExportVector = (table: TableItem) => {
    alert(`Exported SVG vector graphic for Table ${table.id} stand.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0f766e] tracking-wider uppercase mb-1">
            <QrCode className="w-3.5 h-3.5" />
            <span>Station Asset Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Restaurant Tables & QR Station
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Manage 24 tables across Main Dining, Patio, and Bar. Print table stands & download high-res vector QR codes with dynamic table-state sync.
          </p>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsBulkPrintOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Bulk Print Table Stands</span>
          </button>

          <button
            onClick={() => setIsBulkPrintOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Download All QR Sheet (PDF)</span>
          </button>

          <button
            onClick={() => setIsAddTableOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#005c55] hover:bg-[#0f766e] text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Table</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Connected Tables
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {tables.length} / {tables.length}
            </div>
            <div className="text-[11px] font-semibold text-[#15803d] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
              <span>100% Synced</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0f766e] flex items-center justify-center">
            <Armchair className="w-6 h-6 stroke-[2]" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Active Diners Now
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              68 Guests
            </div>
            <div className="text-[11px] font-medium text-slate-500">
              Avg stay: 46 mins
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#ea580c] flex items-center justify-center">
            <Users className="w-6 h-6 stroke-[2]" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              QR Digital Scans Today
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              412 Scans
            </div>
            <div className="text-[11px] font-semibold text-[#0f766e]">
              ↗ +18% vs yesterday
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Smartphone className="w-6 h-6 stroke-[2]" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Pending Call Alerts
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#ba1a1a] tracking-tight tabular-nums">
              {pendingCallsCount > 0 ? `${pendingCallsCount} Table` : '0 Tables'}
            </div>
            <div className="text-[11px] font-bold text-[#ba1a1a] truncate max-w-[140px]">
              {pendingCallsCount > 0 ? 'Table T02 (Water Refill)' : 'All calls answered'}
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#ba1a1a] flex items-center justify-center">
            <Bell className="w-6 h-6 stroke-[2]" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by table # or zone (e.g., T05, ..."
            className="w-full pl-9 pr-3.5 py-2 text-xs font-semibold text-slate-800 bg-[#f9f9fc] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0f766e] focus:bg-white transition-colors"
          />
        </div>

        {/* Zone & Status Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Zone filters */}
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className="text-slate-400 text-[11px] uppercase mr-1">Zone:</span>
            {[
              { id: 'All Zones', label: `All Zones (${tables.length})` },
              { id: 'Main Dining', label: `Main Dining (${mainDiningCount})` },
              { id: 'Patio Terrace', label: `Patio Terrace (${patioCount})` },
              { id: 'Bar Lounge', label: `Bar Lounge (${barCount})` },
            ].map((z) => (
              <button
                key={z.id}
                onClick={() => setSelectedZone(z.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedZone === z.id
                    ? 'bg-[#0f766e] text-white shadow-xs'
                    : 'bg-[#f3f3f6] text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-200 hidden lg:block" />

          {/* Status filters */}
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className="text-slate-400 text-[11px] uppercase mr-1">Status:</span>
            <button
              onClick={() => setStatusFilter(statusFilter === 'active' ? 'all' : 'active')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                statusFilter === 'active'
                  ? 'bg-emerald-100 text-[#00504a] border border-emerald-300'
                  : 'bg-[#f3f3f6] text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter(statusFilter === 'inactive' ? 'all' : 'inactive')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                statusFilter === 'inactive'
                  ? 'bg-slate-800 text-white'
                  : 'bg-[#f3f3f6] text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              Inactive ({inactiveCount})
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Table List Cards */}
        <div className="lg:col-span-8 space-y-3.5">
          {filteredTables.map((table) => (
            <TableCard
              key={table.id}
              table={table}
              isSelected={selectedTable.id === table.id}
              onSelect={onSelectTable}
              onDownloadQR={handleDownloadQR}
              onSync={handleSyncTable}
              onEdit={handleEditTable}
              onAcknowledgeAlert={onAcknowledgeAlert}
              onToggleStatus={onToggleStatus}
            />
          ))}

          {filteredTables.length === 0 && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500">
              No dining tables match the current filter criteria.
            </div>
          )}
        </div>

        {/* Right Column: Acrylic Stand Preview */}
        <div className="lg:col-span-4 sticky top-20">
          <AcrylicStandPreview
            table={selectedTable}
            onPrintStand={() => setIsBulkPrintOpen(true)}
            onExportVector={handleExportVector}
          />
        </div>
      </div>

      {/* Modals */}
      <BulkPrintModal
        isOpen={isBulkPrintOpen}
        onClose={() => setIsBulkPrintOpen(false)}
        tables={tables}
      />

      <AddTableModal
        isOpen={isAddTableOpen}
        onClose={() => setIsAddTableOpen(false)}
        onAddTable={onAddTable}
        existingCount={tables.length}
      />
    </div>
  );
};
