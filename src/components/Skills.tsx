import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Palette,
  Globe,
  Database,
  Terminal,
  Layout
} from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { skills } from '../data/skills';
import styles from './Skills.module.css';

const IconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 />,
  Palette: <Palette />,
  Globe: <Globe />,
  Database: <Database />,
  Terminal: <Terminal />,
  Layout: <Layout />
};

// Defined outside Skills to avoid React Compiler issues with hooks in map callbacks
function SkillBar({ name, proficiency, delay }: { name: string; proficiency: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={styles.barRow}>
      <div className={styles.barLabel}>
        <span>{name}</span>
        <span className={styles.barPct}>{proficiency}%</span>
      </div>
      <div className={styles.barTrack}>
        <motion.div
          className={styles.barFill}
          initial={{ width: '0%' }}
          animate={{ width: inView ? `${proficiency}%` : '0%' }}
          transition={{ duration: 0.85, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

const Skills: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section id="skills" className={`section-padding ${styles.skills}`}>
      <div className="container">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={styles.header}
        >
          <h2 className={styles.title}>My <span>Skills</span></h2>
          <p className={styles.subtitle}>The technologies and tools I use to bring ideas to life.</p>
        </motion.div>

        <div className={styles.grid}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Tilt
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
                perspective={1000}
                scale={1.03}
                transitionSpeed={450}
                className={styles.card}
              >
                <div className={styles.cardTop}>
                  <div className={styles.iconWrapper}>{IconMap[skill.iconName]}</div>
                  <h3 className={styles.skillTitle}>{skill.name}</h3>
                </div>
                <div className={styles.skillList}>
                  {skill.items.map((item, i) => (
                    <SkillBar
                      key={item.name}
                      name={item.name}
                      proficiency={item.proficiency}
                      delay={i * 0.1}
                    />
                  ))}
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
