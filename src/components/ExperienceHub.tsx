import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, ExternalLink } from 'lucide-react';
import { WORK_EXPERIENCE } from '../data/portfolio';

interface ExperienceHubProps {
  lang: 'EN' | 'HI';
}

export const ExperienceHub: React.FC<ExperienceHubProps> = ({ lang }) => {
  return (
    <section id="experience" className="py-20 px-[4.6vw] max-w-[1720px] mx-auto border-t border-[#101214]/10 bg-[#fafafa]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-4 border-b border-[#101214]/10">
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f4772a] mb-2">
            Career Timeline &amp; Organization History
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-tight text-[#101214] m-0">
            {lang === 'HI' ? 'पेशेवर कार्य अनुभव' : 'Professional Work Experience'}
          </h2>
          <p className="text-sm md:text-base text-[#101214]/70 mt-2 max-w-xl">
            {lang === 'HI'
              ? 'HMorix में फुल-स्टैक इंजीनियरिंग से लेकर सरकारी केंद्रों और वित्तीय संस्थानों में बड़े पैमाने पर डिजिटल ऑटोमेशन तक का अनुभव।'
              : 'Proven journey building high-performance systems across fast-moving tech agencies, citizen centers, and financial branches.'}
          </p>
        </div>

        <div className="text-xs font-mono text-[#101214]/70 bg-white border border-[#101214]/15 px-3.5 py-2 rounded flex items-center gap-2">
          <Award className="w-4 h-4 text-[#f4772a]" />
          <span>FEA English Academy — Rank 3 Honors</span>
        </div>
      </div>

      {/* Experience Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WORK_EXPERIENCE.map(exp => (
          <div
            key={exp.id}
            className="p-6 bg-white border border-[#101214]/15 hover:border-[#f4772a] transition-all hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#101214] text-white">
                  {exp.period}
                </span>
                <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  {exp.status}
                </span>
              </div>

              <h3 className="text-xl font-sans font-bold text-[#101214] mb-1">
                {exp.role}
              </h3>

              <div className="text-sm font-semibold text-[#f4772a] mb-3 flex items-center gap-2">
                <span>{exp.company}</span>
                {exp.liveUrl && (
                  <a
                    href={exp.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#101214]/50 hover:text-[#f4772a]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-[#101214]/70 mb-4 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#f4772a]" />
                <span>{exp.location}</span>
                <span>•</span>
                <span>{exp.type}</span>
              </div>

              {/* Highlights */}
              <ul className="space-y-2 text-xs text-[#101214]/85 leading-relaxed">
                {exp.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#101214]/10 text-xs font-mono text-[#101214]/50 flex justify-between">
              <span>Verified Role</span>
              <span className="text-[#f4772a] font-bold">Harsh Sharma</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
