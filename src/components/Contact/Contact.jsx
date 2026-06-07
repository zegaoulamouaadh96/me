import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.scss';

gsap.registerPlugin(ScrollTrigger);

const BADGES = ['Freelance Projects', 'Collaborations', 'Internships', 'Remote Opportunities'];

export default function Contact() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>
      <div className={styles.inner}>
        <p className={styles.label}>Get In Touch</p>
        <h2 className={styles.heading}>Let's Work Together</h2>

        <div className={styles.grid} ref={gridRef}>
          {/* Left column */}
          <div className={styles.info}>
            <p className={styles.description}>
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>

            <div className={styles.badges}>
              {BADGES.map((b) => (
                <span key={b} className={styles.badge}>
                  {b}
                </span>
              ))}
            </div>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>✉</span>
                <span>mouaadh.zegaoula@email.com</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📍</span>
                <span>Algeria</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🟢</span>
                <span>Open for opportunities</span>
              </div>
            </div>
          </div>

          {/* Right column — form */}
          {submitted ? (
            <div className={styles.success}>
              ✅ Thank you! Your message has been sent. I'll get back to you soon.
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="c-name">
                  Name
                </label>
                <input
                  id="c-name"
                  className={styles.input}
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="c-email">
                  Email
                </label>
                <input
                  id="c-email"
                  className={styles.input}
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="c-subject">
                  Subject
                </label>
                <input
                  id="c-subject"
                  className={styles.input}
                  type="text"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="c-message">
                  Message
                </label>
                <textarea
                  id="c-message"
                  className={styles.textarea}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button type="submit" className={styles.submit}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
