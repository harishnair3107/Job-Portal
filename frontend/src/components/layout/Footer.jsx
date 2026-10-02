import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        © 2025 TalentPulse Inc. All institutional rights reserved.
      </div>
      <div className="footer-right">
        <a href="#">Privacy Policy</a>
        <span className="dot">•</span>
        <a href="#">Terms of Service</a>
        <span className="dot">•</span>
        <a href="#">Help Desk</a>
      </div>
    </footer>
  );
};

export default Footer;
