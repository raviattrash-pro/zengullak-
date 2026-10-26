import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import RealisticBanknote from './RealisticBanknote';
import RealisticCoin from './RealisticCoin';
import { Sparkles, RotateCcw, HeartHandshake, Wallet, Coins, ArrowDown } from 'lucide-react';

export default function CashRegister({ onLogSpend, role, onMoneyTapped }) {
  const [currentTally, setCurrentTally] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('needs');
  const [itemNote, setItemNote] = useState('');
  const [activeCurrencyTab, setActiveCurrencyTab] = useState('notes'); // 'notes' | 'coins'
  const [noteFilter, setNoteFilter] = useState('all'); // 'all' | 'high' | 'daily'

  const addNote = (val) => {
    sounds.playNote();
    setCurrentTally((prev) => prev + val);
    if (onMoneyTapped) onMoneyTapped({ type: 'note', value: val });
  };

  const addCoin = (val) => {
    sounds.playCoin();
    setCurrentTally((prev) => prev + val);
    if (onMoneyTapped) onMoneyTapped({ type: 'coin', value: val });
  };

  const quickPreset = (title, amt, cat) => {
    sounds.playTap();
    setItemNote(title);
    setSelectedCategory(cat);
    setCurrentTally(amt);
    sounds.playNote();
    if (onMoneyTapped) onMoneyTapped({ type: amt >= 100 ? 'note' : 'coin', value: amt });
  };

  const resetCounter = () => {
    sounds.playTap();
    setCurrentTally(0);
    setItemNote('');
  };

  const handleConfirm = () => {
    if (currentTally <= 0) return;
    onLogSpend({
      title: itemNote.trim() || (selectedCategory === 'needs' ? 'Daily Essential' : 'Personal Treat'),
      amount: currentTally,
      category: selectedCategory,
    });
    resetCounter();
  };

  const allNotes = [500, 200, 100, 50, 20, 10];
  const displayedNotes = allNotes.filter((n) => {
    if (noteFilter === 'high') return n >= 100;
    if (noteFilter === 'daily') return n < 100;
    return true;
  });

  return (
    <div className="apple-card rounded-[32px] p-6 shadow-2xl transition-all select-none">
      {/* Header & Total Odometer */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            {role === 'child' ? 'Mera Cash Box 🪙' : 'Real Currency Counter'}
          </span>
          <h3 className="text-base font-bold text-white mt-0.5 tracking-tight">
            {role === 'child' ? 'Touch real notes & coins you used' : 'Touch actual banknotes & coins'}
          </h3>
        </div>

        {/* Rolling Total Display */}
        <div className="flex items-baseline gap-1 text-right">
          <span className="text-xl font-bold text-emerald-400">₹</span>
          <span className="text-3xl font-black tracking-tight text-white font-mono">
            {currentTally}
          </span>
          {currentTally > 0 && (
            <button
              onClick={resetCounter}
              title="Reset"
              className="ml-2 p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white active:scale-95 transition cursor-pointer apple-pill"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Desi Presets */}
      <div className="my-3.5">
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5 font-mono">
          1-Tap Desi Shortcuts:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {role === 'child' ? (
            <>
              <button onClick={() => quickPreset('Chocolates 🍫', 20, 'wants')} className="px-3 py-1.5 text-xs font-semibold apple-pill text-amber-300 rounded-full active:scale-95 transition cursor-pointer hover:bg-white/10">🍫 Chocolate (₹20)</button>
              <button onClick={() => quickPreset('Stationery / Pen ✏️', 30, 'culture')} className="px-3 py-1.5 text-xs font-semibold apple-pill text-blue-300 rounded-full active:scale-95 transition cursor-pointer hover:bg-white/10">✏️ Pen/Colors (₹30)</button>
              <button onClick={() => quickPreset('Ice Cream 🍦', 50, 'wants')} className="px-3 py-1.5 text-xs font-semibold apple-pill text-rose-300 rounded-full active:scale-95 transition cursor-pointer hover:bg-white/10">🍦 Ice Cream (₹50)</button>
            </>
          ) : (
            <>
              <button onClick={() => quickPreset('Chai & Samosa ☕', 25, 'needs')} className="px-3 py-1.5 text-xs font-semibold apple-pill text-amber-300 rounded-full active:scale-95 transition cursor-pointer hover:bg-white/10">☕ Chai (₹25)</button>
              <button onClick={() => quickPreset('Metro / Rapido 🛵', 60, 'needs')} className="px-3 py-1.5 text-xs font-semibold apple-pill text-cyan-300 rounded-full active:scale-95 transition cursor-pointer hover:bg-white/10">🛵 Travel (₹60)</button>
              <button onClick={() => quickPreset('Swiggy / Lunch 🍱', 180, 'needs')} className="px-3 py-1.5 text-xs font-semibold apple-pill text-emerald-300 rounded-full active:scale-95 transition cursor-pointer hover:bg-white/10">🍱 Lunch (₹180)</button>
              <button onClick={() => quickPreset('Blinkit Munchies 🍿', 120, 'wants')} className="px-3 py-1.5 text-xs font-semibold apple-pill text-pink-300 rounded-full active:scale-95 transition cursor-pointer hover:bg-white/10">🍿 Snacks (₹120)</button>
            </>
          )}
        </div>
      </div>

      {/* Currency Switcher Tabs (Banknotes vs Coins) - iOS Segmented Control */}
      <div className="flex items-center justify-between mt-4 mb-3 border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-1.5 bg-black/60 apple-pill p-1 rounded-2xl">
          <button
            onClick={() => {
              sounds.playTap();
              setActiveCurrencyTab('notes');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeCurrencyTab === 'notes'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Banknotes</span>
          </button>

          <button
            onClick={() => {
              sounds.playTap();
              setActiveCurrencyTab('coins');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeCurrencyTab === 'coins'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Coins</span>
          </button>
        </div>

        {activeCurrencyTab === 'notes' && (
          <div className="flex items-center gap-1 bg-black/60 apple-pill p-1 rounded-xl">
            <button
              onClick={() => {
                sounds.playTap();
                setNoteFilter('all');
              }}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-lg cursor-pointer ${
                noteFilter === 'all' ? 'bg-white/15 text-emerald-400' : 'text-stone-500'
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                sounds.playTap();
                setNoteFilter('high');
              }}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-lg cursor-pointer ${
                noteFilter === 'high' ? 'bg-white/15 text-emerald-400' : 'text-stone-500'
              }`}
            >
              ₹500-100
            </button>
            <button
              onClick={() => {
                sounds.playTap();
                setNoteFilter('daily');
              }}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-lg cursor-pointer ${
                noteFilter === 'daily' ? 'bg-white/15 text-emerald-400' : 'text-stone-500'
              }`}
            >
              ₹50-10
            </button>
          </div>
        )}
      </div>

      {/* Realistic Banknotes (Scroll-Down Tray) */}
      {activeCurrencyTab === 'notes' && (
        <div className="space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono px-1">
            <span>Tap note to watch it fly into Gullak:</span>
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              Move down to see more <ArrowDown className="w-3 h-3 animate-bounce" />
            </span>
          </div>

          {/* Smooth Vertical Scroll Tray for Banknotes */}
          <div className="max-h-[380px] overflow-y-auto cash-tray-scroll pr-1.5 space-y-3.5 py-1">
            {displayedNotes.map((val) => (
              <RealisticBanknote
                key={val}
                value={val}
                onClick={() => addNote(val)}
              />
            ))}
            <div className="pt-2 pb-1 text-center text-[10px] text-stone-500 font-mono">
              ✓ All official RBI denominations loaded (₹500 down to ₹10)
            </div>
          </div>
        </div>
      )}

      {/* Realistic Indian Coins View */}
      {activeCurrencyTab === 'coins' && (
        <div className="space-y-4 py-2 animate-in fade-in duration-200">
          <p className="text-[10px] text-stone-400 font-mono">
            👉 Tap any metallic coin to clink into Gullak:
          </p>
          <div className="flex items-center justify-around gap-2 p-4 bg-black/60 backdrop-blur-xl rounded-[24px] border border-white/[0.08] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
            {[20, 10, 5, 2, 1].map((val) => (
              <div key={val} className="flex flex-col items-center gap-1.5">
                <RealisticCoin
                  value={val}
                  onClick={() => addCoin(val)}
                />
                <span className="text-[10px] font-bold text-stone-400 font-mono">₹{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pay Drawer when Tally > 0 */}
      {currentTally > 0 && (
        <div className="mt-5 pt-4 border-t border-stone-800 space-y-3 animate-in fade-in duration-200">
          <div>
            <input
              type="text"
              placeholder={role === 'child' ? "What did you buy? (e.g. Stickers, Ice Cream)" : "Optional note (e.g. Chai, Groceries, Delivery)"}
              value={itemNote}
              onChange={(e) => setItemNote(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-800 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-stone-400 font-medium mr-1 font-mono">Bucket:</span>
            {[
              { id: 'needs', label: '🍛 Zaroorat (Need)' },
              { id: 'wants', label: '🎈 Mauj (Want)' },
              { id: 'culture', label: '📚 Gyaan (Skill)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold transition active:scale-95 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleConfirm}
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-900/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <HeartHandshake className="w-5 h-5" />
            <span>Pay ₹{currentTally} with Arigato (धन्यवाद)</span>
          </button>
        </div>
      )}
    </div>
  );
}
