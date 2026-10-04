import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Lock, FastForward, Star, 
  ShieldCheck, CheckCircle2, Mail, Eye, EyeOff, ExternalLink, User, Building
} from 'lucide-react';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [profileMode, setProfileMode] = useState('job-seeker');
  const [authMode, setAuthMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [companyCode, setCompanyCode] = useState('');
  const [fetchedCompanyName, setFetchedCompanyName] = useState('');
  const [isFetchingCompany, setIsFetchingCompany] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Clear messages and input fields when switching tabs
  const handleAuthModeSwitch = (mode) => {
    setAuthMode(mode);
    setErrorMsg('');
    setSuccessMsg('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCompanyCode('');
  };

  useEffect(() => {
    if (authMode === 'signup' && profileMode === 'recruiter' && companyCode.length >= 3) {
      const fetchCompany = async () => {
        setIsFetchingCompany(true);
        const baseUrl = `${import.meta.env.VITE_API_URL}/api`;
        try {
          const res = await fetch(`${baseUrl}/companies/code/${companyCode}`);
          if (res.ok) {
            const data = await res.json();
            setFetchedCompanyName(data.companyName);
          } else {
            setFetchedCompanyName('');
          }
        } catch (err) {
          setFetchedCompanyName('');
        }
        setIsFetchingCompany(false);
      };

      const timeoutId = setTimeout(fetchCompany, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setFetchedCompanyName('');
    }
  }, [companyCode, authMode, profileMode]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const baseUrl = `${import.meta.env.VITE_API_URL}/api`;
    
    if (authMode === 'signup') {
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match");
        return;
      }

      const endpoint = profileMode === 'recruiter' ? '/auth/register/recruiter' : '/auth/register/job-seeker';
      
      const payload = {
        name,
        email,
        password,
      };

      if (profileMode === 'recruiter') {
        payload.companyCode = companyCode;
      }

      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setSuccessMsg('Registration successful! Please sign in.');
          setAuthMode('signin');
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setCompanyCode('');
        } else {
          const errorData = await response.json().catch(() => null);
          setErrorMsg(errorData?.message || errorData?.error || 'Registration failed. Please try again.');
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setErrorMsg("An error occurred during registration. Please check your connection.");
      }
    } else {
      try {
        const response = await fetch(`${baseUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.token) {
            localStorage.setItem('token', data.token);
            try {
              const payloadBase64 = data.token.split('.')[1];
              const decoded = JSON.parse(atob(payloadBase64));
              const role = decoded.role;
              setSuccessMsg('Sign in successful!');
              
              if (role === 'ADMIN') {
                navigate('/admin');
              } else if (role === 'RECRUITERS') {
                navigate('/recruiter/dashboard');
              } else {
                navigate('/job-seeker/dashboard');
              }
            } catch (e) {
              setSuccessMsg('Sign in successful!');
              navigate('/job-seeker/dashboard');
            }
          }
        } else {
          const errorData = await response.json().catch(() => null);
          setErrorMsg(errorData?.message || errorData?.error || 'Invalid credentials');
        }
      } catch (error) {
        console.error("Error during sign in:", error);
        setErrorMsg("An error occurred during sign in. Please check your connection.");
      }
    }
  };

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
                onClick={() => handleAuthModeSwitch('signin')}
              >
                Sign In
              </button>
              <button 
                className={`auth-tab ${authMode === 'signup' ? 'active' : ''}`}
                onClick={() => handleAuthModeSwitch('signup')}
              >
                Create Account
              </button>
            </div>

            {errorMsg && (
              <div className="custom-alert alert-error">
                <ShieldCheck size={18} />
                <span>{errorMsg}</span>
              </div>
            )}
            
            {successMsg && (
              <div className="custom-alert alert-success">
                <CheckCircle2 size={18} />
                <span>{successMsg}</span>
              </div>
            )}

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
                className={`toggle-btn ${profileMode === 'recruiter' ? 'active' : ''}`}
                onClick={() => setProfileMode('recruiter')}
              >
                Recruiter
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

            <form className="auth-form" onSubmit={handleAuthSubmit}>
              {authMode === 'signup' && (
                <div className="input-group">
                  <label>Full Name *</label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="Alex Chen" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {authMode === 'signup' && profileMode === 'recruiter' && (
                <div className="input-group">
                  <label>Company Code *</label>
                  <div className="input-wrapper">
                    <Building size={18} className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="e.g. COMP001" 
                      value={companyCode}
                      onChange={(e) => setCompanyCode(e.target.value)}
                      required
                    />
                  </div>
                  {isFetchingCompany && <small style={{ color: 'var(--text-muted)' }}>Searching...</small>}
                  {fetchedCompanyName && (
                    <div className="input-wrapper" style={{ marginTop: '0.5rem' }}>
                      <Building size={18} className="input-icon" style={{ opacity: 0.5 }} />
                      <input 
                        type="text" 
                        value={fetchedCompanyName}
                        disabled
                        style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)' }}
                      />
                    </div>
                  )}
                  {!isFetchingCompany && companyCode.length >= 3 && !fetchedCompanyName && (
                    <small style={{ color: 'red' }}>Company not found.</small>
                  )}
                </div>
              )}

              <div className="input-group">
                <label>
                  {authMode === 'signup' 
                    ? (profileMode === 'recruiter' ? 'Work Email *' : 'Email *') 
                    : 'Email'
                  }
                </label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="alex.chen@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="password-header">
                  <label>
                    {authMode === 'signup' ? 'Password *' : 'Password'}
                  </label>
                  {authMode === 'signin' && <a href="#" className="forgot-link">Forgot password?</a>}
                </div>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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

              {authMode === 'signup' && (
                <div className="input-group">
                  <label>Confirm Password *</label>
                  <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder="••••••••••••" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="eye-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

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
                <>Don't have an active account yet? <a href="#" onClick={(e) => { e.preventDefault(); handleAuthModeSwitch('signup'); }}>Register in 2 minutes</a></>
              ) : (
                <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); handleAuthModeSwitch('signin'); }}>Sign in here</a></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
