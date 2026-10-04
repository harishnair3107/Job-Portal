import React from 'react';
import { Briefcase, ArrowRight, Mail, Globe, MessageCircle, Share2 } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-premium">
      <div className="footer-newsletter">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h3>Get top opportunities delivered.</h3>
            <p>Join 250,000+ professionals receiving curated enterprise tech roles weekly.</p>
          </div>
          <div className="newsletter-form">
            <div className="input-group">
              <Mail size={18} className="input-icon" />
              <input type="email" placeholder="Enter your email address" />
              <button className="btn-subscribe">
                Subscribe <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-brand-col">
          <div className="logo-container footer-logo">
            <div className="logo-icon-glow">
              <Briefcase size={24} color="#ffffff" />
            </div>
            <span className="logo-text-dark">TalentPulse</span>
          </div>
          <p className="brand-desc">
            The exclusive platform for tier-1 engineering and product talent. We connect industry leaders with world-class opportunities.
          </p>
          <div className="social-links-premium">
            <a href="#" aria-label="Website"><Globe size={18} /></a>
            <a href="#" aria-label="Contact"><Mail size={18} /></a>
            <a href="#" aria-label="Community"><MessageCircle size={18} /></a>
            <a href="#" aria-label="Share"><Share2 size={18} /></a>
          </div>
        </div>

        <div className="footer-links-wrapper">
          <div className="footer-link-group">
            <h4>For Talent</h4>
            <ul>
              <li><a href="#">Explore Jobs</a></li>
              <li><a href="#">Salary Calculator</a></li>
              <li><a href="#">Career Coaching</a></li>
              <li><a href="#">Resume AI Builder</a></li>
              <li><a href="#">Talent Community</a></li>
            </ul>
          </div>
          <div className="footer-link-group">
            <h4>For Employers</h4>
            <ul>
              <li><a href="#">Enterprise Sourcing</a></li>
              <li><a href="#">Post an Opportunity</a></li>
              <li><a href="#">Applicant Tracking</a></li>
              <li><a href="#">API Documentation</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>
          <div className="footer-link-group">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Leadership</a></li>
              <li><a href="#">Press & Media</a></li>
              <li><a href="#">Careers at TalentPulse</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom-premium">
        <div className="footer-bottom-content">
          <div className="copyright">
            © {new Date().getFullYear()} TalentPulse Technologies Inc. All rights reserved.
          </div>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Preferences</a>
            <a href="#">Trust & Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
