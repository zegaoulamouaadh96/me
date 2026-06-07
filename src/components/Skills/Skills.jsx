import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Skills.module.scss';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    icon: '🧠',
    title: 'Artificial Intelligence',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'TensorFlow / PyTorch',
    ],
  },
  {
    icon: '🛡️',
    title: 'Cybersecurity',
    skills: [
      'Network Security',
      'Ethical Hacking',
      'Vulnerability Assessment',
      'Penetration Testing',
      'Security Auditing',
    ],
  },
  {
    icon: '💻',
    title: 'Development',
    skills: [
      'React / Next.js',
      'JavaScript / TypeScript',
      'Node.js / Express',
      'Python / FastAPI',
      'MongoDB / PostgreSQL',
    ],
  },
  {
    icon: '⚙️',
    title: 'Systems & Tools',
    skills: [
      'Linux / Unix',
      'Docker / Containers',
      'Git / GitHub',
      'ESP32 / IoT',
      'CI/CD Pipelines',
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="skills" ref={sectionRef}>
      <div className={styles.inner}>
        <p className={styles.label}>Expertise</p>
        <h2 className={styles.heading}>Skills &amp; Technologies</h2>

        <div className={styles.grid}>
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.title}
              className={styles.card}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <span className={styles.cardIcon}>{cat.icon}</span>
              <h3 className={styles.cardTitle}>{cat.title}</h3>
              <ul className={styles.skillList}>
                {cat.skills.map((skill) => (
                  <li key={skill} className={styles.skillItem}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
