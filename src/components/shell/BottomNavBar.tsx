import React from 'react';
import { useAppStore } from '../../store/appStore';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const store = useAppStore();
  const activeTab = store.activeTab;
  const wishlistCount = store.wishlist.length;
  const bagCount = store.bag.reduce((sum, item) => sum + item.quantity, 0);
  const activeTriggersCount = store.wishlist.filter(w => w.activeConcern?.status === 'active').length;

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { 
      id: 'wishlist', 
      label: 'Wishlist', 
      icon: Heart, 
      badge: wishlistCount,
      hasTrigger: activeTriggersCount > 0 
    },
    { 
      id: 'bag', 
      label: 'Bag', 
      icon: ShoppingBag, 
      badge: bagCount 
    },
    { id: 'profile', label: 'Profile', icon: User }
  ] as const;

  return (
    <nav style={{
      height: '60px',
      backgroundColor: 'var(--myntra-bg-white)',
      borderTop: '1px solid var(--myntra-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      position: 'sticky',
      bottom: 0,
      zIndex: 50,
      boxShadow: 'var(--shadow-bottom-nav)'
    }}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => store.setActiveTab(tab.id as any)}
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              color: isActive ? 'var(--myntra-pink)' : 'var(--myntra-text-secondary)',
              position: 'relative',
              transition: 'color var(--transition-fast)'
            }}
          >
            <div style={{ position: 'relative' }}>
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 1.8}
                fill={isActive && tab.id === 'wishlist' ? 'var(--myntra-pink)' : 'none'}
              />
              {tab.badge && tab.badge > 0 ? (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-8px',
                  backgroundColor: tab.hasTrigger ? 'var(--myntra-pink)' : 'var(--myntra-navy)',
                  color: 'white',
                  fontSize: '9px',
                  fontWeight: 800,
                  minWidth: '15px',
                  height: '15px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 2px'
                }}>
                  {tab.badge}
                </span>
              ) : null}
            </div>
            
            <span style={{
              fontSize: '10px',
              fontWeight: isActive ? 700 : 500,
              letterSpacing: '0.2px'
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
