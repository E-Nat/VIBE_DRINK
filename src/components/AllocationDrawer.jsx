import React, { useState } from 'react';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { X, Sparkles, ShieldCheck, Trash2, ArrowRight, CheckCircle2, Gift } from 'lucide-react';
import './AllocationDrawer.css';

export const AllocationDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateCartQty,
    removeCartItem,
    currentFlavorKey,
  } = useFlavor();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  if (!isCartOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = 0; // Complimentary
  const total = subtotal + shipping;

  const handleClose = () => {
    soundEngine.playClick(400);
    setIsCartOpen(false);
    setIsSuccess(false);
  };

  const handleProceedCheckout = () => {
    setIsCheckingOut(true);
    soundEngine.playChime(600, 'sine', 1.0);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      soundEngine.playChime(880, 'sine', 1.8);
    }, 1500);
  };

  return (
    <div className="allocation-drawer-backdrop" onClick={handleClose}>
      <aside
        className={`allocation-drawer-panel glass-panel ${currentFlavorKey}`}
        onClick={(e) => e.stopPropagation()}
        aria-label="Private Allocation Summary"
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-header-title">
            <span className="drawer-badge">CONCIERGE ALLOCATION</span>
            <h3 className="drawer-title font-editorial">YOUR SELECTION</h3>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={handleClose}
            aria-label="Close Drawer"
          >
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          /* Checkout Success Screen */
          <div className="drawer-success-view">
            <div className="success-icon-wrap">
              <CheckCircle2 size={54} className="success-check-icon" />
            </div>
            <h3 className="success-title font-editorial">ALLOCATION CONFIRMED</h3>
            <p className="success-p">
              Thank you. Your bespoke single-batch allocation has been securely reserved. Our private concierge team will reach out with shipping tracking and certification.
            </p>
            <div className="success-seal-box glass-panel">
              <span className="seal-ref">RESERVATION REF: #VB-2026-088</span>
              <span className="seal-tag">VERIFIED BOTTLE ATELIER</span>
            </div>
            <button
              type="button"
              className="success-done-btn"
              onClick={handleClose}
            >
              Return to Experience
            </button>
          </div>
        ) : (
          /* Normal Cart Items View */
          <div className="drawer-body">
            {cartItems.length === 0 ? (
              <div className="drawer-empty-state">
                <Gift size={40} className="empty-icon" />
                <p className="empty-title font-editorial">No Allocations Reserved</p>
                <p className="empty-sub">
                  Explore our expressions and personalize your bottle with custom engraving.
                </p>
                <button
                  type="button"
                  className="empty-cta-btn"
                  onClick={handleClose}
                >
                  Explore Portfolio
                </button>
              </div>
            ) : (
              <>
                <div className="drawer-items-list">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.engraving}`} className="drawer-item-card glass-panel">
                      <div className="item-thumb-stage">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="item-thumb-img"
                        />
                      </div>

                      <div className="item-info">
                        <div className="item-top-row">
                          <h4 className="item-name font-editorial">{item.name}</h4>
                          <button
                            type="button"
                            className="item-remove-btn"
                            onClick={() => removeCartItem(item.id)}
                            aria-label="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <span className="item-expression-badge">{item.flavor}</span>

                        {item.engraving && (
                          <div className="item-engraving-pill">
                            <Sparkles size={11} />
                            <span>Engraving: "{item.engraving}"</span>
                          </div>
                        )}

                        {item.giftBox && (
                          <span className="item-gift-box-tag">
                            + Collector Velvet Box Included
                          </span>
                        )}

                        <div className="item-bottom-row">
                          <div className="item-qty-controls">
                            <button
                              type="button"
                              className="qty-mini-btn"
                              onClick={() => updateCartQty(item.id, -1)}
                            >
                              -
                            </button>
                            <span className="qty-val">{item.qty}</span>
                            <button
                              type="button"
                              className="qty-mini-btn"
                              onClick={() => updateCartQty(item.id, 1)}
                            >
                              +
                            </button>
                          </div>

                          <span className="item-price font-editorial">
                            ${item.price * item.qty} USD
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Concierge Gift Note Option */}
                <div className="drawer-gift-note-box glass-panel">
                  <label className="gift-note-label">
                    CONCIERGE GIFT NOTE (COMPLIMENTARY)
                  </label>
                  <input
                    type="text"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Add a personalized greeting for delivery..."
                    className="gift-note-input"
                    maxLength={90}
                  />
                </div>

                {/* Order Summary & Checkout */}
                <div className="drawer-footer">
                  <div className="summary-row">
                    <span className="sum-label">Subtotal</span>
                    <span className="sum-val font-editorial">${subtotal} USD</span>
                  </div>
                  <div className="summary-row">
                    <span className="sum-label">Bespoke Courier Shipping</span>
                    <span className="sum-val free">Complimentary</span>
                  </div>
                  <div className="summary-divider" />
                  <div className="summary-row total">
                    <span className="total-label">Total Allocation</span>
                    <span className="total-val font-editorial">${total} USD</span>
                  </div>

                  <button
                    type="button"
                    className="drawer-checkout-btn"
                    onClick={handleProceedCheckout}
                    disabled={isCheckingOut}
                    data-cursor-text="CONFIRM"
                  >
                    {isCheckingOut ? (
                      <span>Securing Allocation...</span>
                    ) : (
                      <>
                        <span>Secure Private Allocation</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="drawer-security-note">
                    <ShieldCheck size={14} className="sec-icon" />
                    <span>256-Bit Encrypted Concierge Checkout • Insured Dispatch</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};
