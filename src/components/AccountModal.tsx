import React from 'react';
import { X, ShieldCheck, QrCode, Award, PackageCheck, Sparkles } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ID' | 'EN';
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-[#101214]/20 shadow-2xl p-6 rounded-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#101214]/60 hover:text-[#101214] rounded-full hover:bg-black/5"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Member Digital Stadium Card */}
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#f4772a] font-bold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Supporter Member</span>
          </div>
          <h2 className="text-2xl font-bebas tracking-wide text-[#101214] m-0">
            {lang === 'ID' ? 'KARTU SUPPORTER JKT48 X ERIGO' : 'VICTORY SUPPORTER PASS'}
          </h2>
        </div>

        {/* Digital Member Card */}
        <div className="relative p-5 rounded-lg bg-gradient-to-br from-[#101214] via-[#1c1f24] to-[#2a2e36] text-white shadow-xl mb-6 overflow-hidden border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#f4772a]" />
              <span className="font-bebas text-lg tracking-wider">THE PATH TO VICTORY</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#f4772a] text-white font-bold">
              GOLD TIER
            </span>
          </div>

          <div className="mb-4">
            <div className="text-[10px] font-mono text-white/50">MEMBER NAME:</div>
            <div className="font-sans font-bold text-lg text-white">JKT48 SUPPORTER CLUB #48</div>
            <div className="text-xs font-mono text-amber-300">ID: JKT48-ERG-2026-VOL6</div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <div>
              <div className="text-[10px] text-white/50">VICTORY POINTS:</div>
              <div className="font-bold text-[#f4772a] text-sm">1,480 PTS</div>
            </div>
            <div className="flex items-center gap-1.5 text-white/70">
              <QrCode className="w-5 h-5" />
              <span className="text-[10px]">SCAN AT THEATER</span>
            </div>
          </div>
        </div>

        {/* Recent Pre-Order Tracking */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase font-bold text-[#101214]/70 mb-3 flex items-center gap-1.5">
            <PackageCheck className="w-4 h-4 text-[#f4772a]" />
            <span>{lang === 'ID' ? 'Status Pre-Order Terakhir:' : 'Active Pre-Order Status:'}</span>
          </h4>
          <div className="p-3 bg-[#f4f5f5] border border-black/10 rounded text-xs font-mono space-y-1">
            <div className="flex justify-between font-bold text-[#101214]">
              <span>BATCH 01 — #ERG-V6-78482</span>
              <span className="text-emerald-700">IN PRODUCTION</span>
            </div>
            <div className="text-[#101214]/70">
              1x Matchday Retro Home Jersey #48 (Freya 48) + 1x Photocard
            </div>
            <div className="text-[10px] text-[#101214]/50 pt-1 border-t border-black/5 flex justify-between">
              <span>Estimated Dispatch: 18 Nov 2026</span>
              <span className="text-[#f4772a]">Track Airway Bill →</span>
            </div>
          </div>
        </div>

        {/* Member Perks */}
        <div>
          <h4 className="text-xs font-mono uppercase font-bold text-[#101214]/70 mb-2 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#f4772a]" />
            <span>Member Exclusive Perks:</span>
          </h4>
          <ul className="text-xs space-y-1.5 text-[#101214]/80 font-sans">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#f4772a] rounded-full" />
              <span>Priority Access for JKT48 Theater Vol. 6 Meet & Greet</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#f4772a] rounded-full" />
              <span>Guaranteed Holographic Photocard Sleeve Protector</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
