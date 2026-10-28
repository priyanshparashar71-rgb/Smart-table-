import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface TableQRCodeProps {
  tableId: string;
  url: string;
  size?: number;
  isDetailedStand?: boolean;
}

export const TableQRCode: React.FC<TableQRCodeProps> = ({
  tableId,
  url,
  size = 64,
  isDetailedStand = false,
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(window.location.origin + url, {
      width: isDetailedStand ? 320 : 120,
      margin: 1,
      color: {
        dark: '#0f766e',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((res) => setDataUrl(res))
      .catch(() => {});
  }, [url, isDetailedStand]);

  if (isDetailedStand) {
    return (
      <div className="relative inline-block p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
        {dataUrl ? (
          <div className="relative">
            <img
              src={dataUrl}
              alt={`QR Code for ${tableId}`}
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl object-contain"
            />
            {/* Center ST logo badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 bg-white rounded-full p-1 shadow-md flex items-center justify-center border-2 border-[#0f766e]">
                <div className="w-9 h-9 rounded-full bg-[#0f766e] text-white font-extrabold text-sm flex items-center justify-center tracking-tight">
                  ST
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-48 h-48 bg-slate-50 animate-pulse rounded-xl" />
        )}
      </div>
    );
  }

  // Mini QR preview for list cards
  return (
    <div 
      className="relative shrink-0 flex items-center justify-center bg-white rounded-lg border border-slate-200/80 p-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
      style={{ width: size, height: size }}
    >
      {dataUrl ? (
        <div className="relative w-full h-full">
          <img
            src={dataUrl}
            alt={`QR ${tableId}`}
            className="w-full h-full object-contain rounded"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-5 h-5 bg-[#0f766e] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white shadow-xs">
              {tableId.replace(/^T0?/, '') || tableId}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-slate-100 rounded animate-pulse" />
      )}
    </div>
  );
};
