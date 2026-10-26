import React from 'react';
import { sounds } from '../utils/audio';
import { PieChart, TrendingUp, Wallet, ShieldCheck } from 'lucide-react';

export default function KakeiboPillars({ kakeiboData, roleProfile, onSelectPillar }) {
  const labels = roleProfile?.kakeiboLabels || {
    needs: { name: 'Zaroorat (Needs)', sub: 'Food, rent, metro, medicine', icon: '🍛' },
    wants: { name: 'Mauj (Wants)', sub: 'Dining out, fashion, cinema', icon: '🎈' },
    culture: { name: 'Gyaan (Growth)', sub: 'Books, tools, courses, skill', icon: '📚' },
    unexpected: { name: 'Achanak (Oops)', sub: 'Repairs, emergency, unplanned', icon: '🩹' },
  };

  const total = Object.values(kakeiboData).reduce((a, b) => a + b, 0) || 1;
  const salaryOrIncome = roleProfile?.salaryOrIncome || total;
  const incomeLabel = roleProfile?.incomeLabel || 'Monthly Budget';

  const PILLARS = [
    {
      id: 'needs',
      name: labels.needs.name,
      sub: labels.needs.sub,
      amount: kakeiboData.needs,
      color: 'from-emerald-500 to-teal-600',
      border: 'border-emerald-500/40',
      icon: labels.needs.icon,
      ideal: '50%',
    },
    {
      id: 'wants',
      name: labels.wants.name,
      sub: labels.wants.sub,
      amount: kakeiboData.wants,
      color: 'from-amber-500 to-orange-600',
      border: 'border-amber-500/40',
      icon: labels.wants.icon,
      ideal: '20%',
    },
    {
      id: 'culture',
      name: labels.culture.name,
      sub: labels.culture.sub,
      amount: kakeiboData.culture,
      color: 'from-blue-500 to-indigo-600',
      border: 'border-blue-500/40',
      icon: labels.culture.icon,
      ideal: '15%',
    },
    {
      id: 'unexpected',
      name: labels.unexpected.name,
      sub: labels.unexpected.sub,
      amount: kakeiboData.unexpected,
      color: 'from-rose-500 to-red-600',
      border: 'border-rose-500/40',
      icon: labels.unexpected.icon,
      ideal: '15%',
    },
  ];

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 shadow-2xl transition-all select-none">
      {/* Header with Role Financial Scale Context */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-800">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 font-mono">
            <PieChart className="w-3.5 h-3.5" />
            Kakeibo 4 Pillars (家計簿)
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            {roleProfile?.title || 'Where Did Your Money Flow?'}
          </h3>
          <p className="text-[11px] text-stone-400 mt-0.5">
            {incomeLabel}: <span className="font-bold text-white font-mono">₹{salaryOrIncome.toLocaleString('en-IN')}</span>
          </p>
        </div>

        <div className="text-right">
          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block font-mono">Total Tracked</span>
          <span className="text-lg font-black text-emerald-400 font-mono">
            ₹{total.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* 4 Realistic Pillar Cards */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {PILLARS.map((p) => {
          const pct = Math.round((p.amount / total) * 100);
          return (
            <div
              key={p.id}
              onClick={() => {
                sounds.playTap();
                onSelectPillar && onSelectPillar(p.id);
              }}
              className={`p-3.5 rounded-2xl border ${p.border} bg-stone-950 shadow-md hover:border-white/30 transition cursor-pointer active:scale-95 flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{p.icon}</span>
                <span className="text-[11px] font-mono font-black text-white bg-stone-800 px-2 py-0.5 rounded-full border border-stone-700">
                  {pct}%
                </span>
              </div>

              <div className="my-2.5">
                <h4 className="text-xs font-bold text-white leading-tight">
                  {p.name}
                </h4>
                <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">{p.sub}</p>
                <div className="text-lg font-black text-white font-mono mt-1">
                  ₹{p.amount.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Liquid Progress Bar */}
              <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden p-0.5 border border-stone-700">
                <div
                  className={`h-full bg-gradient-to-r ${p.color} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.max(8, pct)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-stone-950 rounded-2xl border border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium text-emerald-300">
          <TrendingUp className="w-3.5 h-3.5" />
          50% Needs • 20% Wants • 15% Education & Growth • 15% Emergency Buffer
        </span>
      </div>
    </div>
  );
}
