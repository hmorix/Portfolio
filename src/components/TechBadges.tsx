import React, { useState } from 'react';
import { Sparkles, RefreshCw, Trophy, Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { SKILL_CARDS, SkillCard } from '../data/portfolio';
import { sounds } from '../utils/audio';

interface TechBadgesProps {
  lang: 'EN' | 'HI';
}

export const TechBadges: React.FC<TechBadgesProps> = ({ lang }) => {
  const [activeCard, setActiveCard] = useState<SkillCard>(SKILL_CARDS[0]);
  const [isPulling, setIsPulling] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const handlePullGacha = () => {
    sounds.playWhistle();
    setIsPulling(true);

    let count = 0;
    const interval = setInterval(() => {
      const randomCard = SKILL_CARDS[Math.floor(Math.random() * SKILL_CARDS.length)];
      setActiveCard(randomCard);
      sounds.playClick();
      count++;
      if (count > 8) {
        clearInterval(interval);
        setIsPulling(false);
      }
    }, 110);
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
    <section id="skills" className="py-20 px-[4.6vw] max-w-[1720px] mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-[#101214]/10">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#f4772a] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Core Competencies</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-tight text-[#101214] m-0">
            {lang === 'HI' ? 'हर्ष शर्मा के टेक्निकल बैजेस' : 'Interactive Tech Mastery Badges'}
          </h2>
          <p className="text-sm md:text-base text-[#101214]/70 mt-2 max-w-xl">
            {lang === 'HI'
              ? 'NVIDIA NIM, Groq, React, Node.js और प्रोसेस ऑटोमेशन में सिद्ध विशेषज्ञता। इंटरैक्टिव 3D कार्ड पर कर्सर घुमाकर देखें।'
              : 'Interactive 3D holographic skill cards showing verified metrics, frameworks, and architecture proficiency.'}
          </p>
        </div>

        <button
          onClick={handlePullGacha}
          disabled={isPulling}
          className="h-12 px-7 bg-[#101214] hover:bg-[#f4772a] text-white font-semibold text-xs md:text-sm tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50 font-mono"
        >
          <RefreshCw className={`w-4 h-4 ${isPulling ? 'animate-spin' : ''}`} />
          <span>{lang === 'HI' ? 'रैंडम स्किल कार्ड ड्रॉ करें' : 'Draw Random Mastery Card'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
        {/* Holographic Card with 3D Tilt */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${mouseTilt.y}deg) rotateY(${mouseTilt.x}deg)`,
              transition: isPulling ? 'none' : 'transform 0.15s ease-out',
            }}
            className="relative w-[280px] sm:w-[320px] aspect-[2/3] rounded-2xl p-6 bg-gradient-to-br from-[#101214] via-[#1c1f24] to-[#252930] text-white shadow-2xl overflow-hidden cursor-pointer border-2 border-white/20 select-none group flex flex-col justify-between"
          >
            {/* Holographic Shimmer Overlay */}
            <div
              className="absolute inset-0 holo-shimmer opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none z-20 mix-blend-color-dodge"
              style={{
                transform: `translate(${mouseTilt.x * 2}%, ${mouseTilt.y * 2}%)`,
              }}
            />

            {/* Circuit Watermark Pattern */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 12px 12px, #ffffff 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Top Card Info */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono">
              <span className="font-bold tracking-widest text-[#f4772a]">HARSH SHARMA</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-amber-300 flex items-center gap-1 border border-amber-300/40">
                <Star className="w-3 h-3 fill-amber-300" />
                {activeCard.rarity}
              </span>
            </div>

            {/* Middle Skill Showcase */}
            <div className="relative z-10 my-auto">
              <span className="text-[11px] font-mono text-[#f4772a] font-bold uppercase block mb-1">
                {activeCard.category}
              </span>
              <h3 className="text-3xl font-bebas tracking-wide text-white m-0 leading-tight">
                {activeCard.title}
              </h3>
              <div className="text-xs text-emerald-400 font-mono font-semibold mt-2 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#f4772a]" />
                <span>{activeCard.impactMetric}</span>
              </div>
              <p className="text-xs text-white/80 mt-3 leading-relaxed">
                {activeCard.description}
              </p>
            </div>

            {/* Bottom Tech Pills */}
            <div className="relative z-10 pt-4 border-t border-white/15">
              <div className="flex flex-wrap gap-1 mb-2">
                {activeCard.technologies.slice(0, 4).map(t => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-white/10 rounded text-white/90">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
                <span>VERIFIED AT HMORIX</span>
                <span className="text-white font-bold">{activeCard.level}</span>
              </div>
            </div>
          </div>

          <div className="text-xs font-mono text-[#101214]/60 mt-4 text-center">
            {lang === 'HI' ? 'कार्ड पर कर्सर ले जाकर 3D होलोग्राफिक प्रभाव देखें।' : 'Hover over card for real-time 3D tilt shimmer.'}
          </div>
        </div>

        {/* Right: Badge Cards Selector Grid */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[#101214]/70 font-bold mb-1 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#f4772a]" />
            <span>Select Competency to Inspect (6 Categories):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SKILL_CARDS.map(card => {
              const isCurrent = activeCard.id === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveCard(card);
                  }}
                  className={`p-3.5 text-left border rounded-sm transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#101214] text-white border-[#f4772a] ring-1 ring-[#f4772a] shadow-md'
                      : 'bg-white hover:bg-[#f4f5f5] text-[#101214] border-[#101214]/15'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono block text-[#f4772a] font-bold">
                      {card.category}
                    </span>
                    <h4 className="text-sm font-sans font-bold leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-xs opacity-75 mt-1 line-clamp-1">
                      {card.impactMetric}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono opacity-60 mt-3 pt-2 border-t border-current/10 flex justify-between">
                    <span>{card.level}</span>
                    <span className="font-bold">{card.rarity.split(' ')[0]}</span>
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
