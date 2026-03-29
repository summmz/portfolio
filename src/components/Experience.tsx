import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experiences } from '../data/experience';
import styles from './Experience.module.css';

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`section-padding ${styles.experience}`}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className={styles.title}>My <span>Experience</span></h2>
          <p className={styles.subtitle}>A timeline of my professional journey.</p>
        </motion.div>

        <div className={styles.timeline}>
          <div className={styles.lineTrack} />
          <motion.div className={styles.lineFill} style={{ height: lineHeight }} />

          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${index}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 120,
                damping: 14,
              }}
              viewport={{ once: true }}
              className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
            >
              <div className={styles.timelineContent}>
                <span className={styles.duration}>{exp.duration}</span>
                <h3 className={styles.position}>{exp.position}</h3>
                <h4 className={styles.company}>{exp.company}</h4>
                <ul className={styles.description}>
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <motion.div
                className={styles.dot}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                  delay: index * 0.1 + 0.2,
                }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
