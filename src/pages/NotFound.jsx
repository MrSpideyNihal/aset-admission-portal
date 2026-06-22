import React from 'react';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', padding: '24px' }}>
      <GlassCard style={{ padding: '48px', textAlign: 'center', maxWidth: '480px', width: '100%' }} className="animate-fade-in-up">
        <h1 className="gradient-text-purple-cyan" style={{ fontSize: '6rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1 }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>Oops! Page not found</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px', fontSize: '0.95rem' }}>
          The URL you requested does not exist or may have been moved. Let's get you back to the home page.
        </p>
        <GlassButton to="/" variant="primary" style={{ justifyContent: 'center', width: '100%' }}>
          <Home size={18} /> Back to Home
        </GlassButton>
      </GlassCard>
    </div>
  );
};

export default NotFound;
