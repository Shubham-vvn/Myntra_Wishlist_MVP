import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { X, ShieldCheck, Sparkles, Sliders, CheckCircle2, ShoppingBag, Eye, Wind, Layers } from 'lucide-react';

export const AssuranceModal: React.FC = () => {
  const store = useAppStore();
  const { isOpen, productId, selectedSize, userHeightCm } = store.assuranceModal;
  const product = store.products.find(p => p.id === productId);

  const [activeMacroIdx, setActiveMacroIdx] = useState(0);
  const [currentHeight, setCurrentHeight] = useState<number>(userHeightCm || 163);
  const [chosenFitPreference, setChosenFitPreference] = useState<'tailored' | 'relaxed'>('relaxed');

  if (!isOpen || !product) return null;

  const heightFeetInches = `${Math.floor(currentHeight / 30.48)}'${Math.round((currentHeight % 30.48) / 2.54)}"`;

  return (
    <div style={{
      position: 'absolute',
      top: '34px',
      bottom: '14px',
      left: 0,
      right: 0,
      backgroundColor: 'rgba(40, 44, 63, 0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 120
    }}>
      <div 
        className="animate-slide-up"
        style={{
          width: '100%',
          maxHeight: '92%',
          backgroundColor: 'var(--myntra-bg-white)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-modal)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Top Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--myntra-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--myntra-bg-white)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--myntra-success-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={16} color="var(--myntra-success)" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
                Pre-Purchase Assurance Bridge
              </div>
              <div style={{ fontSize: '11px', color: 'var(--myntra-text-secondary)' }}>
                {product.brand} • {product.name}
              </div>
            </div>
          </div>

          <button 
            onClick={() => store.closeAssuranceModal()}
            style={{ color: 'var(--myntra-text-muted)', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 90px' }}>

          {/* --- STAGE 2.1: INTERACTIVE BODY-FIT HISTOGRAM --- */}
          <div style={{
            backgroundColor: '#fbfbfb',
            border: '1px solid var(--myntra-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
                📊 Crowd Fit Matcher for Your Height
              </span>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--myntra-pink)' }}>
                {heightFeetInches} ({currentHeight} cm)
              </span>
            </div>

            {/* Height Slider */}
            <div style={{ marginBottom: '14px' }}>
              <input 
                type="range" 
                min="145" 
                max="190" 
                value={currentHeight}
                onChange={(e) => setCurrentHeight(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--myntra-pink)',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--myntra-text-muted)', marginTop: '2px' }}>
                <span>4'9" (145 cm)</span>
                <span>Adjust your height</span>
                <span>6'3" (190 cm)</span>
              </div>
            </div>

            {/* Fit Feedback Histogram Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, marginBottom: '2px' }}>
                  <span style={{ color: 'var(--myntra-success-dark)' }}>🟢 True to Size ({product.fitConsensus.trueToSizePct}%)</span>
                  <span>{product.fitConsensus.trueToSizeCount} buyers</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${product.fitConsensus.trueToSizePct}%`, height: '100%', backgroundColor: 'var(--myntra-success)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--myntra-text-muted)' }}>
                    <span>Runs Small</span>
                    <span>{product.fitConsensus.runsSmallPct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '5px', backgroundColor: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${product.fitConsensus.runsSmallPct}%`, height: '100%', backgroundColor: '#f5a623' }} />
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--myntra-text-muted)' }}>
                    <span>Runs Large</span>
                    <span>{product.fitConsensus.runsLargePct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '5px', backgroundColor: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${product.fitConsensus.runsLargePct}%`, height: '100%', backgroundColor: '#9e9e9e' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- STAGE 2.2: GEMINI CONTEXTUAL AI FIT SYNTHESIS --- */}
          <div style={{
            backgroundColor: 'var(--myntra-pink-soft)',
            border: '1px solid var(--myntra-pink-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px',
            marginBottom: '16px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Sparkles size={16} color="var(--myntra-pink)" />
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--myntra-pink)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                AI Contextual Fit Comparison
              </span>
            </div>

            <p style={{
              fontSize: '13px',
              color: 'var(--myntra-navy)',
              lineHeight: '1.45',
              fontWeight: 600
            }}>
              "Based on your profile (5'4", Size M), this piece <strong>fits identical to your Roadster Cotton Kurta in Size M</strong>. The chest has comfortable ease while the waist gives a relaxed silhouette without clinging."
            </p>

            {/* Smart Size Recommendation Toggle */}
            <div style={{
              marginTop: '12px',
              paddingTop: '10px',
              borderTop: '1px solid rgba(255, 63, 108, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                Recommended Choice:
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => {
                    setChosenFitPreference('tailored');
                    store.updateAssuranceSize('S');
                  }}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: chosenFitPreference === 'tailored' ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                    backgroundColor: chosenFitPreference === 'tailored' ? 'white' : 'transparent',
                    color: chosenFitPreference === 'tailored' ? 'var(--myntra-pink)' : 'var(--myntra-text-secondary)'
                  }}
                >
                  Tailored (Size S)
                </button>

                <button
                  onClick={() => {
                    setChosenFitPreference('relaxed');
                    store.updateAssuranceSize('M');
                  }}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: chosenFitPreference === 'relaxed' ? '1.5px solid var(--myntra-pink)' : '1px solid var(--myntra-border)',
                    backgroundColor: chosenFitPreference === 'relaxed' ? 'white' : 'transparent',
                    color: chosenFitPreference === 'relaxed' ? 'var(--myntra-pink)' : 'var(--myntra-text-secondary)'
                  }}
                >
                  Relaxed (Size M) ★
                </button>
              </div>
            </div>
          </div>

          {/* --- STAGE 2.3: FABRIC DNA MACRO GALLERY & METERS --- */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--myntra-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
                🧵 Verified Fabric DNA & Weave
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--myntra-text-secondary)' }}>
                {product.fabricDNA.weaveType}
              </span>
            </div>

            {/* Macro Photo Thumbnail */}
            <div style={{
              width: '100%',
              height: '140px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              marginBottom: '12px',
              position: 'relative'
            }}>
              <img 
                src={product.fabricDNA.macroImages[activeMacroIdx] || product.images[0]} 
                alt="Fabric Macro"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                fontSize: '9px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 'var(--radius-xs)',
                backdropFilter: 'blur(4px)'
              }}>
                Unedited Daylight Close-Up
              </div>
            </div>

            {/* Fabric DNA 3 Meters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <div style={{
                padding: '8px',
                backgroundColor: '#f7f7f8',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center'
              }}>
                <Eye size={16} color="var(--myntra-navy)" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
                  {product.fabricDNA.opacityScore} / 5.0
                </div>
                <div style={{ fontSize: '9px', color: 'var(--myntra-text-muted)' }}>
                  Opacity Rating
                </div>
              </div>

              <div style={{
                padding: '8px',
                backgroundColor: '#f7f7f8',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center'
              }}>
                <Wind size={16} color="var(--myntra-navy)" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
                  {product.fabricDNA.breathabilityScore} / 5.0
                </div>
                <div style={{ fontSize: '9px', color: 'var(--myntra-text-muted)' }}>
                  Breathability
                </div>
              </div>

              <div style={{
                padding: '8px',
                backgroundColor: '#f7f7f8',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center'
              }}>
                <Layers size={16} color="var(--myntra-navy)" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--myntra-navy)' }}>
                  {product.fabricDNA.gsmWeight} GSM
                </div>
                <div style={{ fontSize: '9px', color: 'var(--myntra-text-muted)' }}>
                  Fabric Weight
                </div>
              </div>
            </div>
          </div>

          {/* --- STAGE 2.4: QUALITY ASSURANCE BADGE --- */}
          <div style={{
            backgroundColor: '#e6f7f4',
            border: '1px solid #b3ebd9',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <CheckCircle2 size={24} color="#03a685" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#028066' }}>
                100% Fit & Fabric Quality Guarantee
              </div>
              <div style={{ fontSize: '11px', color: '#535766', marginTop: '2px' }}>
                Verified fabric DNA and crowd fit statistics backed by Myntra's easy 14-day return and exchange policy.
              </div>
            </div>
          </div>

        </div>

        {/* Sticky Bottom Action CTA: MOVE TO BAG */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 16px',
          backgroundColor: 'var(--myntra-bg-white)',
          borderTop: '1px solid var(--myntra-border)',
          boxShadow: 'var(--shadow-bottom-nav)',
          zIndex: 20
        }}>
          <button
            onClick={() => store.moveToBagWithSwap(product.id, selectedSize)}
            className="btn-myntra-primary"
            style={{
              width: '100%',
              height: '48px',
              fontSize: '14px',
              fontWeight: 800,
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <ShoppingBag size={18} />
            MOVE TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};
