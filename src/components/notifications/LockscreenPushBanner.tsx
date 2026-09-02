import React, { useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import { X } from 'lucide-react';

export const LockscreenPushBanner: React.FC = () => {
  const store = useAppStore();
  const banner = store.activePushBanner;

  // Auto-dismiss banner after 8 seconds if not clicked
  useEffect(() => {
    if (banner) {
      const timer = setTimeout(() => {
        store.dismissPushBanner();
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [banner, store]);

  if (!banner) return null;

  const handleBannerClick = () => {
    store.logEvent('notification_opened', { 
      notifId: banner.id, 
      productId: banner.productId,
      title: banner.title 
    });

    if (banner.productId) {
      store.openPdp(banner.productId);
    } else if (banner.isDigest) {
      store.openNotificationCenter();
    }
    store.dismissPushBanner();
  };

  return (
    <div 
      className="animate-slide-down"
      style={{
        position: 'absolute',
        top: '36px',
        left: '12px',
        right: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(40, 44, 63, 0.08)',
        borderRadius: 'var(--radius-xl)',
        padding: '12px 14px',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.22)',
        zIndex: 200,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}
      onClick={handleBannerClick}
    >
      {/* Top Header Row (Myntra Logo + App Name + 'now' + Close Button) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Myntra M glyph */}
          <div style={{
            width: '18px',
            height: '18px',
            borderRadius: '4px',
            backgroundColor: '#fff1f4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="14" height="12" viewBox="0 0 100 80" fill="none">
              <path d="M12 70V10L35 48L50 25L65 48L88 10V70H74V34L59 58H41L26 34V70H12Z" fill="#ff3f6c" />
            </svg>
          </div>
          
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--myntra-navy)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            Myntra
          </span>
          <span style={{ fontSize: '11px', color: 'var(--myntra-text-muted)' }}>
            • now
          </span>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            store.dismissPushBanner();
          }}
          style={{ color: 'var(--myntra-text-muted)', padding: '2px' }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Notification Body (Matching Screen 7 in wireframes.png) */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        {banner.productImage && (
          <img 
            src={banner.productImage} 
            alt="Product" 
            style={{ 
              width: '42px', 
              height: '42px', 
              borderRadius: 'var(--radius-sm)', 
              objectFit: 'cover',
              flexShrink: 0
            }} 
          />
        )}

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
            {banner.title}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--myntra-text-secondary)', lineHeight: '1.3', marginTop: '2px' }}>
            {banner.body}
          </div>
        </div>
      </div>
    </div>
  );
};
