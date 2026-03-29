import React, { useEffect, useRef, useState } from 'react';
import styles from './GlitchText.module.css';

interface GlitchTextProps {
  children: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ children, className = '' }) => {
  const [active, setActive] = useState(false);
  const outerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const innerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const schedule = () => {
      const delay = 3000 + Math.random() * 4000;
      outerTimer.current = setTimeout(() => {
        setActive(true);
        innerTimer.current = setTimeout(() => {
          setActive(false);
          schedule();
        }, 300);
      }, delay);
    };
    schedule();
    return () => {
      if (outerTimer.current) clearTimeout(outerTimer.current);
      if (innerTimer.current) clearTimeout(innerTimer.current);
    };
  }, []);

  return (
    <span
      className={`${styles.glitch}${active ? ` ${styles.active}` : ''}${className ? ` ${className}` : ''}`}
      data-text={children}
    >
      {children}
    </span>
  );
};

export default GlitchText;
