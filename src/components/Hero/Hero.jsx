import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { splitTextIntoSpans } from '../../utils/splitText';
import styles from './Hero.module.scss';

export default function Hero() {
  const sectionRef = useRef(null);
  const avatarRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const orbRef = useRef(null);
  const scrollIndRef = useRef(null);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  useEffect(() => {
    let animStarted = false;
    let mainTimeline = null;
    let floatTimeline = null;

    const startAnimations = () => {
      if (animStarted) return;
      animStarted = true;

      const ctx = gsap.context(() => {
        // Split text using the manual span utility
        const headlineSplit = splitTextIntoSpans(headlineRef.current, 'chars');
        const subtitleSplit = splitTextIntoSpans(subtitleRef.current, 'words');

        mainTimeline = gsap.timeline();

        // 1. Reveal Avatar
        mainTimeline.to(avatarRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.4)',
        });

        // 2. Name Chars Reveal
        if (headlineSplit.chars.length) {
          mainTimeline.to(
            headlineSplit.chars,
            {
              y: '0%',
              opacity: 1,
              duration: 0.8,
              stagger: 0.02,
              ease: 'power4.out',
            },
            '-=0.4'
          );
        }

        // 3. Subtitle Reveal
        if (subtitleSplit.words.length) {
          mainTimeline.to(
            subtitleSplit.words,
            {
              y: '0%',
              opacity: 1,
              duration: 0.6,
              stagger: 0.04,
              ease: 'power3.out',
            },
            '-=0.5'
          );
        }

        // 4. Buttons Reveal
        mainTimeline.to(
          [btn1Ref.current, btn2Ref.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.4'
        );

        // 5. Scroll Indicator
        mainTimeline.to(
          scrollIndRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.2'
        );

        // ─────────────────────────────────────────────────────────
        // Infinite Idle Animations
        // ─────────────────────────────────────────────────────────
        floatTimeline = gsap.timeline({ repeat: -1 });
        floatTimeline.to(avatarRef.current, {
          y: -8,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 1,
        });

        gsap.to(orbRef.current, {
          x: 30,
          y: -20,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }, sectionRef);
    };

    window.addEventListener('preloaderExit', startAnimations);
    const fallback = setTimeout(startAnimations, 3200);

    return () => {
      window.removeEventListener('preloaderExit', startAnimations);
      clearTimeout(fallback);
      if (mainTimeline) mainTimeline.kill();
      if (floatTimeline) floatTimeline.kill();
    };
  }, []);

  return (
    <section className={styles.hero} id="hero" ref={sectionRef}>
      {/* Cyber Grid Overlay */}
      <div className={styles.gridOverlay} />

      {/* Background Glow Orb */}
      <div className={styles.orbWrap}>
        <div className={styles.orb} ref={orbRef} />
      </div>

      <div className={styles.container}>
        {/* Avatar Area */}
        <div className={styles.avatarWrapper} ref={avatarRef}>
          <img
            src="/mouaadh.jpg"
            alt="Mouaadh Zegaoula"
            className={styles.avatar}
          />
        </div>

        {/* Text Area */}
        <div className={styles.textGroup}>
          <h1 className={styles.headline} ref={headlineRef}>
            Mouaadh Zegaoula
          </h1>

          <p className={styles.subtitle} ref={subtitleRef}>
            AI Engineer &amp; Cybersecurity Developer
          </p>
        </div>

        {/* Buttons */}
        <div className={styles.buttons}>
          <a
            href="mailto:mouaadh.zegaoula@email.com"
            className={styles.btnMessage}
            ref={btn1Ref}
          >
            <svg
              className={styles.btnIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Message
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnConnect}
            ref={btn2Ref}
          >
            <svg
              className={styles.btnIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            Connect
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className={styles.scrollIndicator}
        ref={scrollIndRef}
        onClick={() => scrollTo('projects')}
      >
        <span className={styles.scrollLabel}>SCROLL</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
