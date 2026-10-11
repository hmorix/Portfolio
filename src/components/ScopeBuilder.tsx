import React, { useState } from 'react';
import { Sparkles, Terminal, Check, Plus, Cpu, Clock, Layers } from 'lucide-react';
import { Project } from '../data/portfolio';
import { sounds } from '../utils/audio';

interface ScopeBuilderProps {
  onAddCustomScope: (scopedProject: Project) => void;
  lang: 'EN' | 'HI';
}

export const ScopeBuilder: React.FC<ScopeBuilderProps> = ({
  onAddCustomScope,
  lang,
}) => {
  const [projectType, setProjectType] = useState<'ai-agent' | 'saas-web' | 'automation' | 'client-portal'>('ai-agent');
  const [primaryStack, setPrimaryStack] = useState('React + Node.js + Supabase');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    '24/7 Autonomous Bot Loop',
    'NVIDIA / Groq Multi-LLM Routing',
  ]);
  const [timeline, setTimeline] = useState('10 - 14 Days');
  const [projectName, setProjectName] = useState('Custom Autonomous AI Workflow');
  const [isAdded, setIsAdded] = useState(false);

  const projectTypes = [
    {
      id: 'ai-agent',
      name: '24/7 AI Autonomous Agent',
      desc: 'NVIDIA NIM & Groq LLMs with WhatsApp, Web or Telegram automation',
      baseTime: '10 - 14 Days',
    },
    {
      id: 'saas-web',
      name: 'Full Stack SaaS Platform',
      desc: 'React, Vite, Node/Express or Python with PostgreSQL & JWT auth',
      baseTime: '14 - 21 Days',
    },
    {
      id: 'automation',
      name: 'Business Process Digitization',
      desc: 'Convert manual paperwork/PDF forms into automated scan & print web tools',
      baseTime: '7 - 10 Days',
    },
    {
      id: 'client-portal',
      name: 'High-Converting Client Portal',
      desc: 'SEO/AEO optimized, sub-second speed with WhatsApp booking routing',
      baseTime: '5 - 7 Days',
    },
  ];

  const availableFeatures = [
    '24/7 Autonomous Bot Loop',
    'NVIDIA / Groq Multi-LLM Routing',
    'Automated Recurring Invoice Engine',
    'PDF Template Generation',
    'AEO & Schema.org Search Optimization',
    'Digital Signature & Scan Workflow',
    'Role-Based JWT Authentication',
    'Real-time Analytics Dashboard',
  ];

  const toggleFeature = (feat: string) => {
    sounds.playClick();
    setSelectedFeatures(prev =>
      prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]
    );
  };

  const handleAdd = () => {
    sounds.playWhistle();
    const customProject: Project = {
      id: `custom-scope-${Date.now()}`,
      name: projectName || 'Custom Engineered System',
      category: 'automation',
      categoryLabel: 'Custom Architecture',
      tagline: `Scoped Solution: ${primaryStack}`,
      badge: 'Client Scoped Blueprint',
      stack: [primaryStack, ...selectedFeatures.slice(0, 3)],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      description: `Customized client project scope configured with ${primaryStack}. Modules included: ${selectedFeatures.join(', ')}.`,
      highlights: selectedFeatures,
      rating: 5.0,
      featured: true,
      timeline,
    };

    onAddCustomScope(customProject);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="scope-builder" className="py-20 px-[4.6vw] bg-[#e9ecee]/80 border-y border-[#101214]/10">
      <div className="max-w-[1720px] mx-auto">
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#f4772a] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Project Scope Calculator</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bebas tracking-tight text-[#101214] m-0">
            {lang === 'HI' ? 'अपने प्रोजेक्ट का स्कोप तैयार करें' : 'Configure Your Architecture Scope'}
          </h2>
          <p className="text-sm md:text-base text-[#101214]/70 mt-2">
            {lang === 'HI'
              ? 'अपनी तकनीकी आवश्यकताएं चुनें — AI एजेंट्स, ऑटोमेशन या फुल स्टैक वेब ऐप — और तुरंत लाइव डेमो या प्रपोजल के लिए अप्लाई करें।'
              : 'Select your technical requirements and modules to generate a scoped blueprint ready for a 1-on-1 walkthrough.'}
          </p>
        </div>

        {/* Builder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left: Live Blueprint Preview Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-lg shadow-2xl p-6 flex flex-col justify-between bg-[#101214] text-white border border-white/10 select-none overflow-hidden">
              {/* Circuit lines */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 10px 10px, #f4772a 2px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between text-xs font-mono text-white/60 border-b border-white/10 pb-3">
                <div className="flex items-center gap-1.5 text-[#f4772a]">
                  <Terminal className="w-4 h-4" />
                  <span className="font-bold">HARSH SHARMA</span>
                </div>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-white/10 text-white font-mono">
                  HMORIX ARCHITECTURE
                </span>
              </div>

              {/* Center Details */}
              <div className="relative z-10 my-auto">
                <div className="text-[10px] font-mono text-[#f4772a] font-bold uppercase mb-1">
                  SCOPED BLUEPRINT
                </div>
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-white mb-3 leading-snug">
                  {projectName || 'Custom Project Specification'}
                </h3>

                <div className="text-xs font-mono text-white/70 mb-3 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#f4772a]" />
                  <span>{primaryStack}</span>
                </div>

                <div className="space-y-1 text-[11px] text-white/80 font-mono">
                  {selectedFeatures.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                  {selectedFeatures.length > 3 && (
                    <div className="text-white/40 pl-3">
                      + {selectedFeatures.length - 3} more modules
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Specs */}
              <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1 text-white/70">
                  <Clock className="w-3.5 h-3.5 text-[#f4772a]" />
                  <span>Est: {timeline}</span>
                </div>
                <span className="px-2 py-0.5 bg-[#f4772a] text-[#101214] font-bold text-[10px] rounded">
                  DEMO READY
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-[#101214]/60 mt-4 text-center">
              Includes full source code, deployment setup, and post-launch support.
            </div>
          </div>

          {/* Right: Interactive Configuration Controls */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#101214]/15 shadow-sm flex flex-col gap-5">
            {/* Project Name */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#101214]/70 mb-1 font-bold">
                Project Title / Idea:
              </label>
              <input
                type="text"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                placeholder="Ex: Real Estate Lead WhatsApp AI Agent"
                className="w-full px-3 py-2 text-sm font-sans border border-[#101214]/20 focus:border-[#f4772a] focus:outline-none bg-[#f4f5f5]"
              />
            </div>

            {/* Project Type Select */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#101214]/70 mb-2 font-bold">
                Select Core Deliverable:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {projectTypes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      sounds.playClick();
                      setProjectType(t.id as typeof projectType);
                      setTimeline(t.baseTime);
                    }}
                    className={`p-3 text-left border text-xs transition-all ${
                      projectType === t.id
                        ? 'border-[#f4772a] bg-[#101214] text-white shadow-sm'
                        : 'border-[#101214]/15 hover:border-[#101214] text-[#101214] bg-white'
                    }`}
                  >
                    <div className="font-bold mb-0.5">{t.name}</div>
                    <div className="opacity-70 text-[11px] line-clamp-1">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stack Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#101214]/70 mb-2 font-bold">
                Preferred Technology Architecture:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'React + Node.js + Supabase',
                  'Python + Flask + NVIDIA NIM',
                  'Next.js + Tailwind + PostgreSQL',
                  'Vite + Express + MongoDB',
                  'WhatsApp Web + Termux + Groq',
                  'PHP + MySQL + REST API',
                ].map(st => (
                  <button
                    key={st}
                    onClick={() => {
                      sounds.playClick();
                      setPrimaryStack(st);
                    }}
                    className={`p-2 text-[11px] font-mono border text-center transition-colors ${
                      primaryStack === st
                        ? 'border-[#101214] bg-[#101214] text-white font-bold'
                        : 'border-[#101214]/20 text-[#101214] hover:border-[#101214]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Features Checkboxes */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#101214]/70 mb-2 font-bold">
                Required Features &amp; Modules:
              </label>
              <div className="flex flex-wrap gap-2">
                {availableFeatures.map(feat => {
                  const isChecked = selectedFeatures.includes(feat);
                  return (
                    <button
                      key={feat}
                      onClick={() => toggleFeature(feat)}
                      className={`px-2.5 py-1 text-xs font-mono border flex items-center gap-1.5 transition-colors ${
                        isChecked
                          ? 'bg-[#101214] text-white border-[#101214]'
                          : 'bg-[#f4f5f5] text-[#101214] border-black/10 hover:border-black/30'
                      }`}
                    >
                      {isChecked ? <Check className="w-3 h-3 text-[#f4772a]" /> : <Plus className="w-3 h-3" />}
                      <span>{feat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#101214]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-mono text-[#101214]/60">Estimated Turnaround:</div>
                <div className="text-xl font-mono font-bold text-[#101214]">{timeline}</div>
              </div>

              <button
                onClick={handleAdd}
                className={`w-full sm:w-auto px-7 h-12 text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#101214] hover:bg-[#f4772a] text-white active:scale-95'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Demo Request Bag!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add Custom Scope to Demo Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
