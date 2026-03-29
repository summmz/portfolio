import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume', href: '/resume.pdf', external: true },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <a href="#" className={styles.logo}>
          SY<span>.</span>
        </a>

        {/* Desktop Menu */}
        <ul className={styles.desktopMenu}>
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.external ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer">{link.name}</a>
              ) : (
                <a href={link.href}>{link.name}</a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={styles.mobileMenu}
            >
              <ul>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>{link.name}</a>
                    ) : (
                      <a href={link.href} onClick={() => setIsOpen(false)}>
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
