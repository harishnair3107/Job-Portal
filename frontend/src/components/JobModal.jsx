import React, { useState } from 'react';
import { X, Building, MapPin, CheckCircle2, Briefcase, Zap } from 'lucide-react';
import { getLocationForJob } from '../utils/locationHelper';

const JobModal = ({ job, onClose }) => {
  const [applying, setApplying] = useState(false);

  const handleApply = async () => {
    setApplying(true);
    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be logged in to apply!");
      setApplying(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/applications/apply', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postingId: job.postingId })
      });
      
      if (res.ok) {
        alert("Successfully applied for this job!");
        onClose();
      } else {
        const errorMsg = await res.text();
        alert(`Failed to apply: ${errorMsg}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while applying.");
    } finally {
      setApplying(false);
    }
  };

  if (!job) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', 
        width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem', 
          background: 'none', border: 'none', cursor: 'pointer'
        }}>
          <X size={24} color="var(--text-secondary)" />
        </button>

        <h2 style={{ margin: '0 0 1rem 0' }}>{job.role}</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Building size={16} /> {job.company?.companyName}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <MapPin size={16} /> {getLocationForJob(job.postingId)}
          </span>
        </div>

        <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Salary Range</h4>
          <p style={{ margin: 0, fontSize: '1.2rem', color: 'var(--primary-blue)', fontWeight: 600 }}>$180,000 - $250,000 <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>+ Equity</span></p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4>Job Description</h4>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{job.jobDescription}</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h4>Requirements</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {job.jobRequirement?.split(',').map((req, idx) => (
              <span key={idx} style={{ 
                backgroundColor: '#f1f5f9', padding: '0.25rem 0.75rem', 
                borderRadius: '999px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' 
              }}>
                <CheckCircle2 size={12} color="var(--primary-blue)" /> {req.trim()}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Briefcase size={16} /> Profile Ready to Submit
          </span>
          <button 
            className="btn-primary" 
            onClick={handleApply}
            disabled={applying}
            style={{ opacity: applying ? 0.7 : 1 }}
          >
            {applying ? 'Applying...' : <><Zap size={16} /> Apply Now</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
