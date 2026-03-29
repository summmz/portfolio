import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects';
import styles from './Projects.module.css';

const Projects: React.FC = () => {
  return (
    <section id="projects" className={`section-padding ${styles.projects}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className={styles.header}
        >
          <span className={styles.overline}>Portfolio</span>
          <h2 className={styles.title}>Featured <span>Projects</span></h2>
          <p className={styles.subtitle}>A selection of my recent work and personal experiments.</p>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.flipWrapper}
            >
              {/* FRONT */}
              <div className={styles.cardFront}>
                <div
                  className={styles.image}
                  style={{ background: project.image }}
                >
                  {project.thumbnail && (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className={styles.thumbnail}
                    />
                  )}
                </div>
                <div className={styles.frontContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <div className={styles.tags}>
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className={styles.tag}>+{project.tags.length - 4}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* BACK */}
              <div className={styles.cardBack}>
                <h3 className={styles.backTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags} style={{ marginBottom: '1.5rem' }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.links}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                    <Github size={18} /> GitHub
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                    <ExternalLink size={18} /> Live
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
