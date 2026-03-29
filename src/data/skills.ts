export interface SkillItem {
  name: string;
  proficiency: number;
}

export interface SkillCategory {
  name: string;
  iconName: string;
  items: SkillItem[];
}

export const skills: SkillCategory[] = [
  {
    name: 'Frontend',
    iconName: 'Layout',
    items: [
      { name: 'React', proficiency: 92 },
      { name: 'Next.js', proficiency: 85 },
      { name: 'TypeScript', proficiency: 88 },
      { name: 'Tailwind', proficiency: 90 },
    ],
  },
  {
    name: 'Backend',
    iconName: 'Terminal',
    items: [
      { name: 'Node.js', proficiency: 85 },
      { name: 'Express', proficiency: 82 },
      { name: 'Python', proficiency: 75 },
      { name: 'Go', proficiency: 60 },
    ],
  },
  {
    name: 'Design',
    iconName: 'Palette',
    items: [
      { name: 'Figma', proficiency: 80 },
      { name: 'Adobe XD', proficiency: 72 },
      { name: 'UI Design', proficiency: 85 },
      { name: 'UX Research', proficiency: 70 },
    ],
  },
  {
    name: 'Database',
    iconName: 'Database',
    items: [
      { name: 'PostgreSQL', proficiency: 78 },
      { name: 'MongoDB', proficiency: 82 },
      { name: 'Redis', proficiency: 68 },
      { name: 'Prisma', proficiency: 80 },
    ],
  },
  {
    name: 'DevOps',
    iconName: 'Globe',
    items: [
      { name: 'Docker', proficiency: 75 },
      { name: 'AWS', proficiency: 65 },
      { name: 'Vercel', proficiency: 88 },
      { name: 'CI/CD', proficiency: 72 },
    ],
  },
  {
    name: 'Core',
    iconName: 'Code2',
    items: [
      { name: 'JavaScript', proficiency: 95 },
      { name: 'HTML/CSS', proficiency: 93 },
      { name: 'Git', proficiency: 88 },
      { name: 'Agile', proficiency: 80 },
    ],
  },
];
