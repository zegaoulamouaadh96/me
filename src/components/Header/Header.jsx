import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './Header.module.scss';

const NAV_ITEMS = [
  { label: 'Home', target: 'hero' },
  { label: 'Projects', target: 'projects' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Contact', target: 'contact' },
];

export default function Header() {
  const headerRef = useRef(null);
  const overlayRef = useRef(null);
  const mobileLinkRefs = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Smooth-scroll handler
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMenuOpen(false);
  }, []);

  // Scroll listener for header background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu open / close animation
  useEffect(() => {
    if (!overlayRef.current) return;

    if (menuOpen) {
      gsap.to(overlayRef.current, { opacity: 1, visibility: 'visible', duration: 0.4, ease: 'power2.out' });
      gsap.fromTo(
        mobileLinkRefs.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.15 }
      );
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => {
        gsap.set(overlayRef.current, { visibility: 'hidden' });
      }});
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      >
        <div className={styles.inner}>
          <button className={styles.logo} onClick={() => scrollTo('hero')}>
            Mouaadh.
          </button>

          {/* Desktop nav */}
          <ul className={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <li key={item.target}>
                <button
                  className={styles.navLink}
                  onClick={() => scrollTo(item.target)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        className={`${styles.mobileOverlay} ${menuOpen ? styles.mobileOverlayOpen : ''}`}
      >
        <ul className={styles.mobileNav}>
          {NAV_ITEMS.map((item, i) => (
            <li key={item.target}>
              <button
                ref={(el) => (mobileLinkRefs.current[i] = el)}
                className={styles.mobileLink}
                onClick={() => scrollTo(item.target)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
