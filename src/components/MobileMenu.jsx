import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { useFlavor } from '../context/FlavorContext';
import { useScrollLock } from '../hooks/useScrollLock';
import { soundEngine } from '../utils/audio';
import { ShoppingBag, Sparkles, Instagram, Facebook } from 'lucide-react';
import './MobileMenu.css';

export const MobileMenu = ({ isOpen, onClose, links }) => {
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const { currentProduct, currentFlavorKey, toggleFlavor, setIsCartOpen, cartItems } = useFlavor();

  useScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power3.out',
      });

      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.1,
        }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -12,
        pointerEvents: 'none',
        duration: 0.25,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  const totalCartQty = cartItems.reduce((acc, i) => acc + i.qty, 0);

  const handleOpenAllocation = () => {
    soundEngine.playClick(800);
    onClose();
    setIsCartOpen(true);
  };

  const flavorLabel = currentFlavorKey === 'blackTea' ? 'Black Tea' : 'Lychee';

  return (
    <div ref={menuRef} className="mobile-menu-drawer glass-panel" aria-hidden={!isOpen}>
      <div className="mobile-menu-inner">
        {/* Top 4 Core Navigation Links */}
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
                  onClick={() => {
                    soundEngine.playClick(700);
                    onClose();
                  }}
                >
                  <span className="mobile-nav-number">0{idx + 1}</span>
                  <span className="mobile-nav-title">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Flavor Switcher Row */}
        <div className="mobile-menu-flavor-toggle">
          <span className="mobile-flavor-label">Atmosphere</span>
          <button
            type="button"
            className="mobile-flavor-pill"
            onClick={() => {
              soundEngine.playClick(800);
              toggleFlavor();
            }}
          >
            <span className="mobile-flavor-dot" />
            <span>{flavorLabel}</span>
          </button>
        </div>

        {/* Mobile Allocation CTA */}
        <div className="mobile-menu-footer">
          <button
            type="button"
            className="mobile-allocation-btn"
            onClick={handleOpenAllocation}
          >
            <ShoppingBag size={16} />
            <span>ALLOCATION</span>
            {totalCartQty > 0 && (
              <span className="mobile-bag-count">{totalCartQty}</span>
            )}
          </button>

          <p className="mobile-responsible-tag">Please enjoy responsibly.</p>
        </div>
      </div>
    </div>
  );
};
