import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, LayoutDashboard, Award, Landmark, BookOpen, Contact as ContactIcon } from 'lucide-react';
import GlassButton from './GlassButton';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    return user.role === 'faculty' ? '/faculty-dashboard' : '/student-dashboard';
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(11, 15, 25, 0.4)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: '#ffffff', 
            padding: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            overflow: 'hidden'
          }}>
            <img src="/ahalia-logo.jpg" alt="Ahalia Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span className="gradient-text-purple-cyan" style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '1px', fontFamily: 'var(--font-display)' }}>
            ASET
          </span>
        </Link>

        {/* Desktop Links */}
        <nav style={{ display: 'none', gap: '20px', alignItems: 'center' }} className="md-flex">
          <style>{`
            @media (min-width: 768px) {
              .md-flex { display: flex !important; }
              .md-hidden { display: none !important; }
            }
          `}</style>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            About
          </NavLink>
          <NavLink to="/courses" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Courses
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>
        </nav>

        {/* Auth CTAs / Dashboard */}
        <div style={{ display: 'none', gap: '12px', alignItems: 'center' }} className="md-flex">
          {isAuthenticated ? (
            <>
              <GlassButton to={getDashboardLink()} variant="secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                <LayoutDashboard size={16} />
                Dashboard
              </GlassButton>
              <GlassButton onClick={handleLogout} variant="secondary" style={{ padding: '8px 16px', fontSize: '0.9rem', color: '#FF6B6B', borderColor: 'rgba(255, 107, 107, 0.3)' }}>
                <LogOut size={16} />
                Logout
              </GlassButton>
            </>
          ) : (
            <>
              <GlassButton to="/login" variant="secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Login
              </GlassButton>
              <GlassButton to="/register" variant="primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Apply Now
              </GlassButton>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            color: 'white',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div
          className="md-hidden glass-panel"
          style={{
            position: 'absolute',
            top: '85px',
            left: '16px',
            right: '16px',
            background: 'rgba(11, 15, 25, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Landmark size={18} /> Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Award size={18} /> About
          </NavLink>
          <NavLink
            to="/courses"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <BookOpen size={18} /> Courses
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <ContactIcon size={18} /> Contact
          </NavLink>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.1)', margin: '8px 0' }} />

          {isAuthenticated ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <GlassButton
                to={getDashboardLink()}
                onClick={() => setIsOpen(false)}
                variant="secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </GlassButton>
              <GlassButton
                onClick={handleLogout}
                variant="secondary"
                style={{ width: '100%', justifyContent: 'center', color: '#FF6B6B', borderColor: 'rgba(255, 107, 107, 0.3)' }}
              >
                <LogOut size={18} />
                Logout
              </GlassButton>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <GlassButton
                to="/login"
                onClick={() => setIsOpen(false)}
                variant="secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Login
              </GlassButton>
              <GlassButton
                to="/register"
                onClick={() => setIsOpen(false)}
                variant="primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Apply Now
              </GlassButton>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
