import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import GlassCard from '../components/GlassCard';
import GlassInput from '../components/GlassInput';
import GlassButton from '../components/GlassButton';
import { Eye, EyeOff, User, GraduationCap, Lock, Mail } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [role, setRole] = useState('student'); // 'student' or 'faculty'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const loggedUser = await login(email, password, role);
      showToast(`Welcome back, ${loggedUser.name}!`, 'success');
      if (loggedUser.role === 'faculty') {
        navigate('/faculty-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (err) {
      showToast(err, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '24px' }}>
      <GlassCard style={{ width: '400px', padding: '40px' }} className="animate-fade-in-up">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '16px', 
            background: '#ffffff', 
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            overflow: 'hidden',
            marginBottom: '12px'
          }}>
            <img src="/ahalia-logo.jpg" alt="Ahalia Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h2 className="gradient-text-purple-cyan" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px', fontFamily: 'var(--font-display)' }}>
            ASET Portal
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sign in to continue your journey</p>
        </div>

        {/* Role Selector */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
          <button
            type="button"
            onClick={() => setRole('student')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              background: role === 'student' ? 'rgba(0, 212, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${role === 'student' ? '#00D4FF' : 'rgba(255, 255, 255, 0.1)'}`,
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              boxShadow: role === 'student' ? '0 0 12px rgba(0, 212, 255, 0.25)' : 'none'
            }}
          >
            <GraduationCap size={18} /> Student
          </button>
          <button
            type="button"
            onClick={() => setRole('faculty')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              background: role === 'faculty' ? 'rgba(108, 99, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${role === 'faculty' ? '#6C63FF' : 'rgba(255, 255, 255, 0.1)'}`,
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              boxShadow: role === 'faculty' ? '0 0 12px rgba(108, 99, 255, 0.25)' : 'none'
            }}
          >
            <User size={18} /> Faculty
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ position: 'relative' }}>
            <GlassInput
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <GlassInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '38px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <GlassButton
            type="submit"
            variant="primary"
            loading={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: '16px', padding: '14px' }}
          >
            Login
          </GlassButton>
        </form>

        {/* Footer */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
          <Link to="/register" style={{ color: '#00D4FF', textDecoration: 'none', fontWeight: 600 }}>
            Register Here
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default Login;
