import React from 'react';
import { useAppStore } from '../../store/appStore';
import { getCategoryConcerns } from '../../utils/categoryNotificationConfig';
import { X, Sparkles } from 'lucide-react';

export const ConcernCategorySelector: React.FC = () => {
  const store = useAppStore();
  const { isOpen, step, productId } = store.concernModal;

  if (!isOpen || step !== 4) return null;

  const product = store.products.find(p => p.id === productId);
  const categories = product ? getCategoryConcerns(product.category) : getCategoryConcerns('Shirts');

  return (
    <div style={{
      position: 'absolute',
      top: '34px',
      bottom: '14px',
      left: 0,
      right: 0,
      backgroundColor: 'rgba(40, 44, 63, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 110
    }}>
      <div 
        className="animate-slide-up"
        style={{
          width: '100%',
          maxHeight: '88%',
          backgroundColor: 'var(--myntra-bg-white)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: '22px 18px 20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-modal)',
          overflowY: 'auto'
        }}
      >
        {/* Modal Top Header with Category Context */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <div>
            {product && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'var(--myntra-pink-soft)',
                color: 'var(--myntra-pink)',
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '12px',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.4px'
              }}>
                <Sparkles size={12} />
                <span>{product.category} • Tailored Signals</span>
              </div>
            )}
            <h3 style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--myntra-navy)',
              lineHeight: '1.3'
            }}>
              What would you like to be notified about?
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
              Select the exact hesitation holding you back from ordering {product ? product.brand : 'this item'}.
            </p>
          </div>

          <button 
            onClick={() => store.dismissConcernModal()}
            style={{ color: 'var(--myntra-text-muted)', padding: '4px', marginTop: '-4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Category-Tailored Concern Signals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {categories.map(cat => {
            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                onClick={() => store.selectConcernCategory(cat.id)}
                style={{
                  width: '100%',
                  padding: '11px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--myntra-border)',
                  backgroundColor: 'var(--myntra-bg-white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                    <Icon size={18} strokeWidth={2.2} />
                  </div>

                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
                      {cat.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                      {cat.subtitle}
                    </div>
                  </div>
                </div>

                {/* Radio indicator */}
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: '1.8px solid var(--myntra-border)',
                  backgroundColor: 'transparent',
                  flexShrink: 0
                }} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
