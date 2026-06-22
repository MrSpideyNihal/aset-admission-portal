import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import GlassInput from '../components/GlassInput';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showToast('All form fields are required', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      showToast('Thank you! Your message has been sent successfully.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }} className="animate-fade-in-up">
      <h1 className="gradient-text-purple-cyan" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '16px' }}>
        Contact Us
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px auto', fontSize: '1.1rem' }}>
        Have questions about admissions, programs, or campus visits? Reach out to our helpdesk team.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '60px' }}>
        {/* Contact info cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <GlassCard style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.15)' }}>
              <MapPin size={24} style={{ color: '#00D4FF' }} />
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>Our Location</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Ahalia Campus, Kozhikode Road, Palakkad, Kerala — 678557</p>
            </div>
          </GlassCard>

          <GlassCard style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(108, 99, 255, 0.08)', border: '1px solid rgba(108, 99, 255, 0.15)' }}>
              <Phone size={24} style={{ color: '#6C63FF' }} />
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>Call Helpdesk</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>+91 491 2505000 | +91 491 2503000</p>
            </div>
          </GlassCard>

          <GlassCard style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(46, 204, 113, 0.08)', border: '1px solid rgba(46, 204, 113, 0.15)' }}>
              <Mail size={24} style={{ color: '#2ECC71' }} />
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>Email Queries</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>info@ahalia.ac.in | admissions@ahalia.ac.in</p>
            </div>
          </GlassCard>

          {/* Socials card */}
          <GlassCard style={{ padding: '24px', textAlign: 'center' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '16px' }}>Follow ASET Communities</h4>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="glass-btn" style={{ padding: '10px', borderRadius: '10px' }}>
                <svg style={{ width: '18px', height: '18px', fill: 'currentColor' }} viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="glass-btn" style={{ padding: '10px', borderRadius: '10px' }}>
                <svg style={{ width: '18px', height: '18px', fill: 'currentColor' }} viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="glass-btn" style={{ padding: '10px', borderRadius: '10px' }}>
                <svg style={{ width: '18px', height: '18px', fill: 'currentColor' }} viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="glass-btn" style={{ padding: '10px', borderRadius: '10px' }}>
                <svg style={{ width: '18px', height: '18px', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }} viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Contact Form */}
        <GlassCard style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '24px' }}>Send a Message</h3>
          <form onSubmit={handleSubmit}>
            <GlassInput
              label="Full Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <GlassInput
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <GlassInput
              label="Subject"
              placeholder="What are you querying about?"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', paddingLeft: '4px' }}>Message</label>
              <textarea
                rows={4}
                placeholder="Write details of your query..."
                className="glass-input"
                style={{ resize: 'none', minHeight: '100px' }}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <GlassButton type="submit" variant="primary" loading={loading} style={{ width: '100%', justifyContent: 'center' }}>
              <Send size={16} /> Send Message
            </GlassButton>
          </form>
        </GlassCard>
      </div>

      {/* Map embed */}
      <GlassCard style={{ padding: '8px', height: '350px', marginBottom: '40px' }}>
        <iframe
          title="ASET Campus Map Location"
          src="https://maps.google.com/maps?q=Ahalia+School+of+Engineering+and+Technology&z=15&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </GlassCard>
    </div>
  );
};

export default Contact;
