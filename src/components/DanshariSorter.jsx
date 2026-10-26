import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Trash2, Heart, Sparkles, CheckCircle2, RotateCcw, Plus, X, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

const INITIAL_DANSHARI_DECK = [
  {
    id: 'd1',
    title: 'Unused Netflix / Hotstar OTT',
    category: 'Entertainment',
    cost: 499,
    period: '/month',
    annualSaving: 5988,
    desc: 'Haven’t watched anything on it in 3 weeks',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&auto=format&fit=crop&q=80',
    icon: '🎬',
  },
  {
    id: 'd2',
    title: 'Blinkit Instant Delivery on 1 Snack',
    category: 'Quick Commerce',
    cost: 45,
    period: '/order',
    annualSaving: 2160,
    desc: 'Surge fee + delivery charge for 1 chocolate bar',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
    icon: '🛵',
  },
  {
    id: 'd3',
    title: 'Fast-Fashion Outfit for 1 Party',
    category: 'Wardrobe Clutter',
    cost: 1299,
    period: 'one-time',
    annualSaving: 1299,
    desc: 'Worn once for Instagram, sits in closet forever',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
    icon: '👗',
  },
  {
    id: 'd4',
    title: 'Gym Membership (Unvisited in 40 days)',
    category: 'Health',
    cost: 1500,
    period: '/month',
    annualSaving: 18000,
    desc: 'Pause membership or do outdoor running & pushups',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    icon: '🏋️',
  },
  {
    id: 'd5',
    title: 'Fancy ₹250 Café Frappuccino',
    category: 'Daily Treat',
    cost: 250,
    period: '3x/week',
    annualSaving: 39000,
    desc: 'Switch to homemade cold coffee or local cutting chai',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80',
    icon: '☕',
  },
];

export default function DanshariSorter() {
  const [deck, setDeck] = useState(INITIAL_DANSHARI_DECK);
  const [totalFreedWealth, setTotalFreedWealth] = useState(0);
  const [itemsDiscarded, setItemsDiscarded] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Custom User Item Form
  const [customTitle, setCustomTitle] = useState('');
  const [customCost, setCustomCost] = useState('');
  const [customPeriod, setCustomPeriod] = useState('monthly'); // 'monthly' | 'onetime'

  const handleDecision = (item, action) => {
    sounds.playTap();
    if (action === 'discard') {
      sounds.playSuccess();
      setTotalFreedWealth((prev) => prev + item.annualSaving);
      setItemsDiscarded((prev) => prev + 1);
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#a855f7', '#ec4899', '#3b82f6', '#10b981']
      });
    }
    setDeck((prev) => prev.filter((d) => d.id !== item.id));
  };

  const handleAddCustomItem = (e) => {
    e.preventDefault();
    if (!customTitle.trim() || !customCost) return;

    sounds.playTap();
    const costNum = parseInt(customCost, 10);
    const annualSaving = customPeriod === 'monthly' ? costNum * 12 : costNum;

    const newItem = {
      id: 'custom_' + Date.now(),
      title: customTitle.trim(),
      category: 'My Personal Expense',
      cost: costNum,
      period: customPeriod === 'monthly' ? '/month' : 'one-time',
      annualSaving,
      desc: 'Added by you to audit and declutter',
      image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=600&auto=format&fit=crop&q=80',
      icon: '✨',
    };

    setDeck((prev) => [newItem, ...prev]);
    setCustomTitle('');
    setCustomCost('');
    setShowAddModal(false);
  };

  const resetGame = () => {
    sounds.playTap();
    setDeck(INITIAL_DANSHARI_DECK);
  };

  const currentItem = deck[0];

  return (
    <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 border border-purple-900/40 rounded-3xl p-5 shadow-2xl transition-all select-none relative overflow-hidden">
      {/* Soft Ambient Purple Glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-800">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-purple-400 flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Dan-Sha-Ri (断捨離) Sorter
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            Keep or Let Go?
          </h3>
        </div>

        {/* Dynamic Annual Freed Counter */}
        <div className="text-right">
          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block font-mono">
            Annual Freed Leaks
          </span>
          <span className="text-lg font-black text-purple-400 font-mono">
            ₹{totalFreedWealth.toLocaleString('en-IN')}/yr
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between my-2.5">
        <p className="text-xs text-stone-400">
          Decluttering subscriptions and physical items clears mental and wallet leaks.
        </p>

        {/* Add Personal Item Button */}
        <button
          onClick={() => {
            sounds.playTap();
            setShowAddModal(true);
          }}
          className="flex-shrink-0 ml-2 px-2.5 py-1 bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-bold rounded-xl active:scale-95 transition flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Mine</span>
        </button>
      </div>

      {/* ADD CUSTOM USER ITEM FORM */}
      {showAddModal && (
        <form onSubmit={handleAddCustomItem} className="my-3 p-4 bg-stone-950 border border-purple-800/60 rounded-2xl space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between pb-1 border-b border-stone-800">
            <h4 className="text-xs font-bold text-white font-mono">
              Add Your Own Subscription or Clutter
            </h4>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1 font-mono">
              Item or Subscription Name:
            </label>
            <input
              type="text"
              placeholder="e.g. Spotify Duo, Cult Pass, Daily Starbucks, Myntra shoe"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-stone-800 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1 font-mono">
                Cost (₹):
              </label>
              <input
                type="number"
                placeholder="e.g. 299"
                value={customCost}
                onChange={(e) => setCustomCost(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-stone-800 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1 font-mono">
                Frequency:
              </label>
              <select
                value={customPeriod}
                onChange={(e) => setCustomPeriod(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-stone-800 border border-stone-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              >
                <option value="monthly">Per Month (x12)</option>
                <option value="onetime">One-Time Spend</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl active:scale-95 transition cursor-pointer"
          >
            Add to My Danshari Deck ✨
          </button>
        </form>
      )}

      {/* TACTILE 3D SWIPE CARD */}
      <div className="mt-2">
        {currentItem ? (
          <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-stone-950 shadow-2xl group">
            {/* High-Definition Visual Header Image */}
            <div className="relative h-36 w-full overflow-hidden bg-stone-900">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              {/* Category Pill & Icon */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white text-[11px] font-bold">
                <span>{currentItem.icon}</span>
                <span>{currentItem.category}</span>
              </div>

              {/* Annual Cost Pill */}
              <div className="absolute top-3 right-3 bg-purple-950/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-400/40 text-purple-300 text-xs font-mono font-black">
                ₹{currentItem.cost}{currentItem.period}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 pt-1 space-y-2 text-center">
              <h4 className="text-lg font-black text-white leading-tight">
                {currentItem.title}
              </h4>
              <p className="text-xs text-stone-300 italic bg-stone-900/60 p-2 rounded-xl border border-stone-800">
                "{currentItem.desc}"
              </p>

              {/* Action Buttons: Let Go vs Keep */}
              <div className="pt-2 flex items-center gap-2.5">
                <button
                  onClick={() => handleDecision(currentItem, 'discard')}
                  className="flex-1 py-3 px-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-black text-xs rounded-xl active:scale-95 transition flex items-center justify-center gap-1.5 shadow-lg shadow-rose-950 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Let It Go (Save ₹{currentItem.annualSaving.toLocaleString('en-IN')}/yr)</span>
                </button>

                <button
                  onClick={() => handleDecision(currentItem, 'keep')}
                  className="py-3 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs rounded-xl active:scale-95 transition cursor-pointer"
                >
                  Keep
                </button>
              </div>

              <div className="text-[10px] text-stone-500 font-mono pt-1">
                Cards left: {deck.length} in deck
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-purple-800/60 rounded-2xl bg-purple-950/20 p-5">
            <CheckCircle2 className="w-10 h-10 mx-auto text-purple-400 mb-2" />
            <h4 className="text-base font-black text-white">
              All Clutter Reviewed!
            </h4>
            <p className="text-xs text-purple-300 mt-1 font-mono">
              🎉 You freed an estimated ₹{totalFreedWealth.toLocaleString('en-IN')} in annual money leaks!
            </p>
            <button
              onClick={resetGame}
              className="mt-4 px-4 py-2 text-xs font-bold text-purple-200 bg-purple-900/60 hover:bg-purple-800/80 border border-purple-700 rounded-xl cursor-pointer inline-flex items-center gap-1.5 active:scale-95 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay Clutter Deck
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
