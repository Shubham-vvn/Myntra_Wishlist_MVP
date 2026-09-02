import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { ShoppingBag, ShieldCheck, Trash2, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BagPage: React.FC = () => {
  const store = useAppStore();
  const bagItems = store.bag;
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const totalMRP = bagItems.reduce((sum, item) => sum + (item.product.mrp * item.quantity), 0);
  const totalPrice = bagItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalDiscount = totalMRP - totalPrice;

  const handleCheckout = () => {
    setIsOrderPlaced(true);
    store.logEvent('purchase_completed', { 
      totalAmount: totalPrice,
      itemCount: bagItems.length,
      warrantySecured: true 
    });

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  if (isOrderPlaced) {
    return (
      <div style={{
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--myntra-success)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(3, 166, 133, 0.35)'
        }}>
          <CheckCircle2 size={44} color="#ffffff" strokeWidth={2.8} />
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--myntra-navy)', marginBottom: '8px' }}>
          Order Confirmed! 🎉
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--myntra-text-secondary)', lineHeight: '1.4', marginBottom: '20px', maxWidth: '300px' }}>
          Your items are packed and verified with <strong>100% Genuine Quality Guarantee</strong> and easy 14 days returns.
        </p>

        <div style={{
          backgroundColor: '#e6f7f4',
          border: '1px solid #b3ebd9',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          marginBottom: '24px',
          textAlign: 'left',
          width: '100%',
          maxWidth: '320px'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#028066' }}>
            BUYER PROTECTION ACTIVE
          </div>
          <div style={{ fontSize: '10px', color: '#535766', marginTop: '2px' }}>
            Order Ref #MYN-ORD-883921
          </div>
        </div>

        <button
          onClick={() => {
            setIsOrderPlaced(false);
            store.setActiveTab('home');
          }}
          className="btn-myntra-primary"
          style={{ width: '100%', maxWidth: '300px', height: '46px' }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (bagItems.length === 0) {
    return (
      <div style={{
        padding: '50px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#f5f5f7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <ShoppingBag size={32} color="var(--myntra-text-muted)" />
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--myntra-navy)', marginBottom: '6px' }}>
          Hey, your bag is empty!
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--myntra-text-secondary)', marginBottom: '20px' }}>
          Explore products in your Wishlist and add them to your Bag.
        </p>
        <button
          onClick={() => store.setActiveTab('wishlist')}
          className="btn-myntra-primary"
          style={{ padding: '10px 20px', fontSize: '13px' }}
        >
          View Wishlist Items
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '14px 12px 30px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Title */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
          Shopping Bag ({bagItems.length} items)
        </h2>
        <span style={{ fontSize: '12px', color: 'var(--myntra-text-secondary)' }}>
          Verified with 100% Genuine Quality Guarantee
        </span>
      </div>

      {/* Quality Assurance Banner */}
      <div style={{
        backgroundColor: '#e6f7f4',
        border: '1.5px solid var(--myntra-success)',
        borderRadius: 'var(--radius-lg)',
        padding: '14px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <Award size={28} color="var(--myntra-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-success-dark)' }}>
            100% Genuine Quality Assured
          </div>
          <div style={{ fontSize: '11px', color: '#3d4455', lineHeight: '1.35', marginTop: '3px' }}>
            All items are verified for authentic fabric DNA, true-to-size fit standards, and easy 14-day doorstep exchange & return.
          </div>
        </div>
      </div>

      {/* Bag Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {bagItems.map(item => (
          <div
            key={item.id}
            style={{
              backgroundColor: 'var(--myntra-bg-white)',
              border: '1px solid var(--myntra-border)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              display: 'flex',
              gap: '12px',
              position: 'relative'
            }}
          >
            <img 
              src={item.product.images[0]} 
              alt={item.product.name}
              style={{ width: '70px', height: '88px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
            />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
                {item.product.brand}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginBottom: '6px' }}>
                {item.product.name}
              </div>

              {/* Size and Qty Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  padding: '2px 8px',
                  backgroundColor: '#f5f5f7',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--myntra-navy)'
                }}>
                  Size: {item.selectedSize}
                </span>
                <span style={{
                  padding: '2px 8px',
                  backgroundColor: '#f5f5f7',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--myntra-navy)'
                }}>
                  Qty: {item.quantity}
                </span>
              </div>

              {/* Price Row */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
                  ₹{item.product.price}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--myntra-text-muted)', textDecoration: 'line-through' }}>
                  ₹{item.product.mrp}
                </span>
              </div>
            </div>

            {/* Remove item */}
            <button
              onClick={() => store.removeFromBag(item.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: 'var(--myntra-text-muted)',
                padding: '4px'
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Bill Breakdown (Zero-Discount Platform Fee Preserved) */}
      <div style={{
        backgroundColor: 'var(--myntra-bg-white)',
        border: '1px solid var(--myntra-border)',
        borderRadius: 'var(--radius-md)',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-navy)', marginBottom: '4px' }}>
          PRICE DETAILS ({bagItems.length} Items)
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--myntra-text-secondary)' }}>
          <span>Total MRP</span>
          <span>₹{totalMRP}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--myntra-success-dark)' }}>
          <span>Discount on MRP</span>
          <span>-₹{totalDiscount}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--myntra-text-secondary)' }}>
          <span>Convenience Fee</span>
          <span style={{ color: 'var(--myntra-success-dark)', fontWeight: 700 }}>FREE</span>
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--myntra-border)', margin: '4px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
          <span>Total Amount</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>

      {/* Primary Checkout CTA */}
      <button
        onClick={handleCheckout}
        className="btn-myntra-primary"
        style={{
          width: '100%',
          height: '48px',
          fontSize: '14px',
          fontWeight: 800,
          borderRadius: 'var(--radius-sm)'
        }}
      >
        PLACE ORDER
        <ArrowRight size={18} />
      </button>

    </div>
  );
};
