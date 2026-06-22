import React from 'react';

const GlassInput = ({
  label,
  error,
  type = 'text',
  className = '',
  id,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium"
          style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)', paddingLeft: '4px' }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className="glass-input"
        {...props}
      />
      {error && (
        <span
          className="text-xs"
          style={{
            color: '#FF6B6B',
            fontSize: '0.8rem',
            paddingLeft: '4px',
            textShadow: '0 0 8px rgba(255, 107, 107, 0.3)'
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default GlassInput;
