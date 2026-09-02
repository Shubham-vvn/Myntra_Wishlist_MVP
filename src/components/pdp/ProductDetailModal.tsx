import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { ArrowLeft, Heart, ShoppingBag, Share2, Star, ShieldCheck, Sparkles, Truck, RefreshCw } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const store = useAppStore();
  const productId = store.activePdpProductId;
  const product = store.products.find(p => p.id === productId);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  if (!product) return null;

  const isWishlisted = store.wishlist.some(w => w.productId === product.id);
  const activeConcern = store.wishlist.find(w => w.productId === product.id)?.activeConcern;

  return (
    <div style={{
      position: 'absolute',
      top: '34px',
      bottom: '14px',
      left: 0,
      right: 0,
      backgroundColor: 'var(--myntra-bg-white)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }} className="animate-fade-in">
      {/* Top Floating PDP Header */}
      <div style={{
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        borderBottom: '1px solid var(--myntra-border)',
        backgroundColor: 'var(--myntra-bg-white)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <button 
          onClick={() => store.closePdp()}
          style={{ padding: '6px', color: 'var(--myntra-navy)' }}
        >
          <ArrowLeft size={22} strokeWidth={2.4} />
        </button>

        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
          {product.brand}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ padding: '6px', color: 'var(--myntra-navy)' }}>
            <Share2 size={19} />
          </button>
          <button 
            onClick={() => store.toggleWishlist(product.id)}
            style={{ 
              padding: '6px', 
              color: isWishlisted ? 'var(--myntra-pink)' : 'var(--myntra-navy)' 
            }}
          >
            <Heart size={21} fill={isWishlisted ? 'var(--myntra-pink)' : 'none'} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
        {/* Main Product Hero Image */}
        <div style={{ position: 'relative', width: '100%', height: '380px', backgroundColor: '#f0f0f2' }}>
          <img 
            src={product.images[selectedImageIdx] || product.images[0]} 
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* "View Similar" Pill Tag (Matching wireframes.png) */}
          <div style={{
            position: 'absolute',
            bottom: '14px',
            right: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: 'var(--shadow-sm)',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--myntra-navy)'
          }}>
            <Sparkles size={13} color="var(--myntra-pink)" />
            View Similar
          </div>

          {/* Rating Pill Tag */}
          <div style={{
            position: 'absolute',
            bottom: '14px',
            left: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'var(--radius-sm)',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: 'var(--shadow-sm)',
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--myntra-navy)'
          }}>
            <span>{product.rating}</span>
            <Star size={12} fill="#03a685" color="#03a685" />
            <span style={{ color: 'var(--myntra-text-muted)', fontWeight: 400 }}>| {product.ratingCount > 1000 ? `${(product.ratingCount / 1000).toFixed(1)}k` : product.ratingCount}</span>
          </div>
        </div>

        {/* Product Details Section */}
        <div style={{ padding: '16px' }}>
          {/* Brand & Title */}
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--myntra-navy)', marginBottom: '4px' }}>
            {product.brand}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--myntra-text-secondary)', marginBottom: '12px' }}>
            {product.name}
          </p>

          {/* Pricing Row */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
              ₹{product.price}
            </span>
            <span style={{ fontSize: '14px', color: 'var(--myntra-text-muted)', textDecoration: 'line-through' }}>
              ₹{product.mrp}
            </span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--myntra-alert-orange)' }}>
              ({product.discountPct}% OFF)
            </span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--myntra-success)', fontWeight: 600 }}>
            inclusive of all taxes
          </span>

          {/* Active Concern Tag if present */}
          {activeConcern && (
            <div style={{
              marginTop: '12px',
              padding: '8px 12px',
              backgroundColor: 'var(--myntra-pink-soft)',
              border: '1px solid var(--myntra-pink-border)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--myntra-pink)' }}>
                🔔 {activeConcern.label}
              </span>
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--myntra-text-secondary)' }}>
                Active Watch
              </span>
            </div>
          )}

          {/* Pre-Purchase Confidence Trigger Banner */}
          <div 
            onClick={() => store.openAssuranceModal(product.id)}
            style={{
              marginTop: '14px',
              padding: '12px',
              backgroundColor: 'var(--myntra-success-light)',
              border: '1px solid var(--myntra-success-border)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} color="var(--myntra-success)" />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--myntra-success-dark)' }}>
                  {product.fitConsensus.trueToSizePct}% True to Size • Verified Fabric DNA
                </div>
                <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)' }}>
                  Tap for crowd fit histogram & unedited fabric photos
                </div>
              </div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--myntra-success-dark)' }}>
              View &gt;
            </span>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--myntra-border)', margin: '18px 0' }} />

          {/* Size Selector Section (Matching wireframes.png) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--myntra-navy)', textTransform: 'uppercase' }}>
                Select Size
              </span>
              <button 
                onClick={() => store.openAssuranceModal(product.id)}
                style={{ fontSize: '12px', fontWeight: 700, color: 'var(--myntra-pink)' }}
              >
                Size chart &gt;
              </button>
            </div>

            {/* Size Boxes Grid */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {product.availableSizes.map(sizeObj => {
                const isSelected = selectedSize === sizeObj.size;
                const isOutOfStock = !sizeObj.inStock;

                return (
                  <button
                    key={sizeObj.size}
                    onClick={() => {
                      if (!isOutOfStock) setSelectedSize(sizeObj.size);
                    }}
                    style={{
                      minWidth: '50px',
                      height: '50px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected 
                        ? '1.8px solid var(--myntra-pink)' 
                        : isOutOfStock 
                          ? '1px dashed var(--myntra-border)' 
                          : '1px solid var(--myntra-border)',
                      backgroundColor: isOutOfStock ? '#f9f9fa' : 'var(--myntra-bg-white)',
                      color: isSelected 
                        ? 'var(--myntra-pink)' 
                        : isOutOfStock 
                          ? 'var(--myntra-text-disabled)' 
                          : 'var(--myntra-navy)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      padding: '4px 8px'
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>
                      {sizeObj.size}
                    </span>
                    {sizeObj.lowStockText && (
                      <span style={{
                        fontSize: '8px',
                        fontWeight: 700,
                        color: isOutOfStock ? 'var(--myntra-alert-red)' : 'var(--myntra-alert-orange)',
                        whiteSpace: 'nowrap'
                      }}>
                        {sizeObj.lowStockText}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--myntra-border)', margin: '18px 0' }} />

          {/* Delivery & Assurance Highlight */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--myntra-text-secondary)' }}>
              <Truck size={17} color="var(--myntra-navy)" />
              <span>Get it by <strong>{new Date(Date.now() + 3*86400000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</strong> to {product.deliveryEstimate.pincode}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--myntra-success-dark)' }}>
              <RefreshCw size={16} color="var(--myntra-success)" />
              <span><strong>100% Genuine Product</strong> (Easy 14 days returns)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar (Matching wireframes.png) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'var(--myntra-bg-white)',
        borderTop: '1px solid var(--myntra-border)',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: 'var(--shadow-bottom-nav)',
        zIndex: 50
      }}>
        {/* Share Button */}
        <button style={{
          width: '46px',
          height: '46px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--myntra-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--myntra-navy)'
        }}>
          <Share2 size={18} />
        </button>

        {/* Wishlist Heart Button */}
        <button 
          onClick={() => store.toggleWishlist(product.id)}
          style={{
            width: '46px',
            height: '46px',
            borderRadius: 'var(--radius-sm)',
            border: isWishlisted ? '1px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isWishlisted ? 'var(--myntra-pink)' : 'var(--myntra-navy)',
            backgroundColor: isWishlisted ? 'var(--myntra-pink-soft)' : 'transparent'
          }}
        >
          <Heart size={20} fill={isWishlisted ? 'var(--myntra-pink)' : 'none'} strokeWidth={2.2} />
        </button>

        {/* Primary ADD TO BAG Button */}
        <button
          onClick={() => store.moveToBagWithSwap(product.id, selectedSize)}
          className="btn-myntra-primary"
          style={{
            flex: 1,
            height: '46px',
            fontSize: '14px',
            fontWeight: 800,
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <ShoppingBag size={18} />
          ADD TO BAG
        </button>
      </div>
    </div>
  );
};
