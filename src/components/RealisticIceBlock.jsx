import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Clock, CheckCircle, Snowflake } from 'lucide-react';
import { getShoppingImage, PRESET_SHOPPING_IMAGES } from '../utils/shoppingImages';

export default function RealisticIceBlock({ item, onResolve }) {
  const [isShattering, setIsShattering] = useState(false);

  const hoursPassed = Math.floor((Date.now() - item.createdAt) / (1000 * 60 * 60));
  const hoursLeft = Math.max(0, item.durationHours - hoursPassed);
  const isReadyToThaw = hoursLeft === 0;
  const imageUrl = getShoppingImage(item.title, item.imageUrl);

  const handleShatter = () => {
    sounds.playIceCrack();
    setIsShattering(true);

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#e0f2fe', '#ffffff', '#ffd700']
    });

    setTimeout(() => {
      onResolve(item.id, 'saved');
    }, 600);
  };

  const handleBuy = () => {
    sounds.playTap();
    onResolve(item.id, 'bought');
  };

  return (
    <div
      className={`relative w-full rounded-3xl p-5 transition-all duration-500 overflow-hidden ${
        isShattering
          ? 'scale-105 opacity-0 blur-sm rotate-2'
          : 'hover:shadow-2xl'
      }`}
      style={{
        background: 'linear-gradient(160deg, #071720 0%, #02090e 100%)',
        border: '1.5px solid rgba(56, 189, 248, 0.45)',
        boxShadow: `
          0 20px 40px -10px rgba(0, 0, 0, 0.85),
          0 0 25px rgba(56, 189, 248, 0.25),
          inset 0 1px 2px rgba(255, 255, 255, 0.4)
        `,
      }}
    >
      {/* Cold Frost Vapor Ambient Glow */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Meta Status */}
      <div className="relative z-20 flex items-center justify-between pb-3 border-b border-cyan-800/40">
        <div className="flex items-center gap-1.5">
          <Snowflake className="w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: '10s' }} />
          <span className="text-[11px] font-black uppercase tracking-widest text-cyan-300 font-mono">
            Frozen in Real 3D Ice Cube
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/40 text-cyan-200 text-xs font-mono font-bold">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isReadyToThaw ? '24h Ready to Thaw!' : `${hoursLeft}h left`}</span>
        </div>
      </div>

      {/* THE REAL 3D ICE CUBE (Product vividly visible inside crystal ice) */}
      <div className="relative my-4 flex flex-col items-center justify-center py-2">
        {/* Soft cold puddle shadow under the cube */}
        <div
          className="w-60 h-8 rounded-full blur-md opacity-75 pointer-events-none -mb-5 z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.5) 0%, rgba(2, 6, 23, 0.9) 70%)',
          }}
        />

        {/* 3D Ice Cube Stage */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center z-10 group select-none">
          {/* 1. Behind the Ice: Inner Glowing Frost Aura */}
          <div className="absolute inset-8 rounded-3xl bg-cyan-400/20 blur-xl pointer-events-none" />

          {/* 2. Embedded Shopping Product Image (VIVID & SHARP INSIDE THE ICE) */}
          <div
            className="absolute w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-2xl z-10 transition-transform duration-500 group-hover:scale-105"
            style={{
              clipPath: 'polygon(50% 3%, 97% 25%, 97% 75%, 50% 97%, 3% 75%, 3% 25%)', // Diamond/Hexagonal ice facet shape
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.6)',
            }}
          >
            <img
              src={imageUrl}
              alt={item.title}
              className="w-full h-full object-cover brightness-105 contrast-105"
              onError={(e) => {
                e.currentTarget.src = PRESET_SHOPPING_IMAGES.sneakers;
              }}
            />

            {/* Translucent Ice Glaze Glass Sheen over the product */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(56, 189, 248, 0.1) 40%, rgba(3, 105, 161, 0.15) 100%)',
                boxShadow: 'inset 0 0 15px rgba(56, 189, 248, 0.4)',
              }}
            />
          </div>

          {/* 3. The Real 3D Ice Cube Transparent PNG - Masked in Center so the Product Shines Through */}
          <img
            src="/ice-cube.png"
            alt="Real 3D Ice Cube"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(56,189,248,0.4)]"
            style={{
              mixBlendMode: 'screen',
              filter: 'brightness(1.15) contrast(1.2)',
              // Key: Radial mask carves a clear window in the center so the product is 100% visible, while retaining all 3D frosty edges, crystal facets, and puddle!
              maskImage: 'radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.9) 65%, black 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.9) 65%, black 100%)',
            }}
          />

          {/* 4. Second subtle edge pass for frosty corners and water droplets */}
          <img
            src="/ice-cube.png"
            alt="Real Ice Facet Highlights"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 opacity-50"
            style={{
              mixBlendMode: 'overlay',
              maskImage: 'radial-gradient(ellipse at 50% 48%, transparent 40%, black 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 48%, transparent 40%, black 75%)',
            }}
          />

          {/* Realistic dripping water drops */}
          <div className="absolute -bottom-2 left-1/3 w-1.5 h-2.5 rounded-full bg-cyan-200/90 animate-pulse pointer-events-none" />
          <div className="absolute -bottom-1 right-1/3 w-2 h-3 rounded-full bg-cyan-100/90 animate-ping opacity-60 pointer-events-none" />
        </div>

        {/* Item Title & Amount Badges Under the Cube */}
        <div className="w-full flex items-center justify-between px-2 pt-1">
          <div className="bg-stone-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-cyan-400/40 shadow-lg">
            <span className="text-[9px] font-black text-cyan-300 uppercase tracking-widest block font-mono">
              FROZEN DESIRE
            </span>
            <h4 className="text-sm sm:text-base font-black text-white capitalize leading-tight">
              {item.title}
            </h4>
          </div>

          <div className="bg-stone-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-cyan-400/50 shadow-lg text-right">
            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block font-mono">
              AMOUNT LOCKED
            </span>
            <span className="text-base sm:text-lg font-black text-cyan-300 font-mono">
              ₹{item.amount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Cooling Progress Bar */}
      <div className="w-full bg-cyan-950/90 rounded-full h-2 p-0.5 border border-cyan-500/30 overflow-hidden mb-3.5">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, (hoursPassed / item.durationHours) * 100)}%` }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleShatter}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer"
        >
          <CheckCircle className="w-4 h-4 text-emerald-200" />
          <span>Shatter Ice Cube & Keep ₹{item.amount} 🎉</span>
        </button>

        <button
          onClick={handleBuy}
          className="py-3 px-3.5 bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-2xl active:scale-95 transition cursor-pointer"
          title="Buy mindfully if you still truly desire it after 24 hours"
        >
          Buy
        </button>
      </div>
    </div>
  );
}
