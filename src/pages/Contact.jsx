import React, { useState } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { Mail, Instagram, Facebook, Send, CheckCircle2, MapPin, Clock, Shield } from 'lucide-react';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email format.';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 600);
    }
  };

  return (
    <div className="contact-page-root">
      {/* 1. Contact Hero */}
      <section className="contact-hero-section section">
        <div className="container contact-hero-container">
          <div className="badge-pill">
            <span className="badge-dot" />
            <span>VIP & CONCIERGE</span>
          </div>

          <h1 className="contact-hero-title font-editorial">
            LET'S CONNECT
          </h1>

          <p className="contact-hero-subtitle font-display">
            Private Inquiries
          </p>

          <p className="contact-hero-lead">
            For private cellar allocations, venue partnerships, press relations, and bespoke tasting experiences.
          </p>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="contact-form-section section">
        <div className="container contact-main-grid">
          {/* Left Column: Direct Concierge Info */}
          <div className="contact-info-column glass-panel">
            <h2 className="info-title font-editorial">Direct Concierge</h2>
            <p className="info-desc">
              Our hospitality team accommodates inquiries regarding private event allocations and curated lounge listings.
            </p>

            <div className="info-details-list">
              <div className="info-item">
                <Mail className="info-icon" size={20} />
                <div>
                  <span className="info-item-label">Concierge Email</span>
                  <a href="mailto:concierge@vibedrink.com" className="info-item-val">
                    concierge@vibedrink.com
                  </a>
                </div>
              </div>

              <div className="info-item">
                <Clock className="info-icon" size={20} />
                <div>
                  <span className="info-item-label">Concierge Hours</span>
                  <p className="info-item-val">Mon – Fri: 10:00 – 19:00 CET</p>
                </div>
              </div>

              <div className="info-item">
                <Shield className="info-icon" size={20} />
                <div>
                  <span className="info-item-label">Private Allocations</span>
                  <p className="info-item-val">Direct bottle reserves upon confirmation</p>
                </div>
              </div>
            </div>

            <div className="contact-socials-block">
              <span className="socials-label">Follow The VIBE</span>
              <div className="contact-social-icons">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="Instagram"
                  data-cursor-text="INSTA"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="Facebook"
                  data-cursor-text="FB"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="TikTok"
                  data-cursor-text="TIKTOK"
                >
                  <span className="tiktok-text font-nav">TT</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-column glass-panel">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-header">
                  <h3 className="form-title font-editorial">Send an Inquiry</h3>
                  <span className="form-subtitle">We reply within 24 business hours.</span>
                </div>

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Lin"
                    className={`form-input ${errors.name ? 'has-error' : ''}`}
                    required
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. maya@example.com"
                    className={`form-input ${errors.email ? 'has-error' : ''}`}
                    required
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Inquiry Type
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input form-select"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Private Allocation">Private Allocation Reserve</option>
                    <option value="Hospitality & Venue Listing">Hospitality & Venue Listing</option>
                    <option value="Press & Media Relations">Press & Media Relations</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message <span className="req">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your inquiry or event..."
                    className={`form-input form-textarea ${errors.message ? 'has-error' : ''}`}
                    required
                  />
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-submit-btn"
                  data-cursor-text="SEND"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Transmitting...' : 'SEND MESSAGE'}</span>
                </button>
              </form>
            ) : (
              <div className="form-success-state">
                <CheckCircle2 size={54} className="success-icon" />
                <h3 className="success-title font-editorial">
                  Thanks — your message has been received.
                </h3>
                <p className="success-desc">
                  Our concierge team has received your details and will respond promptly to {formData.email}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="form-reset-btn"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
