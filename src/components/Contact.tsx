import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import styles from './Contact.module.css';

// ─── PASTE YOUR FORMSPREE ENDPOINT HERE ───────────────────────────────────────
// 1. Go to https://formspree.io → sign up free
// 2. Create a new form → copy the endpoint (e.g. https://formspree.io/f/xyzabcde)
// 3. Replace the string below
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbdpgbjb';
// ──────────────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'loading' | 'success' | 'error';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const json = await res.json();
        setErrorMsg(json?.errors?.[0]?.message ?? 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={`section-padding ${styles.contact}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className={styles.header}
        >
          <span className={styles.overline}>Contact</span>
          <h2 className={styles.title}>Get In <span>Touch</span></h2>
          <p className={styles.subtitle}>Have a project in mind or just want to say hi?</p>
        </motion.div>

        <div className={styles.grid}>
          {/* ── Left: contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={styles.info}
          >
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><Mail /></div>
              <div>
                <h3>Email</h3>
                <p>isumit7869@gmail.com</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><Phone /></div>
              <div>
                <h3>Phone</h3>
                <p>+91 79862 95495</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><MapPin /></div>
              <div>
                <h3>Location</h3>
                <p>Hoshiarpur, Punjab, India</p>
              </div>
            </div>

            <div className={styles.socials}>
              <a href="https://github.com/summmz" target="_blank" rel="noopener noreferrer"><Github /></a>
              <a href="https://www.linkedin.com/in/sumit-yadav-287208323/" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
              <a href="https://www.instagram.com/summie.eee?igsh=MWF2ZHBraWh4dndzcA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer"><Instagram /></a>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={styles.successMessage}
              >
                <div className={styles.successIcon}><CheckCircle size={64} /></div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button onClick={() => setStatus('idle')} className={styles.submitBtn}>
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                className={styles.form}
                onSubmit={handleSubmit}
              >
                <div className={styles.formGroup}>
                  <input name="name" type="text" placeholder="Name" required disabled={status === 'loading'} />
                </div>
                <div className={styles.formGroup}>
                  <input name="email" type="email" placeholder="Email" required disabled={status === 'loading'} />
                </div>
                <div className={styles.formGroup}>
                  <textarea name="message" placeholder="Message" rows={5} required disabled={status === 'loading'} />
                </div>

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.errorBanner}
                  >
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <><Loader size={20} className={styles.spinner} /> Sending…</>
                  ) : (
                    <>Send Message <Send size={20} /></>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;
