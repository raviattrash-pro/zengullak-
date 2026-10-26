import React from 'react';

// Official RBI Mahatma Gandhi New Series specifications
const NOTE_SPECS = {
  500: {
    label: '500',
    wordsEn: 'FIVE HUNDRED',
    hindiVal: '५००',
    baseColor: '#47564d', // Stone Grey / Olive Tint
    darkHue: '#232f28',
    lightHue: '#e6ede8',
    accentHue: '#657a6e',
    holoColor: '#10b981',
    motifName: 'लाल किला • RED FORT',
    bleedLines: 5,
    serial: '9DL 482910',
  },
  200: {
    label: '200',
    wordsEn: 'TWO HUNDRED',
    hindiVal: '२००',
    baseColor: '#b45309', // Bright Saffron / Deep Ochre
    darkHue: '#78350f',
    lightHue: '#fef3c7',
    accentHue: '#d97706',
    holoColor: '#f59e0b',
    motifName: 'साँची स्तूप • SANCHI STUPA',
    bleedLines: 4,
    serial: '4KM 719245',
  },
  100: {
    label: '100',
    wordsEn: 'ONE HUNDRED',
    hindiVal: '१००',
    baseColor: '#4338ca', // Lavender Blue
    darkHue: '#312e81',
    lightHue: '#e0e7ff',
    accentHue: '#6366f1',
    holoColor: '#8b5cf6',
    motifName: 'रानी की वाव • RANI KI VAV',
    bleedLines: 4,
    serial: '7BC 381920',
  },
  50: {
    label: '50',
    wordsEn: 'FIFTY',
    hindiVal: '५०',
    baseColor: '#0e7490', // Fluorescent Cyan / Blue
    darkHue: '#155e75',
    lightHue: '#cffafe',
    accentHue: '#06b6d4',
    holoColor: '#14b8a6',
    motifName: 'हम्पी रथ • HAMPI CHARIOT',
    bleedLines: 0,
    serial: '2AX 661902',
  },
  20: {
    label: '20',
    wordsEn: 'TWENTY',
    hindiVal: '२०',
    baseColor: '#65a30d', // Greenish Yellow
    darkHue: '#3f6212',
    lightHue: '#ecfccb',
    accentHue: '#84cc16',
    holoColor: '#22c55e',
    motifName: 'एलोरा गुफाएँ • ELLORA CAVES',
    bleedLines: 0,
    serial: '5ET 192847',
  },
  10: {
    label: '10',
    wordsEn: 'TEN',
    hindiVal: '१०',
    baseColor: '#78350f', // Chocolate Brown
    darkHue: '#451a03',
    lightHue: '#ffedd5',
    accentHue: '#9a3412',
    holoColor: '#ea580c',
    motifName: 'सूर्य मंदिर • SUN TEMPLE',
    bleedLines: 0,
    serial: '1ZP 839201',
  },
};

export default function RealisticBanknote({ value = 500, onClick, size = 'full', className = '' }) {
  const spec = NOTE_SPECS[value] || NOTE_SPECS[500];

  // MINI SIZE (Used for compact trays like inside Gullak tray)
  if (size === 'mini') {
    return (
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        title={`Indian ₹${spec.label} Note - Tap to slide inside Gullak`}
        className={`relative w-20 h-10 sm:w-24 sm:h-12 rounded-md select-none cursor-pointer overflow-hidden transition-all duration-150 transform-gpu hover:scale-105 active:scale-95 border border-black/40 shadow-md ${className}`}
        style={{
          backgroundColor: spec.baseColor,
          boxShadow: '0 4px 10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.4)',
        }}
      >
        {/* Holographic Security Thread Strip */}
        <div
          className="absolute top-0 bottom-0 left-[30%] w-1.5 opacity-90 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${spec.holoColor} 0%, #fff 50%, ${spec.holoColor} 100%)`,
          }}
        />

        <div className="relative z-10 w-full h-full p-1 flex flex-col justify-between border border-white/25 rounded m-0.5">
          <div className="flex items-center justify-between text-[6px] font-bold text-white leading-none">
            <span className="font-serif">भारतीय रिज़र्व बैंक</span>
            <span className="font-mono text-amber-300">₹{spec.label}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-4 h-4 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-[5px] text-white font-serif">
              अशोक
            </div>
            <span className="text-sm font-black text-white font-mono drop-shadow">
              ₹{spec.label}
            </span>
          </div>
          <div className="flex items-center justify-between text-[5px] text-white/70 font-mono leading-none">
            <span>RBI</span>
            <span>{spec.motifName.split('•')[1] || 'INDIA'}</span>
          </div>
        </div>
      </div>
    );
  }

  // FULL DETAILED SIZE (Used in Cash Register, Set Budget Modal, and Money Viewer)
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      title={`Indian ₹${spec.label} Banknote (Mahatma Gandhi New Series)`}
      className={`relative w-full aspect-[2.35/1] rounded-xl select-none cursor-pointer overflow-hidden transition-all duration-200 transform-gpu hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] border border-black/40 ${className}`}
      style={{
        backgroundColor: spec.baseColor,
        boxShadow: `
          0 14px 28px -4px rgba(0, 0, 0, 0.7),
          0 6px 10px -2px rgba(0, 0, 0, 0.5),
          inset 0 1px 2px rgba(255, 255, 255, 0.4),
          inset 0 -1px 2px rgba(0, 0, 0, 0.6)
        `,
      }}
    >
      {/* 1. Micro Guilloche Background Security Patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`guilloche-bg-${value}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="14" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            <circle cx="16" cy="16" r="8" fill="none" stroke="#ffffff" strokeWidth="0.4" />
            <path d="M0 16 Q 8 0, 16 16 T 32 16" fill="none" stroke="#ffffff" strokeWidth="0.4" />
            <path d="M16 0 Q 32 8, 16 16 T 16 32" fill="none" stroke="#ffffff" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#guilloche-bg-${value})`} />
      </svg>

      {/* 2. Paper Linen Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* 3. Windowed Holographic Security Thread Strip (~30% from left) */}
      <div
        className="absolute top-0 bottom-0 left-[29%] w-2 sm:w-2.5 opacity-95 pointer-events-none flex flex-col justify-around items-center z-20 shadow-md"
        style={{
          background: `linear-gradient(180deg, ${spec.holoColor} 0%, #ffffff 25%, ${spec.holoColor} 50%, #ffffff 75%, ${spec.holoColor} 100%)`,
          boxShadow: '0 0 6px rgba(255, 255, 255, 0.6), inset 0 0 1px rgba(0,0,0,0.5)',
        }}
      >
        <span className="text-[5.5px] font-black text-black/90 font-mono rotate-90 tracking-tighter">RBI</span>
        <span className="text-[5.5px] font-black text-black/90 font-serif rotate-90 tracking-tighter">भारत</span>
        <span className="text-[5.5px] font-black text-black/90 font-mono rotate-90 tracking-tighter">₹{spec.label}</span>
      </div>

      {/* 4. Left & Right Tactile Bleed Lines (For visually impaired) */}
      {spec.bleedLines > 0 && (
        <>
          {/* Left bleed lines */}
          <div className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-20">
            {Array.from({ length: spec.bleedLines }).map((_, i) => (
              <div key={i} className="w-1 h-3 bg-white/70 rounded-full shadow-sm" />
            ))}
          </div>
          {/* Right bleed lines */}
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-20">
            {Array.from({ length: spec.bleedLines }).map((_, i) => (
              <div key={i} className="w-1 h-3 bg-white/70 rounded-full shadow-sm" />
            ))}
          </div>
        </>
      )}

      {/* 5. Banknote Inner Decorative Frame */}
      <div className="relative z-10 w-full h-full p-2 sm:p-2.5 flex flex-col justify-between border border-white/30 rounded-lg m-0.5">
        {/* Top Header: Bilingual Reserve Bank of India */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* RBI Seal Emblem */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/50 flex items-center justify-center bg-black/25 shadow-inner">
              <span className="text-[7px] font-serif font-black text-amber-300">RBI</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9.5px] sm:text-[11px] font-bold text-white tracking-wide font-serif leading-none drop-shadow">
                भारतीय रिज़र्व बैंक
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] font-semibold text-white/90 tracking-wider font-sans leading-none mt-0.5">
                RESERVE BANK OF INDIA
              </span>
              <span className="text-[5.5px] sm:text-[6.5px] text-white/70 tracking-tight font-serif leading-none mt-0.5">
                केन्द्रीय सरकार द्वारा प्रत्याभूत • GUARANTEED BY THE CENTRAL GOVERNMENT
              </span>
            </div>
          </div>

          {/* Top Right: Devanagari Numeral & Ascending Serial */}
          <div className="text-right">
            <span className="text-xs sm:text-base font-black text-amber-300 font-serif drop-shadow">
              ₹ {spec.hindiVal}
            </span>
            <div className="text-[7px] sm:text-[8.5px] font-mono text-emerald-300 font-bold tracking-widest leading-none mt-0.5 drop-shadow">
              {spec.serial}
            </div>
          </div>
        </div>

        {/* Center Section: Ashoka Lion Watermark, Governor Promise, Gandhi Portrait & Denomination */}
        <div className="flex items-center justify-between my-auto px-1 sm:px-2">
          {/* Left: Ashoka Lion Capital Watermark Oval */}
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/40 bg-black/15 flex flex-col items-center justify-center text-center p-0.5 shadow-inner">
            {/* Ashoka Stambh Vector Lion Capital */}
            <svg viewBox="0 0 60 70" className="w-7 h-7 sm:w-8 sm:h-8 fill-white/80 drop-shadow">
              <path d="M 10 50 L 50 50 L 46 60 L 14 60 Z" />
              <circle cx="30" cy="55" r="3.5" fill="none" stroke="#222" strokeWidth="1" />
              <path d="M 16 20 C 10 26, 14 46, 22 48 C 26 48, 28 42, 30 42 C 32 42, 34 48, 38 48 C 46 46, 50 26, 44 20 C 40 14, 35 18, 30 18 C 25 18, 20 14, 16 20 Z" />
            </svg>
            <span className="text-[5px] sm:text-[6px] text-white/80 font-serif leading-none mt-0.5">
              सत्यमेव जयते
            </span>
          </div>

          {/* Center: RBI Governor Promise Clause & Official Signature */}
          <div className="flex-1 px-2 sm:px-3 text-center hidden xs:block">
            <p className="text-[6.5px] sm:text-[7.5px] text-white/95 leading-tight font-serif drop-shadow">
              मैं धारक को {spec.hindiVal} रुपये अदा करने का वचन देता हूँ।
            </p>
            <p className="text-[6px] sm:text-[7px] text-white/80 leading-tight tracking-tight mt-0.5">
              I PROMISE TO PAY THE BEARER THE SUM OF {spec.wordsEn} RUPEES
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-1 border-t border-white/20 pt-0.5">
              <div className="w-12 h-3 border-b border-white/50 text-[6px] text-amber-200 italic font-serif leading-none">
                शक्तिकांत दास
              </div>
              <span className="text-[6px] text-white/70 uppercase">/ GOVERNOR</span>
            </div>
          </div>

          {/* Right: Mahatma Gandhi Realistic Portrait & Denomination Numeral */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mahatma Gandhi Portrait with Authentic Glasses & Crosshatching */}
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/50 bg-gradient-to-b from-white/25 via-white/10 to-black/35 flex items-center justify-center overflow-hidden shadow-inner">
              <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-15 sm:h-15 drop-shadow">
                <defs>
                  <linearGradient id={`gandhiShine-${value}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#cfd8dc" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
                {/* Gandhi Head Contour */}
                <ellipse cx="48" cy="38" rx="20" ry="22" fill={`url(#gandhiShine-${value})`} />
                {/* Ears */}
                <ellipse cx="27" cy="40" rx="3.5" ry="7" fill="#cfd8dc" />
                <ellipse cx="69" cy="40" rx="3.5" ry="7" fill="#cfd8dc" />
                {/* Shawl Drape across Chest */}
                <path d="M 20 90 Q 48 55, 78 90 Z" fill="#ffffff" opacity="0.9" />
                <path d="M 26 90 Q 50 64, 74 90" fill="none" stroke="#90a4ae" strokeWidth="1.5" />
                {/* Iconic Round Wire Spectacles */}
                <circle cx="41" cy="37" r="7.5" fill="none" stroke="#263238" strokeWidth="2.2" />
                <circle cx="56" cy="37" r="7.5" fill="none" stroke="#263238" strokeWidth="2.2" />
                <line x1="48.5" y1="37" x2="48.5" y2="37" stroke="#263238" strokeWidth="2.5" />
                {/* Gentle Eyes behind Glasses */}
                <circle cx="41" cy="37" r="1.8" fill="#37474f" />
                <circle cx="56" cy="37" r="1.8" fill="#37474f" />
                {/* Serene Smile & Moustache */}
                <path d="M 43 45 Q 48 48, 54 45" fill="none" stroke="#37474f" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 41 49 Q 48 53, 56 49" fill="none" stroke="#263238" strokeWidth="2.2" strokeLinecap="round" />
                {/* Wrinkle & Expression lines */}
                <path d="M 39 30 Q 48 28, 57 30" fill="none" stroke="#78909c" strokeWidth="1.2" />
              </svg>
              {/* Gandhi Caption */}
              <span className="absolute bottom-0 text-[5px] sm:text-[6px] font-bold text-white/80 font-mono tracking-tighter">
                महात्मा गांधी
              </span>
            </div>

            {/* Massive Denomination Number */}
            <div className="text-right leading-none">
              <div className="text-2xl sm:text-4xl font-black font-mono tracking-tighter text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.95)]">
                ₹{spec.label}
              </div>
              <div className="text-[7px] sm:text-[8px] font-bold text-amber-300 font-mono">
                RUPEES
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Swachh Bharat Emblem & Cultural Heritage Motif */}
        <div className="flex items-center justify-between text-[7px] sm:text-[8.5px] text-white/90 border-t border-white/25 pt-1">
          {/* Swachh Bharat Logo (Glasses) */}
          <div className="flex items-center gap-1 opacity-90">
            <div className="flex items-center border border-white/60 rounded-full px-1 py-0.2 text-[5.5px] font-bold">
              <span>स्वच्छ</span>
              <span className="mx-0.5">•</span>
              <span>भारत</span>
            </div>
            <span className="text-[6px] text-white/70 hidden sm:inline">एक कदम स्वच्छता की ओर</span>
          </div>

          {/* Cultural Heritage Motif */}
          <span className="font-bold tracking-wide font-serif text-amber-200 drop-shadow">
            🏛️ {spec.motifName}
          </span>

          <span className="font-mono text-white/75 text-[6.5px] sm:text-[7.5px]">
            MAHATMA GANDHI NEW SERIES
          </span>
        </div>
      </div>
    </div>
  );
}
