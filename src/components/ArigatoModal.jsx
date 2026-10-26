import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import { Heart, Sparkles, Check } from 'lucide-react';

const GRATITUDE_PROMPTS = [
  '🙏 Thank you for nutritious food that fuels my energy.',
  '💡 Thank you for lights & internet that keep me connected.',
  '🛵 Thank you for a safe ride that saved my valuable time.',
  '📚 Thank you for books & knowledge that make me wiser.',
  '🎁 Thank you for a warm smile shared with family & friends.'
];

export default function ArigatoModal({ spendData, onClose, onBless }) {
  const [blessed, setBlessed] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(GRATITUDE_PROMPTS[0]);

  const handleSeal = () => {
    sounds.playGong();
    setBlessed(true);
    setTimeout(() => {
      onBless({ ...spendData, prompt: selectedPrompt });
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center relative overflow-hidden">
        {/* Soft Radial Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent pointer-events-none" />

        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <Heart className={`w-8 h-8 ${blessed ? 'animate-ping' : 'animate-pulse'}`} />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Arigato Money Blessing (धन्यवाद)
          </span>

          <h3 className="text-xl font-black text-stone-900 dark:text-white mt-1">
            ₹{spendData?.amount} Spent Mindfully
          </h3>

          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Japanese wisdom teaches: Spend with gratitude, and money returns with peace.
          </p>

          {/* Quick Gratitude Picker */}
          <div className="mt-4 text-left space-y-1.5">
            <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
              Choose Gratitude Thought:
            </label>
            {GRATITUDE_PROMPTS.slice(0, 3).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sounds.playTap();
                  setSelectedPrompt(prompt);
                }}
                className={`w-full text-left p-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  selectedPrompt === prompt
                    ? 'bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 font-semibold'
                    : 'bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 hover:bg-stone-100'
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Stamp Action Button */}
          <div className="mt-5">
            {blessed ? (
              <div className="py-3 px-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 animate-bounce">
                <Check className="w-4 h-4" />
                <span>Blessed & Sealed with Gratitude! 🌸</span>
              </div>
            ) : (
              <button
                onClick={handleSeal}
                className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-rose-600/25 active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Stamp Arigato Seal (Sound Bell 🔔)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
