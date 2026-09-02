import React from 'react';

interface MyntraLogoProps {
  width?: number;
  height?: number;
  showText?: boolean;
}

export const MyntraLogo: React.FC<MyntraLogoProps> = ({ 
  width = 30, 
  height = 24, 
  showText = true 
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {/* Official Authentic Myntra Multi-Color 4-Ribbon 'M' Emblem */}
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 100 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="myn-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F58220" />
            <stop offset="100%" stopColor="#F15A24" />
          </linearGradient>
          <linearGradient id="myn-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ED1C24" />
            <stop offset="100%" stopColor="#BE1E2D" />
          </linearGradient>
          <linearGradient id="myn-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF3366" />
            <stop offset="100%" stopColor="#D4145A" />
          </linearGradient>
          <linearGradient id="myn-grad-4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E6007E" />
            <stop offset="100%" stopColor="#9E1F63" />
          </linearGradient>
        </defs>

        {/* 1. Left Outer Wing (Orange Gradient) */}
        <path 
          d="M12 70 C12 70 8 48 18 28 C25 14 36 10 40 22 C36 42 24 64 24 70 Z" 
          fill="url(#myn-grad-1)" 
        />

        {/* 2. Left Center Loop (Red-Orange Gradient) */}
        <path 
          d="M26 70 C26 70 34 38 46 22 C52 14 62 18 58 32 C50 50 38 68 38 70 Z" 
          fill="url(#myn-grad-2)" 
        />

        {/* 3. Right Center Loop (Hot Pink Gradient) */}
        <path 
          d="M48 70 C48 70 56 46 66 28 C72 18 82 22 78 36 C70 54 60 68 60 70 Z" 
          fill="url(#myn-grad-3)" 
        />

        {/* 4. Right Outer Wing (Magenta-Berry Gradient) */}
        <path 
          d="M62 70 C62 70 72 44 82 24 C88 12 96 16 92 30 C86 48 74 66 74 70 Z" 
          fill="url(#myn-grad-4)" 
        />
      </svg>

      {showText && (
        <span style={{
          fontSize: '18px',
          fontWeight: 800,
          letterSpacing: '-0.3px',
          color: '#282c3f',
          fontFamily: "'Assistant', sans-serif"
        }}>
          Myntra
        </span>
      )}
    </div>
  );
};
