import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.scss';
import { splitTextIntoSpans } from '../../utils/splitText';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    label: 'AI & IoT SYSTEMS',
    title: 'Intelligent predictive home automation adapts to daily routines',
    image: '/projects/smart_home.png',
    theme: 'green',
    tags: ['#Python', '#TensorFlow', '#ESP32', '#MQTT', '#IoT'],
    buttonText: 'Explore the platform ↗',
    color: '#00ff88',
  },
  {
    label: 'NATURAL LANGUAGE PROCESSING',
    title: 'Context-aware chatbot with real-time transformer architecture',
    image: '/projects/ai_chat.png',
    theme: 'red',
    tags: ['#PyTorch', '#LangChain', '#FastAPI', '#Redis', '#LLM'],
    buttonText: 'Inside the AI ↗',
    color: '#ff4b4b',
  },
  {
    label: 'NETWORK SECURITY & MONITORING',
    title: 'Real-time threat monitoring and active vulnerability assessment',
    image: '/projects/cybersecurity.png',
    theme: 'orange',
    tags: ['#React', '#NodeJS', '#Python', '#Wireshark', '#SecOps'],
    buttonText: 'Launch dashboard ↗',
    color: '#ffa500',
  },
  {
    label: 'EDGE AI & EMBEDDED SYSTEMS',
    title: 'Facial recognition scans on resource-constrained microcontrollers',
    image: '/projects/facial_recognition.png',
    theme: 'blue',
    tags: ['#C++', '#TensorFlowLite', '#OpenCV', '#MQTT', '#EdgeAI'],
    buttonText: 'Inside the system ↗',
    color: '#00aeff',
  },
  {
    label: 'FULL-STACK DEVELOPMENT',
    title: 'High-performance scalable applications with modern architecture',
    image: '/projects/web_app.png',
    theme: 'purple',
    tags: ['#React', '#TypeScript', '#NodeJS', '#MongoDB', '#Docker'],
    buttonText: 'Explore applications ↗',
    color: '#a020f0',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const rowRefs = useRef([]);
  const imageRefs = useRef([]);

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

      // 1. Text reveals
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const textCol = row.querySelector(`.${styles.textCol}`);
        const imageFrame = row.querySelector(`.${styles.imageFrame}`);

        // Slide up text
        if (textCol) {
          gsap.fromTo(
            textCol,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Reveal image container
        if (imageFrame) {
          gsap.fromTo(
            imageFrame,
            { scale: 0.95, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Parallax image scrolling
        const img = imageRefs.current[i];
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="projects" ref={sectionRef}>
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>FEATURED WORK</p>
        <h2 className={styles.sectionHeading} ref={headingRef}>Selected Projects</h2>

        <div className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className={`${styles.row} ${i % 2 !== 0 ? styles.rowReverse : ''}`}
              ref={(el) => (rowRefs.current[i] = el)}
            >
              {/* Text Column */}
              <div className={styles.textCol}>
                <span
                  className={styles.label}
                  style={{ '--theme-color': project.color }}
                >
                  {project.label}
                </span>
                <h3 className={styles.title}>{project.title}</h3>
                
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  className={styles.btnExplore}
                  style={{
                    '--theme-color': project.color,
                    '--theme-glow': `${project.color}30`,
                  }}
                >
                  {project.buttonText}
                </button>
              </div>

              {/* Image Column */}
              <div className={styles.imageCol}>
                <div
                  className={`${styles.imageFrame} ${styles[project.theme]}`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.projectImage}
                    ref={(el) => (imageRefs.current[i] = el)}
                  />
                  {/* Colored tint overlay matches brand tint */}
                  <div className={styles.tintOverlay} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
