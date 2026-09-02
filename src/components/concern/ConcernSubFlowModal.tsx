import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { getCategoryArchetype } from '../../utils/categoryNotificationConfig';
import { ArrowLeft, Check, ShieldCheck, Sparkles, Laptop, Sun, Activity, RefreshCw, Scissors, Watch, Palette } from 'lucide-react';

export const ConcernSubFlowModal: React.FC = () => {
  const store = useAppStore();
  const { isOpen, step, selectedConcern, productId } = store.concernModal;
  const product = store.products.find(p => p.id === productId);

  const archetype = product ? getCategoryArchetype(product.category) : 'general';

  // Dynamic initial values based on category
  const [selectedSize, setSelectedSize] = useState<string>(() => {
    if (archetype === 'footwear') return 'UK 9';
    if (archetype === 'watches') return '42mm';
    if (archetype === 'denim') return 'Waist 32';
    return 'XL';
  });

  const [selectedColor, setSelectedColor] = useState<string>(() => {
    if (product && product.availableColors.length > 0) return product.availableColors[0].name;
    return 'Navy Blue';
  });

  const [priceOption, setPriceOption] = useState<string>('any_drop');
  const [targetPrice, setTargetPrice] = useState<number>(product ? Math.floor(product.price * 0.85) : 999);
  const [deliveryOption, setDeliveryOption] = useState<string>('express_24h');
  const [qualityOption, setQualityOption] = useState<string>('verified_photos');
  const [timingDateOption, setTimingDateOption] = useState<string>('salary_3rd');
  const [otherText, setOtherText] = useState<string>('');

  if (!isOpen || step !== 5 || !selectedConcern || !product) return null;

  const handleSave = () => {
    let params: Record<string, any> = {};

    switch (selectedConcern) {
      case 'size':
        if (archetype === 'footwear') {
          params = { targetShoeSize: selectedSize, targetSize: selectedSize };
        } else if (archetype === 'watches') {
          params = { targetDialSize: selectedSize, targetSize: selectedSize };
        } else if (archetype === 'denim') {
          params = { targetWaistSize: selectedSize, targetSize: selectedSize };
        } else {
          params = { targetSize: selectedSize };
        }
        break;

      case 'price':
        params = { 
          priceOption, 
          targetPrice: priceOption === 'specific_target' ? targetPrice : Math.floor(product.price * 0.9), 
          capturedPrice: product.price 
        };
        break;

      case 'colour':
        params = { targetColor: selectedColor };
        break;

      case 'delivery':
        params = { deliveryOption, pincode: product.deliveryEstimate.pincode };
        break;

      case 'quality_info':
        params = { 
          qualityOption,
          notificationPreference: qualityOption === 'laptop_fit' 
            ? 'Verified 14" Laptop Fit Photos'
            : qualityOption === 'warranty'
            ? '2-Year Brand Warranty Verification'
            : qualityOption === 'drape'
            ? 'Daylight Drape & Blouse Piece Photos'
            : qualityOption === 'comfort'
            ? 'Arch Cushioning & Comfort Ratings'
            : qualityOption === 'stretch'
            ? 'Stretch & Shape Retention Ratings'
            : 'Verified Daylight Fabric & Opacity Photos'
        };
        break;

      case 'purchase_timing':
        params = { 
          timingOption: timingDateOption,
          dateLabel: timingDateOption === 'salary_3rd' 
            ? '3rd of Month (Salary Day)' 
            : timingDateOption === 'weekend'
            ? 'Upcoming Weekend'
            : 'Festive / Birthday Occasion'
        };
        break;

      case 'other':
        params = { customText: otherText || 'Personal fit & styling guidance inquiry' };
        break;
    }

    store.saveConcernTrigger(params);
  };

  const getSubFlowTitle = () => {
    if (selectedConcern === 'size') {
      if (archetype === 'footwear') return 'Shoe Size (UK)';
      if (archetype === 'watches') return 'Dial & Case Diameter';
      if (archetype === 'denim') return 'Waist & Inseam Size';
      return 'Size Availability';
    }
    if (selectedConcern === 'quality_info') {
      if (archetype === 'watches') return 'Warranty & Water Resistance';
      if (archetype === 'bags') return 'Laptop Fit & Capacity';
      if (archetype === 'ethnic') return 'Drape & Blouse Piece';
      if (archetype === 'footwear') return 'Arch Comfort & Cushioning';
      if (archetype === 'denim') return 'Stretch & Fade Resistance';
      return 'Daylight Fabric & Opacity';
    }
    if (selectedConcern === 'price') return 'Price Drop & Offers';
    if (selectedConcern === 'colour') return 'Color & Finish';
    if (selectedConcern === 'delivery') return 'Delivery & Dispatch';
    if (selectedConcern === 'purchase_timing') return 'Purchase Timing';
    return 'Custom Inquiry';
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
        {/* Top Nav Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px',
          position: 'relative'
        }}>
          <button 
            onClick={() => store.backToConcernCategories()}
            style={{ padding: '6px', color: 'var(--myntra-navy)', zIndex: 2 }}
          >
            <ArrowLeft size={22} strokeWidth={2.4} />
          </button>
          
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--myntra-pink)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              {product.category}
            </span>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
              {getSubFlowTitle()}
            </h3>
          </div>

          <div style={{ width: '28px' }} />
        </div>

        {/* ========================================================= */}
        {/* 1. DYNAMIC SIZE SUB-FLOW */}
        {/* ========================================================= */}
        {selectedConcern === 'size' && (
          <div>
            <p style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--myntra-navy)',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              {archetype === 'footwear' 
                ? 'Which UK shoe size are you looking for?'
                : archetype === 'watches'
                ? 'Which dial case size fits your wrist best?'
                : archetype === 'denim'
                ? 'Select your preferred waist size:'
                : 'Which size are you looking for?'}
            </p>

            {/* A. Footwear UK Sizes */}
            {archetype === 'footwear' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'].map(sz => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: '12px 6px',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                        backgroundColor: isSelected ? 'var(--myntra-pink-soft)' : 'var(--myntra-bg-white)',
                        color: isSelected ? 'var(--myntra-pink)' : 'var(--myntra-navy)',
                        fontWeight: isSelected ? 800 : 600,
                        fontSize: '13px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <span>{sz}</span>
                      <span style={{ fontSize: '9px', color: isSelected ? 'var(--myntra-pink)' : 'var(--myntra-text-muted)' }}>
                        {sz === 'UK 9' ? 'Restock Soon' : 'Standard Fit'}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* B. Watches Dial Sizes */}
            {archetype === 'watches' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {[
                  { size: '38mm', label: '38mm (Slim Profile)', desc: 'Ideal for slender wrists & formal dress wear' },
                  { size: '40mm', label: '40mm (Standard Modern)', desc: 'Versatile everyday proportion' },
                  { size: '42mm', label: '42mm (Classic Fit)', desc: 'Balanced presence with crisp legibility' },
                  { size: '44mm', label: '44mm (Bold Chronograph)', desc: 'Prominent sporty chronograph case' }
                ].map(item => {
                  const isSelected = selectedSize === item.size;
                  return (
                    <button
                      key={item.size}
                      onClick={() => setSelectedSize(item.size)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                        backgroundColor: isSelected ? 'var(--myntra-pink-soft)' : 'var(--myntra-bg-white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: isSelected ? 'var(--myntra-pink)' : 'var(--myntra-navy)' }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                          {item.desc}
                        </div>
                      </div>
                      {isSelected && <Check size={18} color="var(--myntra-pink)" strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* C. Denim Waist Sizes */}
            {archetype === 'denim' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {['Waist 28', 'Waist 30', 'Waist 32', 'Waist 34', 'Waist 36', 'Waist 38'].map(w => {
                  const isSelected = selectedSize === w;
                  return (
                    <button
                      key={w}
                      onClick={() => setSelectedSize(w)}
                      style={{
                        padding: '12px 6px',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                        backgroundColor: isSelected ? 'var(--myntra-pink-soft)' : 'var(--myntra-bg-white)',
                        color: isSelected ? 'var(--myntra-pink)' : 'var(--myntra-navy)',
                        fontWeight: isSelected ? 800 : 600,
                        fontSize: '13px',
                        textAlign: 'center'
                      }}
                    >
                      {w}
                    </button>
                  );
                })}
              </div>
            )}

            {/* D. Standard Apparel Alpha Sizes */}
            {archetype !== 'footwear' && archetype !== 'watches' && archetype !== 'denim' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'].map(sz => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: '12px 6px',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                        backgroundColor: isSelected ? 'var(--myntra-pink-soft)' : 'var(--myntra-bg-white)',
                        color: isSelected ? 'var(--myntra-pink)' : 'var(--myntra-navy)',
                        fontWeight: isSelected ? 800 : 600,
                        fontSize: '13px',
                        textAlign: 'center'
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. DYNAMIC QUALITY / SPECIFICATION SUB-FLOW */}
        {/* ========================================================= */}
        {selectedConcern === 'quality_info' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)', marginBottom: '6px' }}>
              What specific information do you want verified?
            </p>

            {archetype === 'watches' && (
              <>
                <label 
                  onClick={() => setQualityOption('warranty')}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: qualityOption === 'warranty' ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                    backgroundColor: qualityOption === 'warranty' ? 'var(--myntra-pink-soft)' : 'white',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <ShieldCheck size={20} color="var(--myntra-success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                      2-Year Official Brand Warranty Verification
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                      Notify when original brand warranty card registration is confirmed.
                    </div>
                  </div>
                </label>

                <label 
                  onClick={() => setQualityOption('water_scratch')}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: qualityOption === 'water_scratch' ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                    backgroundColor: qualityOption === 'water_scratch' ? 'var(--myntra-pink-soft)' : 'white',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <Activity size={20} color="var(--myntra-navy)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                      Water Resistance (5 ATM) & Scratch Test
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                      Notify when lab verification for mineral glass & seal is uploaded.
                    </div>
                  </div>
                </label>
              </>
            )}

            {archetype === 'bags' && (
              <>
                <label 
                  onClick={() => setQualityOption('laptop_fit')}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: qualityOption === 'laptop_fit' ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                    backgroundColor: qualityOption === 'laptop_fit' ? 'var(--myntra-pink-soft)' : 'white',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <Laptop size={20} color="var(--myntra-pink)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                      14-inch Laptop Fit Photo Verification
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                      Notify when customer photos showing laptop & compartment capacity are uploaded.
                    </div>
                  </div>
                </label>

                <label 
                  onClick={() => setQualityOption('leather_zipper')}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: qualityOption === 'leather_zipper' ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                    backgroundColor: qualityOption === 'leather_zipper' ? 'var(--myntra-pink-soft)' : 'white',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <ShieldCheck size={20} color="var(--myntra-success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                      Hardware Zipper & Stitch Durability Reviews
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                      Notify when long-term wear & zip smoothness ratings are added.
                    </div>
                  </div>
                </label>
              </>
            )}

            {archetype === 'ethnic' && (
              <>
                <label 
                  onClick={() => setQualityOption('drape')}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: qualityOption === 'drape' ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                    backgroundColor: qualityOption === 'drape' ? 'var(--myntra-pink-soft)' : 'white',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <Sun size={20} color="var(--myntra-pink)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                      Daylight Drape & Blouse Piece Photos
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                      Notify when verified daylight photos showing fabric opacity & 0.8m blouse piece are added.
                    </div>
                  </div>
                </label>

                <label 
                  onClick={() => setQualityOption('zari_authenticity')}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: qualityOption === 'zari_authenticity' ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                    backgroundColor: qualityOption === 'zari_authenticity' ? 'var(--myntra-pink-soft)' : 'white',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <Sparkles size={20} color="var(--myntra-navy)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                      Pure Silk & Zari Weave Hallmark
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                      Notify when certified weave density and gold thread luster ratings are confirmed.
                    </div>
                  </div>
                </label>
              </>
            )}

            {archetype !== 'watches' && archetype !== 'bags' && archetype !== 'ethnic' && (
              <>
                <label 
                  onClick={() => setQualityOption('verified_photos')}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: qualityOption === 'verified_photos' ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                    backgroundColor: qualityOption === 'verified_photos' ? 'var(--myntra-pink-soft)' : 'white',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <Sun size={20} color="var(--myntra-pink)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                      Daylight Opacity & Zero Show-Through Photos
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                      Notify when customer photos under natural lighting are uploaded.
                    </div>
                  </div>
                </label>

                <label 
                  onClick={() => setQualityOption('wash_shrinkage')}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: qualityOption === 'wash_shrinkage' ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                    backgroundColor: qualityOption === 'wash_shrinkage' ? 'var(--myntra-pink-soft)' : 'white',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <RefreshCw size={20} color="var(--myntra-navy)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                      Wash Shrinkage & Elasticity Retention
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                      Notify when ratings for post-wash shape and color bleeding are added.
                    </div>
                  </div>
                </label>
              </>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. DYNAMIC PRICE SUB-FLOW */}
        {/* ========================================================= */}
        {selectedConcern === 'price' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)', marginBottom: '4px' }}>
              Current Price: <strong style={{ color: 'var(--myntra-pink)' }}>₹{product.price}</strong> ({product.discountPct}% OFF MRP ₹{product.mrp})
            </p>

            <button
              onClick={() => setPriceOption('any_drop')}
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: priceOption === 'any_drop' ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                backgroundColor: priceOption === 'any_drop' ? 'var(--myntra-pink-soft)' : 'white',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                  Any Price Drop & Bank Offers
                </div>
                <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                  Notify as soon as the price drops or special coupon activates
                </div>
              </div>
              {priceOption === 'any_drop' && <Check size={18} color="var(--myntra-pink)" strokeWidth={3} />}
            </button>

            <button
              onClick={() => setPriceOption('specific_target')}
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: priceOption === 'specific_target' ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                backgroundColor: priceOption === 'specific_target' ? 'var(--myntra-pink-soft)' : 'white',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                  Price Drops Below ₹{targetPrice} (15% Extra OFF)
                </div>
                <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                  Target price trigger for end-of-season sale
                </div>
              </div>
              {priceOption === 'specific_target' && <Check size={18} color="var(--myntra-pink)" strokeWidth={3} />}
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. DYNAMIC COLOR / VARIANT SUB-FLOW */}
        {/* ========================================================= */}
        {selectedConcern === 'colour' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)', marginBottom: '4px' }}>
              Select the colorway / finish you are waiting for:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {product.availableColors.map(c => {
                const isSelected = selectedColor === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                      backgroundColor: isSelected ? 'var(--myntra-pink-soft)' : 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: c.hex,
                      border: '1px solid rgba(0,0,0,0.15)',
                      flexShrink: 0
                    }} />
                    <span style={{ fontSize: '12px', fontWeight: isSelected ? 800 : 600, color: 'var(--myntra-navy)' }}>
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. DYNAMIC PURCHASE TIMING SUB-FLOW */}
        {/* ========================================================= */}
        {selectedConcern === 'purchase_timing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)', marginBottom: '4px' }}>
              When should we remind you about this piece?
            </p>

            {[
              { id: 'salary_3rd', title: '3rd of Month (Salary Day)', desc: 'Gentle notification when your monthly budget renews' },
              { id: 'weekend', title: 'Upcoming Weekend Outing', desc: 'Saturday morning reminder with fast 24hr delivery' },
              { id: 'festive', title: 'Next Festival / Gifting Date', desc: '2 weeks before the upcoming celebration' }
            ].map(t => {
              const isSelected = timingDateOption === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTimingDateOption(t.id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: isSelected ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                    backgroundColor: isSelected ? 'var(--myntra-pink-soft)' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: isSelected ? 'var(--myntra-pink)' : 'var(--myntra-navy)' }}>
                      {t.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                      {t.desc}
                    </div>
                  </div>
                  {isSelected && <Check size={18} color="var(--myntra-pink)" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        )}

        {/* ========================================================= */}
        {/* 6. OTHER / CUSTOM SUB-FLOW */}
        {/* ========================================================= */}
        {selectedConcern === 'other' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--myntra-navy)', marginBottom: '4px' }}>
              Tell us your specific question or hesitation for {product.brand}:
            </p>
            <textarea
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="e.g. Can you upload real photo of someone 5'4'' wearing this?"
              style={{
                width: '100%',
                height: '80px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--myntra-border)',
                fontSize: '12px',
                fontFamily: 'inherit',
                resize: 'none'
              }}
            />
          </div>
        )}

        {/* Primary Save Action Button */}
        <button
          onClick={handleSave}
          className="btn-myntra-primary"
          style={{
            width: '100%',
            height: '46px',
            fontSize: '14px',
            fontWeight: 800,
            borderRadius: 'var(--radius-sm)'
          }}
        >
          SAVE & SET NOTIFICATION
        </button>
      </div>
    </div>
  );
};
