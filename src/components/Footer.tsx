import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, Phone, Github, Globe } from 'lucide-react';
import { COLOR_THEMES } from '../data/portfolio';
import { sounds } from '../utils/audio';

interface FooterProps {
  currentTheme: string;
  onSelectTheme: (theme: string) => void;
  lang: 'EN' | 'HI';
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
            <h3 className="font-sans text-3xl font-medium tracking-tight mb-2">
              Harsh<span className="text-[#f4772a] font-bold">Sharma</span>
            </h3>
            <div className="text-xs font-mono text-[#f4772a] uppercase tracking-wider mb-3">
              Full Stack Web Developer &amp; UI/UX Designer
            </div>
            <p className="text-sm text-white/70 max-w-sm mb-6 leading-relaxed">
              {lang === 'HI'
                ? 'HMorix, हाथरस में आधारित। प्रोडक्शन वेब ऐप्स, AI एजेंट्स और डिजिटल ऑटोमेशन सिस्टम का संपूर्ण निर्माण।'
                : 'Based at HMorix, Hathras, UP. Architecting production web systems, 24/7 AI agents, and workflow automations end-to-end.'}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-white/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AVAILABLE FOR FULL-STACK &amp; AI AGENT CONTRACTS</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 font-bold mb-4">
              PROJECTS
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <button onClick={() => scrollTo('projects')} className="hover:text-[#f4772a] transition-colors">
                  WhatsApp 24/7 AI Agent
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('projects')} className="hover:text-[#f4772a] transition-colors">
                  EventNix Tech Aggregator
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('projects')} className="hover:text-[#f4772a] transition-colors">
                  BillingFlow SaaS Invoicing
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('scope-builder')} className="hover:text-[#f4772a] transition-colors flex items-center gap-1">
                  <span>Scope Calculator</span>
                  <span className="text-[10px] text-[#f4772a] font-mono">NEW</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Experience Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 font-bold mb-4">
              CAREER &amp; HUBS
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <button onClick={() => scrollTo('experience')} className="hover:text-[#f4772a] transition-colors">
                  HMorix Technologies (2026-Present)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('experience')} className="hover:text-[#f4772a] transition-colors">
                  Sahara India Pariwar Automation
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('experience')} className="hover:text-[#f4772a] transition-colors">
                  DD Computers (Aadhaar Kendra)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('skills')} className="hover:text-[#f4772a] transition-colors">
                  Tech Mastery Badges
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 font-bold mb-4">
              CONTACT &amp; INQUIRIES
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-white/80 mb-4">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#f4772a]" />
                <a href="mailto:hssuperuserc@gmail.com" className="hover:text-[#f4772a]">
                  hssuperuserc@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#f4772a]" />
                <a href="https://wa.me/919368153189" target="_blank" rel="noreferrer" className="hover:text-[#f4772a]">
                  +91 9368153189
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-[#f4772a]" />
                <a href="https://github.com/hmorix" target="_blank" rel="noreferrer" className="hover:text-[#f4772a]">
                  github.com/hmorix
                </a>
              </li>
            </ul>

            <a
              href="https://wa.me/919368153189?text=Hi%20Harsh%2C%20let%27s%20discuss%20a%20project%20or%20live%20demo."
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full py-2 bg-[#f4772a] hover:bg-[#f4772a]/90 text-[#101214] text-xs font-mono font-bold tracking-wider uppercase transition-colors items-center justify-center gap-1.5"
            >
              <span>CONNECT ON WHATSAPP</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Swatches */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
          <div>
            © 2026 HARSH SHARMA • FULL STACK DEVELOPER &amp; UI/UX DESIGNER • HMORIX
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-white/40">THEME:</span>
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
