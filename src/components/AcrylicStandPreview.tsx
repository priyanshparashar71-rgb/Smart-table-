import React, { useState } from 'react';
import { Printer, Download, Utensils, Box, Check, Sparkles } from 'lucide-react';
import { TableItem } from '../types';
import { TableQRCode } from './TableQRCode';

interface AcrylicStandPreviewProps {
  table: TableItem;
  onPrintStand: (table: TableItem) => void;
  onExportVector: (table: TableItem) => void;
}

export const AcrylicStandPreview: React.FC<AcrylicStandPreviewProps> = ({
  table,
  onPrintStand,
  onExportVector,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.origin + table.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-teal-50 text-[#0f766e] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#0f766e]" />
          </div>
          <h2 className="text-base font-bold text-slate-900">
            Acrylic Stand Preview
          </h2>
        </div>
        <div className="px-3 py-1 bg-[#a3faef]/60 text-[#00504a] text-xs font-extrabold rounded-lg tracking-wide">
          Table {table.id.replace(/^T0?/, '') || table.id}
        </div>
      </div>

      {/* Stand Mockup Card */}
      <div className="relative mx-auto max-w-[280px] bg-gradient-to-b from-[#f3f4f6]/60 via-white to-[#f9fafb] rounded-2xl border-2 border-slate-300/80 shadow-[0_12px_32px_rgba(15,118,110,0.08)] p-5 text-center overflow-hidden">
        {/* Top subtle acrylic shine line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0f766e]/40 to-transparent" />

        {/* Brand header on acrylic */}
        <div className="flex items-center justify-center gap-1.5 text-[#0f766e] mb-1">
          <Utensils className="w-4 h-4" />
          <span className="font-extrabold text-base tracking-tight text-slate-900">
            The Rustic Olive
          </span>
        </div>
        <div className="text-[9px] font-bold tracking-[0.18em] text-slate-400 uppercase mb-3">
          Artisanal Hearth & Vine
        </div>

        {/* Table pill badge */}
        <div className="inline-block px-4 py-1 bg-slate-100/90 text-slate-800 text-xs font-bold rounded-full mb-3 shadow-2xs">
          Table {table.id.replace(/^T0?/, '') || table.id}
        </div>

        {/* High-res vector QR Code */}
        <div className="flex justify-center mb-3">
          <TableQRCode
            tableId={table.id}
            url={table.url}
            isDetailedStand={true}
          />
        </div>

        {/* Scan call to action */}
        <div className="text-sm font-extrabold text-slate-900 leading-snug tracking-tight">
          Scan to View Menu, <br />
          Order & Pay
        </div>
        <div className="text-[10px] text-slate-500 font-medium mt-1">
          No App Needed • Apple / Google Pay
        </div>
      </div>

      {/* Stand Specs */}
      <div className="space-y-2 text-xs border-t border-b border-slate-100 py-3">
        <div className="flex items-center justify-between text-slate-600">
          <span className="text-slate-400 font-medium">Stand Material Spec:</span>
          <span className="font-semibold text-slate-800">Clear Acrylic 4" x 6" (Tent Base)</span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span className="text-slate-400 font-medium">Dynamic Routing:</span>
          <span className="font-semibold text-[#15803d] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
            Realtime Sync Enabled
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => onPrintStand(table)}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-[0.98]"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Stand (A6)</span>
        </button>

        <button
          onClick={() => onExportVector(table)}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#f3f3f6] hover:bg-slate-200/80 text-slate-700 text-xs font-bold rounded-xl transition-all active:scale-[0.98]"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Vector</span>
        </button>
      </div>

      {/* Order Official Acrylic Holders */}
      <div className="bg-[#f9f9fc] border border-slate-200/80 rounded-xl p-3 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
          <Box className="w-4 h-4 text-slate-500" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold text-slate-900 leading-tight">
            Order Official Acrylic Holders
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 leading-normal">
            Heavy-base scratch-resistant restaurant grade tents.
          </div>
        </div>
        <button
          onClick={handleCopyLink}
          className="text-[11px] font-semibold text-[#0f766e] hover:underline shrink-0"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : 'Copy Link'}
        </button>
      </div>
    </div>
  );
};
