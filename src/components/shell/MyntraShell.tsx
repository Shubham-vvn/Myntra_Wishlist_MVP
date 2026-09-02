import React, { useState, useEffect } from 'react';
import { TopBar } from './TopBar';
import { BottomNavBar } from './BottomNavBar';
import { Wifi, Battery } from 'lucide-react';

interface MyntraShellProps {
  children: React.ReactNode;
  overlays?: React.ReactNode;
}

export const MyntraShell: React.FC<MyntraShellProps> = ({ children, overlays }) => {
  // Live Real-Time Clock formatted for iOS Status Bar
  const [currentTime, setCurrentTime] = useState<string>(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: 'radial-gradient(circle at center, #1e1e2d 0%, #0d0d14 100%)',
      overflow: 'hidden',
      userSelect: 'none'
    }}>
      {/* iPhone 15 Pro Hardware Frame */}
      <div 
        className="iphone-15-pro-frame"
        style={{
          width: '393px',
          height: '844px',
          maxHeight: '96vh',
          borderRadius: '46px',
          boxShadow: '0 0 0 10px #1a1a24, 0 0 0 12px #32323f, 0 35px 80px -10px rgba(0,0,0,0.85)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--myntra-bg-white)',
          overflow: 'hidden'
        }}
      >
        {/* Permanent iOS 17 Status Bar with Dynamic Island (Always on Top) */}
        <div style={{
          height: '34px',
          backgroundColor: 'var(--myntra-bg-white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--myntra-navy)',
          zIndex: 300,
          position: 'relative',
          flexShrink: 0,
          borderBottom: '1px solid rgba(0,0,0,0.03)'
        }}>
          {/* Live Real-Time Clock */}
          <span style={{ fontWeight: 800, fontSize: '13px', letterSpacing: '-0.2px' }}>
            {currentTime}
          </span>
          
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '8px',
            transform: 'translateX(-50%)',
            width: '94px',
            height: '24px',
            backgroundColor: '#000000',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '8px'
          }}>
            {/* Camera dot */}
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#111e2e',
              border: '1px solid #1c2e42'
            }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '10px', fontWeight: 800 }}>5G</span>
            <Wifi size={13} strokeWidth={2.6} />
            <Battery size={15} strokeWidth={2.6} />
          </div>
        </div>

        {/* Global Sticky Top Header */}
        <TopBar />

        {/* Main Scrollable Viewport */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          backgroundColor: 'var(--myntra-bg-light)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {children}
        </main>

        {/* Sticky Bottom Navigation Bar */}
        <BottomNavBar />

        {/* Permanent iPhone Home Indicator Bar (Always on Top) */}
        <div style={{
          height: '14px',
          backgroundColor: 'var(--myntra-bg-white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300,
          position: 'relative',
          flexShrink: 0
        }}>
          <div style={{
            width: '120px',
            height: '4px',
            borderRadius: '2px',
            backgroundColor: '#282c3f',
            opacity: 0.25
          }} />
        </div>

        {/* Full-Frame Viewport Overlays (Modals, PDP, Bottom Sheets) */}
        {overlays}
      </div>
    </div>
  );
};
