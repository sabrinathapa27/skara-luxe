// components/Notification.jsx
import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Notification = ({ id, message, type, onClose, duration = 3000 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(id), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const config = {
    success: {
      bg: '#ecfdf5',
      border: '#a7f3d0',
      text: '#065f46',
      icon: <CheckCircle size={20} style={{ flexShrink: 0 }} />
    },
    error: {
      bg: '#fef2f2',
      border: '#fecaca',
      text: '#7f1d1d',
      icon: <AlertCircle size={20} style={{ flexShrink: 0 }} />
    },
    info: {
      bg: '#eff6ff',
      border: '#bfdbfe',
      text: '#1e3a8a',
      icon: <Info size={20} style={{ flexShrink: 0 }} />
    }
  };

  const style = config[type] || config.success;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        padding: '16px',
        borderRadius: '12px',
        border: `2px solid ${style.border}`,
        backgroundColor: style.bg,
        color: style.text,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        animation: isExiting 
          ? 'slideOut 0.3s ease-out forwards' 
          : 'slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        backdropFilter: 'blur(4px)',
        maxWidth: '400px',
        wordWrap: 'break-word'
      }}
    >
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(400px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(400px) scale(0.95);
          }
        }
      `}</style>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ color: style.text, marginTop: '2px' }}>
          {style.icon}
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.5' }}>
            {message}
          </span>
        </div>
        <button 
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => onClose(id), 300);
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'inherit',
            opacity: 0.6,
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.6'}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Notification;