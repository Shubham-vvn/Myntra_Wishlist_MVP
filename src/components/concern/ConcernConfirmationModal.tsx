import React from 'react';
import { useAppStore } from '../../store/appStore';
import { Check } from 'lucide-react';

export const ConcernConfirmationModal: React.FC = () => {
  const store = useAppStore();
  const { isOpen, step, confirmationMessage } = store.concernModal;

  if (!isOpen || step !== 6) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '34px',
      bottom: '14px',
      left: 0,
      right: 0,
      backgroundColor: 'rgba(40, 44, 63, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 110
    }}>
      <div 
        className="animate-slide-up"
        style={{
          width: '100%',
          backgroundColor: 'var(--myntra-bg-white)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: '32px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: 'var(--shadow-modal)'
        }}
      >
        {/* Animated Green Circle with Checkmark (Screen 6 from wireframes.png) */}
        <div 
          className="animate-checkmark"
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--myntra-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '18px',
            boxShadow: '0 6px 18px rgba(3, 166, 133, 0.3)'
          }}
        >
          <Check size={36} color="#ffffff" strokeWidth={3.2} />
        </div>

        {/* Headline */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 800,
          color: 'var(--myntra-navy)',
          marginBottom: '8px'
        }}>
          You're all set!
        </h3>

        {/* Dynamic Subtitle */}
        <p style={{
          fontSize: '13px',
          color: 'var(--myntra-text-secondary)',
          lineHeight: '1.4',
          marginBottom: '28px',
          maxWidth: '280px'
        }}>
          {confirmationMessage || "We'll notify you as soon as there is an update."}
        </p>

        {/* Primary CTA: DONE (Matching wireframes.png) */}
        <button
          onClick={() => store.completeConcernFlow()}
          className="btn-myntra-primary"
          style={{
            width: '100%',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '14px',
            fontWeight: 800
          }}
        >
          DONE
        </button>
      </div>
    </div>
  );
};
