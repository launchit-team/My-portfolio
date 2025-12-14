import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="socials">
          <a href="#">Twitter</a>
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
        </div>
        <div className="copyright">© {new Date().getFullYear()} YourName. All rights reserved.</div>
      </div>
    </footer>
  )
}
