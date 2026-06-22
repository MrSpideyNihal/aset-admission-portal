import React from 'react';
import GlassCard from '../components/GlassCard';
import { Landmark, Compass, Award, ShieldAlert, Cpu, Heart } from 'lucide-react';

const About = () => {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }} className="animate-fade-in-up">
      <h1 className="gradient-text-purple-cyan" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '16px' }}>
        About ASET Palakkad
      </h1>
      <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px auto', fontSize: '1.1rem' }}>
        Ahalia School of Engineering & Technology (ASET), Palakkad, established in 2012, is a premier institution offering high-quality technical education in Kerala.
      </p>

      {/* Grid: Vision & Mission */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '60px' }}>
        <GlassCard style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Compass size={28} style={{ color: '#00D4FF' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Our Vision</h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', fontSize: '0.95rem' }}>
            To be a center of excellence in engineering and technology education, nurturing professionals who are technically competent, socially committed, and ethically responsible contributors to global progress.
          </p>
        </GlassCard>

        <GlassCard style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Landmark size={28} style={{ color: '#6C63FF' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Our Mission</h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', fontSize: '0.95rem' }}>
            To provide quality academic instruction through state-of-the-art infrastructure, facilitate research and innovation, collaborate with industrial partners for skill enhancement, and cultivate moral leadership qualities.
          </p>
        </GlassCard>
      </div>

      {/* Principal's message */}
      <GlassCard style={{ padding: '40px', marginBottom: '60px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '60px',
            background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: 800,
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            PR
          </div>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '6px' }}>Principal's Message</h3>
            <span style={{ fontSize: '0.85rem', color: '#00D4FF', fontWeight: 600, display: 'block', marginBottom: '16px' }}>
              Dr. P R Suresh
            </span>
            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              "Engineering is the art of organizing and directing human activities to control the forces of nature for the benefit of humankind. At ASET, we emphasize hands-on learning, industrial projects, and professional values to prepare our scholars to meet modern industry challenges and innovate for tomorrow."
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Facilities section */}
      <h2 className="gradient-text-purple-cyan" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '32px' }}>
        Campus Facilities
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
        <GlassCard hoverable style={{ padding: '24px', textAlign: 'center' }}>
          <Landmark size={32} style={{ color: '#00D4FF', margin: '0 auto 16px auto' }} />
          <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Central Library</h4>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Access to over 20,000 journals, digital catalogs, and international research portals.</p>
        </GlassCard>
        <GlassCard hoverable style={{ padding: '24px', textAlign: 'center' }}>
          <Cpu size={32} style={{ color: '#6C63FF', margin: '0 auto 16px auto' }} />
          <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Advanced Labs</h4>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>High-speed workstations, robotic benches, and heavy machine shops.</p>
        </GlassCard>
        <GlassCard hoverable style={{ padding: '24px', textAlign: 'center' }}>
          <Award size={32} style={{ color: '#2ECC71', margin: '0 auto 16px auto' }} />
          <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Sports Arena</h4>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Comprehensive athletic tracks, indoor courts, and football fields.</p>
        </GlassCard>
        <GlassCard hoverable style={{ padding: '24px', textAlign: 'center' }}>
          <Heart size={32} style={{ color: '#FF6B6B', margin: '0 auto 16px auto' }} />
          <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Eco-Hostels</h4>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Separate boarding houses with modern catering and fully green security grids.</p>
        </GlassCard>
      </div>
    </div>
  );
};

export default About;
