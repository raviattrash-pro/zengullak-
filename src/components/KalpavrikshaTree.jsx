import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Heart, Leaf, Sun, RotateCcw, Check } from 'lucide-react';

export default function KalpavrikshaTree({
  streakDays = 0,
  todayVibe = null,
  isCheckedInToday = false,
  onDailyVibeCheck,
  onResetStreak,
  role = 'parent',
}) {
  const currentVibe = todayVibe;
  const blooms = Math.min(10, Math.max(1, streakDays));

  const handleVibe = (type) => {
    sounds.playTap();

    if (!isCheckedInToday && type === 'bachat') {
      sounds.playSuccess();
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#10b981', '#f472b6', '#fbbf24', '#ffffff']
      });
    }

    if (onDailyVibeCheck) {
      onDailyVibeCheck(type);
    }
  };

  return (
    <div className="apple-card rounded-[32px] p-6 shadow-2xl transition-all select-none relative overflow-hidden">
      {/* Soft Ambient Zen Green Glow */}
      <div className="absolute -top-16 -left-16 w-52 h-52 bg-emerald-600/[0.08] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-amber-600/[0.08] rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            {role === 'child' ? 'Mera Magic Tree 🌸' : 'Living Kalpavriksha (Wisdom Tree)'}
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            Daily Financial Peace Streak
          </h3>
        </div>

        {/* Tactile Flame Streak Pill & Reset Option */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-950 to-orange-950 border border-amber-600/50 rounded-full text-amber-300 shadow-md">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-bounce" />
            <span className="text-xs font-black font-mono">
              {streakDays} Day Streak!
            </span>
          </div>

          {streakDays > 0 && (
            <button
              onClick={() => {
                sounds.playTap();
                if (window.confirm('Reset streak counter back to 0 days?')) {
                  onResetStreak && onResetStreak();
                }
              }}
              className="text-[10px] text-stone-500 hover:text-amber-400 border border-stone-800 bg-stone-950 px-2 py-1 rounded-full font-mono flex items-center gap-1 transition active:scale-95 cursor-pointer shadow-sm"
              title="Reset streak count back to 0"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* REALISTIC 3D HANDCRAFTED BONSAI / KALPAVRIKSHA TREE */}
      <div className="relative my-4 py-3 bg-black/60 apple-pill rounded-[26px] border border-white/[0.08] flex flex-col items-center justify-center overflow-hidden">
        {/* Floating sakura / parijat petals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-4 left-1/4 w-2 h-2 rounded-full bg-pink-400/80 animate-ping opacity-60" />
          <div className="absolute top-12 right-1/4 w-2.5 h-2.5 rounded-full bg-pink-300/80 animate-pulse opacity-70" />
          <div className="absolute top-8 left-1/3 w-1.5 h-1.5 rounded-full bg-amber-300/80 animate-ping opacity-50" />
        </div>

        {/* Detailed Vector Bonsai with Wood Grain, Layered Foliage & Cherry Blossoms */}
        <svg viewBox="0 0 280 200" className="w-56 h-40 sm:w-64 sm:h-44 drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]">
          <defs>
            {/* Trunk Wood Grain Gradient */}
            <linearGradient id="barkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8d5b4c" />
              <stop offset="35%" stopColor="#5d3a2f" />
              <stop offset="70%" stopColor="#3e2723" />
              <stop offset="100%" stopColor="#271815" />
            </linearGradient>

            {/* Lush Foliage Canopy Gradients */}
            <radialGradient id="leafCanopy1" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#064e3b" />
            </radialGradient>
            <radialGradient id="leafCanopy2" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="55%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#14532d" />
            </radialGradient>

            {/* Ceramic Glazed Zen Planter */}
            <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Blossom Petal Gradient */}
            <radialGradient id="sakuraPetal" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </radialGradient>
          </defs>

          {/* Glazed Ceramic Planter & Soil */}
          <ellipse cx="140" cy="188" rx="68" ry="8" fill="rgba(0,0,0,0.6)" />
          <path d="M 76 182 L 86 195 L 194 195 L 204 182 Z" fill="url(#potGrad)" stroke="#475569" strokeWidth="1.5" />
          <ellipse cx="140" cy="182" rx="64" ry="6" fill="#1e1815" stroke="#334155" strokeWidth="1" />
          <ellipse cx="140" cy="181" rx="58" ry="4" fill="#382923" />

          {/* Gnarled Sculptural Bonsai Trunk */}
          <path
            d="M 132 181 C 130 155, 115 140, 126 115 C 132 102, 148 98, 142 82 C 140 76, 134 70, 136 62"
            fill="none"
            stroke="url(#barkGradient)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* Left Branch */}
          <path
            d="M 124 125 C 105 120, 92 105, 82 108"
            fill="none"
            stroke="url(#barkGradient)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Right Branch */}
          <path
            d="M 138 100 C 158 92, 175 96, 192 88"
            fill="none"
            stroke="url(#barkGradient)"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Layered Foliage Clouds */}
          {/* Main Top Crown */}
          <circle cx="136" cy="56" r="28" fill="url(#leafCanopy1)" />
          <circle cx="152" cy="62" r="22" fill="url(#leafCanopy2)" opacity="0.9" />
          <circle cx="120" cy="62" r="20" fill="url(#leafCanopy2)" opacity="0.9" />

          {/* Left Foliage Cloud */}
          <circle cx="82" cy="106" r="22" fill="url(#leafCanopy1)" />
          <circle cx="96" cy="112" r="16" fill="url(#leafCanopy2)" />
          <circle cx="68" cy="110" r="15" fill="url(#leafCanopy2)" />

          {/* Right Foliage Cloud */}
          <circle cx="194" cy="86" r="24" fill="url(#leafCanopy1)" />
          <circle cx="180" cy="94" r="18" fill="url(#leafCanopy2)" />
          <circle cx="210" cy="92" r="17" fill="url(#leafCanopy2)" />

          {/* Blooming Parijat / Cherry Blossoms (Dynamic Count based on Streak) */}
          {blooms >= 1 && <circle cx="136" cy="46" r="4.5" fill="url(#sakuraPetal)" />}
          {blooms >= 2 && <circle cx="148" cy="58" r="4" fill="url(#sakuraPetal)" />}
          {blooms >= 3 && <circle cx="124" cy="58" r="4" fill="url(#sakuraPetal)" />}
          {blooms >= 4 && <circle cx="78" cy="100" r="4.5" fill="url(#sakuraPetal)" />}
          {blooms >= 5 && <circle cx="90" cy="110" r="3.8" fill="url(#sakuraPetal)" />}
          {blooms >= 6 && <circle cx="192" cy="78" r="4.5" fill="url(#sakuraPetal)" />}
          {blooms >= 7 && <circle cx="204" cy="90" r="4" fill="url(#sakuraPetal)" />}
          {blooms >= 8 && <circle cx="182" cy="88" r="3.8" fill="url(#sakuraPetal)" />}
          {blooms >= 9 && <circle cx="142" cy="70" r="4" fill="url(#sakuraPetal)" />}
          {blooms >= 10 && <circle cx="160" cy="50" r="4.5" fill="url(#sakuraPetal)" />}
        </svg>

        {/* Tree Vitality Caption */}
        <div className="text-center px-4 mt-1">
          <p className="text-xs font-bold text-emerald-300 font-mono flex items-center justify-center gap-1.5">
            <span>🌸</span>
            <span>{blooms} / 10 Parijat Blossoms in Full Bloom</span>
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">
            {isCheckedInToday
              ? '✓ Today’s check-in recorded! Your mindful daily checks keep this sacred tree flourishing.'
              : 'Tap your financial vibe below to nurture today’s bloom.'}
          </p>
        </div>
      </div>

      {/* 3D TACTILE VIBE SEALS (1 STREAK PER DAY) */}
      <div className="space-y-2 mt-4">
        <div className="flex items-center justify-between text-[10px] font-bold text-stone-400 font-mono">
          <span className="uppercase tracking-widest">
            Today’s 5-Second Mindful Vibe Seal:
          </span>
          <span className={isCheckedInToday ? 'text-emerald-400' : 'text-amber-400'}>
            {isCheckedInToday ? '✓ 1 Streak per Day (Tap to change)' : 'Tap 1 to check in today'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Bachat Seal */}
          <button
            onClick={() => handleVibe('bachat')}
            className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-95 relative overflow-hidden ${
              currentVibe === 'bachat'
                ? 'bg-emerald-950/90 border-emerald-400 ring-2 ring-emerald-500/60 shadow-lg shadow-emerald-950 scale-[1.02]'
                : 'bg-stone-950/70 border-emerald-900/50 hover:bg-stone-800 text-stone-300'
            }`}
          >
            {currentVibe === 'bachat' && (
              <span className="absolute top-2 right-2 flex items-center gap-0.5 text-[8px] bg-emerald-500 text-stone-950 font-black px-1.5 py-0.2 rounded-full font-mono">
                <Check className="w-2.5 h-2.5 stroke-[3]" /> TODAY
              </span>
            )}
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-2">
              <Leaf className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-emerald-300 leading-tight">
              Bachat Day
            </h4>
            <span className="text-[9px] text-stone-400 block mt-0.5 font-mono">
              ₹0 Spent • Cooked
            </span>
          </button>

          {/* Santulit Seal */}
          <button
            onClick={() => handleVibe('santulit')}
            className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-95 relative overflow-hidden ${
              currentVibe === 'santulit'
                ? 'bg-amber-950/90 border-amber-400 ring-2 ring-amber-500/60 shadow-lg shadow-amber-950 scale-[1.02]'
                : 'bg-stone-950/70 border-amber-900/50 hover:bg-stone-800 text-stone-300'
            }`}
          >
            {currentVibe === 'santulit' && (
              <span className="absolute top-2 right-2 flex items-center gap-0.5 text-[8px] bg-amber-400 text-stone-950 font-black px-1.5 py-0.2 rounded-full font-mono">
                <Check className="w-2.5 h-2.5 stroke-[3]" /> TODAY
              </span>
            )}
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-2">
              <Sun className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-amber-300 leading-tight">
              Santulit
            </h4>
            <span className="text-[9px] text-stone-400 block mt-0.5 font-mono">
              Planned Normal
            </span>
          </button>

          {/* Kharchila (Honest Admission) Seal */}
          <button
            onClick={() => handleVibe('kharchila')}
            className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-95 relative overflow-hidden ${
              currentVibe === 'kharchila'
                ? 'bg-rose-950/90 border-rose-400 ring-2 ring-rose-500/60 shadow-lg shadow-rose-950 scale-[1.02]'
                : 'bg-stone-950/70 border-rose-900/50 hover:bg-stone-800 text-stone-300'
            }`}
          >
            {currentVibe === 'kharchila' && (
              <span className="absolute top-2 right-2 flex items-center gap-0.5 text-[8px] bg-rose-400 text-stone-950 font-black px-1.5 py-0.2 rounded-full font-mono">
                <Check className="w-2.5 h-2.5 stroke-[3]" /> TODAY
              </span>
            )}
            <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400 mb-2">
              <Heart className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-rose-300 leading-tight">
              Kharchila
            </h4>
            <span className="text-[9px] text-stone-400 block mt-0.5 font-mono">
              Honest Truth
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
