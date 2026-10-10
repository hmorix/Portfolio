import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { COLOR_THEMES } from '../data/products';
import { sounds } from '../utils/audio';

interface FooterProps {
  currentTheme: string;
  onSelectTheme: (theme: string) => void;
  lang: 'ID' | 'EN';
}

export const Footer: React.FC<FooterProps> = ({ currentTheme, onSelectTheme, lang }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sounds.playWhistle();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3500);
  };

  const scrollTo = (id: string) => {
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101214] text-white pt-16 pb-10 px-[4.6vw] border-t border-white/10 select-none">
      <div className="max-w-[1720px] mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-3xl font-medium tracking-tight mb-3">
              ThePathTo<span className="text-[#f4772a] font-bold">Victory</span>
            </h3>
            <p className="text-sm text-white/70 max-w-sm mb-6 leading-relaxed">
              {lang === 'ID'
                ? 'Kolaborasi resmi ERIGO X JKT48 Vol. 6 merayakan semangat blockcore dan kultur suporter sepakbola modern.'
                : 'Official ERIGO X JKT48 Vol. 6 collaboration celebrating matchday blockcore aesthetics and supporter culture.'}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-white/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>BATCH 01 PRODUCTION CURRENTLY OPEN</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 font-bold mb-4">
              COLLECTION
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <button onClick={() => scrollTo('catalog')} className="hover:text-[#f4772a] transition-colors">
                  Best Jackets
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('catalog')} className="hover:text-[#f4772a] transition-colors">
                  Retro Jerseys #48
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('customizer')} className="hover:text-[#f4772a] transition-colors flex items-center gap-1">
                  <span>Custom Kit Builder</span>
                  <span className="text-[10px] text-[#f4772a] font-mono">NEW</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('catalog')} className="hover:text-[#f4772a] transition-colors">
                  Tracksuits & Pants
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('catalog')} className="hover:text-[#f4772a] transition-colors">
                  Stadium Scarves
                </button>
              </li>
            </ul>
          </div>

          {/* Experience Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 font-bold mb-4">
              EXPERIENCE
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <button onClick={() => scrollTo('gacha')} className="hover:text-[#f4772a] transition-colors">
                  Photocard Gacha Simulator
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('lookbook')} className="hover:text-[#f4772a] transition-colors">
                  Campaign Lookbook
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('retailers')} className="hover:text-[#f4772a] transition-colors">
                  Offline Stores & Pop-ups
                </button>
              </li>
              <li>
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('hero');
                  }}
                  className="hover:text-[#f4772a] transition-colors"
                >
                  Size Chart & Fitting
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Drop Alert */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 font-bold mb-4">
              DROP NOTIFICATION
            </h4>
            <p className="text-xs text-white/70 mb-3">
              Dapatkan notifikasi batch rilis berikutnya & info photocard eksklusif.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Terdaftar! Cek email konfirmasi kamu.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email kamu..."
                  className="w-full px-3 py-2 text-xs font-mono bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-[#f4772a] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#f4772a] hover:bg-[#f4772a]/90 text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors"
                >
                  NOTIFY ME FOR BATCH 02
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Swatches (matching reference) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
          <div>
            © 2026 ERIGO X JKT48 VOL. 6 — THE PATH TO VICTORY. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-white/40">COLORWAY THEME:</span>
            <div className="flex items-center gap-1.5" aria-label="Theme selector">
              {COLOR_THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => {
                    sounds.playClick();
                    onSelectTheme(theme.id);
                  }}
                  className={`w-4 h-4 border border-white/40 transition-transform ${
                    currentTheme === theme.id ? 'scale-125 ring-2 ring-[#f4772a]' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: theme.primary }}
                  title={theme.name}
                />
              ))}
            </div>
            <button
              onClick={() => scrollTo('hero')}
              className="text-white hover:text-[#f4772a] flex items-center gap-1 transition-colors ml-2"
            >
              <span>TOP</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
