import lunarHrImg from '../assets/lunar-hr.png';

export interface Project {
  title: string;
  description: string;
  image: string;
  thumbnail?: string;
  github: string;
  live: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: 'Lunar-HR',
    description:
      'A full-stack HR management SaaS built by an AI agent (Manus). Production-grade monorepo with a React frontend and Express/tRPC backend, backed by MySQL via Drizzle ORM.',
    image: 'linear-gradient(135deg, #1a1040 0%, #2d1b69 40%, #4c2896 70%, #6d3fc2 100%)',
    thumbnail: lunarHrImg,
    github: 'https://github.com/summmz/Lunar-HR',
    live: 'https://lunar-hr.vercel.app/',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node', 'Express', 'MongoDB', 'JavaScript', 'JWT', 'bcrypt', 'dotenv'],
  },
];
