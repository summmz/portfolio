import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Heart, ExternalLink } from 'lucide-react';
import styles from './Credits.module.css';

const Credits: React.FC = () => {
  return (
    <section className={styles.credits}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.content}
        >
          <div className={styles.header}>
            <Heart className={styles.heartIcon} size={24} fill="currentColor" />
            <h2 className={styles.title}>Project <span>Credits</span></h2>
          </div>
          
          <p className={styles.description}>
            This portfolio was built with passion using modern web technologies 
            and inspired by top-tier digital designs.
          </p>

          <div className={styles.grid}>
            <div className={styles.creditBox}>
              <div className={styles.icon}><Code /></div>
              <h3>Development</h3>
              <p>React, TypeScript, Framer Motion, Vite</p>
            </div>
            
            <div className={styles.creditBox}>
              <div className={styles.icon}><Palette /></div>
              <h3>Visual Design</h3>
              <p>Three.js, Lucide Icons, Custom CSS Modules</p>
            </div>
            
            <a 
              href="https://antigravity.google" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.creditBoxLink}
            >
              <div className={styles.icon}><ExternalLink /></div>
              <h3>Inspiration</h3>
              <p>Antigravity.google (Signature Spark & Glow)</p>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Credits;
