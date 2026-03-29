import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import profileImg from '../assets/sumit-profile.png';

const About: React.FC = () => {
  return (
    <section id="about" className={`section-padding ${styles.about}`}>
      <div className={`container ${styles.aboutContainer}`}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.imageWrapper}
        >
          <div className={styles.imageCard}>
            <div className={styles.imagePlaceholder}>
              <img 
                src={profileImg}
                alt="Sumit Yadav" 
                className={styles.profileImage}
              />
              <div className={styles.imageOverlay} />
            </div>
            <div className={styles.experienceBadge}>
              <span className={styles.years}>3+</span>
              <span className={styles.expText}>Years of Experience</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.content}
        >
          <h2 className={styles.title}>Crafting Digital <span>Experiences</span></h2>
          <p className={styles.text}>
            Hello! I'm Sumit Yadav, a Full Stack Developer with a passion for building 
            dynamic and user-centric web applications. My journey in tech began with a 
            curiosity about how things work on the internet, which quickly evolved into 
            a professional career dedicated to creating high-performance digital solutions.
          </p>
          <p className={styles.text}>
            I specialize in the MERN stack (MongoDB, Express, React, Node.js) and have 
            a deep appreciation for clean code, responsive design, and intuitive user interfaces. 
            I believe that every line of code should contribute to a seamless and 
            engaging user experience.
          </p>

          <p className={styles.text}>
            When I'm not coding, you'll find me pushing limits at the <strong>gym</strong>, 
            vibing to good <strong>music</strong>, or getting lost in a late-night <strong>gaming</strong> session. 
            I believe staying active and creative outside of work makes me a better developer inside it.
          </p>

          <div className={styles.hobbies}>
            <div className={styles.hobbyTag}>🏋️ Gym</div>
            <div className={styles.hobbyTag}>🎵 Music</div>
            <div className={styles.hobbyTag}>🎮 Gaming</div>
          </div>
          
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <h3>15+</h3>
              <p>Technologies Mastered</p>
            </div>
            <div className={styles.statBox}>
              <h3>40+</h3>
              <p>Projects Completed</p>
            </div>
            <div className={styles.statBox}>
              <h3>Happy</h3>
              <p>Clients & Partners</p>
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className={styles.quote}
          >
            "Great design is not just what it looks like and feels like. Design is how it works."
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
