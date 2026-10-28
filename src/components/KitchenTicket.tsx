import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  Flame,
  Info,
  CheckSquare,
  Square,
  CookingPot,
  Bell,
} from 'lucide-react';
import { KitchenTicketData } from '../types';
import { DietaryIcon } from './DietaryIcon';

interface KitchenTicketProps {
  ticket: KitchenTicketData;
  onUpdateStatus: (ticketId: string, newStatus: KitchenTicketData['status']) => void;
  onTouchToggleItem?: (ticketId: string, itemId: string) => void;
}

export const KitchenTicket: React.FC<KitchenTicketProps> = ({
  ticket,
  onUpdateStatus,
}) => {
  const [platedItems, setPlatedItems] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    ticket.items.forEach((item) => {
      if (item.plated) map[item.id] = true;
    });
    return map;
  });

  const togglePlated = (itemId: string) => {
    setPlatedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Header background theme according to state
  let headerBg = 'bg-[#0f766e] text-white';
  let pillBadge = 'bg-white/20 text-white';

  if (ticket.status === 'overdue') {
    headerBg = 'bg-[#ba1a1a] text-white';
    pillBadge = 'bg-white text-red-900 font-black';
  } else if (ticket.status === 'in_cook') {
    headerBg = 'bg-[#fd651e] text-white';
    pillBadge = 'bg-white text-[#571a00] font-black';
  } else if (ticket.status === 'just_in') {
    headerBg = 'bg-[#087a38] text-white';
    pillBadge = 'bg-white text-[#00210a] font-black';
  } else if (ticket.status === 'ready') {
    headerBg = 'bg-[#005c55] text-white';
    pillBadge = 'bg-[#a3faef] text-[#00201d] font-black';
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:shadow-md">
      <div>
        {/* Header Ribbon */}
        <div className={`p-4 ${headerBg}`}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 font-black text-lg tracking-tight">
              {ticket.status === 'overdue' && (
                <span className="text-white text-xl animate-pulse">!</span>
              )}
              {ticket.status === 'in_cook' && (
                <CookingPot className="w-5 h-5 text-white mr-1" />
              )}
              {ticket.status === 'just_in' && (
                <span className="w-2.5 h-2.5 rounded-full bg-white mr-1" />
              )}
              {ticket.status === 'ready' && (
                <Bell className="w-4 h-4 text-[#a3faef] mr-1" />
              )}
              <span>TABLE {ticket.tableId}</span>
            </div>

            <div className={`px-2.5 py-0.5 rounded-md text-xs tracking-wider uppercase ${pillBadge}`}>
              {ticket.timeLabel}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-white/80 font-medium">
            <span>Order #{ticket.id}</span>
            <span>{ticket.orderSource}</span>
          </div>
        </div>

        {/* Station Photo Banner if available */}
        {ticket.bannerImage && (
          <div className="relative h-20 w-full overflow-hidden bg-slate-800">
            <img
              src={ticket.bannerImage}
              alt="Kitchen Station"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
              <span className="px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold rounded">
                {ticket.stationTag}
              </span>
            </div>
          </div>
        )}

        {/* Order Items Body */}
        <div className="p-4 space-y-3">
          {ticket.items.map((item) => {
            const isChecked = platedItems[item.id] || ticket.status === 'ready';

            return (
              <div
                key={item.id}
                onClick={() => togglePlated(item.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-slate-50 border-slate-200 text-slate-500'
                    : 'bg-[#f9f9fc] border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    {/* Quantity Badge */}
                    <div className="w-6 h-6 rounded-md bg-[#005c55] text-white text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                      {item.count}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-bold leading-tight ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {item.name}
                        </span>
                        <DietaryIcon type={item.dietary} />
                      </div>

                      {/* Subtext info */}
                      {item.subtext && (
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {item.subtext}
                        </p>
                      )}

                      {/* Modifiers & Specs */}
                      {item.mod && (
                        <div className="text-[10px] font-bold text-red-600 mt-0.5 tracking-wide">
                          {item.mod}
                        </div>
                      )}
                      {item.spec && (
                        <div className="text-[10px] font-bold text-slate-700 mt-0.5 tracking-wide">
                          {item.spec}
                        </div>
                      )}
                      {item.allergyNotice && (
                        <div className="mt-1 px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-extrabold rounded border border-red-200 inline-block">
                          {item.allergyNotice}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Plated marker / Checkbox */}
                  {ticket.status === 'ready' || ticket.status === 'delivered' ? (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 shrink-0">
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                      <span>PLATED</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600 p-1"
                      title="Mark course plated"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Table special instruction */}
          {ticket.specialInstruction && (
            <div className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-xl text-amber-900 text-xs border border-amber-200">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>{ticket.specialInstruction}</span>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Footer Action Buttons */}
      <div className="p-4 pt-0 space-y-2">
        {ticket.status === 'overdue' && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateStatus(ticket.id, 'in_cook')}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Accept
              </button>
              <button
                onClick={() => onUpdateStatus(ticket.id, 'in_cook')}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Start Cook
              </button>
            </div>
            <button
              onClick={() => onUpdateStatus(ticket.id, 'ready')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#fd651e] hover:bg-[#ea580c] text-white text-xs font-black rounded-xl transition-all shadow-sm active:scale-[0.98]"
            >
              <CheckCircle className="w-4 h-4" />
              <span>MARK READY (EXPEDITE)</span>
            </button>
          </>
        )}

        {ticket.status === 'in_cook' && (
          <button
            onClick={() => onUpdateStatus(ticket.id, 'ready')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-black rounded-xl transition-all shadow-sm active:scale-[0.98]"
          >
            <CheckCircle className="w-4 h-4" />
            <span>MARK READY</span>
          </button>
        )}

        {ticket.status === 'just_in' && (
          <button
            onClick={() => onUpdateStatus(ticket.id, 'in_cook')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#087a38] hover:bg-[#065f29] text-white text-xs font-black rounded-xl transition-all shadow-sm active:scale-[0.98]"
          >
            <CheckCircle className="w-4 h-4" />
            <span>ACCEPT TICKET</span>
          </button>
        )}

        {ticket.status === 'ready' && (
          <button
            onClick={() => onUpdateStatus(ticket.id, 'delivered')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-black rounded-xl transition-all active:scale-[0.98]"
          >
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            <span>DELIVERED / BUMP</span>
          </button>
        )}

        {ticket.status === 'delivered' && (
          <div className="w-full py-2.5 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl">
            ✓ Bumped to Floor Runner
          </div>
        )}
      </div>
    </div>
  );
};
