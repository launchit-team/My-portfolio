import React, { useEffect, useRef } from 'react';
import './Services.css';

const Services = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    // Create floating particles and shapes
    const elements = [];
    
    // Small particles
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle small';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
      elements.push(particle);
    }
    
    // Medium particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle medium';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
      elements.push(particle);
    }
    
    // Large particles
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle large';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
      elements.push(particle);
    }

    // Floating shapes
    const shapes = ['square', 'circle', 'triangle', 'ring', 'dot'];
    for (let i = 0; i < 20; i++) {
      const shape = document.createElement('div');
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      shape.className = `floating-shape shape-${shapeType}`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.opacity = 0.3 + Math.random() * 0.4;
      container.appendChild(shape);
      elements.push(shape);
    }

    // Larger fixed background orbs (subtle, behind particles)
    for (let i = 0; i < 6; i++) {
      const orb = document.createElement('div');
      orb.className = 'bg-orb';
      orb.style.left = `${Math.random() * 100}%`;
      orb.style.top = `${Math.random() * 100}%`;
      // Size range: 180px - 420px
      const size = 180 + Math.random() * 240;
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      orb.style.opacity = `${0.12 + Math.random() * 0.18}`;
      container.appendChild(orb);
      elements.push(orb);
    }

    // Soft streaks/lines (fixed, react to cursor)
    for (let i = 0; i < 5; i++) {
      const streak = document.createElement('div');
      streak.className = 'bg-streak';
      streak.style.left = `${Math.random() * 100}%`;
      streak.style.top = `${Math.random() * 100}%`;
      streak.style.opacity = `${0.08 + Math.random() * 0.14}`;
      // Random angle
      streak.style.transform = `rotate(${Math.floor(Math.random() * 180)}deg)`;
      container.appendChild(streak);
      elements.push(streak);
    }

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      elements.forEach((el) => {
        const elRect = el.getBoundingClientRect();
        const elX = elRect.left - rect.left + elRect.width / 2;
        const elY = elRect.top - rect.top + elRect.height / 2;
        
        const distX = mouseX - elX;
        const distY = mouseY - elY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        const maxDistance = el.classList.contains('bg-orb') ? 260 : 150;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const strength = el.classList.contains('bg-orb') ? 0.22 : el.classList.contains('bg-streak') ? 0.18 : 0.5;
          const moveX = -(distX * force * strength);
          const moveY = -(distY * force * strength);
          el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          // Return to original (streaks keep rotation)
          if (el.classList.contains('bg-streak')) {
            // Keep initial rotate from style.transform, but clear translate
            const current = el.style.transform || '';
            const rotate = current.match(/rotate\([^)]*\)/)?.[0] || 'rotate(0deg)';
            el.style.transform = rotate;
          } else {
            el.style.transform = 'translate(0, 0)';
          }
        }
      });
    };

    container.parentElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.parentElement.removeEventListener('mousemove', handleMouseMove);
      elements.forEach(el => el.remove());
    };
  }, []);

  return (
    <section className="services-section" id="services">
      <div className="particles-container" ref={particlesRef}></div>
      
      <div className="section-header">
        <h2 className="title">
          <span className="text-white">My</span>{' '}
          <span className="text-blue">Services</span>
        </h2>
        <p className="section-subtitle">What I Can Do For You</p>
      </div>

      <div className="cards-container">
        {/* Card 1: Video Editing */}
        <div className="service-card">
          <div className="card-top">
            <div className="icon-wrapper">🎬</div>
            <div className="card-title-area">
              <h3>Video Editing</h3>
              <p className="tagline">Creative Storytelling</p>
            </div>
          </div>
          <div className="card-body">
            <div className="service-items">
              <div className="service-item">
                <span className="item-number">01</span>
                <div className="item-content">
                  <h4>Short-Form Content</h4>
                  <p>Reels, Shorts, TikToks with engaging cuts & text</p>
                </div>
              </div>
              <div className="service-item">
                <span className="item-number">02</span>
                <div className="item-content">
                  <h4>Color Grading</h4>
                  <p>Cinematic looks that elevate your footage</p>
                </div>
              </div>
              <div className="service-item">
                <span className="item-number">03</span>
                <div className="item-content">
                  <h4>Advanced Techniques</h4>
                  <p>Multicam, green screen, stabilization & more</p>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <span>View my work</span>
              <div className="arrow-link">→</div>
            </div>
          </div>
        </div>

        {/* Card 2: Web Development */}
        <div className="service-card">
          <div className="card-top">
            <div className="icon-wrapper">💻</div>
            <div className="card-title-area">
              <h3>Web Development</h3>
              <p className="tagline">Digital Solutions</p>
            </div>
          </div>
          <div className="card-body">
            <div className="service-items">
              <div className="service-item">
                <span className="item-number">01</span>
                <div className="item-content">
                  <h4>Website Creation</h4>
                  <p>Responsive and modern landing pages</p>
                </div>
              </div>
              <div className="service-item">
                <span className="item-number">02</span>
                <div className="item-content">
                  <h4>E-commerce</h4>
                  <p>Online stores with payment integration</p>
                </div>
              </div>
              <div className="service-item">
                <span className="item-number">03</span>
                <div className="item-content">
                  <h4>Web Applications</h4>
                  <p>Complex functional web software</p>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <span>Start a project</span>
              <div className="arrow-link">→</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;