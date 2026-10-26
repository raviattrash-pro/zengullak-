import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Users, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginScreen({ onSelectProfile }) {
  const PROFILES = [
    {
      id: 'parent',
      title: 'Parent',
      hindi: 'माता-पिता • Household Head',
      desc: 'Manage family monthly salary, ghar kharcha, school fees & family savings',
      badge: 'Family Salary Account',
      color: 'from-emerald-900/60 to-teal-950/80 border-emerald-500/50 hover:border-emerald-400',
      iconColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      avatar: '👨‍👩‍👧',
    },
    {
      id: 'youth',
      title: 'Adult / Youth',
      hindi: 'कॉलेज / युवा • 18-24 Yrs',
      desc: 'Track monthly stipend, canteen, travel, and freeze Swiggy & impulse orders',
      badge: 'Monthly Allowance Account',
      color: 'from-cyan-900/60 to-blue-950/80 border-cyan-500/50 hover:border-cyan-400',
      iconColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
      avatar: '⚡',
    },
    {
      id: 'child',
      title: 'Children (5–12)',
      hindi: 'बच्चे • Little Wealth Master',
      desc: 'Count real coins, feed the ceramic clay Gullak, and save for dream toys & bicycle',
      badge: 'Pocket Money Account',
      color: 'from-amber-900/60 to-orange-950/80 border-amber-500/50 hover:border-amber-400',
      iconColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      avatar: '🧒',
    },
  ];

  const handleLogin = (roleId) => {
    sounds.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#fbbf24', '#38bdf8', '#a855f7']
    });
    onSelectProfile(roleId);
  };

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] flex flex-col items-center justify-center p-4 selection:bg-emerald-500 select-none relative overflow-hidden">
      {/* Background Ambient Mesh Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-600/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-600/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* App Emblem & Title */}
        <div className="text-center space-y-2.5">
          <div className="w-16 h-16 mx-auto rounded-[22px] bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 p-[1.5px] shadow-2xl shadow-emerald-950/80 flex items-center justify-center">
            <div className="w-full h-full rounded-[20px] bg-black flex items-center justify-center text-white text-2xl font-black">
              धन
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome to ZenGullak
          </h1>
          <p className="text-xs text-stone-400 font-medium max-w-xs mx-auto leading-relaxed">
            7 Japanese Wealth Secrets adapted for Indian families. Choose your profile to begin:
          </p>
        </div>

        {/* 3 Dedicated Profile Selection Cards (Apple Style) */}
        <div className="space-y-3 pt-1">
          {PROFILES.map((p) => (
            <div
              key={p.id}
              onClick={() => handleLogin(p.id)}
              className="apple-card rounded-[28px] p-4.5 border border-white/[0.08] hover:border-white/20 shadow-xl transition-all duration-200 cursor-pointer active:scale-[0.98] group flex items-start gap-3.5"
            >
              {/* Avatar Icon */}
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl flex-shrink-0 shadow-inner ${p.iconColor}`}>
                {p.avatar}
              </div>

              {/* Text Info */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition tracking-tight">
                    {p.title}
                  </h3>
                  <span className="text-[10px] font-mono font-semibold text-stone-300 apple-pill px-2.5 py-0.5 rounded-full">
                    {p.badge}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-stone-400 block font-serif">
                  {p.hindi}
                </span>
                <p className="text-xs text-stone-300 leading-snug pt-0.5 font-medium">
                  {p.desc}
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all self-center flex-shrink-0" />
            </div>
          ))}
        </div>

        {/* Bottom Security Note */}
        <div className="text-center pt-2">
          <p className="text-[11px] text-stone-500 font-mono flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Private & Offline • Starts fresh with ₹0 balance</span>
          </p>
        </div>
      </div>
    </div>
  );
}
