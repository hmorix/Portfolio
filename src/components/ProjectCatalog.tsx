import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Eye, Plus, Check, Sparkles, Filter } from 'lucide-react';
import { Project, PROJECTS } from '../data/portfolio';
import { sounds } from '../utils/audio';

interface ProjectCatalogProps {
  onSelectProject: (project: Project) => void;
  onAddToDemoCart: (project: Project) => void;
  demoProjectIds: string[];
  lang: 'EN' | 'HI';
}

export const ProjectCatalog: React.FC<ProjectCatalogProps> = ({
  onSelectProject,
  onAddToDemoCart,
  demoProjectIds,
  lang,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'popular' | 'alpha'>('featured');
  const [addedAnimation, setAddedAnimation] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: lang === 'HI' ? 'सभी प्रोजेक्ट्स' : 'All Projects' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'fullstack', label: 'Full Stack Web Apps' },
    { id: 'automation', label: 'SaaS Invoicing' },
    { id: 'finance', label: 'Fintech & Bookkeeping' },
    { id: 'client', label: 'Client Portals' },
  ];

  const allTechs = ['all', 'Python', 'React', 'Node.js', 'NVIDIA NIM', 'Supabase', 'Tailwind CSS', 'Vite'];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedTech !== 'all' && !p.stack.includes(selectedTech)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.rating - a.rating;
      if (sortBy === 'alpha') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedTech, sortBy]);

  const handleAdd = (project: Project) => {
    sounds.playWhistle();
    onAddToDemoCart(project);
    setAddedAnimation(project.id);
    setTimeout(() => setAddedAnimation(null), 1400);
  };

  return (
    <section id="projects" className="py-20 px-[4.6vw] max-w-[1720px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#101214]/10">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#f4772a] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Engineering Deliverables</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-tight text-[#101214] m-0">
            {lang === 'HI' ? 'प्रोडक्शन प्रोजेक्ट्स और सिस्टम्स' : 'Production Systems & Apps'}
          </h2>
          <p className="text-sm md:text-base text-[#101214]/70 mt-2 max-w-2xl">
            {lang === 'HI'
              ? '24/7 चलने वाले AI एजेंट्स से लेकर ग्लोबल हैकाथॉन एग्रीगेटर्स और ऑटोमेटेड इनवॉइसिंग प्लेटफॉर्म तक — वास्तविक उपयोग के लिए बनाए गए सिस्टम।'
              : 'Select any project below to request a live demo walkthrough, architecture review, or custom adaptation for your business.'}
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#101214]/80 bg-white border border-[#101214]/15 px-3 py-2 rounded">
            <Filter className="w-3.5 h-3.5 text-[#f4772a]" />
            <span>Tech:</span>
            <select
              value={selectedTech}
              onChange={e => setSelectedTech(e.target.value)}
              className="bg-transparent font-medium text-[#101214] outline-none cursor-pointer"
            >
              <option value="all">All Tech Stacks</option>
              {allTechs.filter(t => t !== 'all').map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#101214]/80 bg-white border border-[#101214]/15 px-3 py-2 rounded">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="bg-transparent font-medium text-[#101214] outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="popular">Highest Rated</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              sounds.playClick();
              setSelectedCategory(cat.id);
            }}
            className={`px-4 py-2 text-xs md:text-sm font-medium tracking-tight whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#101214] text-white shadow-sm'
                : 'bg-white/70 hover:bg-white text-[#101214] border border-[#101214]/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProjects.map(project => {
          const isSelected = demoProjectIds.includes(project.id);
          const isAdded = addedAnimation === project.id;

          return (
            <div
              key={project.id}
              className="group flex flex-col justify-between bg-white border border-[#101214]/15 p-5 transition-all duration-300 hover:shadow-xl hover:border-[#f4772a]/70 hover:-translate-y-1"
            >
              <div>
                {/* Thumbnail image with badges */}
                <div className="relative aspect-[16/10] bg-[#f4f5f5] overflow-hidden mb-4 rounded-sm">
                  {project.badge && (
                    <div className="absolute top-3 left-3 z-10 bg-[#101214] text-white text-[10px] font-mono tracking-wider px-2 py-0.5 uppercase">
                      {project.badge}
                    </div>
                  )}

                  <div className="absolute top-3 right-3 z-10 bg-white/95 text-[#101214] text-[10px] font-mono px-2 py-0.5 border border-[#101214]/10 font-bold">
                    {project.timeline}
                  </div>

                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Quick View Blueprint Button on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="w-full py-2 bg-white text-[#101214] text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 hover:bg-[#f4772a] hover:text-white transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Architecture Specs &amp; Details</span>
                    </button>
                  </div>
                </div>

                {/* Category & Tagline */}
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#f4772a] font-bold uppercase">{project.categoryLabel}</span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#101214]/60 hover:text-[#f4772a] flex items-center gap-1 font-semibold"
                    >
                      <span>Live App</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#101214]/60 hover:text-[#f4772a] flex items-center gap-1 font-semibold"
                    >
                      <span>Repo</span>
                      <Github className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Name */}
                <h3
                  onClick={() => onSelectProject(project)}
                  className="font-sans text-lg md:text-xl font-bold text-[#101214] mb-2 leading-snug cursor-pointer hover:text-[#f4772a] transition-colors"
                >
                  {project.name}
                </h3>

                <p className="text-xs text-[#101214]/75 mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map(st => (
                    <span
                      key={st}
                      className="text-[10px] font-mono px-2 py-0.5 bg-[#f4f5f5] text-[#101214] border border-black/5"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button: Choose for Demo */}
              <div className="pt-3 border-t border-[#101214]/10">
                <button
                  onClick={() => handleAdd(project)}
                  className={`w-full h-11 text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : isAdded
                      ? 'bg-amber-600 text-white'
                      : 'bg-[#101214] hover:bg-[#f4772a] text-white active:scale-95'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Selected for Demo Request</span>
                    </>
                  ) : isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Demo Bag!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Choose Project for Live Demo</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
