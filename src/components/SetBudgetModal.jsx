import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import RealisticBanknote from './RealisticBanknote';
import RealisticCoin from './RealisticCoin';
import { Sparkles, RotateCcw, Check, X, Wallet, Coins, Plus } from 'lucide-react';

export default function SetBudgetModal({ roleProfile, activeRole, onClose, onSaveBudget }) {
  const [tally, setTally] = useState(roleProfile?.salaryOrIncome || (activeRole === 'parent' ? 85000 : activeRole === 'child' ? 350 : 12000));
  const [activeTab, setActiveTab] = useState(activeRole === 'child' ? 'coins' : 'notes');

  const addAmount = (val, isCoin = false) => {
    if (isCoin) {
      sounds.playCoin();
    } else {
      sounds.playNote();
    }
    setTally((prev) => prev + val);
  };

  const addBundle = (val) => {
    sounds.playNote();
    setTally((prev) => prev + val);
  };

  const handleReset = () => {
    sounds.playTap();
    setTally(0);
  };

  const handleSave = () => {
    if (tally <= 0) return;
    sounds.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#10b981', '#fbbf24', '#3b82f6', '#ec4899']
    });
    onSaveBudget(tally);
    onClose();
  };

  const roleTitle = activeRole === 'parent' ? 'Family Monthly Salary' : activeRole === 'child' ? 'My Monthly Pocket Money' : 'Monthly Allowance / Stipend';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in select-none">
      <div className="apple-card rounded-[32px] max-w-md w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/10">
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-black/60">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              Real Currency Counter
            </span>
            <h3 className="text-base font-bold text-white mt-0.5 tracking-tight">
              Set {roleTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white cursor-pointer apple-pill"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Counter Display & Quick Bundles */}
        <div className="p-4 bg-black/40 border-b border-white/[0.08] space-y-2.5">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-stone-400 font-mono">Counted Amount:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-emerald-400">₹</span>
              <span className="text-3xl font-black text-white font-mono tracking-tight">
                {tally.toLocaleString('en-IN')}
              </span>
              {tally > 0 && (
                <button
                  onClick={handleReset}
                  title="Clear / Reset to 0"
                  className="ml-2 p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white cursor-pointer apple-pill"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Bundle Shortcuts */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] text-stone-500 font-mono flex-shrink-0">Bundles:</span>
            {activeRole === 'parent' ? (
              <>
                <button onClick={() => addBundle(10000)} className="px-2.5 py-1 text-xs font-bold apple-pill hover:bg-white/10 text-emerald-300 rounded-lg active:scale-95 transition cursor-pointer flex-shrink-0">+₹10,000</button>
                <button onClick={() => addBundle(25000)} className="px-2.5 py-1 text-xs font-bold apple-pill hover:bg-white/10 text-emerald-300 rounded-lg active:scale-95 transition cursor-pointer flex-shrink-0">+₹25,000</button>
                <button onClick={() => addBundle(50000)} className="px-2.5 py-1 text-xs font-bold apple-pill hover:bg-white/10 text-emerald-300 rounded-lg active:scale-95 transition cursor-pointer flex-shrink-0">+₹50,000</button>
              </>
            ) : activeRole === 'child' ? (
              <>
                <button onClick={() => addBundle(50)} className="px-2.5 py-1 text-xs font-bold apple-pill hover:bg-white/10 text-amber-300 rounded-lg active:scale-95 transition cursor-pointer flex-shrink-0">+₹50</button>
                <button onClick={() => addBundle(100)} className="px-2.5 py-1 text-xs font-bold apple-pill hover:bg-white/10 text-amber-300 rounded-lg active:scale-95 transition cursor-pointer flex-shrink-0">+₹100</button>
                <button onClick={() => addBundle(200)} className="px-2.5 py-1 text-xs font-bold apple-pill hover:bg-white/10 text-amber-300 rounded-lg active:scale-95 transition cursor-pointer flex-shrink-0">+₹200</button>
              </>
            ) : (
              <>
                <button onClick={() => addBundle(1000)} className="px-2.5 py-1 text-xs font-bold apple-pill hover:bg-white/10 text-cyan-300 rounded-lg active:scale-95 transition cursor-pointer flex-shrink-0">+₹1,000</button>
                <button onClick={() => addBundle(2000)} className="px-2.5 py-1 text-xs font-bold apple-pill hover:bg-white/10 text-cyan-300 rounded-lg active:scale-95 transition cursor-pointer flex-shrink-0">+₹2,000</button>
                <button onClick={() => addBundle(5000)} className="px-2.5 py-1 text-xs font-bold apple-pill hover:bg-white/10 text-cyan-300 rounded-lg active:scale-95 transition cursor-pointer flex-shrink-0">+₹5,000</button>
              </>
            )}
          </div>
        </div>

        {/* Currency Switcher Tabs */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.08] bg-black/60">
          <div className="flex items-center gap-1.5 apple-pill p-1 rounded-2xl">
            <button
              onClick={() => {
                sounds.playTap();
                setActiveTab('notes');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition ${
                activeTab === 'notes' ? 'bg-white/15 text-white shadow-sm' : 'text-stone-400 hover:text-white'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Tap Notes</span>
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                setActiveTab('coins');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition ${
                activeTab === 'coins' ? 'bg-white/15 text-white shadow-sm' : 'text-stone-400 hover:text-white'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Tap Coins</span>
            </button>
          </div>
          <span className="text-[10px] text-stone-500 font-mono">1-tap adds to salary</span>
        </div>

        {/* Scrollable Currency Tray */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 cash-tray-scroll">
          {activeTab === 'notes' && (
            <div className="space-y-3">
              {[500, 200, 100, 50, 20, 10].map((val) => (
                <RealisticBanknote
                  key={val}
                  value={val}
                  onClick={() => addAmount(val, false)}
                />
              ))}
            </div>
          )}

          {activeTab === 'coins' && (
            <div className="flex items-center justify-around gap-2 p-4 bg-black/60 backdrop-blur-xl rounded-[24px] border border-white/[0.08] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
              {[20, 10, 5, 2, 1].map((val) => (
                <div key={val} className="flex flex-col items-center gap-1">
                  <RealisticCoin
                    value={val}
                    onClick={() => addAmount(val, true)}
                  />
                  <span className="text-[10px] font-bold text-stone-400 font-mono">₹{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button: Set Budget */}
        <div className="p-4 border-t border-white/[0.08] bg-black/60">
          <button
            onClick={handleSave}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:brightness-110 text-white font-bold text-sm rounded-[22px] shadow-xl shadow-emerald-950/60 active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-5 h-5" />
            <span>Confirm & Set ₹{tally.toLocaleString('en-IN')} as My Monthly Amount 🌸</span>
          </button>
        </div>
      </div>
    </div>
  );
}
