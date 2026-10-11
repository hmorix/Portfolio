import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronRight, Zap, Bot, Code2, Terminal, Play, Sparkles } from 'lucide-react';
import { HARSH_PORTRAIT_PATH, DEVELOPER_BACKDROP_PATH } from '../data/assets';
import { COLOR_THEMES } from '../data/portfolio';
import { HeroVideoIntro } from './HeroVideoIntro';
import { sounds } from '../utils/audio';

interface HeroProps {
  onApplyDemoClick: () => void;
  onExploreProjectsClick: () => void;
  currentTheme: string;
  onSelectTheme: (themeId: string) => void;
  lang: 'EN' | 'HI';
}

export const Hero: React.FC<HeroProps> = ({
  onApplyDemoClick,
  onExploreProjectsClick,
  currentTheme,
  onSelectTheme,
  lang,
}) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Parallax tilt on mouse
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight } = currentTarget;
    const x = (clientX / clientWidth - 0.5) * 14;
    const y = (clientY / clientHeight - 0.5) * 14;
    setMousePos({ x, y });
  };

  // Live Role Typing Animation
  const roles = [
    'Full Stack Web Developer',
    'UI/UX & Motion Designer',
    '24/7 Autonomous AI Agent Architect',
    'Enterprise Process Automator',
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedRole.length < currentFullRole.length) {
          setDisplayedRole(currentFullRole.slice(0, displayedRole.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayedRole.length > 0) {
          setDisplayedRole(currentFullRole.slice(0, displayedRole.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, currentRoleIndex, roles]);

  const scrollTo = (id: string) => {
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative isolation-isolate min-h-[100svh] lg:min-h-screen overflow-hidden pt-20 md:pt-24 lg:pt-28 pb-8 flex flex-col justify-between select-none bg-gradient-to-br from-[#fafafa] via-[#f4f5f5] to-[#e9ecee]"
      style={{
        background: 'linear-gradient(115deg, #fafafa 0%, #f4f5f5 36%, #e9ecee 36%, #e9ecee 100%)',
      }}
    >
      {/* Background Developer Code & Workflow with slanted cut */}
      <div
        className="absolute inset-0 -z-10 slant-hero-faces pointer-events-none opacity-85 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px, 0)`,
          backgroundImage: `linear-gradient(180deg, rgba(235, 238, 240, 0.45) 0%, rgba(235, 238, 240, 0.55) 50%, rgba(235, 238, 240, 0.95) 85%, #e9ecee 100%), url("${DEVELOPER_BACKDROP_PATH}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
        }}
        aria-hidden="true"
      />

      {/* Left Slanted Portrait of Harsh Sharma */}
      <div
        className="absolute left-0 top-0 bottom-0 w-full md:w-[44vw] lg:w-[40vw] h-[46vh] md:h-full z-0 slant-hero-model pointer-events-none transition-transform duration-500 ease-out shadow-2xl"
        style={{
          transform: `translate3d(${mousePos.x * -0.4}px, ${mousePos.y * -0.2}px, 0)`,
          backgroundImage: `linear-gradient(180deg, rgba(16, 18, 20, 0) 60%, rgba(16, 18, 20, 0.25) 100%), url("${HARSH_PORTRAIT_PATH}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center 15%',
        }}
        role="img"
        aria-label="Harsh Sharma — Full Stack Web Developer & UI/UX Designer"
      />

      {/* Main Content Area */}
      <div className="relative z-10 px-[6vw] md:px-0 md:ml-[45vw] lg:ml-[42vw] md:mr-[5vw] pt-44 sm:pt-52 md:pt-4 lg:pt-6 my-auto flex flex-col justify-center max-w-3xl">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-3 text-xs font-mono text-[#101214]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#101214] text-white font-medium text-[11px] rounded uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-[#f4772a]" />
            HMorix Developer
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300/80 font-medium text-[11px] rounded">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{lang === 'HI' ? 'हाथरस, यूपी • नए प्रोजेक्ट्स के लिए उपलब्ध' : 'Hathras, UP • Available for Roles'}</span>
          </span>

          {/* Animated Intro Video Trigger Pill */}
          <button
            onClick={() => {
              sounds.playClick();
              setVideoModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f4772a] text-white font-bold text-[11px] rounded hover:bg-[#101214] transition-colors shadow-sm"
            title="Watch Animated Role Explanation Video"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Watch Role Video Intro</span>
          </button>
        </div>

        {/* Main Headline */}
        <h1 className="font-sans font-normal text-[48px] sm:text-[62px] md:text-[70px] lg:text-[84px] xl:text-[92px] leading-[0.98] tracking-[-0.03em] text-[#101214] m-0 mb-3">
          Harsh<span className="text-[#f4772a] font-bold">Sharma</span>
        </h1>

        {/* Typing Animated Subtitle */}
        <div className="font-mono text-base sm:text-lg md:text-xl font-bold text-[#101214] mb-3 flex items-center gap-2 min-h-[32px]">
          <span className="text-[#f4772a]">&gt;</span>
          <span>{displayedRole}</span>
          <span className="w-2 h-5 bg-[#f4772a] animate-pulse inline-block" />
        </div>

        {/* Professional Summary */}
        <p className="text-[16px] sm:text-[18px] md:text-[19px] leading-[1.32] text-[#101214]/90 max-w-2xl m-0 mb-5 font-normal tracking-[-0.015em]">
          {lang === 'HI' ? (
            <>
              HMorix में फुल स्टैक वेब डेवलपर और UI/UX डिज़ाइनर। सिस्टम डिज़ाइन से लेकर ऑटोमेशन और AI एजेंट्स तक, प्रोडक्शन वेब ऐप्स को शुरू से अंत तक तेज़ और स्केलेबल बनाते हैं।
            </>
          ) : (
            <>
              Full Stack Web Developer &amp; UI/UX Designer at HMorix. Building production web applications, 24/7 AI agents, and workflow automations end-to-end.
            </>
          )}
        </p>

        {/* Performance Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-xl mb-6">
          <div className="p-2.5 bg-white/85 border border-[#101214]/12 backdrop-blur-sm shadow-sm hover:border-[#f4772a] transition-colors">
            <div className="text-[10px] font-mono text-[#101214]/60 uppercase">WORKFLOW AUTOMATION</div>
            <div className="text-lg font-bebas text-[#101214] font-bold mt-0.5 flex items-center gap-1">
              <Zap className="w-4 h-4 text-[#f4772a]" />
              <span>8x Faster Execution</span>
            </div>
          </div>

          <div className="p-2.5 bg-white/85 border border-[#101214]/12 backdrop-blur-sm shadow-sm hover:border-[#f4772a] transition-colors">
            <div className="text-[10px] font-mono text-[#101214]/60 uppercase">AI AGENTS UPTIME</div>
            <div className="text-lg font-bebas text-[#101214] font-bold mt-0.5 flex items-center gap-1">
              <Bot className="w-4 h-4 text-[#f4772a]" />
              <span>24/7 Zero-Server Cost</span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-2.5 bg-white/85 border border-[#101214]/12 backdrop-blur-sm shadow-sm hover:border-[#f4772a] transition-colors">
            <div className="text-[10px] font-mono text-[#101214]/60 uppercase">CLIENT PRODUCTS</div>
            <div className="text-lg font-bebas text-[#101214] font-bold mt-0.5 flex items-center gap-1">
              <Code2 className="w-4 h-4 text-[#f4772a]" />
              <span>7+ Deployed Apps</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
          <button
            onClick={() => {
              sounds.playWhistle();
              onApplyDemoClick();
            }}
            className="group inline-flex items-center justify-center gap-2.5 px-6 h-[54px] md:h-[58px] bg-[#101214] text-white text-[17px] md:text-[18px] font-medium tracking-tight transition-all duration-200 hover:bg-[#f4772a] active:scale-[0.98] shadow-lg shadow-black/10"
          >
            <span>{lang === 'HI' ? 'डेमो और प्रपोजल मांगें' : 'Choose Projects & Apply for Demo'}</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onExploreProjectsClick();
            }}
            className="inline-flex items-center justify-center gap-2 px-6 h-[54px] md:h-[58px] border border-[#101214]/30 bg-white/80 hover:bg-white text-[#101214] text-[15px] font-medium tracking-tight transition-colors backdrop-blur-sm"
          >
            <span>{lang === 'HI' ? 'प्रोजेक्ट्स देखें' : 'Explore Featured Projects'}</span>
            <ArrowUpRight className="w-4 h-4 text-[#f4772a]" />
          </button>
        </div>

        {/* Quick Tech Pill Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-[#101214]/80">
          <span className="text-[#101214]/50 font-bold mr-1">STACK:</span>
          {['React.js', 'Vite', 'Node.js', 'Python', 'NVIDIA NIM', 'Supabase', 'Tailwind CSS'].map(t => (
            <span key={t} className="px-2 py-0.5 bg-white/70 border border-black/10 rounded-sm">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Sub-Navigation Row */}
      <div className="relative z-10 px-[6vw] md:px-[4.6vw] max-w-[1720px] mx-auto w-full pt-6 pb-2">
        <nav className="flex flex-wrap items-center gap-5 sm:gap-8 text-[14px] md:text-[16px] font-medium text-[#101214]">
          <button
            onClick={() => scrollTo('projects')}
            className="transition-colors hover:text-[#f4772a] flex items-center gap-1"
          >
            <span>{lang === 'HI' ? 'सभी प्रोजेक्ट्स' : 'Production Projects'}</span>
            <span className="text-xs font-mono text-[#f4772a]">(7)</span>
          </button>
          <button
            onClick={() => scrollTo('scope-builder')}
            className="text-[#f4772a] font-semibold transition-colors hover:underline flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scope Calculator</span>
          </button>
          <button
            onClick={() => scrollTo('skills')}
            className="transition-colors hover:text-[#f4772a]"
          >
            {lang === 'HI' ? 'स्किल्स बैजेस' : 'Tech Badges'}
          </button>
          <button
            onClick={() => scrollTo('experience')}
            className="transition-colors hover:text-[#f4772a]"
          >
            Work Experience
          </button>
          <button
            onClick={() => scrollTo('case-studies')}
            className="transition-colors hover:text-[#f4772a]"
          >
            Case Studies
          </button>
          <button
            onClick={() => setVideoModalOpen(true)}
            className="text-[#f4772a] font-bold hover:underline flex items-center gap-1"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Role Video Intro</span>
          </button>
        </nav>
      </div>

      {/* Bottom Bar: Company on left & Theme Swatches on right */}
      <div className="relative z-20 px-[4.6vw] pt-4 border-t border-[#101214]/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#101214]/75">
        <button
          onClick={() => scrollTo('experience')}
          className="group flex items-center gap-1.5 text-[14px] font-bold text-[#101214] hover:text-[#f4772a] transition-colors"
        >
          <span className="text-xl leading-none font-normal transform -translate-y-0.5 transition-transform group-hover:-translate-y-1">↑</span>
          <span>HMorix Technologies • Hathras, Uttar Pradesh</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-xs">THEME:</span>
          <div className="flex items-center gap-1.5" aria-label="Color Theme Switcher">
            {COLOR_THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectTheme(theme.id);
                }}
                className={`w-4 h-4 rounded-none border transition-all ${
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

      {/* Hero Video Intro Modal */}
      {videoModalOpen && (
        <HeroVideoIntro
          isModalOpen={true}
          onCloseModal={() => setVideoModalOpen(false)}
          lang={lang}
        />
      )}
    </section>
  );
};
