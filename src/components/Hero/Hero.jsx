import React, { useEffect, useRef, useState } from 'react'
import './Hero.css'

// Easing function for smooth animation
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

// Typing animation words
const TYPING_WORDS = ['Video Editor', 'Web Developer', 'Content Creator']

// Define the final (destination) positions for the icons
const FINAL_POSITIONS = {
  // TranslateX(px), TranslateY(px), Scale, Rotation(deg)
  // Left icons rotate negative (counter-clockwise), right icons rotate positive (clockwise)
  1: [-550, -100, 1.15, -15],  // Left - rotates left
  2: [-420, -370, 1.15, -10],  // Left - rotates left  
  3: [300, -380, 1.15, 10],    // Right - rotates right
  4: [450, -100, 1.15, 15],    // Right - rotates right
}

// Function to calculate the interpolated value with easing
const interpolate = (start, end, progress) => {
  const easedProgress = easeOutCubic(progress)
  return start + (end - start) * easedProgress
}

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



  // Style for the person image - subtle parallax
  const personStyle = {
    transform: `translateY(${scrollProgress * 30}px) scale(${1 + scrollProgress * 0.05})`,
  }

  // Function to generate the dynamic style for each icon
  const getIconStyle = (iconNumber) => {
    const [finalX, finalY, finalScale, finalRotation] = FINAL_POSITIONS[iconNumber]

    const currentX = interpolate(0, finalX, scrollProgress)
    const currentY = interpolate(0, finalY, scrollProgress)
    const currentScale = interpolate(1, finalScale, scrollProgress)
    const currentRotation = interpolate(0, finalRotation, scrollProgress)
    const currentOpacity = interpolate(0.6, 1, scrollProgress)
    
    return {
      transform: `translate(${currentX}px, ${currentY}px) scale(${currentScale}) rotate(${currentRotation}deg)`,
      opacity: currentOpacity,
    }
  }

  const iconsBase = '/icons'

  return (
    <section id="home" className="hero" ref={heroRef}>


      <div className="hero-content container" ref={contentRef} style={contentStyle}>
        <div className="hero-top">
          <button className="hello-btn">Hello!</button>
          <h1 className="hero-name">I'm Sami,<br/><span className="typing-text">{displayText}<span className="cursor">|</span></span></h1>
        </div>
        
        {/* Mobile tagline */}
        <p className="hero-tagline mobile-only">
          A creative professional specializing in video editing and web development. I craft engaging videos and clean, functional websites.
        </p>
      </div>

      {/* Mobile visual elements */}
      <div className="mobile-visuals mobile-only">
        <div className="mobile-decoration mobile-decoration-1"></div>
        <div className="mobile-decoration mobile-decoration-2"></div>
        <div className="mobile-decoration mobile-decoration-3"></div>
      </div>

      {/* CTA Buttons - Moved to be near tagline */}
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

      {/* Tagline replacing stats */}
      <div className="hero-bottom-tagline desktop-only">
        {/* Magnifier layer: zoomed view of what's behind the tagline */}
        <div className="tagline-magnifier" aria-hidden="true">
          <div className="tagline-magnifier-visual">
            <div className="shape-bg"></div>
            <img
              src="/person.png"
              alt=""
              className="person tagline-magnifier-person"
              style={personStyle}
            />

            <img src={`${iconsBase}/Adobe.png`} alt="" className="icon icon-1 tagline-magnifier-icon" style={getIconStyle(3)} />
            <img src={`${iconsBase}/cut.png`} alt="" className="icon icon-2 tagline-magnifier-icon" style={getIconStyle(2)} />
            <img src={`${iconsBase}/editing.png`} alt="" className="icon icon-3 tagline-magnifier-icon" style={getIconStyle(1)} />
            <img src={`${iconsBase}/video.png`} alt="" className="icon icon-4 tagline-magnifier-icon" style={getIconStyle(4)} />
          </div>
        </div>
        <p>Hi, I’m Sami , a creative professional specializing in video editing and web development. I craft engaging videos and clean, functional websites, combining technical skills with creativity to bring ideas to life.</p>
      </div>

      <div className="hero-visual desktop-only">
        <div className="shape-bg"></div> 
        <img 
          src="/person.png"
          alt="Sami"
          className="person" 
          style={personStyle}
        />

        {/* Floating icons with scroll animation */}
        <img src={`${iconsBase}/Adobe.png`} alt="Adobe Premiere Pro" className="icon icon-1" style={getIconStyle(3)} />
        <img src={`${iconsBase}/capcut.png`} alt="CapCut" className="icon icon-2" style={getIconStyle(2)} />
        <img src={`${iconsBase}/editing.png`} alt="Editing Tools" className="icon icon-3" style={getIconStyle(1)} />
        <img src={`${iconsBase}/video.png`} alt="Video Cut" className="icon icon-4" style={getIconStyle(4)} />
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{ opacity: 1 - scrollProgress * 2 }}>
        <span>Scroll</span>
        <div className="arrow"></div>
      </div>
    </section>
  )
}