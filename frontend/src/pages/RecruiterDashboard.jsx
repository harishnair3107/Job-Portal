import React, { useState, useEffect } from 'react';
import { Briefcase, UserPlus, Users, CheckCircle2, MessageSquare, Plus, ExternalLink, MapPin, ChevronRight, CheckCircle, XCircle, X } from 'lucide-react';
import './Dashboards.css';

const RecruiterDashboard = () => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch('http://localhost:8080/api/applications/company', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const apps = await res.json();
          setApplications(apps);
          
          // Derive unique jobs from applications
          const jobsMap = new Map();
          apps.forEach(app => {
            if (app.posting && !jobsMap.has(app.posting.postingId)) {
              jobsMap.set(app.posting.postingId, app.posting);
            }
          });
          setActiveJobs(Array.from(jobsMap.values()));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:8080/api/applications/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setApplications(apps => apps.map(app => app.applicationId === id ? { ...app, applicationStatus: status } : app));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Enterprise Talent Acquisition</h1>
          <p>Q1 Sourcing Portal • High-affinity technical search and pipeline progression</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline">Export Pipeline (CSV)</button>
          <button className="btn-primary"><Plus size={16}/> Post a New Job</button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-title">
            <span>Active Openings</span>
            <Briefcase size={16} />
          </div>
          <div className="metric-value">8 <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>roles active</span></div>
          <div className="metric-sub" style={{ marginTop: '0.5rem', color: 'var(--warning-orange)' }}>3 Urgent Priority</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-title">
            <span>Total Sourced</span>
            <Users size={16} />
          </div>
          <div className="metric-value">1,420 <span className="metric-sub positive">+34 today</span></div>
        </div>

        <div className="metric-card">
          <div className="metric-title">
            <span>In Active Pipeline</span>
            <UserPlus size={16} />
          </div>
          <div className="metric-value">86 <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>candidates</span></div>
          <div className="metric-sub" style={{ marginTop: '0.5rem' }}>32 in Technical Screen</div>
        </div>

        <div className="metric-card">
          <div className="metric-title">
            <span>Offer Acceptance</span>
            <CheckCircle2 size={16} />
          </div>
          <div className="metric-value">88.5% <span className="metric-sub positive">+4.2% QoQ</span></div>
        </div>
      </div>

      <div className="section-container">
        <div className="section-header">
          <div>
            <h3>Active Job Postings Manager</h3>
            <div className="section-subtitle">Real-time status of requisition funnels and candidate volume</div>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary-blue)', fontWeight: 600 }}>3 Priority Views</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {loading ? (
            <div style={{ padding: '2rem', color: 'var(--text-secondary)' }}>Loading your active requisitions...</div>
          ) : (
            activeJobs.map((job, idx) => (
              <div key={job.postingId} style={{ padding: '1rem', border: `1px solid ${idx === 2 ? '#fecaca' : 'var(--border-color)'}`, borderRadius: '8px', backgroundColor: idx === 2 ? '#fff5f5' : 'white' }}>
                <div style={{ fontSize: '0.75rem', color: idx === 2 ? '#ef4444' : 'var(--primary-blue)', marginBottom: '0.5rem', fontWeight: 600 }}>
                  {job.company?.companyName} • {idx === 2 ? 'Urgent Priority' : 'Active'}
                </div>
                <h4 style={{ margin: '0 0 1rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{job.role}</h4>
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{Math.floor(Math.random() * 50) + 10}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Applicants</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success-green)' }}>{Math.floor(Math.random() * 10) + 2}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Top Match (90%+)</div>
                  </div>
                </div>
                <a href="#" style={{ fontSize: '0.85rem', color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: 500 }}>View Pipeline →</a>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="section-container">
        <div className="section-header">
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Active Applicants Review <span className="match-badge">Live Applications</span></h3>
            <div className="section-subtitle">Review, interview, and manage talent pipeline across your active requisitions.</div>
          </div>
        </div>

        <div className="candidate-list">
          {applications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No applications received yet.</div>
          ) : applications.map(app => (
            <div className="candidate-card" key={app.applicationId}>
              <div className="candidate-avatar" style={{ backgroundColor: 'var(--primary-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600 }}>
                {app.jobSeeker?.name?.charAt(0) || 'U'}
              </div>
              <div className="candidate-info">
                <h4 className="candidate-name">{app.jobSeeker?.name || 'Unknown Candidate'}</h4>
                <div className="candidate-details">Applied for: <span style={{ fontWeight: 600 }}>{app.posting?.role}</span></div>
                <div className="candidate-details" style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ backgroundColor: 'var(--primary-blue-light)', color: 'var(--primary-blue)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                    Status: {app.applicationStatus}
                  </span>
                  <span style={{ fontSize: '0.8rem' }}><CheckCircle2 size={12}/> Profile Complete</span>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginRight: '2rem' }}>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>
                  <button className="btn-outline" onClick={() => setSelectedProfile(app.jobSeeker)} style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>View Profile</button>
                </div>
              </div>
              <div className="candidate-actions">
                <button 
                  className="btn-outline" 
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', color: '#ef4444', borderColor: '#ef4444' }}
                  onClick={() => handleStatusUpdate(app.applicationId, 'REJECTED')}
                >
                  <XCircle size={14}/> Reject
                </button>
                <button 
                  className="btn-primary" 
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', backgroundColor: 'var(--success-green)' }}
                  onClick={() => handleStatusUpdate(app.applicationId, 'HIRED')}
                >
                  <CheckCircle size={14}/> Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProfile && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', width: '90%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setSelectedProfile(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} color="var(--text-secondary)" />
            </button>
            <h2 style={{ margin: '0 0 0.5rem 0' }}>{selectedProfile.name}'s Profile</h2>
            
            <div style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Summary</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{selectedProfile.profileSummary || 'No summary provided.'}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Education</h4>
              {selectedProfile.educationList && selectedProfile.educationList.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {selectedProfile.educationList.map((edu, idx) => (
                    <li key={idx}>{edu.degree} from {edu.university}</li>
                  ))}
                </ul>
              ) : <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No education listed.</p>}
            </div>

            {selectedProfile.resumeUrl && (
              <a href={`http://localhost:8080${selectedProfile.resumeUrl}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-blue)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
                <ExternalLink size={14}/> View Attached Resume
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
