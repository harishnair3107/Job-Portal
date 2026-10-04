import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Building, CheckCircle2, ChevronRight, Zap, Clock, CheckCircle, XCircle } from 'lucide-react';
import './Dashboards.css';
import JobModal from '../components/JobModal';
import { getLocationForJob } from '../utils/locationHelper';

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal state
  const [selectedJob, setSelectedJob] = useState(null);

  // Tabs state
  const [activeTab, setActiveTab] = useState('feed');
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch('http://localhost:8080/api/job-seekers/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUserName(data.name || 'Job Seeker');
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/postings');
        if (res.ok) {
          const data = await res.json();
          setPostings(data);
        }
      } catch (err) {
        console.error("Error fetching postings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPostings();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="section-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ backgroundColor: 'var(--primary-blue-light)', color: 'var(--primary-blue)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>Top 5% Candidate Pool</span>
          </h2>
          <h1 style={{ margin: 0, fontSize: '1.75rem' }}>Welcome back, {userName || 'Job Seeker'}! Complete your profile to reach 100%</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Unlock priority Tier-1 recruiter inbound requests, verified salary unlocks, and automated 1-click referrals.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-outline" onClick={() => navigate('/job-seeker/search/jobs')}>🔍 Advanced Job Search</button>
          <button className="btn-primary" onClick={() => navigate('/job-seeker/profile')}>Finish Profile <ChevronRight size={16} /></button>
        </div>
      </div>

      <div className="job-seeker-layout" style={{ gridTemplateColumns: '1fr' }}>
        <div className="main-feed">
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button className={activeTab === 'feed' ? 'btn-primary' : 'btn-outline'} onClick={() => setActiveTab('feed')} style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}>All Opportunities ({postings.length})</button>
            <button className={activeTab === 'apps' ? 'btn-primary' : 'btn-outline'} onClick={() => {
              setActiveTab('apps');
              const fetchApps = async () => {
                const token = localStorage.getItem('token');
                if(!token) return;
                try {
                  const res = await fetch('http://localhost:8080/api/applications/me', { headers: { 'Authorization': `Bearer ${token}` }});
                  if(res.ok) setApplications(await res.json());
                } catch(err) { console.error(err); }
              };
              fetchApps();
            }} style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}>My Applications</button>
          </div>

          {activeTab === 'feed' && (
            loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading postings...</div>
          ) : postings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <h3>None</h3>
              <p>No job postings available at this time.</p>
            </div>
          ) : (
            <>
              {postings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((posting) => (
                <div className="job-card" key={posting.postingId}>
                  <div className="job-card-header">
                    <div>
                      <h3 className="job-title">{posting.role} <span className="match-badge" style={{ marginLeft: '0.5rem' }}>98% Match</span></h3>
                      <div className="job-company">
                        <Building size={14} /> {posting.company?.companyName}
                        <MapPin size={14} style={{ marginLeft: '0.5rem' }} /> {getLocationForJob(posting.postingId)}
                      </div>
                    </div>
                  </div>
                  <div className="salary-range">
                    $250k - $300k <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 400 }}>+ Equity</span>
                  </div>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <li>{posting.jobDescription}</li>
                  </ul>
                  <div className="skills-list">
                    {posting.jobRequirement?.split(',').map((req, idx) => (
                      <span className="skill-tag" key={idx}><CheckCircle2 size={12} /> {req.trim()}</span>
                    ))}
                  </div>
                  <div className="job-card-footer">
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><Briefcase size={14} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }}/> Pre-attached: Profile Ready</span>
                    <button className="btn-primary" onClick={() => setSelectedJob(posting)}><Zap size={14} /> 1-Click Apply</button>
                  </div>
                </div>
              ))}
              
              {/* Pagination Controls */}
              {Math.ceil(postings.length / itemsPerPage) > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
                  <button 
                    className="btn-outline" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  >
                    Previous
                  </button>
                  <span style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Page {currentPage} of {Math.ceil(postings.length / itemsPerPage)}
                  </span>
                  <button 
                    className="btn-outline" 
                    disabled={currentPage === Math.ceil(postings.length / itemsPerPage)}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )
        )}

        {activeTab === 'apps' && (
            applications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <h3>No Applications Yet</h3>
                <p>You haven't applied to any jobs. Explore opportunities!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {applications.map(app => (
                  <div key={app.applicationId} className="job-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{app.posting?.role}</h3>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem' }}>
                        <span><Building size={12} style={{ verticalAlign: 'middle' }}/> {app.posting?.company?.companyName}</span>
                        <span><MapPin size={12} style={{ verticalAlign: 'middle' }}/> {getLocationForJob(app.posting?.postingId)}</span>
                      </div>
                    </div>
                    <div>
                      {app.applicationStatus === 'APPLIED' && <span className="badge-progress" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={12}/> Pending Review</span>}
                      {app.applicationStatus === 'HIRED' && <span className="badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={12}/> Hired</span>}
                      {app.applicationStatus === 'REJECTED' && <span className="badge-error" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}><XCircle size={12}/> Rejected</span>}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
      {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
};

export default JobSeekerDashboard;
