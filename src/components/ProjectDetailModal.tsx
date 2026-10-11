import React, { useState } from 'react';
import { X, ExternalLink, Github, Check, Plus, ShieldCheck, Cpu, Clock, Layers } from 'lucide-react';
import { Project } from '../data/portfolio';
import { sounds } from '../utils/audio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onAddToDemoCart: (project: Project) => void;
  isAlreadySelected: boolean;
  lang: 'EN' | 'HI';
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onAddToDemoCart,
  isAlreadySelected,
  lang,
}) => {
  if (!project) return null;

  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    sounds.playWhistle();
    onAddToDemoCart(project);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-[#101214]/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-[#101214] hover:text-white rounded-full text-[#101214] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Project Visual Showcase */}
        <div className="md:w-1/2 p-6 bg-[#f4f5f5] flex flex-col justify-between">
          <div className="relative aspect-[16/11] w-full overflow-hidden bg-white shadow-md mb-4 rounded-sm">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover object-center"
            />
            {project.badge && (
              <span className="absolute top-3 left-3 bg-[#101214] text-white text-[10px] font-mono px-2 py-0.5 uppercase">
                {project.badge}
              </span>
            )}
          </div>

          {/* Quick links & meta */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 bg-[#101214] text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 hover:bg-[#f4772a] transition-colors"
                >
                  <span>VISIT LIVE APP</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 border border-black/20 text-[#101214] text-xs font-mono font-bold flex items-center justify-center gap-1.5 hover:bg-black/5 transition-colors"
                >
                  <span>GITHUB REPO</span>
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="p-3 bg-white border border-black/10 rounded-sm text-xs font-mono text-[#101214]/70 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#f4772a]" />
                <span>Estimated Turnaround:</span>
              </span>
              <span className="font-bold text-[#101214]">{project.timeline}</span>
            </div>
          </div>
        </div>

        {/* Right: Technical Blueprint & Features */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-[#f4772a] uppercase font-bold mb-1">
              {project.categoryLabel}
            </div>

            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#101214] mb-2 leading-tight">
              {project.name}
            </h2>

            <p className="text-xs text-[#101214]/70 font-mono mb-4">
              "{project.tagline}"
            </p>

            {/* Description */}
            <p className="text-sm text-[#101214]/85 mb-5 leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#101214]/70 font-bold mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#f4772a]" />
                <span>Technology Stack:</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map(tech => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 bg-[#f4f5f5] text-[#101214] border border-black/10 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Deliverables Highlights */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#101214]/70 font-bold mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#f4772a]" />
                <span>Key Architectural Highlights:</span>
              </h4>
              <ul className="text-xs space-y-1.5 text-[#101214]/80">
                {project.highlights.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#f4772a] rounded-full mt-1 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-black/10">
            <button
              onClick={handleAdd}
              className={`w-full h-12 text-xs md:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-all ${
                isAlreadySelected
                  ? 'bg-emerald-600 text-white'
                  : isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#101214] hover:bg-[#f4772a] text-white active:scale-95'
              }`}
            >
              {isAlreadySelected || isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Selected in Demo Application Basket</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Choose This Project for Live Walkthrough</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
