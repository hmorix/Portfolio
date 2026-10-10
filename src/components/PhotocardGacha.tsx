import React, { useState } from 'react';
import { Sparkles, RefreshCw, Trophy, Star } from 'lucide-react';
import { PHOTOCARDS, Photocard } from '../data/products';
import { sounds } from '../utils/audio';

interface PhotocardGachaProps {
  lang: 'ID' | 'EN';
}

export const PhotocardGacha: React.FC<PhotocardGachaProps> = ({ lang }) => {
  const [activeCard, setActiveCard] = useState<Photocard>(PHOTOCARDS[0]);
  const [isPulling, setIsPulling] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const handlePullGacha = () => {
    sounds.playWhistle();
    setIsPulling(true);

    let count = 0;
    const interval = setInterval(() => {
      const randomCard = PHOTOCARDS[Math.floor(Math.random() * PHOTOCARDS.length)];
      setActiveCard(randomCard);
      sounds.playClick();
      count++;
      if (count > 9) {
        clearInterval(interval);
        setIsPulling(false);
      }
    }, 100);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 25;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -25;
    setMouseTilt({ x, y });
  };

  const handleCardMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <section id="gacha" className="py-20 px-[4.6vw] max-w-[1720px] mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-[#101214]/10">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#f4772a] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bonus Pre-Order Vol. 6 Exclusive</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-tight text-[#101214] m-0">
            {lang === 'ID' ? 'Simulasi Gacha Photocard Hologram' : 'Holographic Photocard Simulator'}
          </h2>
          <p className="text-sm md:text-base text-[#101214]/70 mt-2 max-w-xl">
            {lang === 'ID'
              ? 'Setiap pembelian jaket & jersey Pre-Order Vol. 6 mendapatkan 1 buah Photocard Resmi JKT48 berhologram emas acak. Uji keberuntunganmu sekarang!'
              : 'Each Vol. 6 pre-order includes 1 randomized official holographic JKT48 photocard.'}
          </p>
        </div>

        <button
          onClick={handlePullGacha}
          disabled={isPulling}
          className="h-12 px-8 bg-[#101214] hover:bg-[#f4772a] text-white font-semibold text-sm tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isPulling ? 'animate-spin' : ''}`} />
          <span>{lang === 'ID' ? 'Tarik Gacha Sekarang (Test Luck)' : 'Pull Random Card'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
        {/* Holographic Card Showcase with Tilt & Shimmer */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${mouseTilt.y}deg) rotateY(${mouseTilt.x}deg)`,
              transition: isPulling ? 'none' : 'transform 0.15s ease-out',
            }}
            className="relative w-[280px] sm:w-[320px] aspect-[2/3] rounded-2xl p-4 bg-[#101214] text-white shadow-2xl overflow-hidden cursor-pointer border-2 border-white/20 select-none group"
          >
            {/* Holographic Shimmer Overlay */}
            <div
              className="absolute inset-0 holo-shimmer opacity-40 group-hover:opacity-75 transition-opacity pointer-events-none z-20 mix-blend-color-dodge"
              style={{
                transform: `translate(${mouseTilt.x * 2}%, ${mouseTilt.y * 2}%)`,
              }}
            />

            {/* Card Background / Member Photo */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={activeCard.image}
                alt={activeCard.member}
                className="w-full h-full object-cover object-center filter saturate-110 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30" />
            </div>

            {/* Card Content Top Header */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono">
              <span className="font-bold tracking-widest text-[#f4772a]">ERIGO X JKT48</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-amber-300 flex items-center gap-1 border border-amber-300/40">
                <Star className="w-3 h-3 fill-amber-300" />
                {activeCard.rarity}
              </span>
            </div>

            {/* Card Content Bottom Info */}
            <div className="relative z-10 mt-auto pt-4 border-t border-white/20">
              <div className="text-[11px] font-mono text-amber-300 font-semibold uppercase mb-0.5">
                {activeCard.role}
              </div>
              <h3 className="text-2xl font-bebas tracking-wide text-white m-0 leading-tight">
                {activeCard.member}
              </h3>
              <p className="text-xs text-white/80 italic mt-2 line-clamp-2">
                "{activeCard.quote}"
              </p>
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-white/50">
                <span>VOL. 6 / 2026</span>
                <span className="text-white font-bold">{activeCard.generation}</span>
              </div>
            </div>
          </div>

          <div className="text-xs font-mono text-[#101214]/60 mt-4 text-center">
            {lang === 'ID' ? 'Arahkan kursor pada kartu untuk melihat kilau hologram.' : 'Hover over card for 3D holographic sheen.'}
          </div>
        </div>

        {/* Card Gallery / Selection list */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[#101214]/70 font-bold mb-1 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#f4772a]" />
            <span>{lang === 'ID' ? 'Semua Kartu Ambassador (6 Koleksi):' : 'All 6 Ambassador Cards:'}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PHOTOCARDS.map(card => {
              const isCurrent = activeCard.id === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveCard(card);
                  }}
                  className={`p-3 text-left border rounded-sm transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#101214] text-white border-[#f4772a] ring-1 ring-[#f4772a] shadow-md'
                      : 'bg-white hover:bg-[#f4f5f5] text-[#101214] border-[#101214]/15'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono block text-[#f4772a] font-bold">
                      {card.nickname}
                    </span>
                    <h4 className="text-sm font-sans font-bold leading-snug line-clamp-1">
                      {card.member}
                    </h4>
                  </div>
                  <div className="text-[10px] font-mono opacity-60 mt-3 pt-2 border-t border-current/10">
                    {card.rarity.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
