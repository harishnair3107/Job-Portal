import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Globe, User, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const decoded = JSON.parse(atob(payloadBase64));
        setRole(decoded.role);
      } catch (e) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
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
          {/* Links moved to dashboard as requested */}
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
        <button className="back-home" onClick={() => navigate(role === 'RECRUITERS' ? '/recruiter/dashboard' : '/job-seeker/dashboard')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Dashboard
        </button>
        {role !== 'RECRUITERS' && (
          <button className="profile-btn" onClick={() => navigate('/job-seeker/profile')}>
            <User size={18} />
          </button>
        )}
        <button className="profile-btn" onClick={handleLogout} style={{ marginLeft: '10px', backgroundColor: '#fee2e2', color: '#ef4444' }}>
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
