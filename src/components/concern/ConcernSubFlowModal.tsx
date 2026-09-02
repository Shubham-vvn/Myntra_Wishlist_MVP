import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { ArrowLeft } from 'lucide-react';

export const ConcernSubFlowModal: React.FC = () => {
  const store = useAppStore();
  const { isOpen, step, selectedConcern, productId } = store.concernModal;
  const product = store.products.find(p => p.id === productId);

  // Sub-flow states
  const [selectedSize, setSelectedSize] = useState<string>('XL');
  const [selectedColor, setSelectedColor] = useState<string>('Olive Green');
  const [priceOption, setPriceOption] = useState<string>('any_drop');
  const [targetPrice, setTargetPrice] = useState<number>(product ? Math.floor(product.price * 0.85) : 999);
  const [deliveryOption, setDeliveryOption] = useState<string>('express_24h');
  const [qualityOption, setQualityOption] = useState<string>('fabric_photos');
  const [timingDateOption, setTimingDateOption] = useState<string>('salary_3rd');
  const [otherText, setOtherText] = useState<string>('');

  if (!isOpen || step !== 5 || !selectedConcern) return null;

  const handleSave = () => {
    let params: Record<string, any> = {};

    switch (selectedConcern) {
      case 'size':
        params = { targetSize: selectedSize };
        break;
      case 'price':
        params = { priceOption, targetPrice, capturedPrice: product?.price };
        break;
      case 'colour':
        params = { targetColor: selectedColor };
        break;
      case 'delivery':
        params = { deliveryOption, pincode: product?.deliveryEstimate.pincode };
        break;
      case 'quality_info':
        params = { qualityOption, preference: 'Verified daylight fabric photos & reviews' };
        break;
      case 'purchase_timing':
        params = { 
          timingOption: timingDateOption,
          dateLabel: timingDateOption === 'salary_3rd' ? '3rd of Month (Salary)' : 'Upcoming Weekend'
        };
        break;
      case 'other':
        params = { customText: otherText || 'Real person appearance inquiry' };
        break;
    }

    store.saveConcernTrigger(params);
  };

  const titles: Record<string, string> = {
    size: 'Size',
    price: 'Price',
    colour: 'Colour',
    delivery: 'Delivery',
    quality_info: 'Quality & Fit Info',
    purchase_timing: 'Purchase Timing',
    other: 'Other Concern'
  };

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
          backgroundColor: 'var(--myntra-bg-white)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: '20px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-modal)',
          maxHeight: '90%',
          overflowY: 'auto'
        }}
      >
        {/* Top Nav Header (Back Arrow + Title centered) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <button 
            onClick={() => store.backToConcernCategories()}
            style={{ padding: '6px', color: 'var(--myntra-navy)', zIndex: 2 }}
          >
            <ArrowLeft size={22} strokeWidth={2.4} />
          </button>
          
          <h3 style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 800,
            color: 'var(--myntra-navy)'
          }}>
            {titles[selectedConcern] || 'Concern Preference'}
          </h3>

          <div style={{ width: '28px' }} />
        </div>

        {/* --- SIZE SUB-FLOW (Screen 5 from wireframes.png) --- */}
        {selectedConcern === 'size' && (
          <div>
            <p style={{
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--myntra-navy)',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              Which size are you looking for?
            </p>

            {/* Grid of Sizes (XS, S, M, L, XL, XXL, XXXL) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '24px'
            }}>
              {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size => {
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      height: '48px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected 
                        ? '2px solid var(--myntra-pink)' 
                        : '1px solid var(--myntra-border)',
                      backgroundColor: 'var(--myntra-bg-white)',
                      color: isSelected ? 'var(--myntra-pink)' : 'var(--myntra-navy)',
                      fontSize: '14px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* --- PRICE SUB-FLOW --- */}
        {selectedConcern === 'price' && (
          <div>
            <p style={{
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--myntra-navy)',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              When would you like to be notified?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <button
                onClick={() => setPriceOption('any_drop')}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: priceOption === 'any_drop' ? '1.8px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                  backgroundColor: priceOption === 'any_drop' ? 'var(--myntra-pink-soft)' : 'var(--myntra-bg-white)',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                  Notify on any price drop
                </div>
                <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)' }}>
                  Get alerted whenever price goes below ₹{product?.price || 1299}
                </div>
              </button>

              <button
                onClick={() => setPriceOption('target_drop')}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: priceOption === 'target_drop' ? '1.8px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                  backgroundColor: priceOption === 'target_drop' ? 'var(--myntra-pink-soft)' : 'var(--myntra-bg-white)',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                  Notify if price drops below target
                </div>
                <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '4px' }}>
                  Target: <strong>₹{targetPrice}</strong> (15% drop)
                </div>
              </button>
            </div>
          </div>
        )}

        {/* --- COLOUR SUB-FLOW --- */}
        {selectedConcern === 'colour' && (
          <div>
            <p style={{
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--myntra-navy)',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              Which colour are you looking for?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {(product?.availableColors || [
                { name: 'Olive Green', hex: '#3d4d3d' },
                { name: 'Navy Blue', hex: '#1c2841' },
                { name: 'Charcoal Black', hex: '#222222' }
              ]).map(col => {
                const isSelected = selectedColor === col.name;

                return (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '1.8px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                      backgroundColor: isSelected ? 'var(--myntra-pink-soft)' : 'var(--myntra-bg-white)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: col.hex,
                      border: '1px solid rgba(0,0,0,0.15)'
                    }} />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                      {col.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* --- DELIVERY SUB-FLOW --- */}
        {selectedConcern === 'delivery' && (
          <div>
            <p style={{
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--myntra-navy)',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              Current delivery: 3–5 days to {product?.deliveryEstimate.pincode || '560001'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <button
                onClick={() => setDeliveryOption('express_24h')}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  border: deliveryOption === 'express_24h' ? '1.8px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                  backgroundColor: deliveryOption === 'express_24h' ? 'var(--myntra-pink-soft)' : 'var(--myntra-bg-white)',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                  Notify when 24-hr Express Delivery is available
                </div>
              </button>
              <button
                onClick={() => setDeliveryOption('date_change')}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  border: deliveryOption === 'date_change' ? '1.8px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                  backgroundColor: deliveryOption === 'date_change' ? 'var(--myntra-pink-soft)' : 'var(--myntra-bg-white)',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                  Notify if delivery timeframe improves
                </div>
              </button>
            </div>
          </div>
        )}

        {/* --- QUALITY / INFO SUB-FLOW --- */}
        {selectedConcern === 'quality_info' && (
          <div>
            <p style={{
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--myntra-navy)',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              What information are you waiting for?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {[
                { id: 'fabric_photos', label: 'Verified Customer Daylight Fabric Photos' },
                { id: 'body_fit_reviews', label: 'Sizing reviews from buyers of my exact height (5\'4")' },
                { id: 'wash_opacity', label: 'Fabric opacity and wash test results' }
              ].map(opt => {
                const isSelected = qualityOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setQualityOption(opt.id)}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '1.8px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                      backgroundColor: isSelected ? 'var(--myntra-pink-soft)' : 'var(--myntra-bg-white)',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--myntra-navy)'
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* --- PURCHASE TIMING SUB-FLOW --- */}
        {selectedConcern === 'purchase_timing' && (
          <div>
            <p style={{
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--myntra-navy)',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              When should we remind you?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {[
                { id: 'salary_3rd', label: '3rd of next month (Salary Day)' },
                { id: 'weekend', label: 'Upcoming Weekend (Saturday 10 AM)' },
                { id: 'end_month', label: 'End of Month reminder' }
              ].map(opt => {
                const isSelected = timingDateOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setTimingDateOption(opt.id)}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '1.8px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                      backgroundColor: isSelected ? 'var(--myntra-pink-soft)' : 'var(--myntra-bg-white)',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--myntra-navy)'
                    }}
                  >
                    📅 {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* --- OTHER SUB-FLOW --- */}
        {selectedConcern === 'other' && (
          <div>
            <p style={{
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--myntra-navy)',
              textAlign: 'center',
              marginBottom: '12px'
            }}>
              Tell us your specific question or concern:
            </p>

            <textarea
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="e.g. I want to see how this fabric looks on a real person in natural daylight..."
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--myntra-border)',
                fontSize: '13px',
                marginBottom: '20px',
                resize: 'none'
              }}
            />
          </div>
        )}

        {/* Actions: SAVE (Primary Myntra Pink) and CANCEL (Matching wireframes.png Screen 5) */}
        <button
          onClick={handleSave}
          className="btn-myntra-primary"
          style={{
            width: '100%',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '14px',
            fontWeight: 800,
            marginBottom: '10px'
          }}
        >
          SAVE
        </button>

        <button
          onClick={() => store.dismissConcernModal()}
          className="btn-myntra-ghost"
          style={{
            width: '100%',
            height: '40px',
            color: 'var(--myntra-navy)'
          }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};
