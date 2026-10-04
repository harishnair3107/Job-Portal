import React, { useState, useEffect } from 'react';
import { Briefcase, UserPlus, Users, CheckCircle2, MessageSquare, Plus, ExternalLink, MapPin, ChevronRight, CheckCircle, XCircle, X } from 'lucide-react';
import './Dashboards.css';

const RecruiterDashboard = () => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [recruiterInfo, setRecruiterInfo] = useState(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [selectedJobFilter, setSelectedJobFilter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/company`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const apps = await res.json();
          setApplications(apps);
        }
        
        // Fetch recruiter info
        const recRes = await fetch(`${import.meta.env.VITE_API_URL}/api/recruiters/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (recRes.ok) {
          const recData = await recRes.json();
          setRecruiterInfo(recData);
        }
        
        // Fetch active jobs from company directly
        const jobsRes = await fetch(`${import.meta.env.VITE_API_URL}/api/postings/company`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (jobsRes.ok) {
          const jobsData = await jobsRes.json();
          setActiveJobs(jobsData);
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/${id}/status`, {
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

  const [isPostingJob, setIsPostingJob] = useState(false);
  const [newJob, setNewJob] = useState({ role: '', jobDescription: '', jobRequirement: '', salary: '' });

  const handlePostJob = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      // Parse salary to number, or omit if empty, to prevent Java deserialization errors
      const jobData = { ...newJob };
      if (jobData.salary) {
        jobData.salary = parseFloat(jobData.salary);
      } else {
        jobData.salary = null;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/postings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });
      if (res.ok) {
        const postedJob = await res.json();
        setActiveJobs([postedJob, ...activeJobs]);
        setIsPostingJob(false);
        setNewJob({ role: '', jobDescription: '', jobRequirement: '', salary: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploadingLogo(true);
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('logo', file);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recruiters/me/company/logo`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        const updatedCompany = await res.json();
        setRecruiterInfo({...recruiterInfo, company: updatedCompany});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploadingLogo(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {recruiterInfo?.company?.logo ? (
          <div style={{ width: '60px', height: '60px', borderRadius: '8px', backgroundImage: `url(data:image/jpeg;base64,${recruiterInfo.company.logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        ) : (
          <div style={{ width: '60px', height: '60px', borderRadius: '8px', backgroundColor: 'var(--primary-blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-blue)', fontWeight: 'bold' }}>
            {recruiterInfo?.company?.companyName?.charAt(0) || 'C'}
          </div>
        )}
        <div className="dashboard-title" style={{ flex: 1 }}>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {recruiterInfo?.company?.companyName || 'Enterprise'} Talent Acquisition
            <label style={{ fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'var(--bg-card)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
              {isUploadingLogo ? 'Uploading...' : 'Update Logo'}
              <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleLogoUpload} disabled={isUploadingLogo} />
            </label>
          </h1>
          <p>Welcome back, {recruiterInfo?.name || 'Recruiter'} • Q1 Sourcing Portal</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline">Export Pipeline (CSV)</button>
          <button className="btn-primary" onClick={() => setIsPostingJob(true)}><Plus size={16}/> Post a New Job</button>
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
            <span>Total Postings</span>
            <Users size={16} />
          </div>
          <div className="metric-value">{activeJobs.length} <span className="metric-sub positive">Roles Published</span></div>
        </div>

        <div className="metric-card">
          <div className="metric-title">
            <span>Total Applicants</span>
            <UserPlus size={16} />
          </div>
          <div className="metric-value">{applications.length} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>candidates</span></div>
          <div className="metric-sub" style={{ marginTop: '0.5rem' }}>Pipeline Sourced</div>
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
          {selectedJobFilter && (
            <button className="btn-outline" onClick={() => setSelectedJobFilter(null)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Clear Filter</button>
          )}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {loading ? (
            <div style={{ padding: '2rem', color: 'var(--text-secondary)' }}>Loading your active requisitions...</div>
          ) : activeJobs.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', color: 'var(--text-secondary)' }}>
              No active postings yet. Click "Post a New Job" to get started!
            </div>
          ) : (
            activeJobs.map((job, idx) => (
              <div 
                key={job.postingId} 
                onClick={() => setSelectedJobFilter(job.postingId)}
                style={{ 
                  padding: '1rem', 
                  border: `1px solid ${selectedJobFilter === job.postingId ? 'var(--primary-blue)' : 'var(--border-color)'}`, 
                  borderRadius: '8px', 
                  backgroundColor: selectedJobFilter === job.postingId ? '#eff6ff' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', marginBottom: '0.5rem', fontWeight: 600 }}>
                  {job.company?.companyName} • Active
                </div>
                <h4 style={{ margin: '0 0 1rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{job.role}</h4>
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{applications.filter(a => a.posting?.postingId === job.postingId).length}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Applicants</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary-blue)', fontWeight: 500 }}>View Applicants →</span>
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
          {applications.filter(app => selectedJobFilter ? app.posting?.postingId === selectedJobFilter : true).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No applications found.</div>
          ) : applications.filter(app => selectedJobFilter ? app.posting?.postingId === selectedJobFilter : true).map(app => (
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
              <div className="candidate-actions" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <button 
                  className="btn-outline btn-hover-effect" 
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', color: '#ef4444', borderColor: '#ef4444', transition: 'all 0.3s' }}
                  onClick={() => handleStatusUpdate(app.applicationId, 'REJECTED')}
                >
                  <XCircle size={14}/> Reject
                </button>
                <button 
                  className="btn-primary btn-hover-effect" 
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', backgroundColor: 'var(--success-green)', transition: 'all 0.3s' }}
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
              <a href={`${import.meta.env.VITE_API_URL}${selectedProfile.resumeUrl}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-blue)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
                <ExternalLink size={14}/> View Attached Resume
              </a>
            )}
          </div>
        </div>
      )}

      {isPostingJob && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', width: '90%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setIsPostingJob(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} color="var(--text-secondary)" />
            </button>
            <h2 style={{ margin: '0 0 1rem 0' }}>Post a New Job</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Role Title</label>
                <input type="text" className="custom-input" value={newJob.role} onChange={(e) => setNewJob({...newJob, role: e.target.value})} placeholder="e.g. Senior Software Engineer" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}/>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Salary (Annual USD)</label>
                <input type="number" className="custom-input" value={newJob.salary} onChange={(e) => setNewJob({...newJob, salary: e.target.value})} placeholder="e.g. 150000" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}/>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Job Description</label>
                <textarea className="custom-textarea" rows="4" value={newJob.jobDescription} onChange={(e) => setNewJob({...newJob, jobDescription: e.target.value})} placeholder="Describe the responsibilities..." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', resize: 'vertical' }}></textarea>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Requirements (Comma Separated)</label>
                <input type="text" className="custom-input" value={newJob.jobRequirement} onChange={(e) => setNewJob({...newJob, jobRequirement: e.target.value})} placeholder="e.g. React, Java, AWS" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}/>
              </div>
              <button className="btn-primary" onClick={handlePostJob} style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '1rem' }}>Publish Job</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
