import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import { LayoutDashboard, FileText, ClipboardList, LogOut, CheckCircle, Clock, AlertCircle, ShieldCheck, Download } from 'lucide-react';

const ApplicationStatus = () => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get('/api/applications/mine');
        setApplication(response.data.application);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setApplication(null);
        } else {
          showToast('Failed to load application data', 'error');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [showToast]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getTimelineStepStyle = (active) => ({
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    background: active ? 'linear-gradient(135deg, #6C63FF, #00D4FF)' : 'rgba(255,255,255,0.05)',
    border: `2px solid ${active ? '#00D4FF' : 'rgba(255,255,255,0.1)'}`,
    boxShadow: active ? '0 0 10px rgba(0, 212, 255, 0.4)' : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    zIndex: 2
  });

  const downloadSummary = () => {
    // Generate a simple print-like window/document download for summary
    const printContent = `
      ==================================================
      ASET ADMISSION APPLICATION SUMMARY
      ==================================================
      Reference ID: ${application._id}
      Student Name: ${application.studentName}
      Email: ${application.email}
      Phone: ${application.phone}
      DOB: ${application.dateOfBirth}
      Applied Course: ${application.course}
      PCM Percentage: ${application.plusTwoPercent}%
      Entrance Score: ${application.entranceScore}
      Submission Status: ${application.status.toUpperCase()}
      Submitted Date: ${new Date(application.submittedAt).toLocaleDateString()}
      ==================================================
    `;
    const element = document.createElement("a");
    const file = new Blob([printContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `ASET_Application_${application._id}.txt`;
    document.body.appendChild(element);
    element.click();
    showToast('Downloaded application summary text document', 'success');
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px', display: 'flex', flexWrap: 'wrap', gap: '32px' }} className="animate-fade-in-up">
      {/* Sidebar */}
      <GlassCard style={{ flex: '1 0 250px', padding: '24px', height: 'fit-content' }}>
        <h3 className="gradient-text-purple-cyan" style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '24px', paddingLeft: '8px' }}>
          Student Area
        </h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link to="/student-dashboard" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '10px' }}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/apply" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '10px' }}>
            <FileText size={18} /> Apply for Admission
          </Link>
          <Link to="/my-application" className="nav-link active" style={{ display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '10px', background: 'var(--glass-bg)' }}>
            <ClipboardList size={18} /> My Application
          </Link>
          <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '16px 0' }} />
          <button onClick={handleLogout} className="nav-link" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', color: '#FF6B6B' }}>
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </GlassCard>

      {/* Main Panel */}
      <div style={{ flex: '3 0 350px' }}>
        {loading ? (
          <GlassCard style={{ padding: '40px', textAlign: 'center' }}>
            <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: '#00D4FF', borderRadius: '50%', margin: '0 auto' }}></div>
            <p style={{ marginTop: '16px' }}>Loading application status...</p>
          </GlassCard>
        ) : !application ? (
          <GlassCard style={{ padding: '40px', textAlign: 'center' }}>
            <AlertCircle size={48} style={{ color: '#FFD93D', margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>No Application Found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              You have not submitted an admission application yet.
            </p>
            <GlassButton to="/apply" variant="primary">
              Apply Now
            </GlassButton>
          </GlassCard>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Summary card */}
            <GlassCard style={{ padding: '32px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Course Selected</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '4px' }}>{application.course}</h3>
                </div>
                <GlassButton onClick={downloadSummary} variant="secondary">
                  <Download size={16} /> Download Summary
                </GlassButton>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <p style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--text-muted)' }}>Reference ID:</strong> <br />{application._id}</p>
                <p style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--text-muted)' }}>Submission Date:</strong> <br />{new Date(application.submittedAt).toLocaleDateString()}</p>
                <p style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--text-muted)' }}>Academic Score:</strong> <br />{application.plusTwoPercent}% PCM</p>
              </div>
            </GlassCard>

            {/* Timeline Progress */}
            <GlassCard style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '32px' }}>Application Status Timeline</h3>
              
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Connector line */}
                <div style={{ position: 'absolute', left: '20px', top: '10px', bottom: '10px', width: '2px', background: 'var(--glass-border)', zIndex: 1 }}></div>

                {/* Step 1 */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={getTimelineStepStyle(true)}>
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700 }}>Application Submitted</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Submitted on {new Date(application.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={getTimelineStepStyle(application.status !== 'pending')}>
                    {application.status === 'pending' ? <Clock size={18} /> : <CheckCircle size={18} />}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700 }}>Under Review</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Faculty panel is verifying credentials and eligibility scores.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={getTimelineStepStyle(application.status === 'accepted' || application.status === 'rejected')}>
                    {application.status === 'accepted' ? (
                      <ShieldCheck size={18} style={{ color: '#2ECC71' }} />
                    ) : application.status === 'rejected' ? (
                      <AlertCircle size={18} style={{ color: '#FF6B6B' }} />
                    ) : (
                      <Clock size={18} />
                    )}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700 }}>Decision</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                      {application.status === 'accepted' && 'Your application has been accepted for B.Tech admission! Please report to campus.'}
                      {application.status === 'rejected' && 'We regret to inform you that your application could not be accepted at this time.'}
                      {application.status === 'pending' && 'Awaiting final decision from ASET academic board.'}
                      {application.status === 'under_review' && 'Decision pending review completion.'}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Remarks Card */}
            {application.remarks && (
              <GlassCard style={{ padding: '24px', borderLeft: '4px solid #FFD93D' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>Faculty Remarks</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  "{application.remarks}"
                </p>
              </GlassCard>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;
