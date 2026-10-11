import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Maximize2, X, Terminal, Palette, Bot, Sparkles, Volume2, VolumeX, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeroVideoIntroProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
  lang: 'EN' | 'HI';
}

export const HeroVideoIntro: React.FC<HeroVideoIntroProps> = ({
  isModalOpen = false,
  onCloseModal,
  lang,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const scenes = [
    {
      id: 0,
      badge: 'PHASE 01 // UI/UX DESIGN',
      title: 'UI/UX & Product Design',
      subtitle: 'From Figma wireframes to intuitive visual systems',
      icon: Palette,
      accent: '#f4772a',
      codeSnippet: `// 01. Design System & Tokens
const theme = {
  typography: 'Bebas Neue + Inter',
  palette: { primary: '#f4772a', ink: '#101214' },
  spacing: '8pt grid',
  accessibility: 'WCAG AA 4.5:1 Contrast'
};`,
      points: [
        'Figma to pixel-perfect production code',
        'Responsive mobile-first grid systems',
        'Micro-interactions & physics-based motion',
      ],
    },
    {
      id: 1,
      badge: 'PHASE 02 // FULL STACK',
      title: 'Full Stack Engineering',
      subtitle: 'Resilient APIs, TypeScript frontend & PostgreSQL architecture',
      icon: Terminal,
      accent: '#3b82f6',
      codeSnippet: `// 02. Production Backend & APIs
export async function handleRequest(req, res) {
  const auth = await verifyJWT(req.headers.token);
  const data = await db.query('SELECT * FROM billing');
  return res.status(200).json({ ok: true, data });
}`,
      points: [
        'React, Vite, Node.js, Express & Python Flask',
        'PostgreSQL, Supabase & Redis caching',
        'High-speed sub-800ms API endpoints',
      ],
    },
    {
      id: 2,
      badge: 'PHASE 03 // AI AUTOMATION',
      title: '24/7 Autonomous AI Agents',
      subtitle: 'NVIDIA NIM, Groq LLMs & self-healing automation loops',
      icon: Bot,
      accent: '#10b981',
      codeSnippet: `// 03. 24/7 Autonomous Agent Loop
const agent = new AutonomousAgent({
  models: ['NVIDIA-NIM', 'Groq-Llama-3'],
  runtime: 'Termux-Android-24/7',
  selfHealing: true
});
await agent.listenAndExecute();`,
      points: [
        'WhatsApp AI bot running 24/7 with zero server bill',
        'Dual persona switching: Client sales vs Recruiter',
        'Automated document & billing pipelines',
      ],
    },
  ];

  // Video progress loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentScene(curr => (curr + 1) % scenes.length);
          return 0;
        }
        return prev + 1.25;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isPlaying, scenes.length]);

  const activeSceneData = scenes[currentScene];

  const handleSelectScene = (index: number) => {
    sounds.playClick();
    setCurrentScene(index);
    setProgress(0);
  };

  const handleTogglePlay = () => {
    sounds.playClick();
    setIsPlaying(!isPlaying);
  };

  const content = (
    <div className="relative w-full h-full bg-[#0d0f12] text-white rounded-lg overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-between select-none">
      {/* Top Header Bar */}
      <div className="relative z-10 px-4 py-3 bg-black/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#f4772a]">
            VEO INTRO MOTION PLAYER
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80">
            {activeSceneData.badge}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              setIsMuted(!isMuted);
            }}
            className="p-1 text-white/70 hover:text-white"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#f4772a]" />}
          </button>

          {onCloseModal && (
            <button
              onClick={onCloseModal}
              className="p-1 text-white/70 hover:text-white"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Video Animation Stage */}
      <div className="relative z-0 flex-1 p-6 flex flex-col justify-center overflow-hidden">
        {/* Ambient Glow */}
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: activeSceneData.accent }}
        />

        {/* Scene Info */}
        <div className="relative z-10 max-w-xl mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <activeSceneData.icon className="w-5 h-5 text-[#f4772a]" />
            <h3 className="text-2xl sm:text-3xl font-bebas tracking-wide text-white m-0">
              {activeSceneData.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-white/70 mb-3 font-sans">
            {activeSceneData.subtitle}
          </p>
        </div>

        {/* Terminal / Code / Architecture Visual Box */}
        <div className="relative z-10 bg-black/80 rounded border border-white/10 p-3 sm:p-4 font-mono text-xs overflow-x-auto shadow-inner">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-white/50">
            <span>harsh@hmorix:~/systems$ execution_runtime</span>
            <span className="text-emerald-400">● 60 FPS LIVE MOTION</span>
          </div>
          <pre className="text-emerald-400 text-[11px] sm:text-xs leading-relaxed font-mono">
            {activeSceneData.codeSnippet}
          </pre>
        </div>

        {/* Bullet Highlights */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-xs font-mono text-white/80">
          {activeSceneData.points.map((pt, idx) => (
            <div key={idx} className="flex items-center gap-1.5 p-1.5 bg-white/5 rounded border border-white/5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#f4772a] shrink-0" />
              <span className="truncate">{pt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Timeline Controls */}
      <div className="relative z-10 px-4 py-3 bg-black/70 backdrop-blur-md border-t border-white/10 flex flex-col gap-2">
        {/* Progress Timeline Bar */}
        <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#f4772a] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          {/* Play / Pause / Replay */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className="p-1.5 rounded bg-white/10 hover:bg-[#f4772a] hover:text-[#101214] text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setProgress(0);
                setCurrentScene(0);
              }}
              className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Restart Intro"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-white/60">
              0{currentScene + 1} / 0{scenes.length}
            </span>
          </div>

          {/* Phase Segment Selectors */}
          <div className="flex items-center gap-1">
            {scenes.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleSelectScene(idx)}
                className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                  currentScene === idx
                    ? 'bg-[#f4772a] text-[#101214] font-bold'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                P0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (isModalOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9] shadow-2xl">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
