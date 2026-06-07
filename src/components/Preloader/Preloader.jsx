import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Preloader.module.scss';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const barWrapRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Slide preloader away then call parent
          gsap.to(preloaderRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
            onStart: () => {
              window.dispatchEvent(new CustomEvent('preloaderExit'));
            },
            onComplete: () => {
              gsap.set(preloaderRef.current, { visibility: 'hidden', pointerEvents: 'none' });
              if (onComplete) onComplete();
            },
          });
        },
      });

      // Fade in elements
      tl.to(counterRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
        .to(barWrapRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' }, '-=0.2')
        .to(labelRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' }, '-=0.15');

      // Counter + bar animation
      const counter = { value: 0 };
      tl.to(
        counter,
        {
          value: 100,
          duration: 2.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(counter.value);
            }
          },
        },
        '-=0.1'
      ).to(
        barRef.current,
        {
          width: '100%',
          duration: 2.4,
          ease: 'power2.inOut',
        },
        '<' // sync with counter
      );

      // Small pause before exit
      tl.to({}, { duration: 0.3 });
    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className={styles.preloader} ref={preloaderRef}>
      <div className={styles.content}>
        <p className={styles.loadingText} ref={labelRef}>
          Loading
        </p>
        <div className={styles.counter} ref={counterRef}>
          0
        </div>
        <div className={styles.loadingBar} ref={barWrapRef}>
          <div className={styles.loadingBarFill} ref={barRef} />
        </div>
      </div>
    </div>
  );
}
