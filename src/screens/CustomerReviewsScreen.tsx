import React from 'react';
import { Star, ThumbsUp, MessageSquare, CheckCircle, ShieldCheck } from 'lucide-react';

export const CustomerReviewsScreen: React.FC = () => {
  const reviews = [
    {
      id: 'rev-1',
      guest: 'Marcus Vance',
      table: 'Table T05',
      time: '22 mins ago',
      rating: 5,
      dish: 'Slow-Braised Short Rib Rigatoni & Barolo',
      comment: 'Scanning the QR stand was instantaneous—we placed our starters and entrees directly from our phone. The short rib rigatoni melted in our mouths!',
      verified: true,
    },
    {
      id: 'rev-2',
      guest: 'Sophia Chang',
      table: 'Table T08 (Patio)',
      time: '1 hour ago',
      rating: 5,
      dish: 'Wild Mushroom & Truffle Pizza',
      comment: 'Loved how easy it was to request extra water right on the QR app without trying to flag down a waiter across the patio terrace.',
      verified: true,
    },
    {
      id: 'rev-3',
      guest: 'David Miller',
      table: 'Table T12',
      time: '2 hours ago',
      rating: 4.8,
      dish: 'Truffle Burrata & Hibiscus Yuzu Fizz',
      comment: 'The burrata presentation was stunning. Apple Pay checkout at the table made splitting the bill with friends seamless.',
      verified: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold text-[#0f766e] tracking-wider uppercase mb-1">
          Guest Feedback & Rating Stream
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          QR Dining Reviews
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Verified diner ratings submitted via contactless checkout on table QR stands.
        </p>
      </div>

      {/* Aggregate Score Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center text-amber-700">
            <span className="text-3xl font-black">4.9</span>
            <div className="flex text-amber-500 text-xs mt-0.5">★★★★★</div>
          </div>
          <div>
            <div className="text-base font-extrabold text-slate-900">
              Outstanding QR Dining Experience
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Based on 1,428 verified guest checkouts this month
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>98.4% Table Satisfaction Rate</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-slate-50 rounded-xl">
            <div className="text-xs text-slate-400 font-bold">Food Plating</div>
            <div className="text-lg font-black text-slate-900">4.9/5</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <div className="text-xs text-slate-400 font-bold">QR Speed</div>
            <div className="text-lg font-black text-[#0f766e]">5.0/5</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <div className="text-xs text-slate-400 font-bold">Service Lag</div>
            <div className="text-lg font-black text-slate-900">&lt;2 min</div>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-[#0f766e] font-extrabold flex items-center justify-center text-sm">
                  {r.guest.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">{r.guest}</span>
                    <span className="text-[11px] font-semibold text-slate-400">• {r.table}</span>
                    {r.verified && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                        Verified Diner
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">{r.time}</div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{r.rating.toFixed(1)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              "{r.comment}"
            </p>

            <div className="text-[11px] font-semibold text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
              <span>Dish ordered: <strong className="text-slate-800">{r.dish}</strong></span>
              <button
                onClick={() => alert('Reply sent to guest phone notification.')}
                className="text-[#0f766e] hover:underline"
              >
                Send Thank You Note
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
