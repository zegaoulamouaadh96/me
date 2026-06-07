import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.scss';
import { splitTextIntoSpans } from '../../utils/splitText';

gsap.registerPlugin(ScrollTrigger);

const PARAGRAPHS = [
  "I'm Mouaadh Zegaoula, a passionate developer from Algeria with a deep interest in artificial intelligence, cybersecurity, and modern web technologies. My journey in tech began with curiosity about how systems work and evolved into a commitment to building intelligent, secure digital solutions.",
  "I believe in the power of continuous learning and innovation., I constantly push the boundaries of what's possible with technology.",
  "My long-term goal is to contribute to the advancement of AI and cybersecurity, creating systems that are not only intelligent but also secure and ethical. I approach every project with a problem-solving mindset and a passion for excellence."
];

const STATS = [
  { value: '15+', label: 'Projects Completed' },
  { value: '4+', label: 'Years Learning' },
  { value: '5+', label: 'Technologies Mastered' },
];

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRefs = useRef([]);
  const statRefs = useRef([]);
  const bgPortraitRef = useRef(null);
  const redGlowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split and animate title spans (GSAP SplitText equivalent)
      if (titleRef.current) {
        const titleSpans = titleRef.current.querySelectorAll('span');
        titleSpans.forEach((span) => {
          const split = splitTextIntoSpans(span, 'chars');
          if (split.chars.length) {
            gsap.fromTo(
              split.chars,
              { y: '100%', opacity: 0 },
              {
                y: '0%',
                opacity: 1,
                duration: 0.8,
                stagger: 0.04,
                ease: 'power4.out',
                scrollTrigger: {
                  trigger: titleRef.current,
                  start: 'top 80%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }
        });
      }

      // 1. Text reveals on scroll
      paragraphRefs.current.forEach((p) => {
        if (!p) return;
        gsap.fromTo(p,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 2. Stats row trigger
      statRefs.current.forEach((stat) => {
        if (!stat) return;
        gsap.fromTo(stat,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 3. Background Portrait Scroll Animation (replicates the 3D hand behavior)
      if (bgPortraitRef.current) {
        gsap.fromTo(
          bgPortraitRef.current,
          {
            yPercent: 15,
            rotation: -20,
            scale: 0.85,
            opacity: 0.55,
          },
          {
            yPercent: -15,
            rotation: 12,
            scale: 1.05,
            opacity: 0.85,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      // 4. Ambient Red Glow animation on scroll
      if (redGlowRef.current) {
        gsap.fromTo(
          redGlowRef.current,
          { scale: 0.8, opacity: 0.2 },
          {
            scale: 1.2,
            opacity: 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="about" ref={sectionRef}>
      {/* Background elements replicating the hand scene */}
      <div className={styles.bgScene}>
        {/* Soft Red Ambient Glow */}
        <div className={styles.redGlow} ref={redGlowRef} />
        
        {/* Floating Background Portrait (grayscale, blended, masked) */}
        <img
          src="/mouaadh.jpg"
          alt="Background Portrait"
          className={styles.bgPortrait}
          ref={bgPortraitRef}
        />
      </div>

      <div className={styles.inner}>
        <div className={styles.layout}>
          {/* Left Column: Vertical Line + Editorial Typography */}
          <div className={styles.leftCol}>
            <div className={styles.accentLine} />
            <div className={styles.titleWrapper} ref={titleRef}>
              <h2 className={styles.mainTitle}>
                <span>WHY</span>
                <span>CHOOSE</span>
                <span>development</span>
                <span>&amp; professional</span>
              </h2>
            </div>
          </div>

          {/* Right Column: Paragraph Bios */}
          <div className={styles.rightCol}>
            <div className={styles.bio}>
              {PARAGRAPHS.map((text, i) => (
                <p
                  key={i}
                  className={styles.paragraph}
                  ref={(el) => (paragraphRefs.current[i] = el)}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={styles.stats}>
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={styles.stat}
              ref={(el) => (statRefs.current[i] = el)}
            >
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
