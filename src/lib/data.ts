export const profile = {
  name: "Sumit",
  firstName: "Sumit",
  role: "Full-Stack Developer",
  tagline:
    "College student building real-world full-stack apps — React, Node and clean backends. I bring the same consistency to my code as I do to the gym.",
  location: "Remote",
  email: "isumit7869@gmail.com",
  availability: "Open to work & internships",
  roles: [
    "Full-Stack Developer",
    "Web Developer",
    "React & Node Builder",
    "College Dev",
  ],
  bio: [
    "I'm Sumit — a college student and full-stack developer who likes shipping real projects rather than endless tutorials. I work across the stack with JavaScript, TypeScript, React, Node.js and Express, backed by MongoDB and PostgreSQL.",
    "Right now I'm deepening my backend fundamentals and system design, while publicly building and deploying projects on GitHub and Vercel. My rule is simple: consistency beats motivation.",
  ],
  stats: [
    { label: "Public repositories", value: 12, suffix: "" },
    { label: "Deployed apps", value: 9, suffix: "" },
    { label: "Months building in public", value: 15, suffix: "+" },
    { label: "Programming languages", value: 3, suffix: "" },
  ],
  socials: [{ label: "GitHub", href: "https://github.com/summmz" }],
};

export type SkillCategory = {
  title: string;
  icon: string;
  accent: string;
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "layout",
    accent: "cyan",
    skills: [
      { name: "HTML & CSS", level: 92 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "React.js", level: 86 },
      { name: "TypeScript", level: 72 },
    ],
  },
  {
    title: "Backend & Data",
    icon: "database",
    accent: "violet",
    skills: [
      { name: "Node.js", level: 84 },
      { name: "Express.js", level: 82 },
      { name: "MongoDB", level: 76 },
      { name: "SQL", level: 74 },
      { name: "PostgreSQL", level: 70 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "terminal",
    accent: "fuchsia",
    skills: [
      { name: "Git & GitHub", level: 86 },
      { name: "Vercel", level: 84 },
      { name: "REST APIs", level: 78 },
      { name: "Railway & Render", level: 72 },
      { name: "Python (learning)", level: 60 },
    ],
  },
];

export const techMarquee = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "SQL",
  "Python",
  "Git",
  "Vercel",
  "Railway",
  "Render",
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  icon: string;
  gradient: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    title: "major-project",
    description:
      "Updated Spotify web app clone with added features — a streaming-inspired UI and playback experience built from scratch.",
    tags: ["JavaScript", "React", "Spotify API"],
    href: "https://github.com/summmz/major-project",
    icon: "music",
    gradient: "from-lime-500/25 via-lime-400/10 to-transparent",
    featured: true,
  },
  {
    title: "Lunar-HR",
    description:
      "TypeScript-powered HR tooling — employee records and admin flows, deployed live on Vercel.",
    tags: ["TypeScript", "Vercel"],
    href: "https://github.com/summmz/Lunar-HR",
    icon: "briefcase",
    gradient: "from-violet-500/25 via-violet-400/10 to-transparent",
    featured: true,
  },
  {
    title: "UrbanCartel",
    description:
      "A streetwear storefront with a bold, urban aesthetic — product pages and cart flows end to end.",
    tags: ["JavaScript", "Storefront"],
    href: "https://github.com/summmz/UrbanCartel",
    icon: "box",
    gradient: "from-fuchsia-500/25 via-fuchsia-400/10 to-transparent",
    featured: false,
  },
  {
    title: "the-ripped",
    description:
      "A fitness-focused web app — I train in the gym with the same consistency I bring to code.",
    tags: ["JavaScript", "Fitness"],
    href: "https://github.com/summmz/the-ripped",
    icon: "zap",
    gradient: "from-lime-500/25 via-amber-400/10 to-transparent",
    featured: false,
  },
  {
    title: "us",
    description:
      "A polished TypeScript web experience, built and shipped live on Vercel.",
    tags: ["TypeScript", "Vercel"],
    href: "https://github.com/summmz/us",
    icon: "users",
    gradient: "from-cyan-500/25 via-violet-400/10 to-transparent",
    featured: false,
  },
  {
    title: "pulse",
    description:
      "My latest work-in-progress — exploring real-time interactions in TypeScript.",
    tags: ["TypeScript", "In progress"],
    href: "https://github.com/summmz/pulse",
    icon: "activity",
    gradient: "from-amber-500/25 via-amber-400/10 to-transparent",
    featured: false,
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  points: string[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    company: "Now",
    role: "Full-Stack Developer · College Student",
    period: "2026 — Today",
    description:
      "Currently building full-stack applications while levelling up my backend and system design skills.",
    points: [
      "Learning advanced backend concepts and system design.",
      "Shipping real-world projects on GitHub & Vercel.",
      "Open to internships and junior full-stack roles.",
    ],
    tags: ["React", "Node.js", "System Design"],
  },
  {
    company: "Independent Work",
    role: "Project Builder & Deployer",
    period: "2025 — 2026",
    description:
      "Built and deployed a range of live web projects, from clones to platforms.",
    points: [
      "Shipped a Spotify web app clone with added features.",
      "Built and deployed Lunar-HR, UrbanCartel, the-ripped and more.",
      "Worked through a real intern assignment (CSS / JavaScript).",
    ],
    tags: ["Vercel", "GitHub", "Deployment"],
  },
  {
    company: "Foundations",
    role: "Started Coding",
    period: "2025",
    description:
      "Kicked off my open-source journey and learned the fundamentals.",
    points: [
      "Learned JavaScript, Python and SQL from the ground up.",
      "Adopted the rule that consistency beats motivation.",
    ],
    tags: ["JavaScript", "Python", "SQL"],
  },
];

export type Post = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
};

export const posts: Post[] = [
  {
    title: "What I learned shipping a Spotify clone",
    excerpt:
      "Building a streaming-style UI forced me to get real about state, API calls and responsive layouts.",
    date: "Mar 2026",
    readTime: "5 min",
    tag: "Build log",
  },
  {
    title: "MongoDB vs PostgreSQL for a side project",
    excerpt:
      "Notes from picking a database for a real project, and how I'm starting to think about schema design.",
    date: "Jun 2026",
    readTime: "6 min",
    tag: "Backend",
  },
  {
    title: "My system design study plan",
    excerpt:
      "The resources and routines I'm using while learning advanced backend and system design.",
    date: "Aug 2026",
    readTime: "4 min",
    tag: "Learning",
  },
  {
    title: "Consistency beats motivation",
    excerpt:
      "How I apply the same routine to the gym and the repository — and why it finally clicked.",
    date: "2026",
    readTime: "3 min",
    tag: "Wins & habits",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#experience" },
  { label: "Notes", href: "#blog" },
  { label: "Contact", href: "#contact" },
];