import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Experience.module.scss';
import { splitTextIntoSpans } from '../../utils/splitText';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    period: '2024 — Present',
    title: 'AI & Machine Learning Projects',
    description:
      'Developing intelligent systems using machine learning and deep learning frameworks. Building AI-powered applications including chatbots, face recognition systems, and predictive models.',
  },
  {
    period: '2023 — Present',
    title: 'Cybersecurity Research',
    description:
      'Exploring network security, ethical hacking, and vulnerability assessment. Building security monitoring tools and conducting penetration testing on various systems.',
  },
  {
    period: '2022 — Present',
    title: 'Full-Stack Web Development',
    description:
      'Creating modern web applications using React, Node.js, and TypeScript. Focused on building responsive, performant, and scalable applications with exceptional user experiences.',
  },
  {
    period: '2023 — Present',
    title: 'Smart Home & IoT Systems',
    description:
      'Designing and building smart home automation systems using ESP32 microcontrollers, integrating AI for predictive automation, voice control, and real-time monitoring.',
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split and animate heading text
      const headingSplit = splitTextIntoSpans(headingRef.current, 'chars');
      if (headingSplit.chars.length) {
        gsap.fromTo(
          headingSplit.chars,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      itemRefs.current.forEach((item) => {
        if (!item) return;
        gsap.to(item, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="experience" ref={sectionRef}>
      <div className={styles.inner}>
        <p className={styles.label}>Journey</p>
        <h2 className={styles.heading} ref={headingRef}>Experience &amp; Learning</h2>

        <div className={styles.timeline}>
          {TIMELINE.map((entry, i) => (
            <div
              key={entry.title}
              className={styles.item}
              ref={(el) => (itemRefs.current[i] = el)}
            >
              <p className={styles.period}>{entry.period}</p>
              <h3 className={styles.itemTitle}>{entry.title}</h3>
              <p className={styles.itemDesc}>{entry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
