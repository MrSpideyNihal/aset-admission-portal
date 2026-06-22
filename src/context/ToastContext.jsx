import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => {
          let accentColor = '#00D4FF'; // info
          if (toast.type === 'success') accentColor = '#2ECC71';
          if (toast.type === 'error') accentColor = '#FF6B6B';
          if (toast.type === 'warning') accentColor = '#FFD93D';

          return (
            <div
              key={toast.id}
              className="toast-card glass-panel"
              style={{
                borderLeft: `4px solid ${accentColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                borderRadius: '12px'
              }}
            >
              <div style={{ marginRight: '8px' }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
export default ToastContext;
