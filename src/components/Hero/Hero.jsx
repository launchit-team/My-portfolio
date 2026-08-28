import React, { useEffect, useRef, useState } from 'react'
import './Hero.css'

// Typing animation words
const TYPING_WORDS = ['Video Editor', 'Web Developer', 'Content Creator']

export default function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Typing animation effect
  useEffect(() => {
    const currentWord = TYPING_WORDS[currentWordIndex]
    const typeSpeed = isDeleting ? 50 : 100
    const pauseTime = 2000

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % TYPING_WORDS.length)
        }
      }
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentWordIndex])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    let ticking = false
    const onScroll = () => {
      if (!el) return

      const scrollPosition = window.scrollY
      const heroHeight = el.offsetHeight

      // Calculate the progress of the scroll *within the hero area* (0 to 1)
      // Using 0.25 for even faster animation - icons fully spread at 25% scroll
      const newProgress = Math.min(scrollPosition / (heroHeight * 0.25), 1)

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollProgress(newProgress)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])



  // Parallax Transform for the text content
  // Clamp the upward movement so the text never slides under the fixed navbar.
  const contentRisePx = Math.min(scrollProgress * 100, 20)
  const contentStyle = {
    transform: `translateY(${-contentRisePx}px)`,
    opacity: 1 - scrollProgress * 0.8, 
  }

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-content" ref={contentRef} style={contentStyle}>
        <div className="hero-badge">
          <span><span className="accent">Hello,</span> I'm Samy</span>
          <span className="hero-badge-underline"></span>
        </div>

        <h1 className="hero-name">I'm Samy,<br/><span className="typing-text">{displayText}<span className="cursor">|</span></span></h1>

        <p className="hero-tagline">
          A creative professional specializing in web development and video editing — crafting engaging videos and clean, functional websites.
        </p>

        <div className="hero-cta">
          <a href="#services" className="cta-btn primary">
            <span>View My Work</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#contact" className="cta-btn secondary">
            <span>Let's Talk</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{ opacity: 1 - scrollProgress * 2 }}>
        <span>Scroll</span>
        <div className="arrow"></div>
      </div>
    </section>
  )
}