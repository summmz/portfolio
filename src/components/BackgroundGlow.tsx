import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from 'framer-motion';
import styles from './BackgroundGlow.module.css';

const BackgroundGlow: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Velocity to change size/stretch based on speed (signature antigravity effect)
  const xVelocity = useVelocity(mouseX);
  const yVelocity = useVelocity(mouseY);
  
  // Stretch based on movement speed
  const scaleX = useTransform(xVelocity, [-2000, 0, 2000], [1.5, 1, 1.5]);
  const scaleY = useTransform(yVelocity, [-2000, 0, 2000], [1.5, 1, 1.5]);

  const springConfig = { damping: 50, stiffness: 40, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={styles.container}>
      <div className={styles.noise} />
      
      {/* The "Agent Spark" - Small, tight, very bright center */}
      <motion.div
        className={styles.spark}
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          scaleX,
          scaleY,
        }}
      >
        <div className={styles.sparkCore} />
        <div className={styles.sparkInner} />
        <div className={styles.sparkOuter} />
      </motion.div>

      {/* Subtle broad background gradients that shift slowly */}
      <div className={styles.ambientGlow} />
      
      <div className={styles.vignette} />
    </div>
  );
};

export default BackgroundGlow;
