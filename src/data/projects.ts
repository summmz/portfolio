import lunarHrImg from '../assets/lunar-hr.png';
import nayepankhImg from '../assets/nayepankh.png';

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
      'A full-stack HR management SaaS with a React frontend and Express/tRPC backend, backed by MySQL via Drizzle ORM. Features employee data management, payroll operations, and streamlined HR workflows.',
    image: 'linear-gradient(135deg, #1a1040 0%, #2d1b69 40%, #4c2896 70%, #6d3fc2 100%)',
    thumbnail: lunarHrImg,
    github: 'https://github.com/summmz/Lunar-HR',
    live: 'https://lunar-hr.vercel.app/',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node', 'Express', 'MongoDB', 'JavaScript', 'JWT', 'bcrypt', 'dotenv'],
  },
  {
    title: 'NayePankh Foundation',
    description:
      'A fully responsive React website built for NayePankh Foundation — a UP Govt. registered NGO. Features include dark mode, AI chatbot (powered by Groq), donation modal with preset amounts, volunteer registration form, animated impact stats, and responsive design across all devices.',
    image: 'linear-gradient(135deg, #0d4726 0%, #1a7a42 40%, #2ecc71 70%, #a8e6cf 100%)',
    thumbnail: nayepankhImg,
    github: 'https://github.com/summmz/assignment-nayepankh',
    live: 'https://assignment-nayepankh.vercel.app/',
    tags: ['React', 'JavaScript', 'CSS', 'Groq', 'Responsive', 'Dark Mode', 'NGO'],
  },
];
