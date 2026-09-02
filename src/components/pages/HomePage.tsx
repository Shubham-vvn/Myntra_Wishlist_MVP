import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { Heart, Star, Sparkles, ShieldCheck } from 'lucide-react';

export const HomePage: React.FC = () => {
  const store = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All', 
    'Shirts', 
    'Kurtas', 
    'Blazers', 
    'Dresses', 
    'Festive', 
    'Jeans', 
    'T-Shirts', 
    'Trousers', 
    'Jackets', 
    'Activewear', 
    'Footwear', 
    'Handbags', 
    'Sarees', 
    'Tops'
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? store.products 
    : store.products.filter(p => p.category === selectedCategory);

  return (
    <div style={{ padding: '14px 12px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Category Pills Bar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px',
        scrollbarWidth: 'none'
      }}>
        {categories.map(cat => {
          const isSelected = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                backgroundColor: isSelected ? 'var(--myntra-navy)' : 'var(--myntra-bg-white)',
                color: isSelected ? '#ffffff' : 'var(--myntra-text-primary)',
                border: '1px solid var(--myntra-border)',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Hero Banner: Pre-Purchase Confidence Promise */}
      <div style={{
        background: 'linear-gradient(135deg, #fff1f4 0%, #ffe0e8 100%)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--myntra-pink-border)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <Sparkles size={16} color="var(--myntra-pink)" />
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--myntra-pink)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Personalized Wishlist
            </span>
          </div>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--myntra-navy)', lineHeight: '1.3' }}>
            Shop with Zero Uncertainty
          </h2>
          <p style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
            Set concern alerts and get notified when your exact concern is resolved.
          </p>
        </div>

        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
          flexShrink: 0
        }}>
          <ShieldCheck size={24} color="var(--myntra-success)" />
        </div>
      </div>

      {/* Product Grid (2-column layout like Myntra App) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px'
      }}>
        {filteredProducts.map(product => {
          const isWishlisted = store.wishlist.some(w => w.productId === product.id);

          return (
            <div
              key={product.id}
              onClick={() => store.openPdp(product.id)}
              style={{
                backgroundColor: 'var(--myntra-bg-white)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--myntra-border)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative'
              }}
            >
              {/* Product Thumbnail */}
              <div style={{ position: 'relative', width: '100%', height: '185px', backgroundColor: '#f0f0f2' }}>
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Rating Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '6px',
                  left: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '2px 5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--myntra-navy)'
                }}>
                  <span>{product.rating}</span>
                  <Star size={10} fill="#03a685" color="#03a685" />
                </div>

                {/* Wishlist Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    store.toggleWishlist(product.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isWishlisted ? 'var(--myntra-pink)' : 'var(--myntra-navy)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <Heart size={16} fill={isWishlisted ? 'var(--myntra-pink)' : 'none'} strokeWidth={2.2} />
                </button>
              </div>

              {/* Product Info */}
              <div style={{ padding: '8px 10px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.brand}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '6px' }}>
                  {product.name}
                </div>

                {/* Pricing Row */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
                    ₹{product.price}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--myntra-text-muted)', textDecoration: 'line-through' }}>
                    ₹{product.mrp}
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--myntra-alert-orange)' }}>
                    ({product.discountPct}%)
                  </span>
                </div>

                {/* True to size micro tag */}
                <div style={{ marginTop: '6px', fontSize: '9px', fontWeight: 700, color: 'var(--myntra-success-dark)' }}>
                  🟢 {product.fitConsensus.trueToSizePct}% True to Size
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
