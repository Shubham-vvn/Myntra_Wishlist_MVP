import React from 'react';
import { useAppStore } from '../../store/appStore';
import { X, Bell, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export const NotificationCenterModal: React.FC = () => {
  const store = useAppStore();

  if (!store.isNotificationCenterOpen) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '34px',
      bottom: '14px',
      left: 0,
      right: 0,
      backgroundColor: 'rgba(40, 44, 63, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 140
    }}>
      <div 
        className="animate-slide-up"
        style={{
          width: '100%',
          height: '80%',
          backgroundColor: 'var(--myntra-bg-white)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-modal)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--myntra-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="var(--myntra-pink)" />
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
              Personalized Notifications ({store.notifications.length})
            </span>
          </div>

          <button 
            onClick={() => store.closeNotificationCenter()}
            style={{ color: 'var(--myntra-text-muted)', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Notifications List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {store.notifications.map(notif => {
            if (notif.isDigest && notif.digestItems) {
              // --- AI SUMMARIZED MULTI-PRODUCT DIGEST CARD ---
              return (
                <div
                  key={notif.id}
                  style={{
                    backgroundColor: 'var(--myntra-pink-soft)',
                    border: '1.5px solid var(--myntra-pink)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '14px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Sparkles size={16} color="var(--myntra-pink)" />
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-pink)' }}>
                      {notif.title}
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--myntra-text-muted)', marginLeft: 'auto' }}>
                      {notif.timestamp}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--myntra-navy)', marginBottom: '10px' }}>
                    {notif.body}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                    {notif.digestItems.map((item, idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          store.closeNotificationCenter();
                          store.openPdp(item.productId);
                        }}
                        style={{
                          backgroundColor: 'white',
                          padding: '8px 10px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid rgba(255, 63, 108, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
                            {item.brand} • {item.name}
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--myntra-success-dark)', fontWeight: 700, marginTop: '2px' }}>
                            ✓ {item.resolvedConcern}
                          </div>
                        </div>
                        <ChevronRight size={14} color="var(--myntra-pink)" />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      store.closeNotificationCenter();
                      store.setActiveTab('wishlist');
                    }}
                    className="btn-myntra-primary"
                    style={{
                      width: '100%',
                      padding: '8px',
                      fontSize: '11px',
                      fontWeight: 800,
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    View All Resolved Items in Wishlist
                  </button>
                </div>
              );
            }

            // Regular single item notification
            return (
              <div
                key={notif.id}
                onClick={() => {
                  if (notif.productId) {
                    store.closeNotificationCenter();
                    store.openPdp(notif.productId);
                  }
                }}
                style={{
                  backgroundColor: 'var(--myntra-bg-white)',
                  border: '1px solid var(--myntra-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: notif.productId ? 'pointer' : 'default',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {notif.productImage ? (
                  <img 
                    src={notif.productImage} 
                    alt="Product" 
                    style={{ width: '46px', height: '46px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--myntra-pink-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--myntra-pink)',
                    flexShrink: 0
                  }}>
                    <CheckCircle2 size={20} />
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
                      {notif.title}
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--myntra-text-muted)' }}>
                      {notif.timestamp}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--myntra-text-secondary)', marginTop: '2px', lineHeight: '1.3' }}>
                    {notif.body}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
