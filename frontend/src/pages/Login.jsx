import React, { useState } from 'react';
import { 
  TrendingUp, Lock, FastForward, Star, 
  ShieldCheck, CheckCircle2, Mail, Eye, EyeOff, ExternalLink, User
} from 'lucide-react';
import './Login.css';

const Login = () => {
  const [profileMode, setProfileMode] = useState('job-seeker');
  const [authMode, setAuthMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Left Marketing Section */}
        <div className="login-left">
          <div className="badge">
            <span className="badge-dot"></span>
            Next-Generation Talent Protocol
          </div>
          
          <h1 className="main-heading">
            Where Tier-1 Engineers & Tech Leaders Connect
          </h1>
          
          <p className="sub-heading">
            Skip generic recruitment funnels. TalentPulse algorithmically
            matches elite candidates with high-growth teams at market-
            leading packages.
          </p>

          <div className="stats-box">
            <div className="stat-item">
              <span className="stat-value">142k<span className="stat-plus">+</span></span>
              <span className="stat-label">Verified Roles</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">12,400<span className="stat-plus">+</span></span>
              <span className="stat-label">Hiring Teams</span>
            </div>
            <div className="stat-item">
              <span className="stat-value blue-text">98.4%</span>
              <span className="stat-label">Offer Accuracy</span>
            </div>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <TrendingUp size={18} className="feature-icon" />
              </div>
              <div className="feature-text">
                <h4>Neural Salary Benchmarking</h4>
                <p>Real-time localized base, equity, and variable compensation index updated hourly.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Lock size={18} className="feature-icon" />
              </div>
              <div className="feature-text">
                <h4>1-Click Confidential Stealth Mode</h4>
                <p>Safely evaluate top opportunities shielded entirely from your current employer.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <FastForward size={18} className="feature-icon" />
              </div>
              <div className="feature-text">
                <h4>Direct Sync & Fast-Track Rounds</h4>
                <p>Bypass recruiter gatekeepers straight to hiring Engineering VPs and Founders.</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#22c55e" color="#22c55e" />
              ))}
            </div>
            <p className="testimonial-quote">
              "TalentPulse cut our executive engineering hire timeline from 52 days down to just 9. The signal-to-noise ratio is completely unrivaled in enterprise tech."
            </p>
            <div className="testimonial-author">
              <div className="author-info">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" 
                  alt="Marcus Vance" 
                  className="author-avatar"
                />
                <div>
                  <h5 className="author-name">Marcus Vance</h5>
                  <p className="author-title">VP Engineering, ScaleCorp</p>
                </div>
              </div>
              <span className="verified-badge">VERIFIED PARTNER</span>
            </div>
          </div>

          <div className="trust-badges">
            <span className="trust-badge">
              <ShieldCheck size={14} color="#22c55e"/> SOC-2 Type II Certified
            </span>
            <span className="trust-badge">
              <Lock size={14} color="#22c55e"/> 256-bit SSL Standard
            </span>
            <span className="trust-badge">
              <CheckCircle2 size={14} color="#22c55e"/> GDPR Compliant
            </span>
          </div>
        </div>

        {/* Right Authentication Section */}
        <div className="login-right">
          <div className="auth-card">
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${authMode === 'signin' ? 'active' : ''}`}
                onClick={() => setAuthMode('signin')}
              >
                Sign In
              </button>
              <button 
                className={`auth-tab ${authMode === 'signup' ? 'active' : ''}`}
                onClick={() => setAuthMode('signup')}
              >
                Create Account
              </button>
            </div>

            <div className="auth-header">
              <h2>{authMode === 'signin' ? 'Welcome back to TalentPulse' : 'Join TalentPulse'}</h2>
              <p>Select your profile mode to access personalized job alerts & pipeline metrics.</p>
            </div>

            <div className="profile-toggle">
              <button 
                className={`toggle-btn ${profileMode === 'job-seeker' ? 'active' : ''}`}
                onClick={() => setProfileMode('job-seeker')}
              >
                Job Seeker
              </button>
              <button 
                className={`toggle-btn ${profileMode === 'employer' ? 'active' : ''}`}
                onClick={() => setProfileMode('employer')}
              >
                Employer / Recruiter
              </button>
            </div>

            <div className="social-login">
              <button className="social-btn">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="18" />
                Google
              </button>
              <button className="social-btn">
                <img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="LinkedIn" width="18" />
                LinkedIn
              </button>
              <button className="social-btn">
                <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" width="18" />
                GitHub
              </button>
            </div>

            <div className="divider-text">
              <span>or email credentials</span>
            </div>

            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              {authMode === 'signup' && (
                <div className="input-group">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="Alex Chen" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="input-group">
                <label>Work or Personal Email</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="alex.chen@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="password-header">
                  <label>Password</label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Stay authenticated for 30 days</span>
                </label>
                <a href="#" className="sso-link">
                  Enterprise SSO <ExternalLink size={14} />
                </a>
              </div>

              <button type="submit" className="submit-btn">
                {authMode === 'signin' ? 'Sign In to Dashboard' : 'Create Account'}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>

            <div className="auth-footer">
              {authMode === 'signin' ? (
                <>Don't have an active account yet? <a href="#" onClick={(e) => { e.preventDefault(); setAuthMode('signup'); }}>Register in 2 minutes</a></>
              ) : (
                <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setAuthMode('signin'); }}>Sign in here</a></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
