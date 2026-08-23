import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Volume2, VolumeX, ShoppingBag } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import './Navbar.css';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const {
    currentFlavorKey,
    toggleFlavor,
    isAudioActive,
    toggleAudio,
    setIsCartOpen,
    cartItems,
  } = useFlavor();

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
    { to: '/', label: 'Experience' },
    { to: '/story', label: 'Story' },
    { to: '/flavours', label: 'Flavours' },
    { to: '/craft', label: 'Craft' },
  ];

  const totalCartQty = cartItems.reduce((acc, i) => acc + i.qty, 0);

  const handleOpenCart = () => {
    soundEngine.playClick(800);
    setIsCartOpen(true);
  };

  const flavorLabel = currentFlavorKey === 'blackTea' ? 'Black Tea' : 'Lychee';

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar-container glass-panel" aria-label="Main Navigation">
        {/* Left: VIBE Brand Logo */}
        <NavLink
          to="/"
          className="navbar-logo"
          data-cursor-text="VIBE"
          onClick={() => soundEngine.playClick(900)}
        >
          <div className="navbar-logo-monogram">V</div>
          <span className="navbar-logo-text">VIBE</span>
        </NavLink>

        {/* Center: Desktop Nav Links (Clean 4-item core navigation) */}
        <ul className="navbar-links" role="menubar">
          {navLinks.map((link) => (
            <li key={link.to} role="none">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? 'active' : ''}`
                }
                data-cursor-text={link.label.toUpperCase()}
                onClick={() => soundEngine.playClick(700)}
              >
                <span>{link.label}</span>
                <span className="nav-indicator" />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: Flavor Switcher & Allocation Bag */}
        <div className="navbar-actions">
          {/* Subtle Audio Toggle */}
          <button
            type="button"
            className={`navbar-audio-btn ${isAudioActive ? 'active' : ''}`}
            onClick={toggleAudio}
            title={isAudioActive ? 'Mute Sound' : 'Play Sound'}
            data-cursor-text={isAudioActive ? 'MUTE' : 'SOUND'}
          >
            {isAudioActive ? (
              <Volume2 size={15} className="audio-icon" />
            ) : (
              <VolumeX size={15} className="audio-icon" />
            )}
          </button>

          {/* Flavor Switcher Pill */}
          <button
            type="button"
            className="navbar-flavor-badge"
            onClick={toggleFlavor}
            data-cursor-text="SWITCH"
            title="Switch Active Atmosphere"
          >
            <span className="flavor-badge-dot" />
            <span className="flavor-badge-text">{flavorLabel}</span>
          </button>

          {/* Allocation Bag CTA */}
          <button
            type="button"
            className="navbar-bag-btn"
            onClick={handleOpenCart}
            data-cursor-text="ALLOCATION"
            title="Open Allocation Bag"
          >
            <ShoppingBag size={15} />
            <span className="bag-label">ALLOCATION</span>
            {totalCartQty > 0 && (
              <span className="bag-badge font-nav">{totalCartQty}</span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileOpen}
            data-cursor-text="MENU"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
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
