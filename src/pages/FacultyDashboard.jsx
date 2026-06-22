import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import GlassInput from '../components/GlassInput';
import { LayoutDashboard, Users, CheckCircle, XCircle, Clock, Search, LogOut, Check, X } from 'lucide-react';

const FacultyDashboard = () => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, accepted: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Modal Review States
  const [selectedApp, setSelectedApp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('pending');
  const [updateRemarks, setUpdateRemarks] = useState('');
  const [updating, setUpdating] = useState(false);

  const branches = [
    'Artificial Intelligence & Machine Learning',
    'Computer Science & Engineering',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering'
  ];

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/faculty/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const params = {};
      if (courseFilter) params.course = courseFilter;
      if (statusFilter) params.status = statusFilter;
      if (categoryFilter) params.category = categoryFilter;
      if (search) params.search = search;

      const res = await axios.get('/api/applications', { params });
      setApplications(res.data.applications);
    } catch (err) {
      showToast('Failed to load applications list', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [courseFilter, statusFilter, categoryFilter, search]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openReviewModal = (app) => {
    setSelectedApp(app);
    setUpdateStatus(app.status);
    setUpdateRemarks(app.remarks || '');
    setModalOpen(true);
  };

  const closeReviewModal = () => {
    setSelectedApp(null);
    setModalOpen(false);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await axios.put(`/api/applications/${selectedApp._id}`, {
        status: updateStatus,
        remarks: updateRemarks
      });

      showToast('Application reviewed and updated successfully', 'success');
      closeReviewModal();
      fetchStats();
      fetchApplications();
    } catch (error) {
      showToast('Failed to update application review', 'error');
    } finally {
      setUpdating(false);
    }
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
        return <span className="glass-badge">{status}</span>;
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px', display: 'flex', flexWrap: 'wrap', gap: '32px' }} className="animate-fade-in-up">
      {/* Sidebar */}
      <GlassCard style={{ flex: '1 0 240px', padding: '24px', height: 'fit-content' }}>
        <h3 className="gradient-text-purple-cyan" style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '24px', paddingLeft: '8px' }}>
          Faculty Panel
        </h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={() => setStatusFilter('')} className={`nav-link ${statusFilter === '' ? 'active' : ''}`} style={{ border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '10px' }}>
            <LayoutDashboard size={18} /> All Applications
          </button>
          <button onClick={() => setStatusFilter('pending')} className={`nav-link ${statusFilter === 'pending' ? 'active' : ''}`} style={{ border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '10px' }}>
            <Clock size={18} style={{ color: '#FFE66D' }} /> Pending Review
          </button>
          <button onClick={() => setStatusFilter('accepted')} className={`nav-link ${statusFilter === 'accepted' ? 'active' : ''}`} style={{ border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '10px' }}>
            <CheckCircle size={18} style={{ color: '#2ECC71' }} /> Accepted
          </button>
          <button onClick={() => setStatusFilter('rejected')} className={`nav-link ${statusFilter === 'rejected' ? 'active' : ''}`} style={{ border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '10px' }}>
            <XCircle size={18} style={{ color: '#FF6B6B' }} /> Rejected
          </button>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '16px 0' }} />
          <button onClick={handleLogout} className="nav-link" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', color: '#FF6B6B' }}>
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </GlassCard>

      {/* Main dashboard content */}
      <div style={{ flex: '3 0 350px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Metric rows */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          <GlassCard style={{ padding: '20px', textAlign: 'center' }}>
            <Users size={32} style={{ color: '#00D4FF', margin: '0 auto 8px auto' }} />
            <h4 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stats.total}</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Total Applications</p>
          </GlassCard>
          <GlassCard style={{ padding: '20px', textAlign: 'center' }}>
            <Clock size={32} style={{ color: '#FFE66D', margin: '0 auto 8px auto' }} />
            <h4 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stats.pending}</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Pending / In Review</p>
          </GlassCard>
          <GlassCard style={{ padding: '20px', textAlign: 'center' }}>
            <CheckCircle size={32} style={{ color: '#2ECC71', margin: '0 auto 8px auto' }} />
            <h4 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stats.accepted}</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Accepted</p>
          </GlassCard>
          <GlassCard style={{ padding: '20px', textAlign: 'center' }}>
            <XCircle size={32} style={{ color: '#FF6B6B', margin: '0 auto 8px auto' }} />
            <h4 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stats.rejected}</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Rejected</p>
          </GlassCard>
        </div>

        {/* Filters and search box */}
        <GlassCard style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '4px 12px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <Search size={18} style={{ color: 'rgba(255,255,255,0.5)' }} />
              <input
                type="text"
                placeholder="Search by student name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', width: '100%', padding: '8px 0' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <select className="glass-input" style={{ width: '160px', background: '#111827' }} value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
                <option value="">All Branches</option>
                {branches.map((b, idx) => <option key={idx} value={b}>{b}</option>)}
              </select>

              <select className="glass-input" style={{ width: '140px', background: '#111827' }} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="">All Categories</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
          </div>
        </GlassCard>

        {/* Applications table */}
        <GlassCard style={{ padding: '24px', overflowX: 'auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="animate-spin" style={{ width: '32px', height: '32px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: '#00D4FF', borderRadius: '50%', margin: '0 auto 16px auto' }}></div>
              <span>Fetching applications...</span>
            </div>
          ) : applications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.5)' }}>
              <Users size={48} style={{ margin: '0 auto 12px auto' }} />
              <p>No applications match the search or filter criteria.</p>
            </div>
          ) : (
            <table className="glass-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Course Applied</th>
                  <th>Marks (%)</th>
                  <th>Score/Rank</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td style={{ fontWeight: 600 }}>{app.studentName}</td>
                    <td>{app.course}</td>
                    <td>{app.plusTwoPercent}%</td>
                    <td>{app.entranceScore}</td>
                    <td>{getStatusBadge(app.status)}</td>
                    <td>
                      <GlassButton onClick={() => openReviewModal(app)} variant="secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                        Review
                      </GlassButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </GlassCard>
      </div>

      {/* Review Modal Dialog */}
      {modalOpen && selectedApp && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }}>
          <GlassCard style={{
            maxWidth: '550px',
            width: '100%',
            padding: '32px',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button onClick={closeReviewModal} style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            <h3 className="gradient-text-purple-cyan" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px' }}>
              Review Admission Application
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', fontSize: '0.9rem' }}>
              <p><strong>Name:</strong> {selectedApp.studentName}</p>
              <p><strong>Email / Phone:</strong> {selectedApp.email} / {selectedApp.phone}</p>
              <p><strong>Date of Birth / Gender:</strong> {selectedApp.dateOfBirth} / {selectedApp.gender}</p>
              <p><strong>Address:</strong> {selectedApp.address}</p>
              <p><strong>Category:</strong> {selectedApp.category}</p>
              <p><strong>Course Preference:</strong> {selectedApp.course}</p>
              <p><strong>Marks Percent:</strong> {selectedApp.plusTwoPercent}%</p>
              <p><strong>Entrance Score/Rank:</strong> {selectedApp.entranceScore}</p>
              <p><strong>Documents Attached:</strong> {selectedApp.documents?.join(', ') || 'None'}</p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '16px 0' }} />

            <form onSubmit={handleUpdateStatus}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Review Decision Status</label>
                <select
                  className="glass-input"
                  style={{ background: '#111827' }}
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Remarks & Academic Notes</label>
                <textarea
                  rows={3}
                  className="glass-input"
                  style={{ resize: 'none' }}
                  placeholder="Enter notes visible to the student..."
                  value={updateRemarks}
                  onChange={(e) => setUpdateRemarks(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <GlassButton type="button" variant="secondary" onClick={closeReviewModal} style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </GlassButton>
                <GlassButton type="submit" variant="primary" loading={updating} style={{ flex: 2, justifyContent: 'center' }}>
                  Update Application
                </GlassButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;
