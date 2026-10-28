import React from 'react';
import { Bell, Check, Droplet, Receipt, UserCheck, Clock, MapPin, AlertCircle } from 'lucide-react';
import { WaiterCallItem } from '../types';

interface WaiterCallsScreenProps {
  calls: WaiterCallItem[];
  onResolveCall: (callId: string) => void;
  onAcknowledgeCall: (callId: string) => void;
}

export const WaiterCallsScreen: React.FC<WaiterCallsScreenProps> = ({
  calls,
  onResolveCall,
  onAcknowledgeCall,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 tracking-wider uppercase mb-1">
          <Bell className="w-3.5 h-3.5 animate-bounce" />
          <span>Table-side Guest Assistance Dispatch</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Live Waiter Calls & Requests
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Real-time service signals sent by guests through their table QR code session. Instant push notification to assigned server pagers.
        </p>
      </div>

      {/* Grid of calls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {calls.map((call) => {
          const isPending = call.status === 'pending';
          return (
            <div
              key={call.id}
              className={`bg-white rounded-2xl p-5 border transition-all shadow-sm ${
                isPending ? 'border-red-200 ring-2 ring-red-500/10' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      call.type === 'water'
                        ? 'bg-blue-50 text-blue-600'
                        : call.type === 'bill'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {call.type === 'water' && <Droplet className="w-5 h-5" />}
                    {call.type === 'bill' && <Receipt className="w-5 h-5" />}
                    {call.type === 'server' && <UserCheck className="w-5 h-5" />}
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      {call.tableName}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{call.zone}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 text-xs font-bold rounded-md ${
                    isPending
                      ? 'bg-red-50 text-red-600 animate-pulse'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {isPending ? 'Waiting' : 'Acknowledged'}
                </span>
              </div>

              {/* Call details */}
              <div className="p-3 bg-slate-50 rounded-xl mb-4 space-y-1">
                <div className="text-xs font-bold text-slate-800">
                  {call.type === 'water' && '💧 Water Carafe & Glasses Refill'}
                  {call.type === 'bill' && '💳 Printed Bill & Card Terminal Requested'}
                  {call.type === 'server' && '🙋 Server Assistance at Table'}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Requested {call.requestedAt}</span>
                  </span>
                  {call.serverAssigned && (
                    <span className="font-medium text-[#0f766e]">
                      Assigned: {call.serverAssigned}
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                {isPending && (
                  <button
                    onClick={() => onAcknowledgeCall(call.id)}
                    className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                  >
                    Acknowledge
                  </button>
                )}
                <button
                  onClick={() => onResolveCall(call.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark Resolved</span>
                </button>
              </div>
            </div>
          );
        })}

        {calls.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl p-12 border border-slate-200 text-center text-slate-500">
            <Check className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h3 className="font-bold text-base text-slate-800">All table calls attended!</h3>
            <p className="text-xs text-slate-500 mt-1">Guests can call for water or bills by tapping the QR menu button on their phones.</p>
          </div>
        )}
      </div>
    </div>
  );
};
