import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import { DollarSign, Landmark, GraduationCap, Award, HelpCircle } from 'lucide-react';

const Courses = () => {
  const [activeFeeTab, setActiveFeeTab] = useState('ce-eee');

  const branches = [
    {
      name: 'Artificial Intelligence & Machine Learning',
      duration: '4 Years',
      seats: '60 Seats',
      eligibility: 'Plus Two with PCM (50% aggregate) + KEAM Rank',
      prospects: 'AI Research Scientist, Machine Learning Engineer, Data Analyst, Software Architect.'
    },
    {
      name: 'Computer Science & Engineering',
      duration: '4 Years',
      seats: '120 Seats',
      eligibility: 'Plus Two with PCM (50% aggregate) + KEAM Rank',
      prospects: 'Full Stack Developer, Cloud Systems Administrator, DevOps Engineer, Security Analyst.'
    },
    {
      name: 'Electronics & Communication Engineering',
      duration: '4 Years',
      seats: '60 Seats',
      eligibility: 'Plus Two with PCM (50% aggregate) + KEAM Rank',
      prospects: 'VLSI Engineer, Embedded Systems Developer, RF Architect, Telecom Consultant.'
    },
    {
      name: 'Electrical & Electronics Engineering',
      duration: '4 Years',
      seats: '30 Seats',
      eligibility: 'Plus Two with PCM (50% aggregate) + KEAM Rank',
      prospects: 'Power Grid Engineer, Renewable Energy Consultant, Control Systems Designer, EV Specialist.'
    },
    {
      name: 'Mechanical Engineering',
      duration: '4 Years',
      seats: '30 Seats',
      eligibility: 'Plus Two with PCM (50% aggregate) + KEAM Rank',
      prospects: 'Aeronautical Systems, Automotive Engineer, Automation & Robotics Designer, HVAC Consultant.'
    },
    {
      name: 'Civil Engineering',
      duration: '4 Years',
      seats: '30 Seats',
      eligibility: 'Plus Two with PCM (50% aggregate) + KEAM Rank',
      prospects: 'Structural Designer, Smart Cities Construction Manager, Transport Planner, Surveyor.'
    }
  ];

  const feeData = {
    'ce-eee': {
      title: 'Civil (CE) & Electrical (EEE) Engineering',
      sub: 'Merit, Management & NRI Quotas',
      rows: [
        { name: 'Tution Fee', y1: '15,000/-', y2: '15,000/-', y3: '15,000/-', y4: '15,000/-' },
        { name: 'Special Fees', y1: '25,000/-', y2: '25,000/-', y3: '25,000/-', y4: '25,000/-' },
        { name: 'Admission', y1: '18,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Caution Deposit', y1: '10,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Students Establishment Fees', y1: '0', y2: '14,000/-', y3: '14,000/-', y4: '14,000/-' },
        { name: 'University Registration', y1: '1,050/-', y2: '0', y3: '0', y4: '0' },
        { name: 'University Arts & Sports', y1: '0', y2: '530/-', y3: '530/-', y4: '530/-' },
        { name: 'Total', y1: '69,050/-', y2: '54,530/-', y3: '54,530/-', y4: '54,530/-', highlight: true }
      ]
    },
    'ece': {
      title: 'Electronics & Communication (ECE)',
      sub: 'Merit, Management & NRI Quotas',
      rows: [
        { name: 'Tution Fee', y1: '50,000/-', y2: '50,000/-', y3: '50,000/-', y4: '50,000/-' },
        { name: 'Special Fees', y1: '25,000/-', y2: '25,000/-', y3: '25,000/-', y4: '25,000/-' },
        { name: 'Admission', y1: '18,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Caution Deposit', y1: '10,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Students Establishment Fees', y1: '0', y2: '14,000/-', y3: '14,000/-', y4: '14,000/-' },
        { name: 'University Registration', y1: '1,050/-', y2: '0', y3: '0', y4: '0' },
        { name: 'University Arts & Sports', y1: '0', y2: '530/-', y3: '530/-', y4: '530/-' },
        { name: 'Total', y1: '104,050/-', y2: '89,530/-', y3: '89,530/-', y4: '89,530/-', highlight: true }
      ]
    },
    'cse-merit': {
      title: 'Computer Science & Engineering (CSE) - Merit Quota',
      sub: 'Merit Quota Seats',
      rows: [
        { name: 'Tution Fee', y1: '50,000/-', y2: '50,000/-', y3: '50,000/-', y4: '50,000/-' },
        { name: 'Special Fees', y1: '25,000/-', y2: '25,000/-', y3: '25,000/-', y4: '25,000/-' },
        { name: 'Admission', y1: '18,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Caution Deposit', y1: '10,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Students Establishment Fees', y1: '0', y2: '14,000/-', y3: '14,000/-', y4: '14,000/-' },
        { name: 'University Registration', y1: '1,050/-', y2: '0', y3: '0', y4: '0' },
        { name: 'University Arts & Sports', y1: '0', y2: '530/-', y3: '530/-', y4: '530/-' },
        { name: 'Total', y1: '104,050/-', y2: '89,530/-', y3: '89,530/-', y4: '89,530/-', highlight: true }
      ]
    },
    'cse-mgmt': {
      title: 'Computer Science (CSE) - Management & NRI',
      sub: 'Management & NRI Quotas',
      rows: [
        { name: 'Tution Fee', y1: '75,000/-', y2: '75,000/-', y3: '75,000/-', y4: '75,000/-' },
        { name: 'Special Fees', y1: '25,000/-', y2: '25,000/-', y3: '25,000/-', y4: '25,000/-' },
        { name: 'Admission', y1: '18,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Caution Deposit', y1: '10,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Students Establishment Fees', y1: '0', y2: '14,000/-', y3: '14,000/-', y4: '14,000/-' },
        { name: 'University Registration', y1: '1,050/-', y2: '0', y3: '0', y4: '0' },
        { name: 'University Arts & Sports', y1: '0', y2: '530/-', y3: '530/-', y4: '530/-' },
        { name: 'Total', y1: '1,29,050/-', y2: '1,14,530/-', y3: '1,14,530/-', y4: '1,14,530/-', highlight: true }
      ]
    },
    'aiml-merit': {
      title: 'Artificial Intelligence & ML (AI&ML) - Merit',
      sub: 'Merit Quota Seats',
      rows: [
        { name: 'Tution Fee', y1: '50,000/-', y2: '50,000/-', y3: '50,000/-', y4: '50,000/-' },
        { name: 'Special Fees', y1: '25,000/-', y2: '25,000/-', y3: '25,000/-', y4: '25,000/-' },
        { name: 'Admission', y1: '18,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Caution Deposit', y1: '10,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Students Establishment Fees', y1: '0', y2: '14,000/-', y3: '14,000/-', y4: '14,000/-' },
        { name: 'University Registration', y1: '1,050/-', y2: '0', y3: '0', y4: '0' },
        { name: 'University Arts & Sports', y1: '0', y2: '530/-', y3: '530/-', y4: '530/-' },
        { name: 'Total', y1: '104,050/-', y2: '89,530/-', y3: '89,530/-', y4: '89,530/-', highlight: true }
      ]
    },
    'aiml-mgmt': {
      title: 'Artificial Intelligence & ML (AI&ML) - Management & NRI',
      sub: 'Management & NRI Quotas',
      rows: [
        { name: 'Tution Fee', y1: '75,000/-', y2: '50,000/-', y3: '50,000/-', y4: '50,000/-' },
        { name: 'Special Fees', y1: '25,000/-', y2: '25,000/-', y3: '25,000/-', y4: '25,000/-' },
        { name: 'Admission', y1: '18,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Caution Deposit', y1: '10,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Students Establishment Fees', y1: '0', y2: '14,000/-', y3: '14,000/-', y4: '14,000/-' },
        { name: 'University Registration', y1: '1,050/-', y2: '0', y3: '0', y4: '0' },
        { name: 'University Arts & Sports', y1: '0', y2: '530/-', y3: '530/-', y4: '530/-' },
        { name: 'Total', y1: '129,050/-', y2: '114,530/-', y3: '114,530/-', y4: '114,530/-', highlight: true }
      ]
    },
    'me': {
      title: 'Mechanical Engineering (ME)',
      sub: 'Merit, Management & NRI Quotas',
      rows: [
        { name: 'Tution Fee', y1: '20,000/-', y2: '20,000/-', y3: '20,000/-', y4: '20,000/-' },
        { name: 'Special Fees', y1: '25,000/-', y2: '25,000/-', y3: '25,000/-', y4: '25,000/-' },
        { name: 'Admission', y1: '18,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Caution Deposit', y1: '10,000/-', y2: '0', y3: '0', y4: '0' },
        { name: 'Students Establishment Fees', y1: '0', y2: '14,000/-', y3: '14,000/-', y4: '14,000/-' },
        { name: 'University Registration', y1: '1,050/-', y2: '0', y3: '0', y4: '0' },
        { name: 'University Arts & Sports', y1: '0', y2: '530/-', y3: '530/-', y4: '530/-' },
        { name: 'Total', y1: '74,050/-', y2: '59,530/-', y3: '59,530/-', y4: '59,530/-', highlight: true }
      ]
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }} className="animate-fade-in-up">
      <h1 className="gradient-text-purple-cyan" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '16px' }}>
        Our B.Tech Branches
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px auto', fontSize: '1.1rem' }}>
        ASET offers AICTE approved four-year undergraduate B.Tech programs affiliated to APJ Abdul Kalam Technological University (KTU).
      </p>

      {/* Grid of branches */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', marginBottom: '60px' }}>
        {branches.map((branch, idx) => (
          <GlassCard key={idx} hoverable style={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px', color: '#00D4FF' }}>{branch.name}</h3>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span className="glass-badge" style={{ background: 'rgba(255,255,255,0.06)' }}>Duration: {branch.duration}</span>
              <span className="glass-badge" style={{ background: 'rgba(108, 99, 255, 0.1)', color: '#b4b0ff' }}>{branch.seats}</span>
            </div>
            <div style={{ fontSize: '0.9rem', marginBottom: '16px', lineHeight: '1.5', flexGrow: 1 }}>
              <p style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>
                <strong>Eligibility:</strong> {branch.eligibility}
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                <strong>Career Prospects:</strong> {branch.prospects}
              </p>
            </div>
            <GlassButton to="/register" variant="primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
              Apply Now
            </GlassButton>
          </GlassCard>
        ))}
      </div>

      {/* Interactive Fee Structure Section */}
      <h2 className="gradient-text-purple-cyan" style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '12px' }}>
        ASET B.Tech Fee Structure (Admissions 2025-26)
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '650px', margin: '0 auto 32px auto' }}>
        View detailed breakdown structure for Merit, Management, and NRI quotas across all branches.
      </p>

      {/* Tabs list */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
        {[
          { id: 'ce-eee', label: 'CE / EEE' },
          { id: 'ece', label: 'ECE' },
          { id: 'cse-merit', label: 'CSE (Merit)' },
          { id: 'cse-mgmt', label: 'CSE (Mgmt/NRI)' },
          { id: 'aiml-merit', label: 'AI&ML (Merit)' },
          { id: 'aiml-mgmt', label: 'AI&ML (Mgmt/NRI)' },
          { id: 'me', label: 'Mechanical' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFeeTab(tab.id)}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: `1px solid ${activeFeeTab === tab.id ? '#00D4FF' : 'var(--glass-btn-border)'}`,
              background: activeFeeTab === tab.id ? 'rgba(0, 212, 255, 0.12)' : 'var(--glass-btn-bg)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.3s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Selected Tab Table */}
      <GlassCard style={{ padding: '24px', overflowX: 'auto', marginBottom: '48px' }}>
        <div style={{ marginBottom: '16px', paddingLeft: '8px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{feeData[activeFeeTab].title}</h3>
          <span style={{ fontSize: '0.85rem', color: '#00D4FF' }}>{feeData[activeFeeTab].sub}</span>
        </div>
        <table className="glass-table">
          <thead>
            <tr>
              <th>Fee Head</th>
              <th>1st Year</th>
              <th>2nd Year</th>
              <th>3rd Year</th>
              <th>4th Year</th>
            </tr>
          </thead>
          <tbody>
            {feeData[activeFeeTab].rows.map((row, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: row.highlight ? 800 : 500, color: row.highlight ? '#00D4FF' : 'var(--text-primary)' }}>
                  {row.name}
                </td>
                <td style={{ fontWeight: row.highlight ? 800 : 400, color: row.highlight ? '#00D4FF' : 'var(--text-primary)' }}>
                  {row.y1}
                </td>
                <td style={{ fontWeight: row.highlight ? 800 : 400, color: row.highlight ? '#00D4FF' : 'var(--text-primary)' }}>
                  {row.y2}
                </td>
                <td style={{ fontWeight: row.highlight ? 800 : 400, color: row.highlight ? '#00D4FF' : 'var(--text-primary)' }}>
                  {row.y3}
                </td>
                <td style={{ fontWeight: row.highlight ? 800 : 400, color: row.highlight ? '#00D4FF' : 'var(--text-primary)' }}>
                  {row.y4}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

      {/* General fee notices */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        <GlassCard style={{ padding: '24px' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '12px', color: '#FFD93D', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={18} /> Important Notes
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <li>• Tuition fee subject to changes as notified by Government.</li>
            <li>• Yearly fee for conveyance (College Bus) / Hostel is charged separately.</li>
            <li>• University Exam fees paid as per KTU guidelines.</li>
            <li>• University registration (Rs. 1050) is only charged in the first year.</li>
          </ul>
        </GlassCard>

        <GlassCard style={{ padding: '24px' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '12px', color: '#2ECC71', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} /> Merit Scholarships
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Ahalia Merit Scholarships are awarded to high-performing students. Merit category fee concessions are available for KEAM toppers, JEE high-scoring percentiles, and outstanding Plus Two students.
          </p>
        </GlassCard>
      </div>

      {/* Admission requirements table */}
      <h2 className="gradient-text-purple-cyan" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '32px' }}>
        Admission Requirements
      </h2>

      <GlassCard style={{ padding: '24px', overflowX: 'auto', marginBottom: '40px' }}>
        <table className="glass-table">
          <thead>
            <tr>
              <th>Criteria</th>
              <th>Requirement Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600, color: '#00D4FF' }}>Qualification</td>
              <td>Plus Two / HSE / VHSE with Physics, Chemistry & Mathematics (PCM) or equivalent Diploma.</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, color: '#00D4FF' }}>Minimum Marks</td>
              <td>50% aggregate in PCM (45% for SC/ST candidate groups).</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, color: '#00D4FF' }}>Age Limit</td>
              <td>Maximum 25 years as of the admission year.</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, color: '#00D4FF' }}>Entrance Exam</td>
              <td>Valid KEAM rank card (mandatory for government/quota seats) or JEE Mains score.</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, color: '#00D4FF' }}>Documents Required</td>
              <td>Plus Two mark sheet, Transfer Certificate (TC), Migration Certificate, Passport size photos, Aadhaar Card, Caste Certificate (if seeking quota).</td>
            </tr>
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
};

export default Courses;
