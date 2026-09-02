import React from 'react';
import { useAppStore } from '../../store/appStore';
import { ConcernType } from '../../types';
import { Shirt, Tag, Palette, Truck, FileText, Calendar, MessageSquare, X } from 'lucide-react';

export const ConcernCategorySelector: React.FC = () => {
  const store = useAppStore();
  const { isOpen, step } = store.concernModal;

  if (!isOpen || step !== 4) return null;

  const categories: Array<{
    id: ConcernType;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  }> = [
    {
      id: 'size',
      title: 'Size',
      subtitle: 'When my size is available',
      icon: Shirt
    },
    {
      id: 'price',
      title: 'Price',
      subtitle: 'When price drops',
      icon: Tag
    },
    {
      id: 'colour',
      title: 'Colour',
      subtitle: 'When my preferred colour is available',
      icon: Palette
    },
    {
      id: 'delivery',
      title: 'Delivery',
      subtitle: 'When delivery is faster / policy changes',
      icon: Truck
    },
    {
      id: 'quality_info',
      title: 'Quality / Product info',
      subtitle: 'When more info or reviews are available',
      icon: FileText
    },
    {
      id: 'purchase_timing',
      title: 'Purchase timing',
      subtitle: 'Remind me on a specific date',
      icon: Calendar
    },
    {
      id: 'other',
      title: 'Other',
      subtitle: 'Other concern',
      icon: MessageSquare
    }
  ];

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
          maxHeight: '85%',
          backgroundColor: 'var(--myntra-bg-white)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: '24px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-modal)',
          overflowY: 'auto'
        }}
      >
        {/* Modal Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <h3 style={{
            fontSize: '17px',
            fontWeight: 800,
            color: 'var(--myntra-navy)',
            lineHeight: '1.3'
          }}>
            What would you like to be notified about?
          </h3>
          <button 
            onClick={() => store.dismissConcernModal()}
            style={{ color: 'var(--myntra-text-muted)', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Categories List (Matching Screen 4 in wireframes.png) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {categories.map(cat => {
            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                onClick={() => store.selectConcernCategory(cat.id)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--myntra-navy)' }}>
                      {cat.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--myntra-text-secondary)', marginTop: '2px' }}>
                      {cat.subtitle}
                    </div>
                  </div>
                </div>

                {/* Radio circle */}
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: '1.8px solid var(--myntra-border)',
                  backgroundColor: 'transparent'
                }} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
