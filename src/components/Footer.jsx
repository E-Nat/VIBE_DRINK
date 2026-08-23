import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Instagram, Facebook, Mail, ArrowUp, CheckCircle2 } from 'lucide-react';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import './Footer.css';

export const Footer = () => {
  const { currentProduct } = useFlavor();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const scrollToTop = () => {
    soundEngine.playClick(600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    soundEngine.playChime(784, 'sine', 1.2);
    setSubscribed(true);
  };

  const navLinks = [
    { to: '/', label: 'Experience' },
    { to: '/flavours', label: 'Portfolio' },
    { to: '/craft', label: 'Alchemy' },
    { to: '/story', label: 'Philosophy' },
    { to: '/reviews', label: 'Voices' },
    { to: '/contact', label: 'Concierge' },
  ];

  return (
    <footer className="footer-root" role="contentinfo">
      {/* Massive subtle VIBE typography watermark in background */}
      <div className="footer-watermark font-editorial" aria-hidden="true">
        VIBE
      </div>

      <div className="container footer-container">
        {/* Top Tier */}
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <div className="footer-monogram">V</div>
              <span className="footer-logo-text">VIBE</span>
            </div>
            <p className="footer-brand-tagline">
              Ultra-premium spirits engineered with character for nocturnal moments that leave an unforgettable impression.
            </p>
            <div className="footer-social-links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Follow VIBE on Instagram"
                data-cursor-text="INSTA"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Follow VIBE on Facebook"
                data-cursor-text="FB"
              >
                <Facebook size={18} />
              </a>
              <a
                href="mailto:concierge@vibedrink.com"
                className="footer-social-btn"
                aria-label="Email VIBE Concierge"
                data-cursor-text="EMAIL"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-title">Navigation</span>
            <ul className="footer-link-list">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `footer-nav-link ${isActive ? 'active' : ''}`
                    }
                    data-cursor-text="GO"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-expressions-col">
            <span className="footer-col-title">Expressions</span>
            <ul className="footer-link-list">
              <li>
                <NavLink to="/flavours" className="footer-nav-link">
                  VIBE Black Tea
                </NavLink>
              </li>
              <li>
                <NavLink to="/flavours" className="footer-nav-link">
                  VIBE Exotic Lychee
                </NavLink>
              </li>
              <li>
                <NavLink to="/craft" className="footer-nav-link">
                  Artisanal Method
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="footer-nav-link">
                  Private Allocation
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="footer-newsletter-col">
            <span className="footer-col-title">Private Concierge</span>
            <p className="footer-newsletter-text">
              Subscribe for private releases, evening invitations, and botanical tasting notes.
            </p>

            {subscribed ? (
              <div className="footer-subscribed-msg glass-panel">
                <CheckCircle2 size={16} className="sub-icon" />
                <span>You are registered with the Private Concierge Registry.</span>
              </div>
            ) : (
              <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="footer-input"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="footer-submit-btn"
                  data-cursor-text="JOIN"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Responsible Drinking Banner */}
        <div className="footer-responsible-banner glass-panel">
          <span className="responsible-tag">RESPONSIBLE DRINKING</span>
          <p className="responsible-text">
            Please enjoy responsibly. You must be of legal drinking age in your country to purchase or consume alcohol.
          </p>
        </div>

        {/* Bottom Tier */}
        <div className="footer-bottom-row">
          <p className="footer-copyright">
            © 2026 VIBE Spirits Ltd. All rights reserved.
          </p>

          <button
            type="button"
            className="footer-scroll-top"
            onClick={scrollToTop}
            data-cursor-text="TOP"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
