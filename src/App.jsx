import React, { useEffect } from 'react'
import Hero from './components/Hero/Hero'
import Projects from './components/Projects/Projects'
import About from './components/About/About'
import Experience from './components/Experience/Experience'
import Footer from './components/Footer/Footer'
import BackgroundParticles from './components/BackgroundParticles/BackgroundParticles'

import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)

    gsap.ticker.lagSmoothing(0)

    // Make lenis available globally for scroll-to functionality
    window.__lenis = lenis

    const handlePreloaderExit = () => {
      setTimeout(() => {
        ScrollTrigger.refresh()
        lenis.resize()
      }, 100)
      setTimeout(() => {
        ScrollTrigger.refresh()
        lenis.resize()
      }, 1000)
      setTimeout(() => {
        ScrollTrigger.refresh()
        lenis.resize()
      }, 2500)
    }

    window.addEventListener('preloaderExit', handlePreloaderExit)
    const fallback = setTimeout(handlePreloaderExit, 3500)

    return () => {
      lenis.destroy()
      window.__lenis = null
      gsap.ticker.remove(tick)
      window.removeEventListener('preloaderExit', handlePreloaderExit)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <div className="site">
      <BackgroundParticles />
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
      </main>
      <Footer />
    </div>
  )
}
