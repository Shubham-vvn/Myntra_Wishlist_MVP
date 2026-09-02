import React from 'react';
import { useAppStore } from '../../store/appStore';
import { ArrowLeft, Search, Heart, ShoppingBag, Bell } from 'lucide-react';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ title, showBack, onBack }) => {
  const store = useAppStore();
  const wishlistCount = store.wishlist.length;
  const bagCount = store.bag.reduce((sum, item) => sum + item.quantity, 0);
  const activeTriggersCount = store.wishlist.filter(w => w.activeConcern?.status === 'active').length;
  const unreadNotifCount = store.notifications.filter(n => !n.isRead).length;

  return (
    <header style={{
      height: '54px',
      backgroundColor: 'var(--myntra-bg-white)',
      borderBottom: '1px solid var(--myntra-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Left section: Back or Myntra Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {showBack ? (
          <button 
            onClick={onBack}
            style={{
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--myntra-navy)'
            }}
          >
            <ArrowLeft size={22} strokeWidth={2.4} />
          </button>
        ) : null}

        {title ? (
          <h1 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--myntra-navy)',
            letterSpacing: '0.2px'
          }}>
            {title}
          </h1>
        ) : (
          <div 
            onClick={() => store.setActiveTab('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          >
            {/* Myntra Stylized Color M Logo */}
            <svg width="28" height="24" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 70V10L35 48L50 25L65 48L88 10V70H74V34L59 58H41L26 34V70H12Z" fill="url(#myntra-gradient)" />
              <defs>
                <linearGradient id="myntra-gradient" x1="0" y1="0" x2="100" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF3F6C" />
                  <stop offset="0.5" stopColor="#FF905A" />
                  <stop offset="1" stopColor="#F1557A" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{
              fontSize: '17px',
              fontWeight: 800,
              letterSpacing: '-0.4px',
              color: 'var(--myntra-navy)'
            }}>
              Myntra
            </span>
          </div>
        )}
      </div>

      {/* Right section: Search, Notifications, Wishlist, Bag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button 
          onClick={() => store.setActiveTab('home')}
          style={{
            padding: '8px',
            color: 'var(--myntra-navy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Search Catalog"
        >
          <Search size={20} strokeWidth={2.2} />
        </button>

        <button 
          onClick={() => store.openNotificationCenter()}
          style={{
            position: 'relative',
            padding: '8px',
            color: 'var(--myntra-navy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Notification Center"
        >
          <Bell size={20} strokeWidth={2.2} />
          {unreadNotifCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--myntra-pink)',
              borderRadius: '50%',
              border: '2px solid white'
            }} />
          )}
        </button>

        <button 
          onClick={() => store.setActiveTab('wishlist')}
          style={{
            position: 'relative',
            padding: '8px',
            color: store.activeTab === 'wishlist' ? 'var(--myntra-pink)' : 'var(--myntra-navy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Wishlist"
        >
          <Heart size={20} strokeWidth={2.2} fill={store.activeTab === 'wishlist' ? 'var(--myntra-pink)' : 'none'} />
          {wishlistCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '3px',
              backgroundColor: activeTriggersCount > 0 ? 'var(--myntra-pink)' : 'var(--myntra-navy)',
              color: 'white',
              fontSize: '10px',
              fontWeight: 700,
              minWidth: '16px',
              height: '16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 3px'
            }}>
              {wishlistCount}
            </span>
          )}
        </button>

        <button 
          onClick={() => store.setActiveTab('bag')}
          style={{
            position: 'relative',
            padding: '8px',
            color: store.activeTab === 'bag' ? 'var(--myntra-pink)' : 'var(--myntra-navy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Shopping Bag"
        >
          <ShoppingBag size={20} strokeWidth={2.2} fill={store.activeTab === 'bag' ? 'rgba(255,63,108,0.1)' : 'none'} />
          {bagCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '3px',
              backgroundColor: 'var(--myntra-pink)',
              color: 'white',
              fontSize: '10px',
              fontWeight: 700,
              minWidth: '16px',
              height: '16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 3px'
            }}>
              {bagCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
