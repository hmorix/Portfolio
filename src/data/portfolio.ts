import { PROJECT_IMAGES } from './assets';

export interface Project {
  id: string;
  name: string;
  category: 'ai' | 'fullstack' | 'automation' | 'finance' | 'client';
  categoryLabel: string;
  tagline: string;
  badge: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  description: string;
  highlights: string[];
  rating: number;
  featured: boolean;
  timeline: string;
}

export interface SkillCard {
  id: string;
  title: string;
  category: string;
  level: string;
  rarity: 'SSR Gold Hologram' | 'SR Silver Prism' | 'Rare Architect Foil';
  description: string;
  technologies: string[];
  impactMetric: string;
  iconName: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  highlights: string[];
  liveUrl?: string;
  status: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  location: string;
  image: string;
  quote: string;
  result: string;
  taggedProjectIds: string[];
}

export const COLOR_THEMES = [
  { id: 'classic', name: 'Signature Amber', primary: '#f4772a', bg: '#edf0f1', border: '#f4772a' },
  { id: 'shibuya', name: 'Cyber Neon', primary: '#d4ff00', bg: '#0d0f12', border: '#d4ff00' },
  { id: 'emerald', name: 'Emerald Terminal', primary: '#10b981', bg: '#061e16', border: '#10b981' },
  { id: 'crimson', name: 'Crimson Matrix', primary: '#ef4444', bg: '#190909', border: '#ef4444' },
  { id: 'monochrome', name: 'Pure Platinum', primary: '#ffffff', bg: '#111315', border: '#94a3b8' },
];

export const PROJECTS: Project[] = [
  {
    id: 'whatsapp-agent',
    name: 'WhatsApp 24/7 AI Agent',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    tagline: 'Autonomous client & recruiter assistant powered by NVIDIA NIM & Groq',
    badge: 'Flagship AI Project',
    stack: ['Python', 'NVIDIA NIM', 'Groq LLMs', 'WhatsApp Web API', 'Termux', 'Supabase'],
    githubUrl: 'https://github.com/hmorix/WhatsApp-Bot',
    image: PROJECT_IMAGES.whatsappAgent,
    description: 'An autonomous WhatsApp agent running continuously 24/7 on Termux. Intelligently switches personas for clients vs. recruiters, answers questions, schedules meetings, and stores conversation metadata into Supabase with self-healing pipelines.',
    highlights: [
      '24/7 autonomous uptime with zero server cost on mobile Termux runtime',
      'Dual persona switching: corporate recruiter pitch vs. client sales consultation',
      'NVIDIA NIM & Groq multi-model fallback for sub-800ms response speed',
      'Integrated meeting scheduling & client database sync'
    ],
    rating: 5.0,
    featured: true,
    timeline: '2 weeks delivery',
  },
  {
    id: 'eventnix',
    name: 'EventNix — Global Tech Event Aggregator',
    category: 'fullstack',
    categoryLabel: 'Full Stack Web App',
    tagline: 'Discover hackathons, tech seminars & Hacktoberfest worldwide',
    badge: 'Live Production',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL'],
    liveUrl: 'https://eventnix.tech',
    image: PROJECT_IMAGES.eventNix,
    description: 'A global tech event curation platform aggregating premier developer hackathons, seminars, and conferences. Features geo-based filtering, online/offline toggles, bookmark reminders, and instant application flows.',
    highlights: [
      'Dynamic geo-filtering: discover hackathons happening nearby or online',
      'Calendar reminders and direct application tracking',
      'Curated Hacktoberfest & Open Source community integrations',
      'Blazing fast sub-second client-side search across 1000+ events'
    ],
    rating: 4.9,
    featured: true,
    timeline: '3 weeks delivery',
  },
  {
    id: 'billingflow',
    name: 'BillingFlow — Automated Invoicing Platform',
    category: 'automation',
    categoryLabel: 'SaaS & Automation',
    tagline: 'Recurring invoice generator with automated email delivery pipelines',
    badge: 'B2B SaaS Engine',
    stack: ['Node.js', 'Express', 'React', 'Tailwind', 'Nodemailer', 'MongoDB'],
    liveUrl: 'https://billingflow.hmorix.in',
    image: PROJECT_IMAGES.billingFlow,
    description: 'Automated billing engine built for agencies and service businesses. Manages client accounts, calculates recurring monthly fees, generates PDF invoices from templates, and schedules automated email dispatches.',
    highlights: [
      'Automated recurring monthly invoice dispatches via cron jobs',
      'Configurable HTML/PDF invoice templates with dynamic tax math',
      'Client payment status dashboard & overdue notification hooks',
      'Reduced manual accounting overhead by over 90%'
    ],
    rating: 4.9,
    featured: true,
    timeline: '2.5 weeks delivery',
  },
  {
    id: 'calcu',
    name: 'Calcu — Financial Calculation Suite',
    category: 'finance',
    categoryLabel: 'Financial Tool',
    tagline: 'High-precision algorithmic calculator for business & investment planning',
    badge: 'Fintech Utility',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Vite'],
    liveUrl: 'https://calcu.hmorix.in',
    image: PROJECT_IMAGES.calcu,
    description: 'Specialized financial calculation platform for investment projections, amortization schedules, loan modeling, and tax simulations with interactive visual breakdowns.',
    highlights: [
      'Instant real-time chart calculations without server roundtrips',
      'Exportable financial breakdown reports in PDF/CSV formats',
      'Clean responsive mobile-first UI with dark/light themes'
    ],
    rating: 4.8,
    featured: false,
    timeline: '1 week delivery',
  },
  {
    id: 'ca-firm',
    name: 'Chartered Accountant Delhi Portal',
    category: 'client',
    categoryLabel: 'Client Portal',
    tagline: 'High-converting firm website for tax, audit & advisory services',
    badge: 'Client Deliverable',
    stack: ['React', 'Vite', 'Tailwind CSS', 'SEO Optimization', 'AEO Architecture'],
    liveUrl: 'https://cashubham.in',
    image: PROJECT_IMAGES.caFirm,
    description: 'Professional web portal built for a prominent Delhi Chartered Accountant firm. Engineered with AEO (Answer Engine Optimization) & GEO ranking principles to convert business inquiries into consultation appointments.',
    highlights: [
      'Structured schema markup for top local Google & Perplexity rankings',
      'Integrated consultation booking workflow with instant WhatsApp routing',
      'Sub-second page load times with 100/100 Lighthouse performance'
    ],
    rating: 5.0,
    featured: true,
    timeline: '1.5 weeks delivery',
  },
  {
    id: 'english-coach',
    name: 'English Fluency Voice AI Coach',
    category: 'ai',
    categoryLabel: 'Voice AI App',
    tagline: 'Real-time conversational speech coach with pronunciation feedback',
    badge: 'AI Speech Tech',
    stack: ['Flask', 'Python', 'NVIDIA NIM LLM API', 'Web Speech API', 'Redis'],
    githubUrl: 'https://github.com/hmorix/Leanorix',
    image: PROJECT_IMAGES.englishCoach,
    description: 'Voice-enabled AI conversational coaching app built using Flask and NVIDIA NIM. Analyzes user spoken English in real time, provides grammar corrections, and maintains daily practice streak mechanics.',
    highlights: [
      'Real-time voice-to-voice feedback loop powered by Web Speech API',
      'Context-aware conversation prompts tailored to professional interviews',
      'Streak mechanics and user engagement gamification'
    ],
    rating: 4.9,
    featured: false,
    timeline: '2 weeks delivery',
  },
  {
    id: 'account-system',
    name: 'Account — Digital Bookkeeping System',
    category: 'finance',
    categoryLabel: 'Enterprise System',
    tagline: 'Digital ledger and financial records maintenance web application',
    badge: 'Record Keeping',
    stack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'REST APIs'],
    liveUrl: 'https://account.hmorix.in',
    image: PROJECT_IMAGES.account,
    description: 'Comprehensive digital bookkeeping and ledger management solution designed for tracking debit/credit transactions, client balances, and auditing records.',
    highlights: [
      'Automated trial balance and ledger generation',
      'Role-based access control for accountants and auditors',
      'Robust audit logging for compliance'
    ],
    rating: 4.7,
    featured: false,
    timeline: '3 weeks delivery',
  },
];

export const SKILL_CARDS: SkillCard[] = [
  {
    id: 'skill-ai',
    title: 'AI Agents & Automation',
    category: 'Artificial Intelligence',
    level: 'Advanced Specialist',
    rarity: 'SSR Gold Hologram',
    description: 'Architecting 24/7 autonomous agents using NVIDIA NIM, Groq, and Google Gemini with self-healing Supabase pipelines.',
    technologies: ['NVIDIA NIM', 'Groq', 'Prompt Engineering', 'WhatsApp Automation', 'Chatbots', 'Termux'],
    impactMetric: '24/7 Zero-Downtime Operations',
    iconName: 'Bot',
  },
  {
    id: 'skill-fullstack',
    title: 'Full Stack Engineering',
    category: 'Web Architecture',
    level: 'Core Mastery',
    rarity: 'SSR Gold Hologram',
    description: 'End-to-end production web applications with high-throughput RESTful APIs, JWT security, and resilient data layer.',
    technologies: ['React.js', 'Node.js', 'Vite', 'Express.js', 'Python', 'Flask', 'PHP', 'Tailwind'],
    impactMetric: 'Sub-second API Latency',
    iconName: 'Code',
  },
  {
    id: 'skill-workflow',
    title: 'Process Digitization',
    category: 'System Optimization',
    level: 'Proven Track Record',
    rarity: 'Rare Architect Foil',
    description: 'Transforming tedious manual paperwork and form entry into automated digital workflows with signature capture.',
    technologies: ['Document Automation', 'Form Fillers', 'Digital Signatures', 'Scan Pipelines'],
    impactMetric: '8x Speedup (15m → <1m)',
    iconName: 'Zap',
  },
  {
    id: 'skill-cloud',
    title: 'Databases & Cloud',
    category: 'Data Infrastructure',
    level: 'Production Grade',
    rarity: 'SR Silver Prism',
    description: 'Designing normalized schemas, cache layers, and scalable cloud databases for business-critical applications.',
    technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Redis', 'AWS'],
    impactMetric: 'High-Concurrency Integrity',
    iconName: 'Database',
  },
  {
    id: 'skill-design',
    title: 'UI/UX & Motion Design',
    category: 'Product Design',
    level: 'Pixel-Perfect Execution',
    rarity: 'SR Silver Prism',
    description: 'Crafting responsive, high-fidelity design systems, intuitive interfaces, and editorial layouts with motion graphics.',
    technologies: ['Figma', 'Photoshop', 'Illustrator', 'InDesign', 'After Effects', 'Tailwind CSS'],
    impactMetric: '100% Mobile Responsive',
    iconName: 'Palette',
  },
  {
    id: 'skill-seo',
    title: 'SEO, AEO & GEO Growth',
    category: 'Search Optimization',
    level: 'Modern AI-Ready',
    rarity: 'Rare Architect Foil',
    description: 'Optimizing web properties for Google search, Answer Engines (Perplexity, ChatGPT), and regional local search results.',
    technologies: ['AEO (Answer Engine)', 'GEO Ranking', 'Schema.org', 'JSON-LD', 'Performance Optimization'],
    impactMetric: 'Top 3 Local Ranking Results',
    iconName: 'TrendingUp',
  },
];

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: 'exp-hmorix',
    role: 'Full Stack Developer',
    company: 'HMorix',
    location: 'Hathras, Uttar Pradesh, India',
    period: '2026 – Present',
    type: 'Digital Marketing, Web & AI Solutions',
    status: 'Currently Active Role',
    highlights: [
      'Built BillingFlow, an automated invoicing product delivering recurring emails via configurable templates.',
      'Architected WApp Agent, a WhatsApp AI agent running 24/7 on Termux with self-healing Supabase publishing.',
      'Built a PDF Automation engine generating dynamic documents and converting templates into web forms.',
      'Delivered end-to-end web apps, digital marketing, and automation pipelines for corporate clients.'
    ],
    liveUrl: 'https://hmorix.in',
  },
  {
    id: 'exp-dd',
    role: 'Automation Engineer',
    company: 'DD Computers (CSC & Aadhaar Seva Kendra)',
    location: 'Hathras, India',
    period: '2024 – 2025',
    type: 'Civic Technology & Citizen Services',
    status: 'Contract Completed',
    highlights: [
      'Automated manual form-filling procedures into digital workflows, eliminating repetitive daily data entry.',
      'Converted multi-affidavit manual data entry into a scan-based automated process, cutting turnaround by up to 8x.'
    ],
  },
  {
    id: 'exp-sahara',
    role: 'Independent Full Stack Developer',
    company: 'Sahara India Pariwar, Hathras Branch',
    location: 'Hathras, India',
    period: '2023 – 2025',
    type: 'Enterprise Branch Digitization',
    status: 'Successfully Deployed',
    highlights: [
      'Converted the branch desktop automation software into a secure, responsive web application.',
      'Built automated membership lookup tools: membership number auto-fetches customer records and produces a print-ready form.',
      'Cut customer documentation time from 10–15 minutes down to under 1 minute with digital signatures.'
    ],
  },
  {
    id: 'exp-dainik',
    role: 'Graphic Designer',
    company: 'Dainik Bhaskar',
    location: 'India',
    period: 'Short-term Project',
    type: 'Editorial Publication Design',
    status: 'Completed',
    highlights: [
      'Designed daily newspaper page layouts and templates in Adobe InDesign with 4C Lipika, fitting print-ready pages on tight daily deadlines.'
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'The 24/7 Autonomous WhatsApp Client Machine',
    subtitle: 'NVIDIA NIM + Groq LLM + Termux Architecture',
    client: 'HMorix Innovation Lab',
    location: 'Hathras, India',
    image: PROJECT_IMAGES.whatsappAgent,
    quote: 'Zero cloud server bill, instant meeting scheduling, and automatic database synchronization.',
    result: 'Sub-800ms response speed • 100% mobile uptime',
    taggedProjectIds: ['whatsapp-agent'],
  },
  {
    id: 'cs-2',
    title: 'Sahara India Pariwar Branch Process Revolution',
    subtitle: '15-Minute Paperwork to Under 60 Seconds',
    client: 'Sahara India Pariwar Branch',
    location: 'Hathras Branch, Uttar Pradesh',
    image: PROJECT_IMAGES.account,
    quote: 'Customer details now auto-fetch in one click, generating a signature-ready document in seconds.',
    result: '10x Faster Turnaround • Zero Lost Files',
    taggedProjectIds: ['account-system'],
  },
  {
    id: 'cs-3',
    title: 'Chartered Accountant Firm Digital Elevation',
    subtitle: 'AEO Schema Optimization & High-Conversion UI',
    client: 'CA Firm Delhi (cashubham.in)',
    location: 'Delhi NCR, India',
    image: PROJECT_IMAGES.caFirm,
    quote: 'Ranked on Google and modern AI answer engines, generating high-ticket corporate audits.',
    result: '100/100 Lighthouse • 3x Inquiry Increase',
    taggedProjectIds: ['ca-firm'],
  },
];
