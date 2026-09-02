import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { WishlistCard } from '../wishlist/WishlistCard';
import { Heart, Bell, ShieldCheck, Sparkles, Filter } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const store = useAppStore();
  const [filterMode, setFilterMode] = useState<'all' | 'triggers' | 'high_fit'>('all');

  const wishlistItems = store.wishlist;
  const activeTriggersCount = wishlistItems.filter(w => w.activeConcern?.status === 'active').length;

  let displayedItems = wishlistItems;
  if (filterMode === 'triggers') {
    displayedItems = wishlistItems.filter(w => w.activeConcern?.status === 'active');
  } else if (filterMode === 'high_fit') {
    displayedItems = wishlistItems.filter(w => w.product.fitConsensus.trueToSizePct >= 88);
  }

  return (
    <div style={{ padding: '14px 12px 30px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Header Summary */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
          My Smart Wishlist
        </h2>
        <span style={{ fontSize: '12px', color: 'var(--myntra-text-secondary)' }}>
          {wishlistItems.length} items saved • {activeTriggersCount} active concern alerts
        </span>
      </div>

      {/* Filter Chips Bar */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
        <button
          onClick={() => setFilterMode('all')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: 700,
            backgroundColor: filterMode === 'all' ? 'var(--myntra-navy)' : 'var(--myntra-bg-white)',
            color: filterMode === 'all' ? '#ffffff' : 'var(--myntra-navy)',
            border: '1px solid var(--myntra-border)'
          }}
        >
          All Items ({wishlistItems.length})
        </button>

        <button
          onClick={() => setFilterMode('triggers')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: 700,
            backgroundColor: filterMode === 'triggers' ? 'var(--myntra-pink)' : 'var(--myntra-bg-white)',
            color: filterMode === 'triggers' ? '#ffffff' : 'var(--myntra-pink)',
            border: filterMode === 'triggers' ? '1px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Bell size={12} />
          Active Watches ({activeTriggersCount})
        </button>

        <button
          onClick={() => setFilterMode('high_fit')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: 700,
            backgroundColor: filterMode === 'high_fit' ? 'var(--myntra-success)' : 'var(--myntra-bg-white)',
            color: filterMode === 'high_fit' ? '#ffffff' : 'var(--myntra-success-dark)',
            border: filterMode === 'high_fit' ? '1px solid var(--myntra-success)' : '1px solid var(--myntra-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <ShieldCheck size={12} />
          High Fit Confidence (88%+)
        </button>
      </div>

      {/* Empty State */}
      {displayedItems.length === 0 && (
        <div style={{
          backgroundColor: 'var(--myntra-bg-white)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px 20px',
          textAlign: 'center',
          border: '1px solid var(--myntra-border)',
          marginTop: '20px'
        }}>
          <Heart size={36} color="var(--myntra-text-muted)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--myntra-navy)', marginBottom: '4px' }}>
            No wishlisted items in this filter
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--myntra-text-secondary)', marginBottom: '16px' }}>
            Explore our fashion collection and tap the heart icon to set concern alerts!
          </p>
          <button
            onClick={() => store.setActiveTab('home')}
            className="btn-myntra-primary"
            style={{ fontSize: '12px', padding: '10px 18px' }}
          >
            Explore Fashion Catalog
          </button>
        </div>
      )}

      {/* Wishlist Cards Grid (2 columns) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px'
      }}>
        {displayedItems.map(item => (
          <WishlistCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
