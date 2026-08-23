import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './Button.css';

export const Button = ({
  children,
  to = null,
  onClick = null,
  variant = 'primary', // 'primary' | 'secondary' | 'glass' | 'outline' | 'text'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon = null,
  showArrow = false,
  cursorText = 'CLICK',
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) => {
  const content = (
    <>
      <span className="btn-text">{children}</span>
      {icon && <span className="btn-icon">{icon}</span>}
      {showArrow && <ArrowUpRight size={16} className="btn-arrow-icon" />}
    </>
  );

  const buttonClasses = `vibe-btn vibe-btn-${variant} vibe-btn-${size} ${className}`;

  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        data-cursor-text={cursorText}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      data-cursor-text={cursorText}
      {...props}
    >
      {content}
    </button>
  );
};
