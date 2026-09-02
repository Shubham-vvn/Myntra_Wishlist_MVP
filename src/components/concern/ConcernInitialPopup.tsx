import React from 'react';
import { useAppStore } from '../../store/appStore';
import { Bell } from 'lucide-react';

export const ConcernInitialPopup: React.FC = () => {
  const store = useAppStore();
  const { isOpen, step } = store.concernModal;

  if (!isOpen || step !== 3) return null;

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
          padding: '28px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: 'var(--shadow-modal)'
        }}
      >
        {/* Illustrated Bell Icon in Soft Pink Circle (Matching wireframes.png Screen 3) */}
        <div style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          backgroundColor: 'var(--myntra-pink-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '18px',
          position: 'relative'
        }}>
          <Bell 
            size={34} 
            color="var(--myntra-pink)" 
            className="animate-bell" 
            strokeWidth={2.2}
          />
          {/* Subtle vibrating soundwave lines */}
          <div style={{
            position: 'absolute',
            inset: '-6px',
            border: '1.5px dashed var(--myntra-pink-border)',
            borderRadius: '50%'
          }} />
        </div>

        {/* Headline */}
        <h3 style={{
          fontSize: '18px',
          fontWeight: 800,
          color: 'var(--myntra-navy)',
          lineHeight: '1.35',
          marginBottom: '8px',
          maxWidth: '300px'
        }}>
          What would make you buy this? 👀
        </h3>

        {/* Subtitle */}
        <p style={{
          fontSize: '13px',
          color: 'var(--myntra-text-secondary)',
          marginBottom: '24px'
        }}>
          We’ll keep an eye on it so you don’t have to.
        </p>

        {/* Primary CTA: YES, NOTIFY ME */}
        <button
          onClick={() => store.proceedToConcernCategories()}
          className="btn-myntra-primary"
          style={{
            width: '100%',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '14px',
            fontWeight: 800,
            marginBottom: '10px'
          }}
        >
          YES, NOTIFY ME
        </button>

        {/* Secondary CTA: NOT NOW */}
        <button
          onClick={() => store.dismissConcernModal()}
          className="btn-myntra-ghost"
          style={{
            width: '100%',
            height: '40px',
            color: 'var(--myntra-navy)'
          }}
        >
          NOT NOW
        </button>
      </div>
    </div>
  );
};
