import React, { useState } from 'react';
import { MapPin, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { CASE_STUDIES, PROJECTS, Project } from '../data/portfolio';
import { sounds } from '../utils/audio';

interface CaseStudiesProps {
  onSelectProject: (project: Project) => void;
  lang: 'EN' | 'HI';
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onSelectProject, lang }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const study = CASE_STUDIES[activeSlideIndex];

  const taggedProjects = PROJECTS.filter(p => study.taggedProjectIds.includes(p.id));

  return (
    <section id="case-studies" className="py-20 px-[4.6vw] max-w-[1720px] mx-auto border-t border-[#101214]/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-[#101214]/10">
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f4772a] mb-2">
            Engineering Case Studies &amp; Architecture
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-tight text-[#101214] m-0">
            {lang === 'HI' ? 'सिस्टम डिज़ाइन और केस स्टडीज' : 'Deep-Dive Case Studies'}
          </h2>
          <p className="text-sm md:text-base text-[#101214]/70 mt-2 max-w-xl">
            {lang === 'HI'
              ? 'वास्तविक समस्याओं के लिए विकसित किए गए समाधान — ज़ीरो सर्वर कॉस्ट AI एजेंट्स से लेकर 8x स्पीडअप ऑटोमेशन तक।'
              : 'Detailed technical breakthroughs solving real client bottlenecks and manual processes.'}
          </p>
        </div>

        {/* Scene Navigation Tabs */}
        <div className="flex items-center gap-2">
          {CASE_STUDIES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                sounds.playClick();
                setActiveSlideIndex(idx);
              }}
              className={`px-4 py-2 text-xs font-mono font-bold border transition-all ${
                activeSlideIndex === idx
                  ? 'bg-[#101214] text-white border-[#101214]'
                  : 'bg-white hover:bg-[#f4f5f5] text-[#101214] border-[#101214]/20'
              }`}
            >
              CASE 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Main Case Photo & Overlay */}
        <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-sm group shadow-xl">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover object-center filter contrast-105 transition-transform duration-700 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Bottom Overlay Content */}
          <div className="absolute bottom-6 left-6 right-6 text-white z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#f4772a] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{study.location}</span>
                <span>•</span>
                <span>{study.client}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bebas tracking-wide text-white m-0">
                {study.title}
              </h3>
              <p className="text-sm text-white/80 italic mt-1 max-w-lg">
                "{study.quote}"
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#f4772a] text-[#101214] text-xs font-mono font-bold rounded-sm">
                <Zap className="w-3.5 h-3.5" />
                <span>Impact: {study.result}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Production Systems */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#101214]/60 font-bold">
            RELATED DEPLOYED SYSTEM:
          </div>

          <div className="flex flex-col gap-3">
            {taggedProjects.map(project => (
              <div
                key={project.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectProject(project);
                }}
                className="group p-4 bg-white border border-[#101214]/15 hover:border-[#f4772a] flex items-center gap-4 cursor-pointer transition-all hover:shadow-md"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-16 h-20 object-cover bg-[#f4f5f5]"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-[#f4772a] block font-bold uppercase">
                    {project.badge}
                  </span>
                  <h4 className="text-sm font-sans font-bold text-[#101214] truncate group-hover:text-[#f4772a] transition-colors">
                    {project.name}
                  </h4>
                  <div className="text-xs font-mono text-[#101214]/70 mt-1 line-clamp-1">
                    {project.tagline}
                  </div>
                </div>
                <div className="p-2 text-[#101214]/40 group-hover:text-[#f4772a] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#101214] text-white text-xs font-mono flex items-center justify-between">
            <span>CONSULTATION &amp; SCOPING:</span>
            <span className="text-[#f4772a] font-bold">AVAILABLE NOW</span>
          </div>
        </div>
      </div>
    </section>
  );
};
