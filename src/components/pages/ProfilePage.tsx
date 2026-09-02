import React from 'react';
import { useAppStore } from '../../store/appStore';
import { User, ShieldCheck, Bell, Sparkles, Ruler, MapPin, CheckCircle2 } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const store = useAppStore();
  const profile = store.userProfile;
  const activeConcerns = store.wishlist.filter(w => w.activeConcern?.status === 'active');

  return (
    <div style={{ padding: '16px 12px 30px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Profile Card */}
      <div style={{
        backgroundColor: 'var(--myntra-bg-white)',
        border: '1px solid var(--myntra-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          backgroundColor: 'var(--myntra-pink-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--myntra-pink)',
          flexShrink: 0
        }}>
          <User size={28} strokeWidth={2.2} />
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
            {profile.name}
          </h2>
          <div style={{ fontSize: '12px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
            {profile.city} • Pincode: {profile.pincode}
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--myntra-success-dark)', fontWeight: 700, marginTop: '4px' }}>
            <ShieldCheck size={12} />
            Verified Myntra Insider
          </div>
        </div>
      </div>

      {/* Body Fit Profile Card */}
      <div style={{
        backgroundColor: 'var(--myntra-bg-white)',
        border: '1px solid var(--myntra-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <Ruler size={17} color="var(--myntra-pink)" />
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
            Saved Body Fit Measurements
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
          <div style={{ padding: '8px', backgroundColor: '#f8f8fa', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-navy)' }}>5'4"</div>
            <div style={{ fontSize: '10px', color: 'var(--myntra-text-muted)' }}>Height</div>
          </div>
          <div style={{ padding: '8px', backgroundColor: '#f8f8fa', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-navy)' }}>88 cm</div>
            <div style={{ fontSize: '10px', color: 'var(--myntra-text-muted)' }}>Bust</div>
          </div>
          <div style={{ padding: '8px', backgroundColor: '#f8f8fa', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-navy)' }}>72 cm</div>
            <div style={{ fontSize: '10px', color: 'var(--myntra-text-muted)' }}>Waist</div>
          </div>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', lineHeight: '1.4' }}>
          Used by <strong>Gemini AI Fit Synthesis</strong> to compute accurate true-to-size consensus across partner brands.
        </div>
      </div>

      {/* Active Wishlist Concern Alerts */}
      <div style={{
        backgroundColor: 'var(--myntra-bg-white)',
        border: '1px solid var(--myntra-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bell size={17} color="var(--myntra-pink)" />
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
              Active Concern Watches ({activeConcerns.length})
            </h3>
          </div>
        </div>

        {activeConcerns.length === 0 ? (
          <p style={{ fontSize: '12px', color: 'var(--myntra-text-secondary)' }}>
            No active concern alerts set yet.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeConcerns.map(item => (
              <div 
                key={item.id}
                onClick={() => store.openPdp(item.productId)}
                style={{
                  padding: '10px 12px',
                  backgroundColor: 'var(--myntra-pink-soft)',
                  border: '1px solid var(--myntra-pink-border)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
                    {item.product.brand} • {item.product.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--myntra-pink)', fontWeight: 700, marginTop: '2px' }}>
                    🔔 {item.activeConcern?.label}
                  </div>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--myntra-text-muted)' }}>
                  View &gt;
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
