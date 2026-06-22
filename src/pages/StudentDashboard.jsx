import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import { LayoutDashboard, FileText, CheckSquare, Clock, GraduationCap, ClipboardList, LogOut, Check, ArrowRight } from 'lucide-react';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [appStatus, setAppStatus] = useState(null); // 'none', 'pending', 'under_review', 'accepted', 'rejected'
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get('/api/applications/mine');
        setApplication(response.data.application);
        setAppStatus(response.data.application.status);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setAppStatus('none');
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="glass-badge glass-badge-pending">Pending</span>;
      case 'under_review':
        return <span className="glass-badge glass-badge-review">Under Review</span>;
      case 'accepted':
        return <span className="glass-badge glass-badge-accepted">Accepted</span>;
      case 'rejected':
        return <span className="glass-badge glass-badge-rejected">Rejected</span>;
      default:
        return <span className="glass-badge" style={{ background: 'rgba(255,255,255,0.06)' }}>Not Started</span>;
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px', display: 'flex', flexWrap: 'wrap', gap: '32px' }} className="animate-fade-in-up">
      {/* Sidebar */}
      <GlassCard style={{ flex: '1 0 250px', padding: '24px', height: 'fit-content' }}>
        <h3 className="gradient-text-purple-cyan" style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '24px', paddingLeft: '8px' }}>
          Student Area
        </h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link to="/student-dashboard" className="nav-link active" style={{ display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)' }}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/apply" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '10px' }}>
            <FileText size={18} /> Apply for Admission
          </Link>
          <Link to="/my-application" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '10px' }}>
            <ClipboardList size={18} /> My Application
          </Link>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '16px 0' }} />
          <button onClick={handleLogout} className="nav-link" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', color: '#FF6B6B' }}>
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </GlassCard>

      {/* Main Panel */}
      <div style={{ flex: '3 0 350px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Welcome */}
        <GlassCard style={{ padding: '32px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#00D4FF', fontWeight: 600 }}>WELCOME BACK</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px' }}>Hello, {user?.name}!</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', marginTop: '4px' }}>
              Manage your engineering admission credentials from your personal console.
            </p>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px' }}>Status</span>
            {loading ? <span className="glass-badge">Loading...</span> : getStatusBadge(appStatus)}
          </div>
        </GlassCard>

        {/* Dynamic Action Block */}
        {!loading && (
          <GlassCard style={{ padding: '32px', borderLeft: '4px solid #00D4FF' }}>
            {appStatus === 'none' ? (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Ready to Apply?</h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  You have not submitted an admission application for the current academic cycle. Complete the 4-step form now.
                </p>
                <GlassButton to="/apply" variant="primary">
                  Start Application <ArrowRight size={16} />
                </GlassButton>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                  Application Submitted
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  Your application for {application?.course} B.Tech branch is currently <strong>{appStatus.replace('_', ' ')}</strong>.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <GlassButton to="/my-application" variant="secondary">
                    View Progress Timeline
                  </GlassButton>
                  {application?.remarks && (
                    <div style={{ flexGrow: 1, padding: '12px 16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)' }}>
                      <strong>Remarks:</strong> {application.remarks}
                    </div>
                  )}
                </div>
              </div>
            )}
          </GlassCard>
        )}

        {/* Checklist */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <GlassCard style={{ padding: '24px' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#00D4FF' }}>
              <CheckSquare size={18} /> Admission Guidelines
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
              <li style={{ display: 'flex', gap: '8px' }}><Check size={16} style={{ color: '#2ECC71', flexShrink: 0 }} /> Ensure PCM marks sum to at least 50%</li>
              <li style={{ display: 'flex', gap: '8px' }}><Check size={16} style={{ color: '#2ECC71', flexShrink: 0 }} /> Enter correct KEAM rank / JEE percentile</li>
              <li style={{ display: 'flex', gap: '8px' }}><Check size={16} style={{ color: '#2ECC71', flexShrink: 0 }} /> Specify branch preferences accurately</li>
              <li style={{ display: 'flex', gap: '8px' }}><Check size={16} style={{ color: '#2ECC71', flexShrink: 0 }} /> Upload clear files for document verification</li>
            </ul>
          </GlassCard>

          <GlassCard style={{ padding: '24px' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#6C63FF' }}>
              <Clock size={18} /> Required Credentials
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
              <li style={{ display: 'flex', gap: '8px' }}><Check size={16} style={{ color: '#6C63FF', flexShrink: 0 }} /> Class 10 & 12 Marksheets</li>
              <li style={{ display: 'flex', gap: '8px' }}><Check size={16} style={{ color: '#6C63FF', flexShrink: 0 }} /> Transfer & Migration Certificates</li>
              <li style={{ display: 'flex', gap: '8px' }}><Check size={16} style={{ color: '#6C63FF', flexShrink: 0 }} /> KEAM/JEE Score Cards</li>
              <li style={{ display: 'flex', gap: '8px' }}><Check size={16} style={{ color: '#6C63FF', flexShrink: 0 }} /> Government ID Card (Aadhaar, Passport)</li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
