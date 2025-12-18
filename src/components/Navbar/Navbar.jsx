
import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';


export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false)
  const [activeLink, setActiveLink] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [isClickScrolling, setIsClickScrolling] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const lastScrollY = useRef(0)
  
  // Ref for the slider element and the inner container
  const sliderRef = useRef(null); 
  const navInnerRef = useRef(null); // Ref for the fluid container
  // State to store the position/size of the active link
  const [sliderStyle, setSliderStyle] = useState({});

  // Function to calculate and update the slider position
  const updateSlider = (activeId) => {
    // 1. Find the currently active link element in the DOM
    const activeElement = document.getElementById(`nav-link-${activeId}`);
    
    // 2. Get the inner container element
    const navInner = navInnerRef.current;

    if (activeElement && navInner && sliderRef.current) {
      // 3. Get positions relative to the *parent* container (navInner)
      const parentRect = navInner.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();
      
      // 4. Calculate the required styles
      setSliderStyle({
        width: activeRect.width,
        height: activeRect.height,
        // Calculate 'left' relative to the 'nav-inner' parent
        left: activeRect.left - parentRect.left,
        top: activeRect.top - parentRect.top, // Needed if nav-inner has vertical padding
        opacity: 1, // Make it visible
      });
    } else {
      // Hide the slider if no link is active or elements aren't ready
      setSliderStyle({ opacity: 0 });
    }
  };


  // 1. Optimized Scroll Logic & Resize Observer for Fluidity
  useEffect(() => {
    // Call updateSlider when activeLink changes
    updateSlider(activeLink);
    
    // Use a ResizeObserver to update position if screen size OR CONTENT SIZE changes (fluidity)
    let resizeObserver;
    const navInnerElement = navInnerRef.current;

    if (navInnerElement) {
        // This is crucial for fixing slider position when the .nav-inner width changes
        resizeObserver = new ResizeObserver(() => updateSlider(activeLink));
        resizeObserver.observe(navInnerElement);
    }
    

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 50)

      // Hide/show navbar based on scroll direction (only on mobile)
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down & past threshold - hide navbar
          setNavHidden(true);
        } else {
          // Scrolling up - show navbar
          setNavHidden(false);
        }
      } else {
        // Always show navbar on desktop
        setNavHidden(false);
      }
      
      lastScrollY.current = currentScrollY;

      if (isClickScrolling) {
        return 
      }

      // Existing scroll detection logic...
      const sections = ['home', 'services', 'experience', 'contact']
      const scrollPosition = window.scrollY + 100 

      let found = false;
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(section)
            found = true;
            break 
          }
        }
      }
      // If we are at the very top and nothing is found, ensure 'home' is active
      if (!found && window.scrollY < 50) {
        setActiveLink('home');
      }
    }

    // Set initial position on mount (needs a slight delay for elements to render)
    const initialDelay = setTimeout(() => updateSlider(activeLink), 100);

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (resizeObserver) resizeObserver.disconnect();
      clearTimeout(initialDelay);
    }
  }, [isClickScrolling, activeLink]) // activeLink dependency added

  // 2. Smooth Scroll Handler
  const handleNavClick = (e, id) => {
    e.preventDefault()
    
    setActiveLink(id) // Set active link immediately on click
    updateSlider(id); // Update slider position immediately
    setMobileMenuOpen(false); // Close mobile menu on click
    
    const element = document.getElementById(id)
    if (element) {
      setIsClickScrolling(true) 

      const offset = 80 
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Check when scrolling actually stops
      const checkScrollStop = () => {
        let lastScrollY = window.scrollY
        let isScrolling

        const loop = () => {
          const currentScrollY = window.scrollY;
          
          // Check if scroll has stopped (small tolerance for smooth scroll finish)
          if (Math.abs(currentScrollY - lastScrollY) < 1) { 
            setIsClickScrolling(false) 
            cancelAnimationFrame(isScrolling);
            // Re-run slider update to fix any tiny final alignment issues after stop
            updateSlider(id); 
            return;
          }

          lastScrollY = currentScrollY;
          isScrolling = requestAnimationFrame(loop);
        }
        
        // Slight initial delay to let the smooth scroll start
        setTimeout(() => isScrolling = requestAnimationFrame(loop), 50);
      }
      
      checkScrollStop();
    }
  }

  // The link class is now only used for hover/text styling, not background
  const getLinkClass = (linkName) => {
    return activeLink === linkName ? 'active-text' : '' 
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  // Close mobile menu when clicking outside
  const handleOverlayClick = () => {
    setMobileMenuOpen(false);
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${navHidden && !mobileMenuOpen ? 'hidden' : ''}`}>
      <div className="nav-inner" ref={navInnerRef}>
        
        {/* The Sliding Background Element */}
        <div 
          ref={sliderRef} 
          className="nav-slider" 
          style={sliderStyle} 
        ></div>
        
        {/* Left Nav */}
        <nav className="nav-links-left">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 'home')} 
            className={getLinkClass('home')}
            id="nav-link-home" 
          >Home</a>
          <a 
            href="#services" 
            onClick={(e) => handleNavClick(e, 'services')} 
            className={getLinkClass('services')}
            id="nav-link-services" 
          >Services</a>
        </nav>
        
        {/* Center Brand */}
        <div 
          className="brand-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="brand-logo">
            {/* NOTE: You need a logo.svg file in a public/Shape folder or update the src */}
            <img src="/logo.png" alt="Sami" width="28" height="28" />
          </div>
          
          <div className="brand-text-container">
            <div className={`text-state default-text ${!isHovered ? 'visible' : ''}`}>
              SAMI
            </div>
            
            <div className={`text-state hover-text ${isHovered ? 'visible' : ''}`}>
              <span>made by</span>
              {/* Simple fade/slide animation for the second line */}
              <span className={`brand-hover-text-simple${isHovered ? ' visible' : ''}`}>Sami Creative</span>
            </div>
          </div>
        </div>
        
        {/* Right Nav */}
        <nav className="nav-links-right">
          <a 
            href="#experience" 
            onClick={(e) => handleNavClick(e, 'experience')} 
            className={getLinkClass('experience')}
            id="nav-link-experience" 
          >Experience</a>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, 'contact')} 
            className={getLinkClass('contact')}
            id="nav-link-contact" 
          >Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Overlay */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'visible' : ''}`}
        onClick={handleOverlayClick}
      ></div>

      {/* Mobile Menu Panel */}
      <nav className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Mobile Menu Header with Logo */}
        <div className="mobile-menu-header">
          <div className="brand-logo">
            <img src="/logo.png" alt="Sami" width="40" height="40" />
          </div>
          <span className="mobile-brand-text">SAMI</span>
        </div>
        
        <div className="mobile-nav-links">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 'home')} 
            className={getLinkClass('home')}
          >Home</a>
          <a 
            href="#services" 
            onClick={(e) => handleNavClick(e, 'services')} 
            className={getLinkClass('services')}
          >Services</a>
          <a 
            href="#experience" 
            onClick={(e) => handleNavClick(e, 'experience')} 
            className={getLinkClass('experience')}
          >Experience</a>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, 'contact')} 
            className={getLinkClass('contact')}
          >Contact</a>
        </div>
      </nav>
    </header>
  )
}