import React, { useState, useEffect } from 'react';
import { 
  User, FileText, Image as ImageIcon, CheckCircle2, 
  Plus, Trash2, GraduationCap, ChevronLeft, Shield, 
  UploadCloud, Award, Lock, Edit2, Zap
} from 'lucide-react';
import './Dashboards.css';
import { useNavigate } from 'react-router-dom';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profileSummary: '',
    profilePic: null,
    resume: null,
    educationList: []
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');
      
      try {
        const res = await fetch('http://localhost:8080/api/job-seekers/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setFormData(prev => ({
            ...prev,
            profileSummary: data.profileSummary || '',
            educationList: data.educationList || []
          }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [navigate]);
  
  const [isAddingEdu, setIsAddingEdu] = useState(false);
  const [currentEdu, setCurrentEdu] = useState({
    educationType: '',
    instituteName: '',
    startDate: '',
    endDate: '',
    percentage: ''
  });

  const handleSaveEdu = () => {
    setFormData(prev => ({
      ...prev,
      educationList: [...prev.educationList, currentEdu]
    }));
    setIsAddingEdu(false);
    setCurrentEdu({
      educationType: '',
      instituteName: '',
      startDate: '',
      endDate: '',
      percentage: ''
    });
  };

  const handleRemoveEducation = (index) => {
    const updated = [...formData.educationList];
    updated.splice(index, 1);
    setFormData({ ...formData, educationList: updated });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:8080/api/job-seekers/me', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          profileSummary: formData.profileSummary
        })
      });
      if (res.ok) {
        alert("Profile saved successfully!");
      } else {
        alert("Failed to save profile.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving profile.");
    }
  };

  return (
    <div className="dashboard-container">
      
      {/* Top Header */}
      <div className="profile-header">
        <div>
          <div className="breadcrumbs">
            <span style={{ color: 'var(--primary-blue)', cursor: 'pointer' }} onClick={() => navigate('/job-seeker/dashboard')}>
              <ChevronLeft size={14} style={{ verticalAlign: 'middle' }}/> Back to Dashboard
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', margin: '0.5rem 0' }}>Executive Profile Completion</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Fine-tune your credentials, verified academic history, and AI-optimized executive summary.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><CheckCircle2 size={14} color="var(--success-green)" style={{ verticalAlign: 'middle' }}/> Auto-saved 2m ago</span>
          <button className="btn-outline">Preview Public View</button>
        </div>
      </div>

      {/* Banner */}
      <div className="status-banner">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="status-icon"><Award size={24} color="white" /></div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0' }}>Profile Status: 82% Completed <span className="match-badge" style={{ marginLeft: '0.5rem', backgroundColor: 'var(--primary-blue)', color: 'white' }}>Tier-1 Inbound Target</span></h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Complete the <strong>2 remaining steps</strong> below (Executive Summary & Verified Degree) to automatically unlock Tier-1 inbound hiring requests.</p>
          </div>
        </div>
      </div>

      <div className="profile-layout">
        <div className="profile-main">
          
          {/* SECTION 01: Photo & Identity */}
          <div className="profile-section">
            <div className="section-header-row">
              <div>
                <span className="section-step">SECTION 01</span>
                <h3>Photo & Executive Identity</h3>
              </div>
              <span className="badge-success"><Shield size={14}/> Identity Confirmed</span>
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
              <div className="avatar-upload">
                {formData.profilePic ? (
                  <div className="avatar-preview" style={{ backgroundImage: `url(${URL.createObjectURL(formData.profilePic)})` }}></div>
                ) : (
                  <div className="avatar-placeholder"><User size={40} color="#cbd5e1" /></div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <label className="btn-primary" style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}>
                    <UploadCloud size={16}/> Upload New Photo
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'profilePic')} />
                  </label>
                  {formData.profilePic && (
                    <button className="btn-outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }} onClick={() => setFormData({...formData, profilePic: null})}>
                      <Trash2 size={16}/> Remove
                    </button>
                  )}
                </div>
                <div className="info-box">
                  <CheckCircle2 size={16} color="var(--primary-blue)" style={{ minWidth: '16px' }}/>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Recommended: Minimum 500x500px JPG, PNG or WEBP (Max 5MB). Professional, forward-facing portraits receive <strong>43% higher recruiter response rates</strong> for Staff & Leadership tiers.</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 02: Bio & Summary */}
          <div className="profile-section">
            <div className="section-header-row">
              <div>
                <span className="section-step">SECTION 02</span>
                <h3>Executive Bio & Leadership Summary</h3>
              </div>
              <button className="btn-outline" style={{ padding: '0.3rem 0.75rem', fontSize: '0.85rem' }}><Zap size={14}/> Enhance with AI</button>
            </div>
            
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Professional Overview (ATS-Indexed)</label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Target: 200-300 words <strong style={{ color: 'var(--primary-blue)' }}>{formData.profileSummary.split(/\s+/).filter(w => w.length > 0).length} / 300</strong></span>
              </div>
              <textarea 
                className="custom-textarea"
                rows="6"
                placeholder="Staff Infrastructure & Distributed Systems Engineer with 10+ years architecting high-throughput Kubernetes clusters..."
                value={formData.profileSummary}
                onChange={(e) => setFormData({...formData, profileSummary: e.target.value})}
              />
            </div>
          </div>

          {/* SECTION 03: Education */}
          <div className="profile-section">
            <div className="section-header-row">
              <div>
                <span className="section-step">SECTION 03</span>
                <h3>Education & Academic Credentials</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>Degrees verify your baseline credentials for enterprise screening algorithms.</p>
              </div>
              <button className="btn-primary" onClick={() => setIsAddingEdu(true)}><Plus size={16}/> Add Another Education</button>
            </div>

            {formData.educationList.map((edu, idx) => (
              <div key={idx} className="edu-card">
                <div className="edu-icon"><GraduationCap size={20} color="var(--primary-blue)" /></div>
                <div className="edu-details">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{edu.instituteName} <span className="badge-success" style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}><Shield size={10}/> Verified Degree</span></h4>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.25rem' }}>{edu.educationType}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem' }}>
                        <span>{edu.startDate} — {edu.endDate}</span>
                        <span>{edu.percentage} GPA / %</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="icon-btn"><Edit2 size={16}/></button>
                      <button className="icon-btn text-red" onClick={() => handleRemoveEducation(idx)}><Trash2 size={16}/></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isAddingEdu && (
              <div className="edu-form">
                <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={16} color="var(--primary-blue)"/> New Academic Credential</h4>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Institution / University Name *</label>
                    <input type="text" placeholder="e.g. Massachusetts Institute of Technology" value={currentEdu.instituteName} onChange={e => setCurrentEdu({...currentEdu, instituteName: e.target.value})} />
                  </div>
                  <div className="input-group">
                    <label>Degree & Qualification Level *</label>
                    <input type="text" placeholder="e.g. B.S. in Computer Science" value={currentEdu.educationType} onChange={e => setCurrentEdu({...currentEdu, educationType: e.target.value})} />
                  </div>
                  <div className="input-group">
                    <label>Start Date *</label>
                    <input type="date" value={currentEdu.startDate} onChange={e => setCurrentEdu({...currentEdu, startDate: e.target.value})} />
                  </div>
                  <div className="input-group">
                    <label>End Date *</label>
                    <input type="date" value={currentEdu.endDate} onChange={e => setCurrentEdu({...currentEdu, endDate: e.target.value})} />
                  </div>
                  <div className="input-group">
                    <label>Percentage / Grade / GPA</label>
                    <input type="text" placeholder="e.g. 3.8 GPA or 92%" value={currentEdu.percentage} onChange={e => setCurrentEdu({...currentEdu, percentage: e.target.value})} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                  <button className="btn-outline" onClick={() => setIsAddingEdu(false)}>Cancel</button>
                  <button className="btn-primary" onClick={handleSaveEdu}>Save Credential</button>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 04: Resume */}
          <div className="profile-section">
            <div className="section-header-row">
              <div>
                <span className="section-step">SECTION 04</span>
                <h3>Resume & CV Document Repository</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>High-velocity ATS parsing automatically populates applicant screening pipelines.</p>
              </div>
              <span className="badge-success"><CheckCircle2 size={14}/> ATS Synced</span>
            </div>

            {!formData.resume ? (
              <div className="drag-drop-zone">
                <div className="upload-icon-circle"><UploadCloud size={24} color="var(--primary-blue)" /></div>
                <h4>Drop your updated CV or Resume here, or <label htmlFor="resume-upload" style={{ color: 'var(--primary-blue)', cursor: 'pointer', textDecoration: 'underline' }}>Browse files</label></h4>
                <p>Supports PDF, DOCX up to 10MB • Automated AI skill mapping</p>
                <input type="file" id="resume-upload" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'resume')} />
              </div>
            ) : (
              <div className="resume-card">
                <div className="resume-icon"><FileText size={24} color="#ef4444" /></div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>{formData.resume.name}</h4>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span className="badge-success" style={{ padding: '0.1rem 0.4rem', fontSize: '0.7rem' }}><CheckCircle2 size={12}/> Parsed Successfully</span>
                    <span>{(formData.resume.size / (1024*1024)).toFixed(1)} MB</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <label htmlFor="resume-replace" className="btn-primary" style={{ cursor: 'pointer', padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                    <UploadCloud size={14}/> Replace CV
                    <input type="file" id="resume-replace" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'resume')} />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="profile-sidebar">
          <div className="widget">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 className="widget-title" style={{ margin: 0 }}>Profile Readiness</h3>
              <div className="progress-circle">82%</div>
            </div>
            
            <ul className="checklist">
              <li>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--success-green)"/> Personal & Contact Info</span> 
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>100%</span>
              </li>
              <li>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--success-green)"/> Work History & Tenure</span> 
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>100%</span>
              </li>
              <li>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--border-color)"/> Photo & Executive Bio</span> 
                <span className="badge-progress">In Progress</span>
              </li>
              <li>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--border-color)"/> Education & Degree Details</span> 
                <span className="badge-progress">In Progress</span>
              </li>
            </ul>
          </div>

          <div className="widget" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <Shield size={24} color="var(--success-green)" />
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Verified Talent Badge</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>By maintaining 100% verified metrics, your profile earns the TalentPulse Verified Shield, allowing high-growth startups to reach you with pre-vetted salary offers.</p>
              </div>
            </div>
          </div>

          <div className="widget" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Lock size={16}/> Stealth Mode</h4>
              <div className="toggle-switch active"></div>
            </div>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Actively shielding your profile and activity from your current listed employer.</p>
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem' }} onClick={handleSubmit}>
            Save & Complete Profile →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
