import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, CheckCircle2, MessageSquare, Calendar, Video, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project } from '../data/portfolio';
import { sounds } from '../utils/audio';

interface DemoCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProjects: Project[];
  onRemoveProject: (projectId: string) => void;
  onClearAll: () => void;
  lang: 'EN' | 'HI';
}

export const DemoCartDrawer: React.FC<DemoCartDrawerProps> = ({
  isOpen,
  onClose,
  selectedProjects,
  onRemoveProject,
  onClearAll,
  lang,
}) => {
  const [demoType, setDemoType] = useState('15-min Live Architecture Walkthrough');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingReference, setBookingReference] = useState<string | null>(null);

  if (!isOpen) return null;

  const demoTypes = [
    { id: '15-min Live Architecture Walkthrough', icon: Video, label: '15-Min Live Screen Walkthrough' },
    { id: 'Client Project Quote & Scope Review', icon: Calendar, label: 'Client Quote & Technical Scope' },
    { id: 'Full-Time / Freelance Hiring Inquiry', icon: Clock, label: 'Full-Time / Contract Hiring' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playWhistle();
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#f4772a', '#101214', '#10b981', '#3b82f6'],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      const generatedRef = `DEMO-HS-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingReference(generatedRef);
      setIsSubmitting(false);
    }, 1100);
  };

  const projectNamesList = selectedProjects.map(p => p.name).join(', ') || 'Custom Solution';
  const whatsappPreFill = encodeURIComponent(
    `Hi Harsh, I saw your portfolio and would like to request a demo for: ${projectNamesList}. (Ref: ${bookingReference || 'Web-Demo'})`
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-slideIn">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#101214]/10 flex items-center justify-between bg-[#f4f5f5]">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bebas tracking-wide text-[#101214] m-0">
              {lang === 'HI' ? 'डेमो और प्रपोजल आवेदन बैग' : 'DEMO & COLLABORATION BASKET'}
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 bg-[#101214] text-white rounded">
              {selectedProjects.length} {selectedProjects.length === 1 ? 'project' : 'projects'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#101214]/70 hover:text-[#101214] hover:bg-black/5 rounded-full"
            aria-label="Close demo cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational banner */}
        <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-200/60 text-xs font-mono text-amber-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#f4772a] shrink-0" />
          <span>Direct 1-on-1 walkthrough with Harsh Sharma (Response &lt; 4 hours)</span>
        </div>

        {/* Confirmation Screen */}
        {bookingReference ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bebas tracking-wide text-[#101214] mb-2">
              DEMO APPLICATION RECEIVED!
            </h3>
            <p className="text-sm text-[#101214]/80 mb-4 max-w-sm">
              Thank you, {clientName || 'Partner'}! Your walkthrough request for{' '}
              <strong className="text-[#101214]">{projectNamesList}</strong> has been prioritized.
            </p>

            <div className="p-4 bg-[#f4f5f5] rounded border border-black/10 font-mono text-xs mb-6 w-full text-left">
              <div className="text-[#101214]/60">APPLICATION REFERENCE:</div>
              <div className="font-bold text-base text-[#101214] mb-2">{bookingReference}</div>
              <div className="text-[#101214]/60">DEMO FORMAT:</div>
              <div className="font-semibold text-emerald-700">{demoType}</div>
            </div>

            <a
              href={`https://wa.me/919368153189?text=${whatsappPreFill}`}
              target="_blank"
              rel="noreferrer"
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2 mb-3 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>CONTINUE ON WHATSAPP (+91 9368153189)</span>
            </a>

            <button
              onClick={() => {
                setBookingReference(null);
                onClearAll();
                onClose();
              }}
              className="w-full h-11 bg-[#101214] text-white text-xs font-semibold tracking-wider hover:bg-[#f4772a] transition-colors"
            >
              DONE &amp; RETURN TO PORTFOLIO
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable Middle: Selected Projects & Form */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Selected Projects List */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#101214]/70 uppercase font-bold mb-3">
                  <span>Selected Projects for Walkthrough:</span>
                  {selectedProjects.length > 0 && (
                    <button
                      onClick={onClearAll}
                      className="text-red-500 hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {selectedProjects.length === 0 ? (
                  <div className="p-6 text-center bg-[#f4f5f5] border border-dashed border-black/15 text-xs text-[#101214]/60">
                    <p className="mb-2">No projects selected yet.</p>
                    <p className="text-[11px] font-mono">
                      Browse the projects above and click "Choose Project for Live Demo" to add them here!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedProjects.map(project => (
                      <div
                        key={project.id}
                        className="p-3 bg-[#f4f5f5] border border-[#101214]/10 flex items-center gap-3"
                      >
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-14 h-14 object-cover bg-black/10 shrink-0 rounded-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-mono text-[#f4772a] block font-bold uppercase">
                            {project.categoryLabel}
                          </span>
                          <h4 className="text-sm font-bold text-[#101214] truncate">
                            {project.name}
                          </h4>
                          <span className="text-[11px] font-mono text-[#101214]/60">
                            Est: {project.timeline}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveProject(project.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-black/5 rounded"
                          title="Remove from demo list"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Consultation / Walkthrough Form */}
              <form id="demo-form" onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-black/10">
                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-[#101214]/80 mb-1.5">
                    Select Demo / Inquiry Format:
                  </label>
                  <div className="space-y-1.5">
                    {demoTypes.map(type => (
                      <label
                        key={type.id}
                        className={`flex items-center gap-2.5 p-2.5 border text-xs cursor-pointer transition-colors ${
                          demoType === type.id
                            ? 'bg-[#101214] text-white border-[#101214]'
                            : 'bg-white border-black/15 text-[#101214] hover:bg-black/5'
                        }`}
                      >
                        <input
                          type="radio"
                          name="demoType"
                          checked={demoType === type.id}
                          onChange={() => setDemoType(type.id)}
                          className="hidden"
                        />
                        <type.icon className="w-4 h-4 text-[#f4772a] shrink-0" />
                        <span className="font-medium">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-[#101214]/80 mb-1">
                    Your Full Name / Company:
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="Ex: Alexander Vance / Tech Lead"
                    className="w-full px-3 py-2 text-xs border border-black/20 focus:border-[#f4772a] focus:outline-none bg-[#f4f5f5]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-[#101214]/80 mb-1">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3 py-2 text-xs border border-black/20 focus:border-[#f4772a] focus:outline-none bg-[#f4f5f5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-[#101214]/80 mb-1">
                      WhatsApp Number:
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs border border-black/20 focus:border-[#f4772a] focus:outline-none bg-[#f4f5f5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-[#101214]/80 mb-1">
                    Custom Notes or Questions (Optional):
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Tell me what specific features or architecture you'd like to see..."
                    className="w-full px-3 py-2 text-xs border border-black/20 focus:border-[#f4772a] focus:outline-none bg-[#f4f5f5]"
                  />
                </div>
              </form>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 border-t border-[#101214]/10 bg-[#f4f5f5]">
              <div className="flex items-center justify-between text-xs font-mono text-[#101214]/70 mb-3">
                <span>Direct Contact:</span>
                <span className="font-bold text-[#101214]">+91 9368153189</span>
              </div>

              <button
                type="submit"
                form="demo-form"
                disabled={isSubmitting || selectedProjects.length === 0}
                className="w-full h-12 bg-[#101214] hover:bg-[#f4772a] text-white font-semibold text-xs md:text-sm tracking-wider flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-40"
              >
                <span>
                  {isSubmitting
                    ? 'SCHEDULING DEMO APPLICATION...'
                    : selectedProjects.length === 0
                    ? 'PLEASE CHOOSE AT LEAST 1 PROJECT'
                    : `APPLY FOR DEMO (${selectedProjects.length} PROJECTS)`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
