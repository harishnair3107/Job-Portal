import React from 'react';
import { Briefcase, Globe, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-container">
          <div className="logo-icon">
            <Briefcase size={20} color="#ffffff" />
          </div>
          <span className="logo-text">TalentPulse</span>
        </div>
        <div className="divider"></div>
        <div className="nav-links">
          <a href="#">Find Jobs</a>
          <a href="#">For Employers</a>
          <a href="#">Career Advice</a>
          <a href="#">Pricing</a>
        </div>
      </div>
      
      <div className="navbar-right">
        <button className="lang-select">
          <Globe size={16} />
          <span>EN / USD</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        <button className="back-home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </button>
        <button className="profile-btn">
          <User size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
