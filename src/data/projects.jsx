import { Briefcase, GraduationCap, House, FileText } from 'lucide-react';

// Accent per *kind* of thing, not per project. The card grid is easier to scan
// when the visual signal groups similar work together.
export const PROJECT_KINDS = {
  web: {
    tile: 'border-brand-500/20 bg-brand-500/10 text-brand-300',
    edge: 'via-brand-400/60',
    chip: 'border-brand-500/20 bg-brand-500/10 text-brand-300',
  },
  enterprise: {
    tile: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300',
    edge: 'via-cyan-400/60',
    chip: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300',
  },
  data: {
    tile: 'border-indigo-500/20 bg-indigo-500/10 text-indigo-300',
    edge: 'via-indigo-400/60',
    chip: 'border-indigo-500/20 bg-indigo-500/10 text-indigo-300',
  },
  mobile: {
    tile: 'border-sky-500/20 bg-sky-500/10 text-sky-300',
    edge: 'via-sky-400/60',
    chip: 'border-sky-500/20 bg-sky-500/10 text-sky-300',
  },
  automation: {
    tile: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    edge: 'via-emerald-400/60',
    chip: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
  },
};

export const featuredProjects = [
  {
    id: 'assettrack',
    kind: 'enterprise',
    title: 'AssetTrack - Enterprise Asset Management System',
    domain: 'Java Spring Boot',
    description:
      'A production-ready Spring Boot backend that manages the complete lifecycle of company assets, from creation and assignment to approval and return, with clean multi-role architecture and traceable audits.',
    technologies: [
      'Java 17',
      'Spring Boot 3.4.2',
      'Spring Security 6',
      'MongoDB Atlas',
      'AWS S3',
      'Docker',
    ],
    features: [
      'Multi-role authorization for Admin, Asset Manager, and Employee users',
      'JWT authentication on every endpoint with BCrypt password handling',
      'Request lifecycle with stock auto-adjustment and S3 image uploads',
    ],
    icon: <Briefcase size={48} />,
    link: 'https://assettrack-63hd.onrender.com/swagger-ui/index.html',
    repo: 'https://github.com/AbhishekGhume/AssetTrack',
    status: 'Live',
    metric: 'Spring Boot',
  },
  {
    id: 'quizsync',
    kind: 'data',
    title: 'QuizSync - Real-Time AI-Powered Quiz Platform',
    domain: 'JS + Firebase',
    description:
      'A full-stack classroom quiz platform that combines AI-generated questions, live quiz sessions, and real-time scoring in a single tool for teachers and students.',
    technologies: ['React 19', 'React Router v7', 'Vite', 'Supabase', 'Gemini 2.5 Flash', 'Vercel'],
    features: [
      '6-digit live session PINs with timed student participation',
      'AI question generation with editable review before saving',
      'Realtime leaderboard, score tracking, and analytics',
    ],
    icon: <GraduationCap size={48} />,
    link: 'https://quizsync-app.vercel.app/',
    repo: 'https://github.com/AbhishekGhume/quizsync-app',
    status: 'Live',
    metric: 'Realtime',
  },
  {
    id: 'societysphere',
    kind: 'mobile',
    title: 'SocietySphere - Housing Society Management App',
    domain: 'Flutter + Firebase',
    description:
      'A comprehensive Flutter and Firebase app for residential society management, with separate resident and administrator experiences and real-time Firestore listeners.',
    technologies: ['Flutter', 'Dart', 'Firebase Firestore', 'Firebase Auth', 'Firebase Storage'],
    features: [
      'Role-based dashboards for residents and admins',
      'Notice board, complaint management, and payment workflows',
      'User approval flow plus live operational stats',
    ],
    icon: <House size={48} />,
    repo: 'https://github.com/AbhishekGhume/SocietySphere',
    metric: 'Mobile app',
  },
  {
    id: 'research-paper-collector',
    kind: 'automation',
    title: 'AI-Powered Research Paper Collector',
    domain: 'n8n workflow',
    description:
      'An automated academic reference generator that collects papers by topic, formats them into a structured Google Sheet, and delivers the result by email.',
    technologies: ['n8n', 'Semantic Scholar API', 'Google Sheets API', 'Gmail API', 'Gemini', 'Google Cloud'],
    features: [
      'Form-based input for topic, paper count, and email',
      'Structured output with IEEE-style references',
      'Automated email delivery of the generated sheet link',
    ],
    icon: <FileText size={48} />,
    repo: 'https://github.com/AbhishekGhume/AI-Powered-Research-Paper-Collector',
    metric: 'Automation',
  },
];

export const additionalProjects = [];

export const allProjects = [...featuredProjects, ...additionalProjects];