import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Download, Mail } from 'lucide-react';
import GlitchText from './GlitchText';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} />
      <div className={`container ${styles.heroContainer}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={styles.content}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={styles.greeting}
          >
            Hi, I'm
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={styles.name}
          >
            <GlitchText>Sumit Yadav</GlitchText>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className={styles.role}
          >
            I am a {' '}
            <span className={styles.typewriter}>
              <Typewriter
                words={['Full Stack Developer', 'UI/UX Designer', 'Tech Enthusiast', 'Creative Developer']}
                loop={0}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={styles.description}
          >
            I build modern, high-performance web applications with a focus on 
            stunning visuals and seamless user experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className={styles.ctas}
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className={styles.primaryBtn}
            >
              View My Work
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              CV <Download size={18} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className={styles.outlineBtn}
            >
              Contact <Mail size={18} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      <div className={styles.scrollDown}>
        <motion.div
          animate={{
            y: [0, 24, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className={styles.scrollIndicator}
        />
      </div>
    </section>
  );
};

export default Hero;
