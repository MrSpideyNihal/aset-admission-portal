import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import GlassCard from '../components/GlassCard';
import GlassInput from '../components/GlassInput';
import GlassButton from '../components/GlassButton';
import { ChevronRight, ChevronLeft, UserPlus, Check } from 'lucide-react';

const Register = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [role, setRole] = useState('student'); // 'student' or 'faculty'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Student specific details
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [school, setSchool] = useState('');

  // Faculty specific details
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [designation, setDesignation] = useState('Assistant Professor');
  const [employeeId, setEmployeeId] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const additionalDetails =
        role === 'student'
          ? { phone, dateOfBirth: dob, gender, currentSchool: school }
          : { department, designation, employeeId };

      await register(name, email, password, role, additionalDetails);
      showToast('Registration successful! Please login.', 'success');
      navigate('/login');
    } catch (err) {
      showToast(err, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '24px' }}>
      <GlassCard style={{ width: '450px', padding: '40px' }} className="animate-fade-in-up">
        
        {/* Progress Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          <div
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              background: step >= 1 ? 'linear-gradient(90deg, #6C63FF, #00D4FF)' : 'rgba(255,255,255,0.1)',
              boxShadow: step >= 1 ? '0 0 8px #00D4FF' : 'none'
            }}
          ></div>
          <div
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              background: step === 2 ? 'linear-gradient(90deg, #6C63FF, #00D4FF)' : 'rgba(255,255,255,0.1)',
              boxShadow: step === 2 ? '0 0 8px #00D4FF' : 'none'
            }}
          ></div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          <h2 className="gradient-text-purple-cyan" style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
            Create Account
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Step {step} of 2: {step === 1 ? 'Credentials & Role' : 'Profile Details'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleNext}>
            {/* Role selector */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setRole('student')}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '10px',
                  background: role === 'student' ? 'rgba(0, 212, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${role === 'student' ? '#00D4FF' : 'rgba(255, 255, 255, 0.1)'}`,
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('faculty')}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '10px',
                  background: role === 'faculty' ? 'rgba(108, 99, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${role === 'faculty' ? '#6C63FF' : 'rgba(255, 255, 255, 0.1)'}`,
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
              >
                Faculty
              </button>
            </div>

            <GlassInput
              label="Full Name"
              placeholder="e.g. Rahul Nair"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <GlassInput
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <GlassInput
              label="Password"
              type="password"
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <GlassInput
              label="Confirm Password"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <GlassButton
              type="submit"
              variant="primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
            >
              Next details <ChevronRight size={16} />
            </GlassButton>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            {role === 'student' ? (
              <>
                <GlassInput
                  label="Phone Number"
                  placeholder="e.g. +91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <GlassInput
                  label="Date of Birth"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', paddingLeft: '4px' }}>Gender</label>
                  <select
                    className="glass-input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <GlassInput
                  label="Current School/College"
                  placeholder="e.g. GHSS Palakkad"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  required
                />
              </>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', paddingLeft: '4px' }}>Department</label>
                  <select
                    className="glass-input"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="Computer Science & Engineering">Computer Science</option>
                    <option value="Artificial Intelligence & Machine Learning">AI & ML</option>
                    <option value="Electronics & Communication Engineering">Electronics & Comm</option>
                    <option value="Electrical & Electronics Engineering">Electrical & Elect</option>
                    <option value="Mechanical Engineering">Mechanical</option>
                    <option value="Civil Engineering">Civil</option>
                  </select>
                </div>
                <GlassInput
                  label="Designation"
                  placeholder="e.g. Assistant Professor"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                />
                <GlassInput
                  label="Employee ID"
                  placeholder="e.g. EMP1024"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                />
              </>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <GlassButton
                type="button"
                variant="secondary"
                onClick={() => setStep(1)}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <ChevronLeft size={16} /> Back
              </GlassButton>
              <GlassButton
                type="submit"
                variant="primary"
                loading={loading}
                style={{ flex: 2, justifyContent: 'center' }}
              >
                <UserPlus size={16} /> Register
              </GlassButton>
            </div>
          </form>
        )}

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Already have an account? </span>
          <Link to="/login" style={{ color: '#00D4FF', textDecoration: 'none', fontWeight: 600 }}>
            Login Here
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default Register;
