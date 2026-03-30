import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects';
import lunarHrImg from '../assets/lunar-hr.png';
import styles from './Projects.module.css';

const thumbnails: Record<string, string> = {
  'Lunar-HR': lunarHrImg,
};

const isTouchDevice = () =>
  typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches;

const Projects: React.FC = () => {
  const [isTouch, setIsTouch] = useState(isTouchDevice);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const handler = (e: MediaQueryListEvent) => setIsTouch(!e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleFlip = (title: string) => {
    if (!isTouch) return;
    setFlipped(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <section id="projects" className={`section-padding ${styles.projects}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className={styles.header}
        >
          <span className={styles.overline}>Portfolio</span>
          <h2 className={styles.title}>Featured <span>Projects</span></h2>
          <p className={styles.subtitle}>A selection of my recent work and personal experiments.</p>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, index) => {
            const thumb = thumbnails[project.title];
            const isFlipped = flipped[project.title] ?? false;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {isTouch ? (
                  // ── Touch: tap to flip ──
                  <div
                    className={`${styles.flipWrapper} ${isFlipped ? styles.flipped : ''}`}
                    onClick={() => toggleFlip(project.title)}
                  >
                    <div className={styles.cardFront}>
                      <div className={styles.image} style={{ background: project.image }}>
                        {thumb && (
                          <img src={thumb} alt={project.title} className={styles.thumbnail} />
                        )}
                        <div className={styles.overlay}>
                          <span className={styles.tapHint}>Tap to see details</span>
                        </div>
                      </div>
                      <div className={styles.content}>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <div className={styles.tags}>
                          {project.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.cardBack}>
                      <h3 className={styles.backTitle}>{project.title}</h3>
                      <p className={styles.backDescription}>{project.description}</p>
                      <div className={styles.tags} style={{ marginBottom: '1.5rem' }}>
                        {project.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                      <div className={styles.backLinks}>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                          <Github size={18} /> GitHub
                        </a>
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                          <ExternalLink size={18} /> Live
                        </a>
                      </div>
                      <span className={styles.tapHintBack}>Tap to go back</span>
                    </div>
                  </div>
                ) : (
                  // ── Mouse: hover to flip ──
                  <div className={styles.flipWrapper}>
                    <div className={styles.cardFront}>
                      <div className={styles.image} style={{ background: project.image }}>
                        {thumb && (
                          <img src={thumb} alt={project.title} className={styles.thumbnail} />
                        )}
                      </div>
                      <div className={styles.content}>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <div className={styles.tags}>
                          {project.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.cardBack}>
                      <h3 className={styles.backTitle}>{project.title}</h3>
                      <p className={styles.backDescription}>{project.description}</p>
                      <div className={styles.tags} style={{ marginBottom: '1.5rem' }}>
                        {project.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                      <div className={styles.backLinks}>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                          <Github size={18} /> GitHub
                        </a>
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                          <ExternalLink size={18} /> Live
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
