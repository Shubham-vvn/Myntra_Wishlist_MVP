import React from 'react';
import { useAppStore } from '../../store/appStore';
import { WishlistItem } from '../../types';
import { getWishlistWatchBadge } from '../../utils/categoryNotificationConfig';
import { X, ShieldCheck, Sparkles, ShoppingBag, Bell } from 'lucide-react';

interface WishlistCardProps {
  item: WishlistItem;
}

export const WishlistCard: React.FC<WishlistCardProps> = ({ item }) => {
  const store = useAppStore();
  const product = item.product;
  const activeConcern = item.activeConcern;

  return (
    <div style={{
      backgroundColor: 'var(--myntra-bg-white)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--myntra-border)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Remove Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          store.toggleWishlist(product.id);
        }}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--myntra-text-muted)',
          zIndex: 5
        }}
      >
        <X size={15} />
      </button>

      {/* Product Image Thumbnail */}
      <div 
        onClick={() => store.openPdp(product.id)}
        style={{
          width: '100%',
          height: '200px',
          backgroundColor: '#f5f5f7',
          position: 'relative',
          cursor: 'pointer'
        }}
      >
        <img 
          src={product.images[0]} 
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Dwell Days Indicator */}
        {item.dwellDays > 5 && (
          <div style={{
            position: 'absolute',
            bottom: '6px',
            left: '6px',
            backgroundColor: 'rgba(40, 44, 63, 0.75)',
            color: 'white',
            fontSize: '9px',
            fontWeight: 700,
            padding: '2px 6px',
            borderRadius: 'var(--radius-xs)',
            backdropFilter: 'blur(4px)'
          }}>
            Saved {item.dwellDays}d ago
          </div>
        )}
      </div>

      {/* Product Information */}
      <div style={{ padding: '10px 10px 6px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {product.brand}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '6px' }}>
          {product.name}
        </div>

        {/* Pricing */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
            ₹{product.price}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--myntra-text-muted)', textDecoration: 'line-through' }}>
            ₹{product.mrp}
          </span>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--myntra-alert-orange)' }}>
            ({product.discountPct}% OFF)
          </span>
        </div>

        {/* --- DYNAMIC CONFIDENCE BADGES (Layer B: Stage 1) --- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
          {/* True-to-Size Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'var(--myntra-success-light)',
            color: 'var(--myntra-success-dark)',
            fontSize: '10px',
            fontWeight: 800,
            padding: '3px 6px',
            borderRadius: 'var(--radius-xs)',
            width: 'fit-content'
          }}>
            <span>🟢 {product.fitConsensus.trueToSizePct}% True to Size</span>
          </div>

          {/* Fabric DNA Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#f5f5f6',
            color: 'var(--myntra-navy)',
            fontSize: '10px',
            fontWeight: 700,
            padding: '3px 6px',
            borderRadius: 'var(--radius-xs)',
            width: 'fit-content'
          }}>
            <span>🧵 {product.fabricDNA.material}</span>
          </div>

          {/* Quality Guarantee Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'rgba(3, 166, 133, 0.08)',
            color: 'var(--myntra-success)',
            fontSize: '10px',
            fontWeight: 700,
            padding: '2px 6px',
            borderRadius: 'var(--radius-xs)',
            width: 'fit-content'
          }}>
            <span>🛡️ 100% Genuine Quality ✓</span>
          </div>
        </div>

        {/* Active Concern Watch Indicator */}
        {activeConcern ? (
          <div 
            onClick={() => store.openPdp(product.id)}
            style={{
              padding: '6px 8px',
              backgroundColor: 'var(--myntra-pink-soft)',
              border: '1px solid var(--myntra-pink-border)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--myntra-pink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              cursor: 'pointer'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Bell size={11} strokeWidth={2.5} />
              {activeConcern.label || getWishlistWatchBadge(activeConcern, product)}
            </span>
            <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--myntra-text-muted)' }}>
              Edit
            </span>
          </div>
        ) : (
          <button
            onClick={() => store.toggleWishlist(product.id)}
            style={{
              padding: '5px 8px',
              backgroundColor: 'transparent',
              border: '1px dashed var(--myntra-pink)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--myntra-pink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              marginBottom: '10px'
            }}
          >
            <Bell size={11} />
            + Set Personalized Concern Alert
          </button>
        )}

        {/* Action Buttons: 1-Tap Assurance and 1-Tap Move to Bag */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button
            onClick={() => store.openAssuranceModal(product.id)}
            style={{
              width: '100%',
              padding: '7px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--myntra-border)',
              backgroundColor: 'var(--myntra-bg-white)',
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--myntra-navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px'
            }}
          >
            <ShieldCheck size={14} color="var(--myntra-success)" />
            View Fit & Fabric Assurance
          </button>

          <button
            onClick={() => store.moveToBagWithSwap(product.id, product.fitConsensus.recommendedSizeForUser)}
            className="btn-myntra-primary"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '11px',
              fontWeight: 800,
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <ShoppingBag size={13} />
            MOVE TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};
