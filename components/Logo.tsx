import React from 'react';
import { BRAND } from '../constants.ts';

export const SafaArbanLogo = ({ className = "h-12", variant = 'color' }: { className?: string, variant?: 'color' | 'white' }) => (
  <svg viewBox="0 0 320 84" className={className} xmlns="http://www.w3.org/2000/svg" fill="none" aria-label="SafaArban Logo">
    {/* Symbol: Abstract "S" formed by two interlocking geometric shapes */}
    <g transform="translate(4, 4)">
        {/* Top Shape (Coral Orange) */}
       <path d="M45 10 L75 10 L55 35 L25 35 Z" fill="#F26522" />
       
       {/* Bottom Shape (Deep Navy or White) */}
       <path d="M25 40 L55 40 L45 65 L15 65 Z" fill={variant === 'white' ? '#FFFFFF' : '#051C2C'} />
    </g>

    {/* Typography */}
    <g transform="translate(90, 52)">
       <text fontFamily="Inter, sans-serif" fontWeight="800" fontSize="42" fill={variant === 'white' ? '#FFFFFF' : '#051C2C'} letterSpacing="-0.02em">SAFA</text>
       <text x="115" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="42" fill={variant === 'white' ? '#FFFFFF' : '#051C2C'} letterSpacing="-0.02em">ARBAN</text>
       <text x="2" y="24" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="9.5" fill="#F26522" letterSpacing="0.38em" style={{textTransform: 'uppercase'}}>Ltd</text>
    </g>
  </svg>
);