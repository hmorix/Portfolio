import React from 'react';
import { Search, User, Sparkles, Volume2, VolumeX, Menu, X, Briefcase, FileText } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeaderProps {
  demoCount: number;
  onOpenDemoCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  lang: 'EN' | 'HI';
  onToggleLang: () => void;
  isMuted: boolean;
  onToggleAudio: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  demoCount,
  onOpenDemoCart,
  onOpenSearch,
  onOpenAccount,
  lang,
  onToggleLang,
  isMuted,
  onToggleAudio,
  mobileMenuOpen,
  setMobileMenuOpen,
  activeSection,
}) => {
  const scrollTo = (id: string) => {
    sounds.playClick();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-[4.6vw] py-3 md:py-4 transition-all duration-300 backdrop-blur-md bg-[#edf0f1]/90 border-b border-[#101214]/8">
        <div className="max-w-[1720px] mx-auto grid grid-cols-2 lg:grid-cols-3 items-center">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left font-sans text-xl md:text-2xl lg:text-[26px] tracking-tight font-medium select-none group"
            >
              Harsh<span className="text-[#f4772a] font-bold group-hover:underline">Sharma</span>
            </button>
            <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#101214] text-white rounded">
              HMorix Dev
            </span>
          </div>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-[15px] xl:text-[16px] font-medium tracking-tight">
            <button
              onClick={() => scrollTo('hero')}
              className={`transition-colors hover:text-[#f4772a] ${activeSection === 'hero' ? 'text-[#f4772a] font-semibold' : 'text-[#101214]'}`}
            >
              {lang === 'HI' ? 'होम' : 'Overview'}
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className={`transition-colors hover:text-[#f4772a] ${activeSection === 'projects' ? 'text-[#f4772a] font-semibold' : 'text-[#101214]'}`}
            >
              {lang === 'HI' ? 'प्रोजेक्ट्स' : 'Projects'}
            </button>
            <button
              onClick={() => scrollTo('scope-builder')}
              className="transition-colors hover:text-[#f4772a] text-[#101214] flex items-center gap-1"
            >
              <span>{lang === 'HI' ? 'प्रोजेक्ट स्कोप' : 'Scope Calculator'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f4772a]" />
            </button>
            <button
              onClick={() => scrollTo('skills')}
              className="transition-colors hover:text-[#f4772a] text-[#101214]"
            >
              {lang === 'HI' ? 'स्किल्स' : 'Tech Badges'}
            </button>
            <button
              onClick={() => scrollTo('experience')}
              className="transition-colors hover:text-[#f4772a] text-[#101214]"
            >
              {lang === 'HI' ? 'अनुभव' : 'Experience'}
            </button>
            <button
              onClick={() => scrollTo('case-studies')}
              className="transition-colors hover:text-[#f4772a] text-[#101214]"
            >
              Case Studies
            </button>
          </nav>

          {/* Right Tools */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3.5 md:gap-4">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                onToggleAudio();
                sounds.playClick();
              }}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              className="p-2 text-[#101214]/80 hover:text-[#f4772a] transition-colors rounded-full hover:bg-black/5"
              aria-label="Toggle sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-[#f4772a]" />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => {
                onToggleLang();
                sounds.playClick();
              }}
              className="text-xs font-mono font-bold tracking-wider px-2 py-1 border border-[#101214]/20 rounded hover:border-[#f4772a] hover:text-[#f4772a] transition-colors"
              title="Switch Language (English / Hindi)"
            >
              {lang}
            </button>

            {/* Search */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenSearch();
              }}
              className="p-2 text-[#101214] hover:text-[#f4772a] transition-colors rounded-full hover:bg-black/5"
              aria-label="Search portfolio"
              title="Search Projects & Skills (Cmd+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Profile / Resume Card */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenAccount();
              }}
              className="p-2 text-[#101214] hover:text-[#f4772a] transition-colors rounded-full hover:bg-black/5"
              aria-label="Developer Profile"
              title="Harsh Sharma Bio & Resume"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Demo Request Cart / Application Drawer */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenDemoCart();
              }}
              className="relative px-3 py-1.5 md:px-3.5 md:py-2 bg-[#101214] text-white hover:bg-[#f4772a] transition-all rounded flex items-center gap-2 shadow-sm text-xs font-mono font-semibold"
              aria-label="Demo Application Basket"
              title="Apply for Live Demo"
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">
                {lang === 'HI' ? 'डेमो बैग' : 'Demo Bag'}
              </span>
              {demoCount > 0 ? (
                <span className="bg-[#f4772a] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                  {demoCount}
                </span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#f4772a]" />
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 text-[#101214] hover:text-[#f4772a] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#101214]/95 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-8 lg:hidden animate-fadeIn text-white">
          <div className="flex flex-col gap-5 text-2xl font-bebas tracking-wide text-left">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left py-2 hover:text-[#f4772a] transition-colors border-b border-white/10"
            >
              {lang === 'HI' ? 'होम' : 'OVERVIEW'}
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="text-left py-2 text-[#f4772a] hover:text-white transition-colors border-b border-white/10 flex items-center justify-between"
            >
              <span>{lang === 'HI' ? 'प्रोजेक्ट्स' : 'FEATURED PROJECTS'}</span>
              <span className="text-xs font-mono font-normal uppercase bg-[#f4772a] text-white px-2 py-0.5 rounded">7 Apps</span>
            </button>
            <button
              onClick={() => scrollTo('scope-builder')}
              className="text-left py-2 hover:text-[#f4772a] transition-colors border-b border-white/10 flex items-center justify-between"
            >
              <span>{lang === 'HI' ? 'प्रोजेक्ट स्कोप कैलकुलेटर' : 'SCOPE CALCULATOR'}</span>
              <Sparkles className="w-5 h-5 text-[#f4772a]" />
            </button>
            <button
              onClick={() => scrollTo('skills')}
              className="text-left py-2 hover:text-[#f4772a] transition-colors border-b border-white/10"
            >
              {lang === 'HI' ? 'स्किल्स बैजेस' : 'TECH STACK BADGES'}
            </button>
            <button
              onClick={() => scrollTo('experience')}
              className="text-left py-2 hover:text-[#f4772a] transition-colors border-b border-white/10"
            >
              {lang === 'HI' ? 'काम का अनुभव' : 'WORK EXPERIENCE (HMORIX)'}
            </button>
            <button
              onClick={() => scrollTo('case-studies')}
              className="text-left py-2 hover:text-[#f4772a] transition-colors border-b border-white/10"
            >
              CASE STUDIES & ARCHITECTURE
            </button>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs font-mono text-white/70">
            <span>Harsh Sharma • Hathras, UP</span>
            <button
              onClick={() => onToggleLang()}
              className="text-white border border-white/30 px-2 py-1 rounded"
            >
              LANG: {lang}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
