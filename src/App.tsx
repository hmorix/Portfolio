import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectCatalog } from './components/ProjectCatalog';
import { ScopeBuilder } from './components/ScopeBuilder';
import { TechBadges } from './components/TechBadges';
import { CaseStudies } from './components/CaseStudies';
import { ExperienceHub } from './components/ExperienceHub';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { DemoCartDrawer } from './components/DemoCartDrawer';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { Project, PROJECTS } from './data/portfolio';
import { sounds } from './utils/audio';

export default function App() {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [currentTheme, setCurrentTheme] = useState<string>('classic');
  const [isMuted, setIsMuted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals & Drawers state
  const [demoCartOpen, setDemoCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Demo Basket state: pre-select WhatsApp Agent & BillingFlow by default
  const [demoProjects, setDemoProjects] = useState<Project[]>(() => {
    return [PROJECTS[0], PROJECTS[2]];
  });

  // Track active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'scope-builder', 'skills', 'experience', 'case-studies'];
      const scrollPos = window.scrollY + 220;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme application to document root
  const handleSelectTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    if (themeId === 'classic') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }
  };

  const handleToggleAudio = () => {
    sounds.isMuted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Keyboard shortcut Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sounds.playClick();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setAccountOpen(false);
        setDemoCartOpen(false);
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Demo Basket Handlers
  const handleAddToDemoCart = (project: Project) => {
    setDemoProjects(prev => {
      if (prev.some(p => p.id === project.id)) return prev;
      return [...prev, project];
    });
  };

  const handleRemoveDemoProject = (projectId: string) => {
    sounds.playClick();
    setDemoProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const handleClearDemoProjects = () => {
    setDemoProjects([]);
  };

  const demoProjectIds = demoProjects.map(p => p.id);

  return (
    <div className="min-h-screen bg-[#edf0f1] text-[#101214] font-sans antialiased overflow-x-hidden selection:bg-[#f4772a] selection:text-white">
      {/* Navigation Header */}
      <Header
        demoCount={demoProjects.length}
        onOpenDemoCart={() => setDemoCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        lang={lang}
        onToggleLang={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
        isMuted={isMuted}
        onToggleAudio={handleToggleAudio}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <Hero
        onApplyDemoClick={() => setDemoCartOpen(true)}
        onExploreProjectsClick={() => {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        lang={lang}
      />

      {/* Production Projects Catalog */}
      <ProjectCatalog
        onSelectProject={setSelectedProject}
        onAddToDemoCart={handleAddToDemoCart}
        demoProjectIds={demoProjectIds}
        lang={lang}
      />

      {/* Project Scope Calculator */}
      <ScopeBuilder
        onAddCustomScope={handleAddToDemoCart}
        lang={lang}
      />

      {/* Tech Mastery Badges */}
      <TechBadges lang={lang} />

      {/* Experience Timeline */}
      <ExperienceHub lang={lang} />

      {/* Engineering Case Studies */}
      <CaseStudies
        onSelectProject={setSelectedProject}
        lang={lang}
      />

      {/* Footer */}
      <Footer
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        lang={lang}
      />

      {/* Modals and Overlays */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onAddToDemoCart={handleAddToDemoCart}
        isAlreadySelected={selectedProject ? demoProjectIds.includes(selectedProject.id) : false}
        lang={lang}
      />

      <DemoCartDrawer
        isOpen={demoCartOpen}
        onClose={() => setDemoCartOpen(false)}
        selectedProjects={demoProjects}
        onRemoveProject={handleRemoveDemoProject}
        onClearAll={handleClearDemoProjects}
        lang={lang}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProject={setSelectedProject}
        lang={lang}
      />

      <AccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
        lang={lang}
      />
    </div>
  );
}
