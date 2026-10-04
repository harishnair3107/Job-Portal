import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, CheckCircle2, Zap, Briefcase, Filter } from 'lucide-react';
import JobModal from '../components/JobModal';
import { getLocationForJob } from '../utils/locationHelper';
import './Dashboards.css';

const FindJobs = () => {
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal state
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/postings`);
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

  // Filter postings based on search terms
  const filteredPostings = postings.filter(job => {
    const roleStr = job.role || '';
    const companyStr = job.company?.companyName || '';
    const searchLower = searchTerm.toLowerCase();
    const locLower = locationTerm.toLowerCase();

    const roleMatch = roleStr.toLowerCase().includes(searchLower) || 
                      companyStr.toLowerCase().includes(searchLower);
    
    const jobLoc = getLocationForJob(job.postingId).toLowerCase();
    const locationMatch = locLower === '' || jobLoc.includes(locLower);
    
    return roleMatch && locationMatch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPostings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPostings.length / itemsPerPage);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, locationTerm]);

  return (
    <div className="dashboard-container" style={{ maxWidth: '1200px' }}>
      
      {/* Search Header Hero */}
      <div className="search-header-container" style={{ background: 'linear-gradient(135deg, var(--primary-blue) 0%, #1e3a8a 100%)', color: 'white', borderRadius: '16px', padding: '4rem 2rem', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
        
        {/* Decorative background circles */}
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
        <div style={{ position: 'absolute', bottom: '-80px', left: '10%', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>Find your next dream job</h1>
          <p style={{ fontSize: '1.1rem', color: '#e0e7ff', marginBottom: '2rem' }}>Explore over {postings.length > 0 ? postings.length : '150+'} premium technical roles from the world's most innovative companies.</p>
          
          <div className="search-box" style={{ padding: '0.5rem', height: '70px', borderRadius: '12px' }}>
            <div className="search-input-group" style={{ flex: 2 }}>
              <Search size={22} color="var(--text-secondary)" />
              <input 
                type="text" 
                placeholder="Job title, keywords, or company..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ fontSize: '1.1rem' }}
              />
            </div>
            
            <div className="search-divider"></div>
            
            <div className="search-input-group" style={{ flex: 1 }}>
              <MapPin size={22} color="var(--text-secondary)" />
              <input 
                type="text" 
                placeholder="City, state, or remote..." 
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                style={{ fontSize: '1.1rem' }}
              />
            </div>
            
            <button className="btn-primary" style={{ padding: '0 2.5rem', height: '100%', borderRadius: '8px', fontSize: '1.1rem' }}>
              Search
            </button>
          </div>

          <div className="search-filters" style={{ marginTop: '1.5rem', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#e0e7ff', marginRight: '0.5rem', alignSelf: 'center' }}>Trending:</span>
            <span className="filter-pill" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>Machine Learning</span>
            <span className="filter-pill" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>Staff Engineer</span>
            <span className="filter-pill" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>Remote</span>
          </div>
        </div>
      </div>

      <div className="profile-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
        
        {/* Left Column: Results */}
        <div>
          <div className="results-header">
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{filteredPostings.length} jobs found</h3>
            <select className="sort-select">
              <option>Sort by: Most Relevant</option>
              <option>Sort by: Newest</option>
              <option>Sort by: Highest Salary</option>
            </select>
          </div>

      <div className="job-seeker-layout" style={{ gridTemplateColumns: '1fr' }}>
        <div className="main-feed">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>Loading jobs from database...</div>
          ) : filteredPostings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <Search size={40} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
              <h3>No jobs found matching your criteria</h3>
              <p>Try broadening your search terms or location.</p>
            </div>
          ) : (
            <>
              {currentItems.map((posting) => (
                <div className="job-card" key={posting.postingId}>
                  <div className="job-card-header">
                    <div>
                      <h3 className="job-title">{posting.role} <span className="match-badge" style={{ marginLeft: '0.5rem' }}>High Match</span></h3>
                      <div className="job-company">
                        <Building size={14} /> {posting.company?.companyName}
                        <MapPin size={14} style={{ marginLeft: '0.5rem' }} /> {getLocationForJob(posting.postingId)}
                      </div>
                    </div>
                  </div>
                  <div className="salary-range">
                    $180k - $250k <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 400 }}>+ Equity</span>
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
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <Briefcase size={14} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }}/> 1-Click Apply Ready
                    </span>
                    <button className="btn-primary" onClick={() => setSelectedJob(posting)}><Zap size={14} /> Apply Now</button>
                  </div>
                </div>
              ))}
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
                  <button 
                    className="btn-outline" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  >
                    Previous
                  </button>
                  <span style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    className="btn-outline" 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      </div>

      {/* Right Column: Featured Content */}
      <div className="sidebar">
          <div className="widget" style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Top Hiring Companies</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary-blue)' }}>G</div>
                <div>
                  <h4 style={{ margin: '0 0 0.1rem 0', fontSize: '0.9rem' }}>Google</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>24 Open Roles</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary-blue)' }}>S</div>
                <div>
                  <h4 style={{ margin: '0 0 0.1rem 0', fontSize: '0.9rem' }}>Stripe</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>18 Open Roles</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary-blue)' }}>N</div>
                <div>
                  <h4 style={{ margin: '0 0 0.1rem 0', fontSize: '0.9rem' }}>Netflix</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>15 Open Roles</div>
                </div>
              </div>
            </div>
            <button className="btn-outline" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>View All Companies</button>
          </div>

          <div className="widget" style={{ padding: '1.5rem', backgroundColor: 'var(--primary-blue-light)', border: 'none' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'var(--primary-blue)' }}>Get Job Alerts</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Be the first to know when new roles matching your profile are posted.</p>
            <input type="email" placeholder="Enter your email" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '0.75rem', outline: 'none' }} />
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Subscribe</button>
          </div>
        </div>
      </div>

      {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
};

export default FindJobs;
