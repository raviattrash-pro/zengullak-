import React from 'react';
import { sounds } from '../utils/audio';
import { PiggyBank, Snowflake, Film, Sparkles, Receipt, ChevronDown } from 'lucide-react';

export default function Navbar({ activeTab, onSelectTab, role, onSwitchProfile }) {
  const TABS = [
    { id: 'counter', label: 'Gullak', icon: PiggyBank },
    { id: 'hisab', label: 'Hisab', icon: Receipt },
    { id: 'icebox', label: 'Icebox', icon: Snowflake },
    { id: 'reels', label: 'Reels', icon: Film },
    { id: 'danshari', label: 'Danshari', icon: Sparkles },
  ];

  const roleMeta = {
    parent: { label: 'Parent Account', avatar: '👨‍👩‍👧', badgeColor: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/40' },
    youth: { label: 'Youth / Adult', avatar: '⚡', badgeColor: 'text-cyan-400 border-cyan-500/20 bg-cyan-950/40' },
    child: { label: 'Child Account', avatar: '🧒', badgeColor: 'text-amber-400 border-amber-500/20 bg-amber-950/40' },
  }[role] || { label: 'My Account', avatar: '👤', badgeColor: 'text-white border-white/10 bg-stone-900' };

  const handleTabClick = (tabId) => {
    sounds.playTap();
    onSelectTab(tabId);
  };

  return (
    <>
      {/* 1. iOS Top Navigation Bar (Frosted Glass & Dynamic Island Persona Switcher) */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-2xl border-b border-white/[0.08] py-3 px-4 transition-all">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* App Brand Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 p-[1px] shadow-lg shadow-amber-900/20 flex items-center justify-center">
              <div className="w-full h-full rounded-[9px] bg-black flex items-center justify-center text-white text-xs font-black">
                धन
              </div>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white leading-none flex items-center gap-1">
                ZenGullak
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-bold">
                  PRO
                </span>
              </h1>
              <span className="text-[10px] text-stone-400 font-medium tracking-wide">
                Japanese Wealth Secrets
              </span>
            </div>
          </div>

          {/* iOS Dynamic Island Account Pill (Click to Switch User) */}
          <button
            onClick={() => {
              sounds.playTap();
              onSwitchProfile();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-150 active:scale-95 cursor-pointer shadow-sm hover:brightness-110 ${roleMeta.badgeColor}`}
            title="Tap to Switch Profile (Parent, Youth, Child)"
          >
            <span className="text-sm">{roleMeta.avatar}</span>
            <span className="font-medium tracking-tight text-[11px]">{roleMeta.label}</span>
            <ChevronDown className="w-3 h-3 text-stone-400" />
          </button>
        </div>
      </header>

      {/* 2. Native iOS Bottom Tab Bar (Fixed Bottom Navigation with Safe Blur & Vibrancy) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-2xl border-t border-white/[0.08] pb-[max(env(safe-area-inset-bottom),8px)] pt-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
        <div className="max-w-md mx-auto flex items-center justify-around px-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 cursor-pointer active:scale-90 ${
                  isActive
                    ? 'text-emerald-400 font-bold'
                    : 'text-stone-400 hover:text-stone-200 font-medium'
                }`}
              >
                {/* Active Apple Glow Capsule Indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-white/[0.08] border border-white/10 rounded-2xl -z-10 shadow-inner" />
                )}

                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />
                <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                  {tab.label}
                </span>

                {/* Micro Dot */}
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-emerald-400 mt-0.5 shadow-[0_0_6px_#10b981]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
