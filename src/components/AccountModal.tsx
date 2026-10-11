import React from 'react';
import { X, ShieldCheck, Mail, Phone, MapPin, Github, Globe, Award, Download, CheckCircle2 } from 'lucide-react';
import { HARSH_PORTRAIT_PATH } from '../data/assets';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'EN' | 'HI';
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white border border-[#101214]/20 shadow-2xl p-6 sm:p-8 rounded-sm max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#101214]/60 hover:text-[#101214] rounded-full hover:bg-black/5"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Card Header */}
        <div className="flex items-center gap-4 mb-6 pb-5 border-b border-black/10">
          <img
            src={HARSH_PORTRAIT_PATH}
            alt="Harsh Sharma"
            className="w-16 h-20 object-cover rounded shadow border border-black/15"
          />
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-[#f4772a] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Stack Developer &amp; UI/UX</span>
            </div>
            <h2 className="text-2xl font-sans font-bold text-[#101214] m-0">
              Harsh Sharma
            </h2>
            <div className="text-xs text-[#101214]/70 font-mono mt-0.5">
              HMorix Digital Technologies • Hathras, Uttar Pradesh, India
            </div>
          </div>
        </div>

        {/* Contact Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono mb-6">
          <a
            href="mailto:hssuperuserc@gmail.com"
            className="p-2.5 bg-[#f4f5f5] hover:bg-black/5 border border-black/10 rounded flex items-center gap-2 text-[#101214] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#f4772a]" />
            <span className="truncate">hssuperuserc@gmail.com</span>
          </a>

          <a
            href="https://wa.me/919368153189"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-[#f4f5f5] hover:bg-black/5 border border-black/10 rounded flex items-center gap-2 text-[#101214] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#f4772a]" />
            <span>+91 9368153189</span>
          </a>

          <a
            href="https://github.com/hmorix"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-[#f4f5f5] hover:bg-black/5 border border-black/10 rounded flex items-center gap-2 text-[#101214] transition-colors"
          >
            <Github className="w-4 h-4 text-[#f4772a]" />
            <span>github.com/hmorix</span>
          </a>

          <a
            href="https://harshsharma.tech"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-[#f4f5f5] hover:bg-black/5 border border-black/10 rounded flex items-center gap-2 text-[#101214] transition-colors"
          >
            <Globe className="w-4 h-4 text-[#f4772a]" />
            <span>harshsharma.tech</span>
          </a>
        </div>

        {/* Core Summary */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase font-bold text-[#101214]/70 mb-2">
            Professional Summary:
          </h4>
          <p className="text-xs text-[#101214]/85 leading-relaxed bg-[#f4f5f5] p-3 rounded border border-black/10">
            Full Stack Web Developer at HMorix. Builds production web apps, automation systems, and AI agents end-to-end, from system design and backend to UI/UX. Skilled in RESTful APIs, JWT authentication, database design, SEO/AEO/GEO optimization, and graphic/motion design, with a record of turning manual processes into fast digital systems.
          </p>
        </div>

        {/* Education & Honors */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase font-bold text-[#101214]/70 mb-2">
            Education &amp; Credentials:
          </h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center p-2.5 bg-white border border-black/10 rounded">
              <div>
                <span className="font-bold text-[#101214]">Higher Secondary (12th)</span>
                <span className="text-[#101214]/60 block text-[11px]">CBSE Board</span>
              </div>
              <span className="text-[#f4772a] font-bold">2022 – 2023</span>
            </div>

            <div className="flex justify-between items-center p-2.5 bg-white border border-black/10 rounded">
              <div>
                <span className="font-bold text-[#101214]">FEA English Academy</span>
                <span className="text-[#101214]/60 block text-[11px]">English Communication &amp; Personality Dev</span>
              </div>
              <span className="text-emerald-700 font-bold">Rank 3 Honors</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Consultation Action */}
        <a
          href="https://wa.me/919368153189?text=Hi%20Harsh%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%20for%20a%20project."
          target="_blank"
          rel="noreferrer"
          className="w-full py-3 bg-[#101214] hover:bg-[#f4772a] text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 rounded-sm shadow"
        >
          <span>CHAT DIRECTLY ON WHATSAPP (+91 9368153189)</span>
        </a>
      </div>
    </div>
  );
};
