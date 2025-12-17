
import React, { useState, useEffect } from 'react'
import './Contact.css'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [formMessage, setFormMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormMessage({ type: '', text: '' })

    // Replace these with your actual EmailJS values
    const SERVICE_ID = 'service_l27gciw';
    const TEMPLATE_ID = 'template_upuqc3x';
    const PUBLIC_KEY = 'm8EqVxAfEurm8Tc52';

    // Add current date and time
    const now = new Date();
    const dataToSend = {
      ...formData,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString()
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, dataToSend, PUBLIC_KEY)
      .then((result) => {
        setFormData({ name: '', email: '', message: '' })
        setIsSubmitting(false)
        setFormMessage({ type: 'success', text: 'Message sent successfully!' })
      })
      .catch((error) => {
        setIsSubmitting(false)
        setFormMessage({ type: 'error', text: 'Failed to send message. Please try again later.' })
        console.error('EmailJS error:', error)
      })
  }

  return (
    <section id="contact" className="contact">
      {/* Mesh gradient background that follows mouse */}
      <div 
        className="contact-mesh-bg"
        style={{
          '--mouse-x': `${mousePos.x}%`,
          '--mouse-y': `${mousePos.y}%`
        }}
      >
        <div className="mesh-layer mesh-1"></div>
        <div className="mesh-layer mesh-2"></div>
        <div className="mesh-layer mesh-3"></div>
        <div className="aurora"></div>
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{ '--i': i }}></div>
          ))}
        </div>
        <div className="glow-lines">
          <div className="glow-line line-1"></div>
          <div className="glow-line line-2"></div>
          <div className="glow-line line-3"></div>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-left">
          <div className="contact-header">
            <div className="header-decoration">
              <span className="deco-line"></span>
              <span className="deco-dot"></span>
            </div>
            <h2 className="contact-title">
              <span className="title-line">Let's start a</span>
              <span className="title-line title-highlight">conversation</span>
            </h2>
            <p className="contact-desc">
              Ready to bring your vision to life? Drop me a message and let's create something extraordinary together.
            </p>
          </div>

          <a href="mailto:launchit.dev.team@gmail.com" className="email-card">
            <div className="email-card-glow"></div>
            <div className="email-card-content">
              <div className="email-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="email-text">
                <span className="email-label">Get in touch</span>
                <span className="email-address">launchit.dev.team@gmail.com</span>
              </div>
              <div className="email-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </div>
          </a>
        </div>

        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="name">What's your name?</label>
              <div className="input-line"></div>
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="email">Your email address</label>
              <div className="input-line"></div>
            </div>

            <div className="form-group">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder=" "
              ></textarea>
              <label htmlFor="message">Tell me about your project</label>
              <div className="input-line"></div>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              <span className="btn-bg"></span>
              <span className="btn-text">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </span>
              <span className="btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </span>
            </button>
            {formMessage.text && (
              <div className={`form-message ${formMessage.type}`} style={{ marginTop: '1rem', color: formMessage.type === 'success' ? '#2ecc40' : '#ff4136', textAlign: 'center' }}>
                {formMessage.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
