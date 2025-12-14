import React from 'react'
import './Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">My journey so far</p>
        
        <div className="journey-wrapper">
          {/* Instagram Achievement */}
          <div className="journey-block">
            <div className="journey-visual">
              <div className="stat-circle" style={{marginBottom: '1.5rem'}}>
                <span className="stat-number" style={{color: '#fff'}}>317K</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="growth-line" style={{marginBottom: '2rem'}}>
                <div className="growth-dot" style={{left: '0%'}}><span style={{marginTop: '10px'}}>0</span></div>
                <div className="growth-dot milestone" style={{left: '31%'}}><span style={{marginTop: '10px'}}>100K</span></div>
                <div className="growth-dot current" style={{left: '100%'}}><span style={{marginTop: '10px'}}>317K</span></div>
                <div className="growth-progress"></div>
              </div>
              <p className="growth-time" style={{marginBottom: '1.5rem'}}>100K reached in less than 4 months</p>
            </div>
            <div className="journey-info">
              <span className="journey-year">2023 — Present</span>
              <h3 className="journey-title">Instagram Page Manager</h3>
              <p className="journey-desc">
                Building and managing a thriving Instagram community. Through strategic content 
                creation, engagement tactics, and consistent growth strategies, I've scaled 
                the page to over 317K followers.
              </p>
              <div className="journey-tags">
                <span>Content Strategy</span>
                <span>Growth Hacking</span>
                <span>Community Building</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="journey-divider">
            <div className="divider-line"></div>
            <div className="divider-icon">✦</div>
            <div className="divider-line"></div>
          </div>

          {/* Education */}
          <div className="journey-block reverse">
            <div className="journey-info">
              <span className="journey-year">2021 — 2026</span>
              <h3 className="journey-title">Software Engineering</h3>
              <p className="journey-desc">
                Pursuing my degree at an international university, combining theoretical 
                knowledge with practical skills. One year remaining until graduation, 
                ready to bring fresh ideas to the tech world.
              </p>
              <div className="journey-tags">
                <span>Problem Solving</span>
                <span>Full Stack Dev</span>
                <span>System Design</span>
              </div>
            </div>
            <div className="journey-visual">
              <div className="progress-ring">
                <svg viewBox="0 0 120 120">
                  <circle className="ring-bg" cx="60" cy="60" r="54"/>
                  <circle className="ring-progress" cx="60" cy="60" r="54"/>
                </svg>
                <div className="progress-content">
                  <span className="progress-percent">80%</span>
                  <span className="progress-text">Complete</span>
                </div>
              </div>
              <p className="final-year-badge">🎓 Final Year Student</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
