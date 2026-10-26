import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { PiggyBank, Plus, Sparkles, Trophy, Heart, ArrowUpRight } from 'lucide-react';

export default function GullakPot({ balance, dreamGoal, onAddFunds, role, onParentMatch }) {
  const [isJiggling, setIsJiggling] = useState(false);
  const target = dreamGoal?.targetAmount || 3000;
  const progressPercent = Math.min(100, Math.round((balance / target) * 100));

  const triggerFeed = (amount) => {
    sounds.playCoin();
    setIsJiggling(true);
    setTimeout(() => setIsJiggling(false), 450);
    onAddFunds(amount);

    if (progressPercent >= 90) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleParentMatchBonus = () => {
    sounds.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onParentMatch) onParentMatch(50);
  };

  return (
    <div className="bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/30 dark:via-stone-900 border border-amber-200/60 dark:border-amber-900/40 rounded-3xl p-5 shadow-xl relative overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute -right-10 -top-10 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            {role === 'child' ? 'Mera Apna Gullak 🏺' : 'The Earthen Gullak (गुल्लक)'}
          </span>
          <h2 className="text-2xl font-black tracking-tight text-stone-900 dark:text-white mt-0.5">
            ₹{balance.toLocaleString('en-IN')}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {role === 'child' ? 'Real savings in your clay pot' : 'Safe from impulse UPI scans'}
          </p>
        </div>

        {/* Earthen Ceramic Gullak Mascot with Jiggle Physics */}
        <div
          onClick={() => triggerFeed(20)}
          className={`cursor-pointer select-none transition-transform duration-200 ${
            isJiggling ? 'scale-110 rotate-6' : 'hover:scale-105 active:scale-95'
          }`}
          title="Tap to feed ₹20!"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 shadow-lg shadow-amber-800/30 flex flex-col items-center justify-center text-amber-100 border-2 border-amber-400 relative">
            {/* Ceramic slot */}
            <div className="w-6 h-1.5 bg-amber-950 rounded-full mb-1 shadow-inner" />
            <span className="text-xl">🏺</span>
            <span className="text-[9px] font-black tracking-tight text-amber-200">GULLAK</span>
          </div>
        </div>
      </div>

      {/* Dream Target Progress Bar */}
      <div className="mt-4 bg-white/70 dark:bg-stone-800/70 backdrop-blur-md rounded-2xl p-3.5 border border-stone-200/70 dark:border-stone-700">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-200 mb-1.5">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {dreamGoal?.title || 'Target Goal'}
          </span>
          <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">
            {progressPercent}% (₹{balance} / ₹{target})
          </span>
        </div>

        {/* Liquid Progress Bar */}
        <div className="w-full h-3 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[11px] text-stone-500 mt-1.5 text-right">
          ₹{Math.max(0, target - balance)} more to reach goal!
        </p>
      </div>

      {/* Quick Feed Actions & Parent High-Five */}
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => triggerFeed(10)}
          className="flex-1 py-2 px-3 bg-amber-100 dark:bg-amber-950/50 hover:bg-amber-200 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-bold rounded-xl active:scale-95 transition flex items-center justify-center gap-1 border border-amber-300 dark:border-amber-800 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Save ₹10</span>
        </button>

        <button
          onClick={() => triggerFeed(50)}
          className="flex-1 py-2 px-3 bg-amber-100 dark:bg-amber-950/50 hover:bg-amber-200 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-bold rounded-xl active:scale-95 transition flex items-center justify-center gap-1 border border-amber-300 dark:border-amber-800 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Save ₹50</span>
        </button>

        {(role === 'child' || role === 'parent') && (
          <button
            onClick={handleParentMatchBonus}
            className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl active:scale-95 transition flex items-center gap-1 shadow-sm cursor-pointer"
            title="Parent matches ₹50 for honest streak!"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Parent Match!</span>
          </button>
        )}
      </div>
    </div>
  );
}
