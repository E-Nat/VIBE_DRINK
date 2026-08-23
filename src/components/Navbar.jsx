import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { useFlavor } from '../context/FlavorContext';
import './Navbar.css';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { currentProduct, currentFlavorKey, toggleFlavor } = useFlavor();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/story', label: 'Story' },
    { to: '/flavours', label: 'Flavours' },
    { to: '/craft', label: 'Craft' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar-container glass-panel" aria-label="Main Navigation">
        {/* Left: VIBE Brand Logo */}
        <NavLink to="/" className="navbar-logo" data-cursor-text="VIBE">
          <div className="navbar-logo-monogram">V</div>
          <span className="navbar-logo-text">VIBE</span>
        </NavLink>

        {/* Center: Desktop Nav Links */}
        <ul className="navbar-links" role="menubar">
          {navLinks.map((link) => (
            <li key={link.to} role="none">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? 'active' : ''}`
                }
                data-cursor-text={link.label.toUpperCase()}
              >
                <span>{link.label}</span>
                <span className="nav-indicator" />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: Flavor Switcher Pill & CTA */}
        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-flavor-badge"
            onClick={toggleFlavor}
            data-cursor-text="SWITCH"
            title="Switch Active Atmosphere"
          >
            <span className="flavor-badge-dot" />
            <span className="flavor-badge-text">
              {currentFlavorKey === 'blackTea' ? 'Black Tea' : 'Lychee'}
            </span>
          </button>

          <NavLink
            to="/flavours"
            className="navbar-cta-btn"
            data-cursor-text="EXPLORE"
          >
            <Sparkles size={14} className="navbar-cta-icon" />
            <span>Discover VIBE</span>
          </NavLink>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileOpen}
            data-cursor-text="MENU"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        links={navLinks}
      />
    </header>
  );
};
