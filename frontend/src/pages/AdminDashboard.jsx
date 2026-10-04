import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Users, Briefcase, FileText, CheckCircle, Clock, Shield, Search, Download, Plus, LayoutDashboard, Settings } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [postings, setPostings] = useState([]);
  const [newCompany, setNewCompany] = useState({ companyName: '', companyCode: '', website: '', description: '' });
  
  const [analytics, setAnalytics] = useState({
    totalCompanies: 0,
    totalPostings: 0,
    totalUsers: 0,
    totalRecruiters: 0,
    totalJobSeekers: 0,
    totalApplications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/analytics`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setAnalytics(data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCompanies = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/companies`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setCompanies(data);
        }
      } catch (error) {
        console.error('Failed to fetch companies', error);
      }
    };
    
    const fetchRecruiters = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/recruiters`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setRecruiters(data);
        }
      } catch (error) {
        console.error('Failed to fetch recruiters', error);
      }
    };

    const fetchJobSeekers = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/job-seekers`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setJobSeekers(data);
        }
      } catch (error) {
        console.error('Failed to fetch job seekers', error);
      }
    };

    const fetchPostings = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/postings`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setPostings(data);
        }
      } catch (error) {
        console.error('Failed to fetch postings', error);
      }
    };
    
    fetchAnalytics();
    if (activeTab === 'companies') fetchCompanies();
    if (activeTab === 'recruiters') fetchRecruiters();
    if (activeTab === 'jobSeekers') fetchJobSeekers();
    if (activeTab === 'postings') fetchPostings();
  }, [navigate, activeTab]);

  const handleAddCompany = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/company`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCompany)
      });
      if (res.ok) {
        const addedCompany = await res.json();
        setCompanies([addedCompany, ...companies]);
        setShowAddCompany(false);
        setNewCompany({ companyName: '', companyCode: '', website: '', description: '' });
        
        // Update analytics locally
        setAnalytics(prev => ({
          ...prev,
          totalCompanies: prev.totalCompanies + 1
        }));
      }
    } catch (error) {
      console.error('Failed to add company', error);
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>TalentPulse</h2>
          <span className="badge-super-admin"><Shield size={12}/> SUPER ADMIN ROOT</span>
        </div>
        
        <nav className="sidebar-nav">
          <a href="#" className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}><LayoutDashboard size={18}/> Overview & KPIs</a>
          <a href="#" className={`nav-item ${activeTab === 'companies' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('companies'); }}><Building size={18}/> Companies & Enterprises</a>
          <a href="#" className={`nav-item ${activeTab === 'recruiters' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('recruiters'); }}><Briefcase size={18}/> Recruiters & Hiring Teams</a>
          <a href="#" className={`nav-item ${activeTab === 'jobSeekers' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('jobSeekers'); }}><Users size={18}/> Job Seekers & Talent</a>
          <a href="#" className={`nav-item ${activeTab === 'postings' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('postings'); }}><FileText size={18}/> Job Postings & Moderation</a>
          <a href="#" className="nav-item"><Settings size={18}/> System Settings</a>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-avatar">A</div>
            <div>
              <div className="admin-name">Super Admin</div>
              <div className="admin-role">Platform Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-search">
            <Search size={18} color="var(--text-muted)"/>
            <input type="text" placeholder="Search users, companies, postings, or audit logs..." />
          </div>
          
          <div className="header-actions">
            <button className="btn-outline"><Clock size={16}/> Last 30 Days</button>
            <button className="btn-primary" style={{ backgroundColor: '#ef4444', border: 'none' }}>System Alerts <span>2</span></button>
          </div>
        </header>

        <div className="admin-content">
          <div className="page-header">
            <div>
              <h1>
                {activeTab === 'overview' ? 'Platform Operations & Metric Intelligence' 
                 : activeTab === 'companies' ? 'Enterprise Management'
                 : activeTab === 'recruiters' ? 'Recruiter & Hiring Teams'
                 : activeTab === 'jobSeekers' ? 'Job Seekers & Talent Pool'
                 : 'Job Postings & Active Requisitions'}
              </h1>
              <p>
                {activeTab === 'overview' 
                  ? 'Live institutional metrics across registered enterprises, talent acquisition teams, verified candidates, and active requisitions.'
                  : activeTab === 'companies' 
                  ? 'Manage registered companies, monitor compliance, and add new enterprise partners to the platform.'
                  : activeTab === 'recruiters'
                  ? 'Monitor active hiring seats, view their associated companies, and track their posting volume.'
                  : activeTab === 'jobSeekers'
                  ? 'Manage candidate talent pool and view application volumes across the platform.'
                  : 'Monitor active job postings, application conversion rates, and role requisitions.'}
              </p>
            </div>
            <div className="header-buttons">
              {activeTab === 'overview' ? (
                <button className="btn-outline"><Download size={16}/> Download Audit CSV</button>
              ) : activeTab === 'companies' ? (
                <button className="btn-primary" onClick={() => setShowAddCompany(true)}><Plus size={16}/> Add Enterprise</button>
              ) : (
                <button className="btn-outline"><Download size={16}/> Export List</button>
              )}
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '2rem' }}>Loading platform intelligence...</div>
          ) : activeTab === 'overview' ? (
            <>
              {/* KPIs */}
              <div className="kpi-grid">
                <div className="kpi-card">
                  <div className="kpi-header">
                    <h3>REGISTERED ENTERPRISES</h3>
                    <div className="kpi-icon blue"><Building size={20}/></div>
                  </div>
                  <div className="kpi-value">{analytics.totalCompanies.toLocaleString()}</div>
                  <div className="kpi-trend positive">+12.4% <span className="trend-label">(+ 142 this month)</span></div>
                  <div className="kpi-footer">
                    <div>Enterprise Tier: <br/><strong>{Math.floor(analytics.totalCompanies * 0.2)}</strong></div>
                    <div style={{ textAlign: 'right' }}>Scale-ups: <br/><strong>{Math.floor(analytics.totalCompanies * 0.8)}</strong></div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-header">
                    <h3>RECRUITERS & HIRING SEATS</h3>
                    <div className="kpi-icon green"><Briefcase size={20}/></div>
                  </div>
                  <div className="kpi-value">{analytics.totalRecruiters.toLocaleString()}</div>
                  <div className="kpi-trend positive">+18.2% <span className="trend-label">(+ 820 active seats)</span></div>
                  <div className="kpi-footer">
                    <div>Enterprise: <br/><strong>{Math.floor(analytics.totalRecruiters * 0.6)}</strong></div>
                    <div style={{ textAlign: 'right' }}>Agencies: <br/><strong>{Math.floor(analytics.totalRecruiters * 0.4)}</strong></div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-header">
                    <h3>CANDIDATE TALENT POOL</h3>
                    <div className="kpi-icon purple"><Users size={20}/></div>
                  </div>
                  <div className="kpi-value">{analytics.totalJobSeekers.toLocaleString()}</div>
                  <div className="kpi-trend positive">+34.5% <span className="trend-label">(+ 51.2k candidates)</span></div>
                  <div className="kpi-footer">
                    <div>Tier-1: <br/><strong>{Math.floor(analytics.totalJobSeekers * 0.3)}</strong></div>
                    <div style={{ textAlign: 'right' }}>Stealth: <br/><strong>{Math.floor(analytics.totalJobSeekers * 0.5)}</strong></div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-header">
                    <h3>ACTIVE REQUISITIONS</h3>
                    <div className="kpi-icon orange"><FileText size={20}/></div>
                  </div>
                  <div className="kpi-value">{analytics.totalPostings.toLocaleString()}</div>
                  <div className="kpi-trend positive">+8.8% <span className="trend-label">(+ 3,120 live openings)</span></div>
                  <div className="kpi-footer">
                    <div>Live: <br/><strong>{Math.floor(analytics.totalPostings * 0.9)}</strong></div>
                    <div style={{ textAlign: 'right' }}>In Review: <br/><strong>{Math.floor(analytics.totalPostings * 0.1)}</strong></div>
                  </div>
                </div>
              </div>

              {/* Charts and secondary metrics */}
              <div className="dashboard-row">
                <div className="growth-chart-card">
                  <h3>Ecosystem Growth & Posting Velocity</h3>
                  <p className="card-subtitle">Comparing aggregate candidate onboarding vs active posting ingestion over 6 quarters</p>
                  
                  <div className="mock-chart">
                    {/* CSS mock line chart */}
                    <div className="chart-grid"></div>
                    <div className="chart-line candidates-line"></div>
                    <div className="chart-line postings-line"></div>
                  </div>

                  <div className="chart-metrics-row">
                    <div className="metric-box">
                      <div className="metric-title">Avg Time to Hire (TTH)</div>
                      <div className="metric-value-lg blue-text">18.4 <span>days</span></div>
                      <div className="metric-sub">56% faster than IAM baseline</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-title">Algorithmic Match Accuracy</div>
                      <div className="metric-value-lg">98.4%</div>
                      <div className="metric-sub">Based on candidate technical reviews</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-title">Application-to-Screen Rate</div>
                      <div className="metric-value-lg">32.8%</div>
                      <div className="metric-sub">+ 4.2% qualified conversion</div>
                    </div>
                  </div>
                </div>

                <div className="trust-card">
                  <div className="trust-header">
                    <h3><Shield size={20} color="var(--primary-blue)"/> Trust & Verification</h3>
                    <span className="badge-kyc">Strict KYC</span>
                  </div>
                  <p className="card-subtitle">Integrity telemetry monitoring identity spoofing, duplicate recruiters, and unauthorized scrapers.</p>
                  
                  <div className="trust-metrics">
                    <div className="trust-row">
                      <span>Verified Talent Rate (GitHub/LinkedIn)</span>
                      <strong>78.4%</strong>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: '78.4%' }}></div></div>

                    <div className="trust-row" style={{ marginTop: '1rem' }}>
                      <span>Enterprise KYC Compliance</span>
                      <strong style={{ color: 'var(--success-green)' }}>99.2%</strong>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: '99.2%', backgroundColor: 'var(--success-green)' }}></div></div>

                    <div className="trust-row" style={{ marginTop: '1rem' }}>
                      <span>Job Quality & Spam Shield</span>
                      <strong>99.8% Clean</strong>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: '99.8%' }}></div></div>
                  </div>

                  <div className="sla-box">
                    <div className="sla-icon"><Clock size={20} color="var(--primary-blue)"/></div>
                    <div>
                      <div className="sla-title">Recruiter Inbound SLA</div>
                      <div className="sla-sub">Avg candidate response rate</div>
                    </div>
                    <div className="sla-value">3.2hrs <span>vs 24hr benchmark</span></div>
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === 'companies' ? (
            <>
              {/* Companies Tab KPIs */}
              <div className="kpi-grid" style={{ marginBottom: '2rem' }}>
                <div className="kpi-card">
                  <div className="kpi-header">
                    <h3>TOTAL ENTERPRISES</h3>
                    <div className="kpi-icon blue"><Building size={20}/></div>
                  </div>
                  <div className="kpi-value">{companies.length.toLocaleString()}</div>
                  <div className="kpi-trend positive">Live and verified</div>
                </div>
              </div>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Company Code</th>
                      <th>Enterprise Name</th>
                      <th>Website</th>
                      <th>Recruiters Enrolled</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map(company => (
                      <tr key={company.companyId}>
                        <td><span className="badge-kyc">{company.companyCode}</span></td>
                        <td style={{ fontWeight: 600 }}>{company.companyName}</td>
                        <td><a href={company.website} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-blue)' }}>{company.website}</a></td>
                        <td><strong style={{ color: 'var(--primary-blue)' }}>{company.recruitersCount}</strong> accounts</td>
                        <td><span style={{ color: 'var(--success-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={14}/> Active</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : activeTab === 'recruiters' ? (
            <>
              {/* Recruiters Tab KPIs */}
              <div className="kpi-grid" style={{ marginBottom: '2rem' }}>
                <div className="kpi-card">
                  <div className="kpi-header">
                    <h3>ACTIVE RECRUITERS</h3>
                    <div className="kpi-icon green"><Briefcase size={20}/></div>
                  </div>
                  <div className="kpi-value">{recruiters.length.toLocaleString()}</div>
                  <div className="kpi-trend positive">Across all enterprises</div>
                </div>
              </div>
              <div className="admin-table-container">
                <table className="admin-table">
                <thead>
                  <tr>
                    <th>Recruiter Name</th>
                    <th>Email Address</th>
                    <th>Enterprise / Company</th>
                    <th>Postings Uploaded</th>
                  </tr>
                </thead>
                <tbody>
                  {recruiters.map(recruiter => (
                    <tr key={recruiter.recruiterId}>
                      <td style={{ fontWeight: 600 }}>{recruiter.name}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{recruiter.email}</td>
                      <td><span className="badge-kyc" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>{recruiter.companyName}</span></td>
                      <td><strong style={{ color: 'var(--primary-blue)' }}>{recruiter.postingsCount}</strong> active</td>
                    </tr>
                  ))}
                  {recruiters.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No recruiters found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            </>
          ) : activeTab === 'jobSeekers' ? (
            <>
              {/* Job Seekers Tab KPIs */}
              <div className="kpi-grid" style={{ marginBottom: '2rem' }}>
                <div className="kpi-card">
                  <div className="kpi-header">
                    <h3>TOTAL TALENT POOL</h3>
                    <div className="kpi-icon purple"><Users size={20}/></div>
                  </div>
                  <div className="kpi-value">{jobSeekers.length.toLocaleString()}</div>
                  <div className="kpi-trend positive">Registered candidates</div>
                </div>
              </div>
              <div className="admin-table-container">
                <table className="admin-table">
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Email Address</th>
                    <th>Total Applications Sent</th>
                    <th>Account Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobSeekers.map(candidate => (
                    <tr key={candidate.id}>
                      <td style={{ fontWeight: 600 }}>{candidate.name}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{candidate.email}</td>
                      <td><strong style={{ color: 'var(--primary-blue)' }}>{candidate.applicationsCount}</strong> applications</td>
                      <td><span style={{ color: 'var(--success-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={14}/> Verified</span></td>
                    </tr>
                  ))}
                  {jobSeekers.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No candidates found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            </>
          ) : activeTab === 'postings' ? (
            <>
              {/* Postings Tab KPIs */}
              <div className="kpi-grid" style={{ marginBottom: '2rem' }}>
                <div className="kpi-card">
                  <div className="kpi-header">
                    <h3>LIVE POSTINGS</h3>
                    <div className="kpi-icon orange"><FileText size={20}/></div>
                  </div>
                  <div className="kpi-value">{postings.length.toLocaleString()}</div>
                  <div className="kpi-trend positive">Active market requisitions</div>
                </div>
              </div>
              <div className="admin-table-container">
                <table className="admin-table">
                <thead>
                  <tr>
                    <th>Role / Title</th>
                    <th>Enterprise</th>
                    <th>Salary</th>
                    <th>Total Applicants</th>
                  </tr>
                </thead>
                <tbody>
                  {postings.map(post => (
                    <tr key={post.postingId}>
                      <td style={{ fontWeight: 600 }}>{post.role}</td>
                      <td><span className="badge-kyc" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>{post.companyName}</span></td>
                      <td style={{ color: 'var(--success-green)', fontWeight: 600 }}>${post.salary?.toLocaleString() ?? 'N/A'}</td>
                      <td><strong style={{ color: 'var(--primary-blue)' }}>{post.applicantCount}</strong> talent applied</td>
                    </tr>
                  ))}
                  {postings.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No active postings found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            </>
          ) : (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Module under construction.
            </div>
          )}
        </div>
      </main>

      {/* Add Company Modal */}
      {showAddCompany && (
        <div className="admin-modal-overlay">
          <div className="admin-modal fade-in">
            <h2>Register New Enterprise</h2>
            <form onSubmit={handleAddCompany}>
              <div className="admin-form-group">
                <label>Company Name *</label>
                <input 
                  type="text" 
                  value={newCompany.companyName} 
                  onChange={(e) => setNewCompany({...newCompany, companyName: e.target.value})} 
                  required 
                />
              </div>
              <div className="admin-form-group">
                <label>Company Code *</label>
                <input 
                  type="text" 
                  value={newCompany.companyCode} 
                  onChange={(e) => setNewCompany({...newCompany, companyCode: e.target.value})} 
                  placeholder="e.g. COMP001"
                  required 
                />
              </div>
              <div className="admin-form-group">
                <label>Website URL</label>
                <input 
                  type="url" 
                  value={newCompany.website} 
                  onChange={(e) => setNewCompany({...newCompany, website: e.target.value})} 
                  placeholder="https://"
                />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea 
                  value={newCompany.description} 
                  onChange={(e) => setNewCompany({...newCompany, description: e.target.value})} 
                />
              </div>
              <div className="admin-modal-actions">
                <button type="button" className="btn-outline" onClick={() => setShowAddCompany(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Register Enterprise</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
