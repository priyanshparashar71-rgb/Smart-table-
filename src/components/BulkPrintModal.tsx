import React from 'react';
import { X, Printer, Download, Sparkles, Utensils } from 'lucide-react';
import { TableItem } from '../types';
import { TableQRCode } from './TableQRCode';

interface BulkPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  tables: TableItem[];
}

export const BulkPrintModal: React.FC<BulkPrintModalProps> = ({
  isOpen,
  onClose,
  tables,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0f766e] flex items-center justify-center">
              <Printer className="w-5 h-5 text-[#0f766e]" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                Bulk Print Table Stands & Vector QR Sheet
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Print ready A6 format (4" x 6") with crop marks and table-level sync
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print All ({tables.length} Stands)</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Sheet - 3 Columns of Stands */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#f9f9fc] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tables.map((table) => (
            <div
              key={table.id}
              className="bg-white rounded-2xl border-2 border-slate-200 p-5 text-center shadow-xs flex flex-col items-center justify-between"
            >
              <div className="w-full">
                <div className="flex items-center justify-center gap-1.5 text-[#0f766e] mb-1">
                  <Utensils className="w-3.5 h-3.5" />
                  <span className="font-extrabold text-sm tracking-tight text-slate-900">
                    The Rustic Olive
                  </span>
                </div>
                <div className="text-[8px] font-bold tracking-[0.18em] text-slate-400 uppercase mb-2">
                  Artisanal Hearth & Vine
                </div>

                <div className="inline-block px-3 py-0.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-full mb-3">
                  Table {table.id.replace(/^T0?/, '') || table.id}
                </div>

                <div className="flex justify-center mb-3">
                  <TableQRCode
                    tableId={table.id}
                    url={table.url}
                    size={120}
                  />
                </div>

                <div className="text-xs font-extrabold text-slate-900 leading-snug">
                  Scan to View Menu, Order & Pay
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5">
                  Apple & Google Pay Supported
                </div>
              </div>

              <div className="w-full pt-3 mt-3 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-between">
                <span>{table.zone}</span>
                <span className="font-mono text-slate-400">{table.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
