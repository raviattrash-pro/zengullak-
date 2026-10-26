import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Heart, RotateCcw } from 'lucide-react';
import RealisticCoin from './RealisticCoin';
import RealisticBanknote from './RealisticBanknote';

export default function RealisticGullak({
  balance,
  dreamGoal,
  onAddFunds,
  role,
  onParentMatch,
  onResetGullak,
  externalAnimationEvent,
}) {
  const containerRef = useRef(null);
  const slotRef = useRef(null);

  const [flyingItems, setFlyingItems] = useState([]); // [{ id, value, type, startX, startY, deltaX, deltaY }]
  const [floatingGains, setFloatingGains] = useState([]); // [{ id, value, x, y }]
  const [isWobbling, setIsWobbling] = useState(false);
  const [showSlotSparks, setShowSlotSparks] = useState(false);

  const target = dreamGoal?.targetAmount || 3000;
  const progressPercent = Math.min(100, Math.round((balance / target) * 100));

  // Triggered when an external note/coin is tapped in the cash register below
  useEffect(() => {
    if (externalAnimationEvent) {
      handleMoneyClick(null, externalAnimationEvent.value, externalAnimationEvent.type, false);
    }
  }, [externalAnimationEvent]);

  const handleMoneyClick = (e, value, type = 'coin', shouldAddFunds = true) => {
    let startX = 60;
    let startY = 320;
    let deltaX = 180;
    let deltaY = -270;

    const containerEl = containerRef.current;
    const slotEl = slotRef.current;

    if (containerEl && slotEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const slotRect = slotEl.getBoundingClientRect();

      const slotCenter = {
        x: slotRect.left + slotRect.width / 2 - containerRect.left,
        y: slotRect.top + slotRect.height / 2 - containerRect.top,
      };

      if (e && e.currentTarget) {
        const clickRect = e.currentTarget.getBoundingClientRect();
        startX = clickRect.left + clickRect.width / 2 - containerRect.left;
        startY = clickRect.top + clickRect.height / 2 - containerRect.top;
      } else {
        // External tap from Cash Register below
        startX = containerRect.width / 2;
        startY = containerRect.height + 30;
      }

      deltaX = slotCenter.x - startX;
      deltaY = slotCenter.y - startY;
    }

    const newItemId = Date.now() + Math.random();
    const newFlyingItem = {
      id: newItemId,
      value,
      type,
      startX,
      startY,
      deltaX,
      deltaY,
    };

    setFlyingItems((prev) => [...prev, newFlyingItem]);
    sounds.playTap();

    // 580ms: Moment the coin/note slices through the ceramic slit
    setTimeout(() => {
      if (type === 'coin') {
        sounds.playCoin();
      } else {
        sounds.playNote();
      }

      setIsWobbling(true);
      setShowSlotSparks(true);

      const gainId = Date.now() + Math.random();
      const slotPos = slotEl && containerEl ? {
        x: slotEl.getBoundingClientRect().left + slotEl.getBoundingClientRect().width / 2 - containerEl.getBoundingClientRect().left,
        y: slotEl.getBoundingClientRect().top - containerEl.getBoundingClientRect().top,
      } : { x: startX + deltaX, y: startY + deltaY };

      setFloatingGains((prev) => [...prev, { id: gainId, value, x: slotPos.x, y: slotPos.y }]);

      setTimeout(() => {
        setFloatingGains((prev) => prev.filter((g) => g.id !== gainId));
      }, 850);

      if (shouldAddFunds) {
        onAddFunds(value);
      }

      setTimeout(() => setShowSlotSparks(false), 350);
      setTimeout(() => setIsWobbling(false), 450);

      setFlyingItems((prev) => prev.filter((item) => item.id !== newItemId));

      if (progressPercent >= 90) {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.65 }
        });
      }
    }, 580);
  };

  const handleParentMatchBonus = (e) => {
    sounds.playSuccess();
    // Pass false to shouldAddFunds so funds are only added ONCE via onParentMatch(50)
    handleMoneyClick(e, 50, 'coin', false);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onParentMatch) onParentMatch(50);
  };

  const handleResetClick = () => {
    sounds.playTap();
    if (window.confirm('Empty / Reset your Gullak back to ₹0? (गुल्लक खाली करें)')) {
      sounds.playIceCrack();
      if (onResetGullak) onResetGullak();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative apple-card rounded-[32px] p-6 shadow-2xl overflow-hidden select-none"
      style={{
        background: 'radial-gradient(circle at 75% 20%, rgba(217, 107, 52, 0.16) 0%, rgba(20, 20, 26, 0.94) 55%, rgba(12, 12, 16, 0.98) 100%)',
      }}
    >
      {/* Terracotta Clay Warm Ambient Glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-600/[0.12] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-orange-700/[0.08] rounded-full blur-3xl pointer-events-none" />

      {/* DYNAMIC 3D FLYING COINS & BANKNOTES (CURVING UPWARD FROM TRAY DIRECTLY INTO POT SLIT) */}
      {flyingItems.map((item) => (
        <div
          key={item.id}
          className={`absolute z-50 pointer-events-none ${
            item.type === 'coin' ? 'animate-fly-coin-curve' : 'animate-fly-note-curve'
          }`}
          style={{
            left: `${item.startX}px`,
            top: `${item.startY}px`,
            '--dx': `${item.deltaX}px`,
            '--dy': `${item.deltaY}px`,
            transformOrigin: 'center center',
            marginLeft: item.type === 'coin' ? '-24px' : '-44px',
            marginTop: item.type === 'coin' ? '-24px' : '-22px',
          }}
        >
          {item.type === 'coin' ? (
            <RealisticCoin value={item.value} size="md" />
          ) : (
            <RealisticBanknote value={item.value} size="mini" />
          )}
        </div>
      ))}

      {/* FLOATING +₹ REWARD BADGES RISING FROM COIN SLIT ON ENTRY */}
      {floatingGains.map((gain) => (
        <div
          key={gain.id}
          className="absolute z-50 pointer-events-none animate-float-gain font-mono font-black text-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.9)] text-sm sm:text-base"
          style={{
            left: `${gain.x}px`,
            top: `${gain.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          +₹{gain.value}
        </div>
      ))}

      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5 font-mono">
            <Trophy className="w-3.5 h-3.5" />
            {role === 'child' ? 'Mera Mitti Ka Gullak 🏺' : 'Terracotta Earthen Gullak (गुल्लक)'}
          </span>
          <div className="flex items-center gap-2.5 mt-1">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              ₹{balance.toLocaleString('en-IN')}
            </h2>
            {balance > 0 && (
              <button
                onClick={handleResetClick}
                className="text-[10px] font-bold text-stone-300 hover:text-amber-300 apple-pill px-2.5 py-1 rounded-full font-mono flex items-center gap-1 transition active:scale-95 cursor-pointer shadow-sm hover:border-amber-400/40"
                title="Empty & Reset Gullak to ₹0"
              >
                <RotateCcw className="w-3 h-3 text-amber-400" />
                <span>Reset ↺</span>
              </button>
            )}
          </div>
          <p className="text-xs text-stone-400 font-medium mt-0.5">
            {role === 'child' ? 'Tap real coins & notes below to feed Gullak!' : 'Real cash & coins drop directly into the clay pot'}
          </p>
        </div>

        {/* 3D Realistic Terracotta Clay Gullak Container */}
        <div className="relative flex flex-col items-center">
          {/* Ceramic Slit Anchor Target for Dynamic Flight Tracking */}
          <div
            ref={slotRef}
            className="absolute top-[35px] left-1/2 -translate-x-1/2 w-8 h-2 pointer-events-none z-30"
          />

          {/* Golden Slot Sparks Burst on Entry */}
          {showSlotSparks && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-slot-spark flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-yellow-300 fill-yellow-300 drop-shadow-[0_0_12px_#ffd700]" />
            </div>
          )}

          {/* Terracotta Earthen Pot SVG */}
          <div
            onClick={(e) => handleMoneyClick(e, 20, 'coin', true)}
            role="button"
            tabIndex={0}
            title="Tap pot to drop a ₹20 coin!"
            className={`cursor-pointer select-none transition-all duration-200 ${
              isWobbling ? 'animate-pot-impact' : 'hover:scale-105 active:scale-95'
            }`}
          >
            <svg viewBox="0 0 140 140" className="w-24 h-24 drop-shadow-[0_12px_22px_rgba(0,0,0,0.7)]">
              <defs>
                <radialGradient id="clayBody" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#d96b34" />
                  <stop offset="45%" stopColor="#b3491d" />
                  <stop offset="85%" stopColor="#7a2e0e" />
                  <stop offset="100%" stopColor="#4a1805" />
                </radialGradient>

                <linearGradient id="clayGlaze" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>

              <ellipse cx="70" cy="128" rx="42" ry="7" fill="rgba(0,0,0,0.5)" />

              {/* Terracotta Pot Body */}
              <path
                d="M 45 40 Q 20 65, 24 95 Q 28 122, 70 124 Q 112 122, 116 95 Q 120 65, 95 40 Z"
                fill="url(#clayBody)"
                stroke="#541b07"
                strokeWidth="2"
              />

              {/* Ceramic Pot Neck & Rim */}
              <ellipse cx="70" cy="38" rx="26" ry="7" fill="#b3491d" stroke="#541b07" strokeWidth="2" />
              <ellipse cx="70" cy="36" rx="22" ry="5" fill="#e07a41" />

              {/* Coin Slot */}
              <rect x="52" y="34.5" width="36" height="3.5" rx="1.8" fill="#120401" stroke="#360e02" strokeWidth="1" />

              {/* Warli Art Band */}
              <path
                d="M 32 82 Q 70 92, 108 82"
                fill="none"
                stroke="rgba(255, 245, 230, 0.85)"
                strokeWidth="2.5"
                strokeDasharray="3 3"
              />
              <path
                d="M 36 94 Q 70 104, 104 94"
                fill="none"
                stroke="rgba(255, 245, 230, 0.75)"
                strokeWidth="1.5"
              />
              <polygon points="55,87 60,82 65,87" fill="rgba(255, 245, 230, 0.9)" />
              <polygon points="70,88 75,83 80,88" fill="rgba(255, 245, 230, 0.9)" />
              <polygon points="85,87 90,82 95,87" fill="rgba(255, 245, 230, 0.9)" />

              {/* Glaze Sheen */}
              <path
                d="M 38 55 Q 32 75, 36 95"
                fill="none"
                stroke="url(#clayGlaze)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center text-[10px] font-bold text-amber-400 font-mono -mt-1 tracking-wider">
              TAP TO FEED
            </div>
          </div>
        </div>
      </div>

      {/* Dream Target Progress Bar */}
      <div className="mt-4 apple-pill rounded-[22px] p-3.5 border border-white/[0.08]">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-200 mb-1.5">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {dreamGoal?.title || 'Target Goal'}
          </span>
          <span className="text-amber-300 font-mono font-bold">
            {progressPercent}% (₹{balance.toLocaleString('en-IN')} / ₹{target.toLocaleString('en-IN')})
          </span>
        </div>

        <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden p-0.5 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[11px] text-stone-400 mt-1.5 text-right font-mono font-medium">
          ₹{Math.max(0, target - balance).toLocaleString('en-IN')} more to unlock goal!
        </p>
      </div>

      {/* REAL PHYSICAL CASH & COINS FEEDING TRAY (NO BORING TEXT BUTTONS!) */}
      <div className="mt-4 pt-3 border-t border-white/[0.08]">
        <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono mb-2.5">
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Tap real coins or notes to drop inside:
          </span>
          <span className="text-stone-500 font-mono">3D Flight into Slot 🏺</span>
        </div>

        {/* Real Cash Row: Real Metallic Coins & Real Banknotes Side-by-Side (NO WINDOWS SCROLLBAR!) */}
        <div className="flex items-center justify-between gap-2 p-3 bg-black/60 backdrop-blur-xl rounded-[24px] border border-white/[0.08] shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] overflow-x-auto no-scrollbar">
          {/* Real ₹5 Coin (For kids & micro-savings) */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <RealisticCoin
              value={5}
              size="sm"
              onClick={(e) => handleMoneyClick(e, 5, 'coin', true)}
            />
            <span className="text-[9px] font-bold text-amber-400 font-mono">₹5</span>
          </div>

          {/* Real ₹10 Coin */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <RealisticCoin
              value={10}
              size="sm"
              onClick={(e) => handleMoneyClick(e, 10, 'coin', true)}
            />
            <span className="text-[9px] font-bold text-stone-300 font-mono">₹10</span>
          </div>

          {/* Real ₹20 Coin */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <RealisticCoin
              value={20}
              size="sm"
              onClick={(e) => handleMoneyClick(e, 20, 'coin', true)}
            />
            <span className="text-[9px] font-bold text-amber-300 font-mono">₹20</span>
          </div>

          {/* Real ₹50 Mini Note */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <RealisticBanknote
              value={50}
              size="mini"
              onClick={(e) => handleMoneyClick(e, 50, 'note', true)}
            />
            <span className="text-[9px] font-bold text-cyan-300 font-mono">₹50</span>
          </div>

          {/* Real ₹100 Mini Note */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <RealisticBanknote
              value={100}
              size="mini"
              onClick={(e) => handleMoneyClick(e, 100, 'note', true)}
            />
            <span className="text-[9px] font-bold text-indigo-300 font-mono">₹100</span>
          </div>

          {/* Real ₹500 Mini Note (For Parents/Youth) */}
          {role !== 'child' ? (
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <RealisticBanknote
                value={500}
                size="mini"
                onClick={(e) => handleMoneyClick(e, 500, 'note', true)}
              />
              <span className="text-[9px] font-bold text-emerald-300 font-mono">₹500</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <RealisticBanknote
                value={20}
                size="mini"
                onClick={(e) => handleMoneyClick(e, 20, 'note', true)}
              />
              <span className="text-[9px] font-bold text-lime-300 font-mono">₹20</span>
            </div>
          )}

          {/* Parent Match Blessing Coin */}
          {(role === 'child' || role === 'parent') && (
            <button
              onClick={handleParentMatchBonus}
              className="px-2.5 py-2 bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-[10px] font-black active:scale-95 transition flex flex-col items-center justify-center gap-0.5 shadow-md cursor-pointer border border-emerald-400/40 flex-shrink-0"
              title="Parent matches ₹50 bonus for honest saving!"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>+₹50 Match</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
