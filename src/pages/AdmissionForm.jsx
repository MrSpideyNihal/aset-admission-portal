import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import GlassCard from '../components/GlassCard';
import GlassInput from '../components/GlassInput';
import GlassButton from '../components/GlassButton';
import { ChevronRight, ChevronLeft, Send, CheckCircle2, AlertTriangle, Star } from 'lucide-react';

const AdmissionForm = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  // Form Fields
  // Step 1: Personal Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('');
  const [nationality, setNationality] = useState('Indian');
  const [religion, setReligion] = useState('Hindu');
  const [category, setCategory] = useState('General');

  // Step 2: Academics
  const [qualifyingExam, setQualifyingExam] = useState('Plus Two'); // 'Plus Two' or 'Diploma'
  const [schoolName, setSchoolName] = useState('');
  const [yearOfPassing, setYearOfPassing] = useState('');
  const [marksPercent, setMarksPercent] = useState('');
  const [entranceScore, setEntranceScore] = useState('');
  const [boardName, setBoardName] = useState('CBSE');

  // Step 3: Course Selection
  const [course, setCourse] = useState('Computer Science & Engineering');
  const [preference2, setPreference2] = useState('Artificial Intelligence & Machine Learning');

  const branches = [
    'Artificial Intelligence & Machine Learning',
    'Computer Science & Engineering',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering'
  ];

  // Eligibility Verification Check
  const isEligible = parseFloat(marksPercent) >= (category === 'SC' || category === 'ST' ? 45 : 50);

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!name || !email || !phone || !dob || !address) {
        showToast('Please fill out all personal details', 'error');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!schoolName || !yearOfPassing || !marksPercent || !entranceScore) {
        showToast('Please fill out all academic details', 'error');
        return;
      }
      if (!isEligible) {
        showToast('Marks do not satisfy the minimum eligibility requirements', 'warning');
      }
      setStep(3);
    } else if (step === 3) {
      if (!course) {
        showToast('Please select your preferred B.Tech branch', 'error');
        return;
      }
      setStep(4);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/applications', {
        studentName: name,
        email,
        phone,
        dateOfBirth: dob,
        gender,
        address,
        course,
        plusTwoPercent: Number(marksPercent),
        entranceScore: Number(entranceScore),
        category,
        documents: ['marklist_lh.pdf', 'keam_rankcard.pdf'] // Mock files upload
      });

      setApplicationId(response.data.application._id);
      setSuccess(true);
      showToast('Application submitted successfully!', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Submission failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '24px' }}>
        {/* Floating Confetti Orbs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bokeh-orb"
              style={{
                background: i % 2 === 0 ? '#00D4FF' : '#6C63FF',
                width: '15px',
                height: '15px',
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
                opacity: 0.8,
                filter: 'none',
                animation: 'float 4s infinite linear'
              }}
            ></div>
          ))}
        </div>

        <GlassCard style={{ maxWidth: '500px', width: '100%', padding: '48px', textAlign: 'center', zIndex: 10 }} className="animate-fade-in-up">
          <CheckCircle2 size={64} style={{ color: '#2ECC71', margin: '0 auto 24px auto' }} />
          <h2 className="gradient-text-purple-cyan" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
            Congratulations!
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1rem' }}>
            Your admission application has been submitted successfully to Ahalia School of Engineering & Technology (ASET).
          </p>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '32px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>APPLICATION REFERENCE ID</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#00D4FF', fontSize: '1.1rem' }}>{applicationId}</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <GlassButton to="/student-dashboard" variant="secondary" style={{ flex: 1, justifyContent: 'center' }}>
              Dashboard
            </GlassButton>
            <GlassButton to="/my-application" variant="primary" style={{ flex: 1, justifyContent: 'center' }}>
              View Status
            </GlassButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }} className="animate-fade-in-up">
      {/* Progress pill indicator */}
      <GlassCard style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Step {step} of 4</span>
        <div style={{ display: 'flex', gap: '8px', flexGrow: 1, marginLeft: '24px', maxWidth: '300px' }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: '6px',
                borderRadius: '3px',
                background: step >= i ? 'linear-gradient(90deg, #6C63FF, #00D4FF)' : 'rgba(255,255,255,0.1)',
                boxShadow: step >= i ? '0 0 6px #00D4FF' : 'none'
              }}
            ></div>
          ))}
        </div>
      </GlassCard>

      <GlassCard style={{ padding: '40px' }}>
        <h2 className="gradient-text-purple-cyan" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '32px', textAlign: 'center' }}>
          {step === 1 && 'Personal Information'}
          {step === 2 && 'Academic Records'}
          {step === 3 && 'Branch Preferences'}
          {step === 4 && 'Review & Submit'}
        </h2>

        {/* Step 1: Personal details */}
        {step === 1 && (
          <form onSubmit={handleNext}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <GlassInput label="Full Name" placeholder="Rahul Nair" value={name} onChange={(e) => setName(e.target.value)} required />
              <GlassInput label="Email Address" type="email" placeholder="rahul@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <GlassInput label="Phone Number" placeholder="+91 9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <GlassInput label="Date of Birth" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginTop: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Gender</label>
                <select className="glass-input" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <GlassInput label="Nationality" placeholder="Indian" value={nationality} onChange={(e) => setNationality(e.target.value)} required />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Category</label>
                <select className="glass-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px', marginBottom: '32px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Permanent Address</label>
              <textarea rows={3} className="glass-input" placeholder="Enter residential address details" value={address} onChange={(e) => setAddress(e.target.value)} required style={{ resize: 'none' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <GlassButton type="submit" variant="primary">
                Next Step <ChevronRight size={16} />
              </GlassButton>
            </div>
          </form>
        )}

        {/* Step 2: Academics */}
        {step === 2 && (
          <form onSubmit={handleNext}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <button
                type="button"
                onClick={() => setQualifyingExam('Plus Two')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  background: qualifyingExam === 'Plus Two' ? 'rgba(0, 212, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${qualifyingExam === 'Plus Two' ? '#00D4FF' : 'rgba(255, 255, 255, 0.15)'}`,
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Plus Two / HSE
              </button>
              <button
                type="button"
                onClick={() => setQualifyingExam('Diploma')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  background: qualifyingExam === 'Diploma' ? 'rgba(0, 212, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${qualifyingExam === 'Diploma' ? '#00D4FF' : 'rgba(255, 255, 255, 0.15)'}`,
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Diploma
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <GlassInput label="School / College Name" placeholder="GHSS Palakkad" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required />
              <GlassInput label="Year of Passing" placeholder="2026" value={yearOfPassing} onChange={(e) => setYearOfPassing(e.target.value)} required />
              
              <div style={{ position: 'relative' }}>
                <GlassInput
                  label="PCM / Total Percentage"
                  placeholder="e.g. 84.5"
                  value={marksPercent}
                  onChange={(e) => setMarksPercent(e.target.value)}
                  required
                />
                {marksPercent && (
                  <div style={{ position: 'absolute', right: '12px', top: '38px' }}>
                    {isEligible ? (
                      <span style={{ color: '#2ECC71', fontWeight: 'bold' }}>✓ Eligible</span>
                    ) : (
                      <span style={{ color: '#FF6B6B', fontWeight: 'bold' }}>✗ Ineligible (Min 50%)</span>
                    )}
                  </div>
                )}
              </div>

              <GlassInput label="KEAM Score / JEE Rank" placeholder="e.g. 18245" value={entranceScore} onChange={(e) => setEntranceScore(e.target.value)} required />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px', marginBottom: '32px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Board of Examination</label>
              <select className="glass-input" value={boardName} onChange={(e) => setBoardName(e.target.value)}>
                <option value="CBSE">CBSE</option>
                <option value="Kerala HSE">Kerala State HSE</option>
                <option value="ICSE">ICSE</option>
                <option value="Other">Other Board</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <GlassButton type="button" variant="secondary" onClick={handleBack}>
                <ChevronLeft size={16} /> Back
              </GlassButton>
              <GlassButton type="submit" variant="primary">
                Next Step <ChevronRight size={16} />
              </GlassButton>
            </div>
          </form>
        )}

        {/* Step 3: Branch select */}
        {step === 3 && (
          <form onSubmit={handleNext}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <label style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Select B.Tech Branch (1st Preference)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {branches.map((b, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCourse(b)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: course === b ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${course === b ? '#00D4FF' : 'rgba(255, 255, 255, 0.12)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: course === b ? '0 0 10px rgba(0, 212, 255, 0.2)' : 'none'
                    }}
                  >
                    <span style={{ fontWeight: 600, color: '#fff' }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '32px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Second Preference (Optional)</label>
              <select className="glass-input" value={preference2} onChange={(e) => setPreference2(e.target.value)}>
                {branches.filter((b) => b !== course).map((b, idx) => (
                  <option key={idx} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <GlassButton type="button" variant="secondary" onClick={handleBack}>
                <ChevronLeft size={16} /> Back
              </GlassButton>
              <GlassButton type="submit" variant="primary">
                Next Step <ChevronRight size={16} />
              </GlassButton>
            </div>
          </form>
        )}

        {/* Step 4: Review and submit */}
        {step === 4 && (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              
              <GlassCard style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.02)' }}>
                <h4 style={{ color: '#00D4FF', fontWeight: 700, marginBottom: '12px' }}>Personal Information</h4>
                <p style={{ fontSize: '0.9rem' }}><strong>Name:</strong> {name}</p>
                <p style={{ fontSize: '0.9rem' }}><strong>Email:</strong> {email}</p>
                <p style={{ fontSize: '0.9rem' }}><strong>Phone:</strong> {phone}</p>
                <p style={{ fontSize: '0.9rem' }}><strong>DOB / Gender:</strong> {dob} / {gender}</p>
                <p style={{ fontSize: '0.9rem' }}><strong>Category:</strong> {category}</p>
              </GlassCard>

              <GlassCard style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.02)' }}>
                <h4 style={{ color: '#00D4FF', fontWeight: 700, marginBottom: '12px' }}>Academics</h4>
                <p style={{ fontSize: '0.9rem' }}><strong>Exam:</strong> {qualifyingExam}</p>
                <p style={{ fontSize: '0.9rem' }}><strong>Percentage:</strong> {marksPercent}%</p>
                <p style={{ fontSize: '0.9rem' }}><strong>KEAM Score / JEE Rank:</strong> {entranceScore}</p>
              </GlassCard>

              <GlassCard style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.02)' }}>
                <h4 style={{ color: '#00D4FF', fontWeight: 700, marginBottom: '12px' }}>Preferences</h4>
                <p style={{ fontSize: '0.9rem' }}><strong>Applied Course:</strong> {course}</p>
                <p style={{ fontSize: '0.9rem' }}><strong>Second Preference:</strong> {preference2}</p>
              </GlassCard>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '32px' }}>
              <input type="checkbox" id="declare" required style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
              <label htmlFor="declare" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                I confirm that all the information provided above is accurate to the best of my knowledge.
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <GlassButton type="button" variant="secondary" onClick={handleBack}>
                <ChevronLeft size={16} /> Back
              </GlassButton>
              <GlassButton type="submit" variant="primary" loading={loading} style={{ animation: 'pulse 2s infinite' }}>
                <Send size={16} /> Submit Application
              </GlassButton>
            </div>
          </form>
        )}
      </GlassCard>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(0, 212, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0); }
        }
      `}</style>
    </div>
  );
};

export default AdmissionForm;
