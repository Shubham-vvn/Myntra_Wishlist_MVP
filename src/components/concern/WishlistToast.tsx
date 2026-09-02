import React from 'react';
import { useAppStore } from '../../store/appStore';
import { CheckCircle2, X } from 'lucide-react';

export const WishlistToast: React.FC = () => {
  const store = useAppStore();
  const { isOpen } = store.wishlistToast;

  if (!isOpen) return null;

  return (
    <div 
      className="animate-slide-up"
      style={{
        position: 'absolute',
        bottom: '72px',
        left: '12px',
        right: '12px',
        backgroundColor: '#e6f7f4',
        border: '1px solid #b3ebd9',
        borderRadius: 'var(--radius-md)',
        padding: '10px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 80,
        boxShadow: 'var(--shadow-md)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <CheckCircle2 size={18} color="#03a685" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#028066' }}>
            Added to Wishlist
          </div>
          <div style={{ fontSize: '11px', color: '#535766', marginTop: '1px' }}>
            We'll notify you if there are updates on your concern.
          </div>
          <button 
            onClick={() => {
              store.closeWishlistToast();
              store.closePdp();
              store.setActiveTab('wishlist');
            }}
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--myntra-pink)',
              marginTop: '4px',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            View Wishlist &gt;
          </button>
        </div>
      </div>

      <button 
        onClick={() => store.closeWishlistToast()}
        style={{ color: '#535766', padding: '4px' }}
      >
        <X size={16} />
      </button>
    </div>
  );
};
