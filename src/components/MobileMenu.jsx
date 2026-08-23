import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { useFlavor } from '../context/FlavorContext';
import { useScrollLock } from '../hooks/useScrollLock';
import { Sparkles, Instagram, Facebook } from 'lucide-react';
import './MobileMenu.css';

export const MobileMenu = ({ isOpen, onClose, links }) => {
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const { currentProduct, toggleFlavor, currentFlavorKey } = useFlavor();

  useScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 0.45,
        ease: 'power3.out',
      });

      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.06,
          ease: 'power2.out',
          delay: 0.15,
        }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -15,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  return (
    <div ref={menuRef} className="mobile-menu-drawer glass-panel" aria-hidden={!isOpen}>
      <div className="mobile-menu-inner">
        <div className="mobile-menu-flavor-toggle">
          <span className="mobile-flavor-label">Active Atmosphere</span>
          <button
            type="button"
            className="mobile-flavor-pill"
            onClick={toggleFlavor}
          >
            <span className="mobile-flavor-dot" />
            <span>{currentProduct.name}</span>
          </button>
        </div>

        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {links.map((link, idx) => (
              <li
                key={link.to}
                ref={(el) => (linksRef.current[idx] = el)}
                className="mobile-nav-item"
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={onClose}
                >
                  <span className="mobile-nav-number">0{idx + 1}</span>
                  <span className="mobile-nav-title">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu-footer">
          <NavLink
            to="/flavours"
            className="mobile-cta-btn"
            onClick={onClose}
          >
            <Sparkles size={16} />
            <span>Discover VIBE</span>
          </NavLink>

          <div className="mobile-socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-link"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-link"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>

          <p className="mobile-responsible-tag">Please enjoy responsibly.</p>
        </div>
      </div>
    </div>
  );
};
