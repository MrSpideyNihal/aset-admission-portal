import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import { Cpu, HardDrive, Cpu as EceIcon, Zap, Settings, Globe, Award, Shield, Users, Trophy, Star, ChevronRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const fullText = 'Welcome to ASET';

  // Typing effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Stats values
  const [stats, setStats] = useState({ students: 0, years: 0, placements: 0, programs: 0 });
  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setStats({
        students: Math.min(Math.floor((1000 / steps) * step), 1000),
        years: Math.min(Math.floor((25 / steps) * step), 25),
        placements: Math.min(Math.floor((90 / steps) * step), 90),
        programs: Math.min(Math.floor((6 / steps) * step), 6)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const courses = [
    {
      name: 'Artificial Intelligence & Machine Learning',
      icon: <Cpu size={32} style={{ color: '#00D4FF' }} />,
      desc: 'Focuses on building intelligent machines using deep learning, neural networks, and modern data-driven methodologies.'
    },
    {
      name: 'Computer Science & Engineering',
      icon: <Globe size={32} style={{ color: '#6C63FF' }} />,
      desc: 'Comprehensive engineering discipline covering algorithms, software development, web systems, databases, and cybersecurity.'
    },
    {
      name: 'Electronics & Communication Engineering',
      icon: <EceIcon size={32} style={{ color: '#FF6B6B' }} />,
      desc: 'Covers semiconductor devices, communication protocols, microprocessors, signal processing, and embedded systems.'
    },
    {
      name: 'Electrical & Electronics Engineering',
      icon: <Zap size={32} style={{ color: '#FFD93D' }} />,
      desc: 'Core division focusing on power generation, grid networks, electrical machinery, renewable energy, and control designs.'
    },
    {
      name: 'Mechanical Engineering',
      icon: <Settings size={32} style={{ color: '#2ECC71' }} />,
      desc: 'Covers thermodynamics, structural design, manufacturing automation, fluid mechanics, and CAD/CAM modeling.'
    },
    {
      name: 'Civil Engineering',
      icon: <HardDrive size={32} style={{ color: '#FF8A00' }} />,
      desc: 'Focuses on designing, constructing, and maintaining modern physical infrastructures, smart cities, and transport channels.'
    }
  ];

  const newsItems = [
    { title: 'Faculty Publication in IEEE', date: 'June 15, 2026', desc: 'Dr. Ramesh Kumar publishes pioneering research on smart grids.' },
    { title: 'NPTEL Certified Students', date: 'June 11, 2026', desc: 'Over 120 students successfully pass Swayam NPTEL exams.' },
    { title: 'Batch Toppers 2022–26', date: 'June 10, 2026', desc: 'Announcing department rank holders and outstanding scholars.' },
    { title: 'World Environment Day 2026', date: 'June 5, 2026', desc: 'Campus plantation drive organized by ASET Green Club.' }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '80px 0 60px 0', position: 'relative' }}>
        {/* Particle stars */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', opacity: 0.2, animation: 'float 6s infinite ease-in-out' }}>
          <Star size={32} style={{ color: '#FFD93D' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '15%', right: '8%', opacity: 0.15, animation: 'float 8s infinite ease-in-out 1s' }}>
          <Star size={24} style={{ color: '#00D4FF' }} />
        </div>

        <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '20px', minHeight: '80px', fontFamily: 'var(--font-display)' }} className="gradient-text-purple-cyan">
          {typedText}
          <span style={{ borderRight: '3px solid #00D4FF', animation: 'blink 0.7s infinite' }}>&nbsp;</span>
        </h1>
        <p style={{ fontSize: '1.4rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '32px', fontWeight: 500 }}>
          Ahalia School of Engineering & Technology, Palakkad
        </p>

        {/* Badges row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
          <span className="glass-badge glass-badge-purple"><Shield size={14} style={{ marginRight: '6px' }} /> ISO 9001:2015</span>
          <span className="glass-badge glass-badge-cyan"><Award size={14} style={{ marginRight: '6px' }} /> AICTE Approved</span>
          <span className="glass-badge glass-badge-green"><Users size={14} style={{ marginRight: '6px' }} /> KTU Affiliated</span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <GlassButton to="/register" variant="primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            Apply for Admission
          </GlassButton>
          <GlassButton to="/login" variant="secondary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            Faculty Login
          </GlassButton>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <GlassCard hoverable style={{ padding: '32px', textAlign: 'center' }}>
            <Users size={40} style={{ color: '#00D4FF', margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>{stats.students}+</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>Active Students</p>
          </GlassCard>
          <GlassCard hoverable style={{ padding: '32px', textAlign: 'center' }}>
            <Award size={40} style={{ color: '#6C63FF', margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>{stats.years}+</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>Years of Excellence</p>
          </GlassCard>
          <GlassCard hoverable style={{ padding: '32px', textAlign: 'center' }}>
            <Trophy size={40} style={{ color: '#FFD93D', margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>{stats.placements}%</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>Placement Rate</p>
          </GlassCard>
          <GlassCard hoverable style={{ padding: '32px', textAlign: 'center' }}>
            <Settings size={40} style={{ color: '#2ECC71', margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>{stats.programs}</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>B.Tech Programs</p>
          </GlassCard>
        </div>
      </section>

      {/* Courses Section */}
      <section style={{ marginBottom: '80px' }}>
        <h2 className="gradient-text-purple-cyan" style={{ fontSize: '2.2rem', textAlign: 'center', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>Our B.Tech Programs</h2>
        <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px auto' }}>
          Explore state-of-the-art engineering curricula curated to match emerging industry demands.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {courses.map((course, idx) => (
            <GlassCard key={idx} hoverable style={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                  {course.icon}
                </div>
                <span className="glass-badge" style={{ background: 'rgba(255,255,255,0.06)' }}>4 Year Program</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', lineHeight: '1.4' }}>{course.name}</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', marginBottom: '24px', flexGrow: 1 }}>{course.desc}</p>
              <GlassButton to="/courses" variant="secondary" style={{ width: 'fit-content' }}>
                View Details <ChevronRight size={16} />
              </GlassButton>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Why ASET Section */}
      <section style={{ marginBottom: '80px' }}>
        <h2 className="gradient-text-purple-cyan" style={{ fontSize: '2.2rem', textAlign: 'center', marginBottom: '40px', fontFamily: 'var(--font-display)' }}>Why ASET?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <GlassCard style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: '#00D4FF' }}>Modern Labs</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem' }}>Fully equipped advanced engineering laboratories for hands-on, practical technical learning.</p>
          </GlassCard>
          <GlassCard style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: '#6C63FF' }}>Experienced Faculty</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem' }}>Highly credentialed professors dedicated to mentoring research and engineering foundations.</p>
          </GlassCard>
          <GlassCard style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: '#2ECC71' }}>Industry Connections</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem' }}>Strategic tie-ups and MoUs with tech institutions ensuring placements and internships.</p>
          </GlassCard>
          <GlassCard style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: '#FFD93D' }}>Green Campus</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem' }}>ISO certified environment-friendly eco-campus incorporating water recycling and solar grids.</p>
          </GlassCard>
        </div>
      </section>

      {/* News Section */}
      <section style={{ marginBottom: '80px' }}>
        <h2 className="gradient-text-purple-cyan" style={{ fontSize: '2.2rem', textAlign: 'center', marginBottom: '32px', fontFamily: 'var(--font-display)' }}>Latest Campus News</h2>
        <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '16px', scrollSnapType: 'x mandatory' }}>
          {newsItems.map((news, idx) => (
            <GlassCard key={idx} style={{ padding: '24px', minWidth: '300px', flex: '0 0 300px', scrollSnapAlign: 'start' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600 }}>{news.date}</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '8px 0 12px 0', color: '#00D4FF' }}>{news.title}</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>{news.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: '120px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '48px', paddingBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <h3 className="gradient-text-purple-cyan" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>ASET</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Ahalia School of Engineering & Technology, Palakkad is committed to training professional engineers who value technical excellence.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '16px', color: '#fff' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/about" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link></li>
              <li><Link to="/courses" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>B.Tech Courses</Link></li>
              <li><Link to="/contact" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>Contact Desk</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '16px', color: '#fff' }}>Contact Info</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: '8px' }}>
              Ahalia Campus, Kozhikode Road, Palakkad, Kerala — 678557
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: '8px' }}>
              Email: info@ahalia.ac.in
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
              Phone: +91 491 2505000
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '24px' }}>
          &copy; {new Date().getFullYear()} ASET Palakkad. All Rights Reserved.
        </div>
      </footer>

      <style>{`
        @keyframes blink {
          50% { border-color: transparent; }
        }
      `}</style>
    </div>
  );
};

// Helper link import
import { Link } from 'react-router-dom';

export default Home;
