
import React from 'react';
import { BRAND } from '../constants.ts';

export const SafaArbanLogo = ({ className = "h-12", variant = 'color' }: { className?: string, variant?: 'color' | 'white' }) => (
  <svg viewBox="0 0 380 84" className={className} xmlns="http://www.w3.org/2000/svg" fill="none" aria-label="SafaArban Logo">
    {/* Symbol: Abstract "S" formed by two interlocking geometric shapes */}
    <g transform="translate(4, 4)">
        {/* Top Shape (Coral Red) */}
       <path d="M45 10 L75 10 L55 35 L25 35 Z" fill="#E94E4E" />
       
       {/* Bottom Shape (Deep Blue or White) */}
       <path d="M25 40 L55 40 L45 65 L15 65 Z" fill={variant === 'white' ? '#FFFFFF' : '#0D2B4F'} />
    </g>

    {/* Typography */}
    <g transform="translate(90, 52)">
       <text fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="40" fill={variant === 'white' ? '#FFFFFF' : '#0D2B4F'} letterSpacing="-0.02em">SafaArban</text>
       <text x="215" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="40" fill="#E94E4E" letterSpacing="-0.02em">Ltd</text>
    </g>
  </svg>
);
