import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Flame, ShieldCheck, ChevronRight } from 'lucide-react';
import { CAMPAIGN_FACES_BASE64, MODEL_LEFT_BASE64 } from '../data/assets';
import { COLOR_THEMES } from '../data/products';
import { sounds } from '../utils/audio';

interface HeroProps {
  onPreOrderClick: () => void;
  onExploreClick: () => void;
  currentTheme: string;
  onSelectTheme: (themeId: string) => void;
  lang: 'ID' | 'EN';
}

export const Hero: React.FC<HeroProps> = ({
  onPreOrderClick,
  onExploreClick,
  currentTheme,
  onSelectTheme,
  lang,
}) => {
  // Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Parallax subtle tilt on mouse
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight } = currentTarget;
    const x = (clientX / clientWidth - 0.5) * 16;
    const y = (clientY / clientHeight - 0.5) * 16;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative isolation-isolate min-h-[100svh] lg:h-screen overflow-hidden pt-20 md:pt-0 flex flex-col justify-between select-none bg-gradient-to-br from-[#fafafa] via-[#f4f5f5] to-[#e9ecee]"
      style={{
        background: 'linear-gradient(110deg, #fafafa 0%, #f4f5f5 38%, #e9ecee 38%, #e9ecee 100%)',
      }}
    >
      {/* Background Campaign Faces with slanted polygon cut-path from mockup */}
      <div
        className="absolute inset-0 -z-10 slant-hero-faces pointer-events-none opacity-90 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
          backgroundImage: `linear-gradient(180deg, rgba(235, 238, 240, 0.35) 0%, rgba(235, 238, 240, 0.44) 48%, rgba(235, 238, 240, 0.91) 82%, #e9ecee 100%), url("${CAMPAIGN_FACES_BASE64}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%, 61.15vw auto',
          backgroundPosition: 'center, right 6.5vh',
        }}
        aria-hidden="true"
      />

      {/* Left Campaign Model Cutout with slanted polygon cut-path from mockup */}
      <div
        className="absolute left-0 top-0 bottom-0 w-full md:w-[42vw] h-[48vh] md:h-full z-0 slant-hero-model pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.3}px, 0)`,
          backgroundImage: `url("${MODEL_LEFT_BASE64}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'left bottom',
        }}
        role="img"
        aria-label="Erigo x JKT48 model in athletic jacket"
      />

      {/* Main Hero Copy Container */}
      <div className="relative z-10 px-[6vw] md:px-0 md:absolute md:top-[34vh] lg:top-[33vh] md:left-[39%] md:right-[5.9%] pt-48 md:pt-0">
        {/* Collaboration Tag & Live Counter */}
        <div className="flex flex-wrap items-center gap-3 mb-3 text-xs md:text-sm font-mono tracking-tight text-[#101214]/80">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#101214] text-white font-medium text-[11px] rounded uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#f4772a]" />
            Official Drop Vol. 6
          </span>
          <span className="hidden sm:inline-block text-[#101214]/40">/</span>
          <span className="font-semibold text-[#101214] tracking-normal">
            FOOTBALL CULTURE X JKT48
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-normal text-[52px] sm:text-[68px] md:text-[76px] lg:text-[96px] xl:text-[104px] leading-[0.98] tracking-[-0.03em] text-[#101214] m-0 mb-3 whitespace-normal md:whitespace-nowrap drop-shadow-sm font-sans">
          ThePathTo<span className="text-[#f4772a] font-medium">Victory</span>
        </h1>

        {/* Editorial Description */}
        <p className="text-[17px] sm:text-[19px] md:text-[21px] lg:text-[23px] leading-[1.3] text-[#101214]/90 max-w-[580px] m-0 mb-6 font-normal tracking-[-0.015em]">
          {lang === 'ID' ? (
            <>
              Kolaborasi ERIGO X JKT48 Vol. 6 menampilkan produk-produk yang terinspirasi dari semangat sepakbola.
            </>
          ) : (
            <>
              The ERIGO X JKT48 Vol. 6 collaboration featuring football-inspired streetwear and matchday jackets.
            </>
          )}
        </p>

        {/* Action Buttons & Countdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
          <button
            onClick={() => {
              sounds.playWhistle();
              onPreOrderClick();
            }}
            className="group inline-flex items-center justify-center gap-3 w-full sm:w-[245px] h-[58px] md:h-[62px] bg-[#101214] text-white text-[19px] md:text-[20px] font-medium tracking-tight transition-all duration-200 hover:bg-[#f4772a] active:scale-[0.98] shadow-lg shadow-black/10"
          >
            <span>{lang === 'ID' ? 'Pre-Order Sekarang' : 'Pre-Order Now'}</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onExploreClick();
            }}
            className="inline-flex items-center justify-center gap-2 px-6 h-[58px] md:h-[62px] border border-[#101214]/30 bg-white/70 hover:bg-white text-[#101214] text-[16px] font-medium tracking-tight transition-colors backdrop-blur-sm"
          >
            <span>{lang === 'ID' ? 'Lihat Katalog Lengkap' : 'Explore Lookbook'}</span>
            <ArrowUpRight className="w-4 h-4 text-[#f4772a]" />
          </button>
        </div>

        {/* Live Batch 01 Countdown Ticker */}
        <div className="flex items-center gap-4 py-3 px-4 bg-white/70 backdrop-blur-md border border-[#101214]/10 rounded-sm max-w-[480px]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#101214]/60">
            {lang === 'ID' ? 'Batas Waktu Batch 01' : 'Batch 01 Closes In'}
          </div>
          <div className="flex items-center gap-2 font-mono text-sm md:text-base font-bold text-[#101214]">
            <span className="px-1.5 py-0.5 bg-[#101214] text-white rounded text-xs">{timeLeft.days}d</span>
            <span>:</span>
            <span className="px-1.5 py-0.5 bg-[#101214] text-white rounded text-xs">{String(timeLeft.hours).padStart(2, '0')}h</span>
            <span>:</span>
            <span className="px-1.5 py-0.5 bg-[#101214] text-white rounded text-xs">{String(timeLeft.minutes).padStart(2, '0')}m</span>
            <span>:</span>
            <span className="px-1.5 py-0.5 bg-[#f4772a] text-white rounded text-xs animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>
          <div className="ml-auto text-[11px] font-mono text-emerald-700 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>94% Reserved</span>
          </div>
        </div>
      </div>

      {/* Sub-navigation categories from reference */}
      <div className="relative z-10 px-[6vw] md:px-0 md:absolute md:left-[39%] md:top-[80vh] py-6 md:py-0">
        <nav className="flex flex-wrap items-center gap-6 md:gap-8 text-[15px] md:text-[17px] font-medium text-[#101214]">
          <button
            onClick={() => {
              sounds.playClick();
              onExploreClick();
            }}
            className="transition-colors hover:text-[#f4772a]"
          >
            {lang === 'ID' ? 'Semua Produk' : 'All Products'}
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[#f4772a] font-semibold transition-colors hover:underline"
          >
            Best Jackets
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              const el = document.getElementById('customizer');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="transition-colors hover:text-[#f4772a]"
          >
            {lang === 'ID' ? 'Kustom Jersey' : 'Custom Jerseys'}
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              const el = document.getElementById('retailers');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="transition-colors hover:text-[#f4772a]"
          >
            Store Retailer
          </button>
        </nav>
      </div>

      {/* Bottom Hero Bar (Store Link on left & Theme Swatches on right from mockup) */}
      <div className="relative z-20 px-[4.6vw] pb-5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#101214]/5 bg-[#edf0f1]/70 backdrop-blur-sm">
        {/* Left: Erigo Store button */}
        <button
          onClick={() => {
            sounds.playClick();
            const el = document.getElementById('retailers');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 text-[15px] md:text-[16px] font-bold text-[#101214] hover:text-[#f4772a] transition-colors"
        >
          <span className="text-2xl leading-none font-normal transform -translate-y-0.5 transition-transform group-hover:-translate-y-1">↑</span>
          <span>Erigo Store Offline Retailers</span>
        </button>

        {/* Right: Credits and Interactive Swatches */}
        <div className="flex items-center gap-4 text-xs md:text-sm text-[#101214]/70">
          <span className="font-mono text-xs">Official Erigo x JKT48</span>
          <div className="flex items-center gap-1.5" aria-label="Color Theme Switcher">
            {COLOR_THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectTheme(theme.id);
                }}
                className={`w-5 h-5 rounded-none border transition-all ${
                  currentTheme === theme.id ? 'scale-125 ring-2 ring-[#f4772a] z-10' : 'opacity-85 hover:opacity-100'
                }`}
                style={{ backgroundColor: theme.primary, borderColor: '#101214' }}
                title={theme.name}
                aria-label={`Select ${theme.name} theme`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
