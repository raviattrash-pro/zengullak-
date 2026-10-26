import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Heart, MessageCircle, Bookmark, Share2, Music, CheckCircle, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

const CINEMATIC_REELS = [
  {
    id: 1,
    tag: '#KaizenHabits',
    title: 'The 1-Glass Water Hack 💧',
    subtitle: 'Stops 60% of Swiggy & Blinkit orders instantly',
    explanation: 'Science proves 60% of late-night junk cravings are mild dehydration. Drink 1 cold glass of water and wait 5 minutes before ordering delivery.',
    savings: '₹200 - ₹400 saved per craving',
    bgImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=900&auto=format&fit=crop&q=85', // Pouring fresh crystal cold water
    likes: '48.2K',
    comments: '1,420',
    audioTitle: 'Lo-Fi Chill • Tokyo Night Beats',
  },
  {
    id: 2,
    tag: '#MottainaiZeroWaste',
    title: 'The Fridge-First Rule 🍛',
    subtitle: 'Indian moms knew this Japanese secret forever',
    explanation: 'In Japan, throwing away food discards the rain and sun that grew it. Always check what leftover sabzi or snacks exist before tapping instant delivery.',
    savings: '₹350 saved on unnecessary food',
    bgImage: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=900&auto=format&fit=crop&q=85', // Fresh, organized kitchen fridge & food
    likes: '62.1K',
    comments: '2,890',
    audioTitle: 'Peaceful Morning • Flute & Birds',
  },
  {
    id: 3,
    tag: '#KakeiboMath',
    title: 'The "Hours of Life" Equation ⏱️',
    subtitle: 'Stop looking at Rupees. Look at your life energy.',
    explanation: 'When eyeing that ₹1,800 hoodie, divide by your hourly wage. If you earn ₹300/hr, that hoodie costs 6 entire hours of your life. Is it still worth 6 hours?',
    savings: 'Stops 90% of fashion buyer remorse',
    bgImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=85', // Trendy sneaker & street style
    likes: '89.4K',
    comments: '4,110',
    audioTitle: 'Mindset Shift • Deep Ambient Piano',
  },
  {
    id: 4,
    tag: '#ArigatoMoney',
    title: 'Bless The Leaks Away 🙏',
    subtitle: 'Money spent in anger returns as poverty.',
    explanation: 'When paying your electricity, wifi, or canteen bill, say: "Thank you for cool air and high speed internet." Gratitude switches brain out of scarcity panic.',
    savings: 'Eliminates money stress & anxiety',
    bgImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=900&auto=format&fit=crop&q=85', // Japanese Zen Garden & Golden Temple
    likes: '104K',
    comments: '5,340',
    audioTitle: 'Tibetan Singing Bowl • 432Hz Calm',
  },
  {
    id: 5,
    tag: '#DanshariMinimalism',
    title: 'The 1-Item Room Cleanse 🧹',
    subtitle: 'Cluttered room = Cluttered bank account',
    explanation: 'Messy rooms trigger dopamine-seeking retail shopping. Find 1 unused cable, shirt, or junk item right now and discard or donate it.',
    savings: 'Stops emotional retail therapy',
    bgImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&auto=format&fit=crop&q=85', // Clean aesthetic modern minimalist room
    likes: '73.8K',
    comments: '3,012',
    audioTitle: 'Cozy Rain • Coffee Shop Vibe',
  },
];

export default function KaizenReels({ onCardCompleted }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedMap, setLikedMap] = useState({});
  const [bookmarkedMap, setBookmarkedMap] = useState({});
  const [completedMap, setCompletedMap] = useState({});

  const currentReel = CINEMATIC_REELS[currentIndex];

  const handleNext = () => {
    sounds.playTap();
    setCurrentIndex((prev) => (prev + 1) % CINEMATIC_REELS.length);
  };

  const handlePrev = () => {
    sounds.playTap();
    setCurrentIndex((prev) => (prev - 1 + CINEMATIC_REELS.length) % CINEMATIC_REELS.length);
  };

  const toggleLike = () => {
    sounds.playTap();
    setLikedMap((prev) => ({
      ...prev,
      [currentReel.id]: !prev[currentReel.id],
    }));
  };

  const toggleBookmark = () => {
    sounds.playTap();
    setBookmarkedMap((prev) => ({
      ...prev,
      [currentReel.id]: !prev[currentReel.id],
    }));
  };

  const markActionDone = () => {
    sounds.playSuccess();
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#10b981', '#6366f1', '#ec4899', '#f59e0b']
    });
    setCompletedMap((prev) => ({ ...prev, [currentReel.id]: true }));
    if (onCardCompleted) onCardCompleted(currentReel.id);
  };

  const isLiked = likedMap[currentReel.id];
  const isBookmarked = bookmarkedMap[currentReel.id];
  const isDone = completedMap[currentReel.id];

  return (
    <div className="relative w-full max-w-sm mx-auto select-none">
      {/* 9:16 VERTICAL REEL PLAYER CONTAINER */}
      <div className="relative aspect-[9/16] w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border-2 border-stone-800 bg-black flex flex-col justify-between">
        {/* Full-bleed Cinematic Background Image */}
        <img
          src={currentReel.bgImage}
          alt={currentReel.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 brightness-75 contrast-110"
        />

        {/* Cinematic Gradient Overlays (Top shadow for controls, bottom deep shadow for caption) */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/90" />

        {/* TOP BAR: Header, Reel Progress Ticker & Index */}
        <div className="relative z-20 p-4 pt-3 space-y-2">
          {/* Progress Segmented Bars */}
          <div className="flex items-center gap-1.5 w-full">
            {CINEMATIC_REELS.map((_, idx) => (
              <div
                key={idx}
                className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden"
              >
                <div
                  className={`h-full bg-white transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-full shadow-[0_0_8px_#ffffff]'
                      : idx < currentIndex
                      ? 'w-full opacity-60'
                      : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-white/90">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[11px] font-bold">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{currentReel.tag}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-1 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white disabled:opacity-30 cursor-pointer"
                title="Previous Reel"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white cursor-pointer"
                title="Next Reel"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT ACTION RAIL (TikTok / Instagram Style) */}
        <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
          {/* Like Heart */}
          <button
            onClick={toggleLike}
            className="flex flex-col items-center gap-0.5 cursor-pointer active:scale-90 transition"
          >
            <div className={`p-2.5 rounded-full backdrop-blur-md border ${isLiked ? 'bg-rose-600/90 border-rose-400' : 'bg-black/40 border-white/20'}`}>
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-white text-white' : 'text-white'}`} />
            </div>
            <span className="text-[10px] font-bold font-mono">{currentReel.likes}</span>
          </button>

          {/* Comment Count */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-bold font-mono">{currentReel.comments}</span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={toggleBookmark}
            className="flex flex-col items-center gap-0.5 cursor-pointer active:scale-90 transition"
          >
            <div className={`p-2.5 rounded-full backdrop-blur-md border ${isBookmarked ? 'bg-amber-500/90 border-amber-300' : 'bg-black/40 border-white/20'}`}>
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-white text-white' : 'text-white'}`} />
            </div>
            <span className="text-[10px] font-bold font-mono">Save</span>
          </button>

          {/* Spinning Vinyl Record Icon */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-stone-900 to-stone-700 border-2 border-white/50 p-1 flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
            <div className="w-3 h-3 rounded-full bg-red-500" />
          </div>
        </div>

        {/* BOTTOM CONTENT AREA: Creator, Viral Title, Caption & Action Pill */}
        <div className="relative z-20 p-4 pb-4 space-y-2.5 text-white pr-16">
          {/* Creator Handle */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-black text-black">
              禅
            </div>
            <span className="text-xs font-bold drop-shadow">@ZenKaizen_India</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">Follow</span>
          </div>

          {/* Title & Viral Hook */}
          <div>
            <h3 className="text-lg sm:text-xl font-black leading-tight drop-shadow-md">
              {currentReel.title}
            </h3>
            <p className="text-xs font-medium text-amber-200 mt-0.5 drop-shadow">
              ⚡ {currentReel.subtitle}
            </p>
          </div>

          {/* Glass Caption Box with Micro-Lesson */}
          <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-xs text-stone-200 leading-relaxed shadow-lg">
            <p>{currentReel.explanation}</p>
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-bold text-emerald-300">
              <span>💰 Result:</span>
              <span>{currentReel.savings}</span>
            </div>
          </div>

          {/* Audio Track Ticker */}
          <div className="flex items-center gap-1.5 text-[10px] text-white/80 overflow-hidden font-mono">
            <Music className="w-3 h-3 flex-shrink-0 animate-pulse text-cyan-300" />
            <span className="truncate">{currentReel.audioTitle}</span>
          </div>

          {/* Interactive 1-Tap Action Button */}
          <div className="pt-1">
            {isDone ? (
              <div className="w-full py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950">
                <CheckCircle className="w-4 h-4 text-emerald-200" />
                <span>Micro-Habit Completed (+1 Streak Point)</span>
              </div>
            ) : (
              <button
                onClick={markActionDone}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-black text-xs rounded-xl shadow-lg shadow-cyan-950/60 active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>I Practiced This Today! 🚀</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
