import React, { useState } from 'react'
import './Footer.css'

export default function Footer() {
  const [heartFilled, setHeartFilled] = useState(false);
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-left">
          <p className="footer-copyright">© {new Date().getFullYear()} SAMI Creative. Ideas in motion.</p>
        </div>
        <div className="footer-right">
          <p className="footer-madeWith">
            Made with 
            <span
              className={`footer-heart${heartFilled ? ' filled' : ''}`}
              onClick={() => setHeartFilled(f => !f)}
              tabIndex={0}
              role="button"
              aria-label="Toggle heart"
              style={{ cursor: 'pointer' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={heartFilled ? '#ff3366' : 'none'}
                stroke="#ff3366"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </span>
             and caffeine. Built with modern tools.
          </p>
        </div>
      </div>
    </footer>
  );
}
  

