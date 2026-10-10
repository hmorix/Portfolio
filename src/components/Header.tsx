import React from 'react';
import { Search, User, ShoppingBag, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  lang: 'ID' | 'EN';
  onToggleLang: () => void;
  isMuted: boolean;
  onToggleAudio: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
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
      <header className="fixed top-0 left-0 right-0 z-40 px-[4.6vw] py-3 md:py-4 transition-all duration-300 backdrop-blur-md bg-[#edf0f1]/80 border-b border-[#101214]/5">
        <div className="max-w-[1720px] mx-auto grid grid-cols-2 lg:grid-cols-3 items-center">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left font-sans text-xl md:text-2xl lg:text-[26px] tracking-tight font-medium select-none group"
            >
              ThePathTo<span className="text-[#f4772a] font-bold group-hover:underline">Victory</span>
            </button>
            <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-wider px-1.5 py-0.5 bg-[#101214] text-white rounded">
              Vol. 6
            </span>
          </div>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-9 text-[15px] xl:text-[17px] font-medium tracking-tight">
            <button
              onClick={() => scrollTo('hero')}
              className={`transition-colors hover:text-[#f4772a] ${activeSection === 'hero' ? 'text-[#f4772a] font-semibold' : 'text-[#101214]'}`}
            >
              {lang === 'ID' ? 'Beranda' : 'Home'}
            </button>
            <button
              onClick={() => scrollTo('catalog')}
              className={`transition-colors hover:text-[#f4772a] ${activeSection === 'catalog' ? 'text-[#f4772a] font-semibold' : 'text-[#f4772a]'}`}
            >
              {lang === 'ID' ? 'Koleksi' : 'Collection'}
            </button>
            <button
              onClick={() => scrollTo('customizer')}
              className="transition-colors hover:text-[#f4772a] text-[#101214] flex items-center gap-1"
            >
              <span>{lang === 'ID' ? 'Kustom Jersey' : 'Custom Kit'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f4772a]" />
            </button>
            <button
              onClick={() => scrollTo('gacha')}
              className="transition-colors hover:text-[#f4772a] text-[#101214]"
            >
              Photocard
            </button>
            <button
              onClick={() => scrollTo('lookbook')}
              className="transition-colors hover:text-[#f4772a] text-[#101214]"
            >
              Lookbook
            </button>
            <button
              onClick={() => scrollTo('retailers')}
              className="transition-colors hover:text-[#f4772a] text-[#101214]"
            >
              {lang === 'ID' ? 'Toko Offline' : 'Stores'}
            </button>
          </nav>

          {/* Right Tools */}
          <div className="flex items-center justify-end gap-3 sm:gap-4 md:gap-5">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                onToggleAudio();
                sounds.playClick();
              }}
              title={isMuted ? 'Unmute Stadium Sounds' : 'Mute Sound'}
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
              title="Switch Language"
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
              aria-label="Search collection"
              title="Search (Cmd+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenAccount();
              }}
              className="p-2 text-[#101214] hover:text-[#f4772a] transition-colors rounded-full hover:bg-black/5"
              aria-label="Account and fanclub"
              title="JKT48 Official Member"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenCart();
              }}
              className="relative p-2 text-[#101214] hover:text-[#f4772a] transition-colors rounded-full hover:bg-black/5"
              aria-label="Pre-Order Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 bg-[#f4772a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              ) : (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#f4772a]" />
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
        <div className="fixed inset-0 z-30 bg-[#101214]/90 backdrop-blur-lg flex flex-col justify-between pt-24 pb-8 px-8 lg:hidden animate-fadeIn text-white">
          <div className="flex flex-col gap-6 text-2xl font-bebas tracking-wide text-left">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left py-2 hover:text-[#f4772a] transition-colors border-b border-white/10"
            >
              {lang === 'ID' ? 'BERANDA' : 'HOME'}
            </button>
            <button
              onClick={() => scrollTo('catalog')}
              className="text-left py-2 text-[#f4772a] hover:text-white transition-colors border-b border-white/10 flex items-center justify-between"
            >
              <span>{lang === 'ID' ? 'KOLEKSI PRODUK' : 'COLLECTION'}</span>
              <span className="text-xs font-mono font-normal uppercase bg-[#f4772a] text-white px-2 py-0.5 rounded">Batch 01</span>
            </button>
            <button
              onClick={() => scrollTo('customizer')}
              className="text-left py-2 hover:text-[#f4772a] transition-colors border-b border-white/10 flex items-center justify-between"
            >
              <span>{lang === 'ID' ? 'KUSTOM NAMA & NOMOR' : 'CUSTOM KIT BUILDER'}</span>
              <Sparkles className="w-5 h-5 text-[#f4772a]" />
            </button>
            <button
              onClick={() => scrollTo('gacha')}
              className="text-left py-2 hover:text-[#f4772a] transition-colors border-b border-white/10"
            >
              JKT48 PHOTOCARD GACHA
            </button>
            <button
              onClick={() => scrollTo('lookbook')}
              className="text-left py-2 hover:text-[#f4772a] transition-colors border-b border-white/10"
            >
              EDITORIAL LOOKBOOK
            </button>
            <button
              onClick={() => scrollTo('retailers')}
              className="text-left py-2 hover:text-[#f4772a] transition-colors border-b border-white/10"
            >
              {lang === 'ID' ? 'LOKASI TOKO OFFLINE' : 'STORE LOCATOR'}
            </button>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/10 text-sm font-sans text-white/70">
            <span>© Erigo x JKT48 Vol. 6</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleLang()}
                className="font-mono text-xs text-white border border-white/30 px-2 py-1 rounded"
              >
                LANG: {lang}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
