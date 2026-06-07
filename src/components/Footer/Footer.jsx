import React, { useCallback } from 'react';
import styles from './Footer.module.scss';

const NAV_ITEMS = [
  { label: 'Home', target: 'hero' },
  { label: 'Projects', target: 'projects' },
  { label: 'About', target: 'about' },
  { label: 'Experience', target: 'experience' },
];

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/zegaoulamouaadh96/',
    icon: (
      <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.333-1.723-1.333-1.723-1.089-.73.083-.716.083-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.802 2.807 1.281 3.492.98.108-.763.418-1.282.762-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.228-3.164-.123-.298-.532-1.497.117-3.12 0 0 1.001-.314 3.28 1.209A11.5 11.5 0 0 1 12 6.844a11.5 11.5 0 0 1 2.995.396c2.278-1.523 3.277-1.209 3.277-1.209.65 1.623.241 2.822.118 3.12.764.825 1.227 1.877 1.227 3.164 0 4.53-2.805 5.528-5.475 5.818.43.364.823 1.084.823 2.185 0 1.577-.014 2.849-.014 3.236 0 .315.216.683.825.567C20.565 21.917 24 17.5 24 12.292 24 5.78 18.627.5 12 .5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mouaadh-zegaoula-43348b3bb/',
    icon: (
      <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/zegaoulamouaadh',
    icon: (
      <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:mouaadhzegaoula@email.com',
    icon: (
      <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          {/* Brand */}
          <div className={styles.brand}>
            <span className={styles.brandName}>Mouaadh Zegaoula</span>
            <p className={styles.brandDesc}>
              Full-Stack Developer &amp; AI Enthusiast from Algeria
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className={styles.colTitle}>Quick Links</p>
            <ul className={styles.links}>
              {NAV_ITEMS.map((item) => (
                <li key={item.target}>
                  <button
                    className={styles.link}
                    onClick={() => scrollTo(item.target)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className={styles.colTitle}>Connect</p>
            <ul className={styles.socials}>
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    className={styles.socialLink}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <span className={styles.copyright}>
            &copy; 2026 Mouaadh Zegaoula. All rights reserved.
          </span>
          <span className={styles.madeWith}>
            Designed &amp; Built with passion
          </span>
        </div>
      </div>
    </footer>
  );
}
