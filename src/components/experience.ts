export interface Experience {
  duration: string;
  position: string;
  company: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    duration: '2023 - 2026',
    position: 'Bachelors in Computer Applications',
    company: 'Rayat Bahra Professional University',
    description: [
      'Focused on Data Structures, Algorithms, and Software Engineering principles.',
      'Achieved a CGPA of 7.8/10.0.',
      'Completed a capstone project on Lunar-HR — a full-stack HR management SaaS.',
    ],
  },
  {
    duration: 'June 2023 - Aug 2023',
    position: 'Web Development Intern',
    company: 'Tech Startup (Internship)',
    description: [
      'Developed responsive UI components using React and Tailwind CSS.',
      'Assisted in integrating RESTful APIs for a client-facing dashboard.',
      'Participated in agile sprints and daily stand-ups.',
    ],
  },
  {
    duration: '2022 - Present',
    position: 'Full Stack Learner & Contributor',
    company: 'Open Source / Self-Learning',
    description: [
      'Built 10+ personal projects to master the MERN stack.',
      'Contributed to local open-source initiatives and community projects.',
      'Actively learning cloud technologies and system design.',
    ],
  },
];
