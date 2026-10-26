import React from 'react';

// Official RBI Indian Coin Specifications
// ₹20: 12-sided Dodecagon, Bimetallic (Nickel-Brass outer + Nickel-Silver core)
// ₹10: Round Bimetallic (Aluminium-Bronze outer + Cupro-Nickel core)
// ₹5: Nickel-Brass / Brass circular
// ₹2: Ferritic Stainless Steel circular
// ₹1: Ferritic Stainless Steel circular

export default function RealisticCoin({ value = 10, onClick, size = 'md', className = '' }) {
  const val = Number(value);

  // Size mappings
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14 sm:w-16 sm:h-16',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  const isBimetal = val === 20 || val === 10;
  const isDodecagon = val === 20;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      title={`Indian ₹${val} Coin - Tap to inspect or drop`}
      className={`group relative ${sizeMap[size] || sizeMap.md} select-none cursor-pointer transition-all duration-200 transform-gpu hover:scale-110 active:scale-95 flex items-center justify-center ${className}`}
    >
      {/* 3D Physical Coin Shadow */}
      <div className="absolute inset-0 rounded-full bg-black/60 blur-md transform translate-y-1.5 pointer-events-none group-hover:translate-y-2.5 transition-transform" />

      {/* SVG Vector Coin with Micro-embossing and Bas-Relief Luster */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
      >
        <defs>
          {/* Outer Ring Gradients */}
          {/* ₹20 / ₹10 Golden Brass Outer */}
          <radialGradient id="brassOuter" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fff3b0" />
            <stop offset="25%" stopColor="#ffd24d" />
            <stop offset="60%" stopColor="#d49e1e" />
            <stop offset="90%" stopColor="#9a6c07" />
            <stop offset="100%" stopColor="#5c3f02" />
          </radialGradient>

          {/* ₹10 / ₹20 Silver Core */}
          <radialGradient id="silverCore" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f0f3f6" />
            <stop offset="70%" stopColor="#c8d1d8" />
            <stop offset="95%" stopColor="#8d99a2" />
            <stop offset="100%" stopColor="#55616b" />
          </radialGradient>

          {/* ₹5 Pure Golden Brass */}
          <radialGradient id="pureBrass" cx="32%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#fff0a6" />
            <stop offset="30%" stopColor="#f5be23" />
            <stop offset="70%" stopColor="#c48a08" />
            <stop offset="95%" stopColor="#875800" />
            <stop offset="100%" stopColor="#4f3300" />
          </radialGradient>

          {/* ₹2 & ₹1 Stainless Steel */}
          <radialGradient id="steelCore" cx="33%" cy="33%" r="67%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#e8ecef" />
            <stop offset="65%" stopColor="#b0bcc6" />
            <stop offset="95%" stopColor="#6e7b87" />
            <stop offset="100%" stopColor="#424c54" />
          </radialGradient>

          {/* Dynamic Specular Sheen */}
          <linearGradient id="coinSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
          </linearGradient>

          {/* Milled Ridge Pattern for Coin Rim */}
          <pattern id="milledEdge" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="4" stroke="#333" strokeWidth="1" opacity="0.3" />
          </pattern>
        </defs>

        {/* 1. Coin Outer Perimeter & Rim */}
        {isDodecagon ? (
          // ₹20 12-Sided Polygon (Dodecagon)
          <polygon
            points="
              50,2   74,8   92,26  98,50  92,74  74,92
              50,98  26,92  8,74   2,50   8,26   26,8
            "
            fill="url(#brassOuter)"
            stroke="#6e4d03"
            strokeWidth="1.5"
          />
        ) : (
          // Round Coins (₹10, ₹5, ₹2, ₹1)
          <circle
            cx="50"
            cy="50"
            r="48"
            fill={
              val === 10 ? 'url(#brassOuter)' :
              val === 5 ? 'url(#pureBrass)' : 'url(#steelCore)'
            }
            stroke={
              val === 10 ? '#6e4d03' :
              val === 5 ? '#5c3d00' : '#455059'
            }
            strokeWidth="1.5"
          />
        )}

        {/* 2. Milled Reeding Rim Border */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="1.5"
          strokeDasharray="1.5, 1"
        />
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.8"
        />

        {/* 3. Bimetallic Inner Core (₹20 and ₹10) */}
        {isBimetal && (
          <>
            {/* Core Shadow & Inset */}
            <circle
              cx="50"
              cy="50"
              r="33"
              fill="url(#silverCore)"
              stroke="#687682"
              strokeWidth="1"
            />
            {/* Inset Ring Groove */}
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="0.8"
            />
            <circle
              cx="50"
              cy="50"
              r="31"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.5"
            />
          </>
        )}

        {/* 4. Ashoka Lion Capital (Emblem) Micro-Engraving on Upper Arc */}
        <g transform="translate(42, 14) scale(0.16)" opacity="0.9">
          {/* Lion Capital Base & Pillars */}
          <path
            d="M 12 70 L 88 70 L 82 82 L 18 82 Z"
            fill={isBimetal ? '#3e2723' : val === 5 ? '#4a2c00' : '#263238'}
          />
          {/* Dharma Chakra Central Wheel */}
          <circle
            cx="50"
            cy="76"
            r="5"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
          />
          {/* Three Lions Silhouette */}
          <path
            d="M 22 28 C 15 35, 20 65, 30 68 C 35 68, 38 60, 42 60 C 44 60, 46 68, 54 68 C 62 68, 65 60, 68 60 C 72 60, 75 68, 80 68 C 90 65, 95 35, 88 28 C 82 20, 75 25, 70 25 C 65 15, 45 15, 40 25 C 35 25, 28 20, 22 28 Z"
            fill={isBimetal ? '#3e2723' : val === 5 ? '#4a2c00' : '#263238'}
          />
        </g>

        {/* 5. Bilingual National Inscription: "भारत" (Left) and "INDIA" (Right) */}
        <text
          x="28"
          y={isBimetal ? '29' : '26'}
          fontSize="5.5"
          fontWeight="900"
          fontFamily="serif"
          textAnchor="middle"
          fill={isBimetal ? '#4a2e05' : val === 5 ? '#4a2c00' : '#263238'}
        >
          भारत
        </text>
        <text
          x="72"
          y={isBimetal ? '29' : '26'}
          fontSize="5.2"
          fontWeight="900"
          fontFamily="sans-serif"
          textAnchor="middle"
          letterSpacing="0.4"
          fill={isBimetal ? '#4a2e05' : val === 5 ? '#4a2c00' : '#263238'}
        >
          INDIA
        </text>

        {/* 6. Indian Rupee Symbol "₹" and Denomination Numeral */}
        {/* Wheat Grain Sprigs flanking the value (Authentic Indian coin design) */}
        <g stroke={isBimetal ? '#37474f' : val === 5 ? '#4a2c00' : '#263238'} strokeWidth="1" fill="none" opacity="0.75">
          {/* Left Wheat Stalk */}
          <path d="M 28 58 Q 24 50, 27 42" />
          <ellipse cx="25" cy="45" rx="1.5" ry="2.8" transform="rotate(-30 25 45)" fill={isBimetal ? '#37474f' : val === 5 ? '#4a2c00' : '#263238'} />
          <ellipse cx="26" cy="52" rx="1.5" ry="2.8" transform="rotate(-35 26 52)" fill={isBimetal ? '#37474f' : val === 5 ? '#4a2c00' : '#263238'} />

          {/* Right Wheat Stalk */}
          <path d="M 72 58 Q 76 50, 73 42" />
          <ellipse cx="75" cy="45" rx="1.5" ry="2.8" transform="rotate(30 75 45)" fill={isBimetal ? '#37474f' : val === 5 ? '#4a2c00' : '#263238'} />
          <ellipse cx="74" cy="52" rx="1.5" ry="2.8" transform="rotate(35 74 52)" fill={isBimetal ? '#37474f' : val === 5 ? '#4a2c00' : '#263238'} />
        </g>

        {/* Prominent Denomination with 3D Bas-Relief Embossing */}
        <g filter="drop-shadow(0 1px 1px rgba(255,255,255,0.85))">
          {/* Rupee Symbol */}
          <text
            x={val >= 10 ? '38' : '41'}
            y="54"
            fontSize="11"
            fontWeight="900"
            fontFamily="sans-serif"
            textAnchor="middle"
            fill={isBimetal ? '#212121' : val === 5 ? '#3e2723' : '#1e293b'}
          >
            ₹
          </text>
          {/* Numeral */}
          <text
            x={val >= 10 ? '58' : '55'}
            y="56"
            fontSize={val >= 10 ? '21' : '23'}
            fontWeight="900"
            fontFamily="sans-serif"
            textAnchor="middle"
            letterSpacing="-0.8"
            fill={isBimetal ? '#212121' : val === 5 ? '#3e2723' : '#1e293b'}
          >
            {val}
          </text>
        </g>

        {/* 7. Bottom Arc: Satyameva Jayate / Year of Minting & Mint Mark */}
        <text
          x="50"
          y="71"
          fontSize="4.2"
          fontWeight="bold"
          fontFamily="serif"
          textAnchor="middle"
          fill={isBimetal ? '#37474f' : val === 5 ? '#4a2c00' : '#37474f'}
        >
          सत्यमेव जयते
        </text>

        {/* Mint Year & Diamond Mint Mark (Mumbai Mint) */}
        <text
          x="50"
          y={isBimetal ? '80' : '82'}
          fontSize="5.2"
          fontWeight="900"
          fontFamily="monospace"
          textAnchor="middle"
          letterSpacing="0.8"
          fill={isBimetal ? '#4a2e05' : val === 5 ? '#4a2c00' : '#263238'}
        >
          2026
        </text>
        {/* Diamond Mint Mark Symbol (◆) */}
        <polygon
          points="50,83 51.5,84.5 50,86 48.5,84.5"
          fill={isBimetal ? '#4a2e05' : val === 5 ? '#4a2c00' : '#263238'}
        />

        {/* 8. Diagonal Metallic Gleam Layer */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#coinSheen)"
          pointerEvents="none"
          className="mix-blend-overlay opacity-60"
        />
      </svg>
    </div>
  );
}
