
import React from 'react';
import { BRAND } from '../constants';

// Calibrated roughly to standard equirectangular projection (0-100%)
const LOCATIONS = [
  // Americas
  { name: "New York", x: 28, y: 32 },
  { name: "Los Angeles", x: 16, y: 36 },
  { name: "Toronto", x: 26, y: 29 },
  { name: "Sao Paulo", x: 34, y: 70 },
  { name: "Mexico City", x: 18, y: 45 },
  
  // Europe
  { name: "London", x: 49, y: 23 },
  { name: "Paris", x: 50, y: 26 },
  { name: "Berlin", x: 52, y: 21 },
  { name: "Moscow", x: 62, y: 18 },
  
  // Asia
  { name: "Beijing", x: 82, y: 32 },
  { name: "Tokyo", x: 92, y: 34 },
  { name: "Singapore", x: 80, y: 55 },
  { name: "Mumbai", x: 69, y: 44 },
  { name: "Dubai", x: 64, y: 40 },
  
  // Africa
  { name: "Cairo", x: 56, y: 40 },
  { name: "Lagos", x: 49, y: 52 },
  { name: "Cape Town", x: 54, y: 82 },
  
  // Oceania
  { name: "Sydney", x: 94, y: 78 },
];

const RIYADH = { x: 62, y: 40 };

const GlobalPresence: React.FC = () => {
  return (
    <div className="bg-white py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
         
         <div className="order-2 lg:order-1">
            <span className="text-[#006C35] font-black uppercase tracking-[0.3em] text-[10px] block mb-4">Global Network</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ color: BRAND.colors.primary }}>
               Connecting Capitals <br/> to the Kingdom
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">
               SafaArban serves as the central node for international capital flowing into Saudi Arabia. We bridge the regulatory gap between global headquarters and their Riyadh operations.
            </p>
            <div className="flex gap-8">
               <div>
                  <p className="text-4xl font-black" style={{ color: BRAND.colors.primary }}>50+</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Countries Served</p>
               </div>
               <div>
                  <p className="text-4xl font-black" style={{ color: BRAND.colors.primary }}>$2.5B+</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">FDI Facilitated</p>
               </div>
            </div>
         </div>

         <div className="order-1 lg:order-2 relative w-full aspect-[1.8/1] rounded-[3rem] shadow-2xl overflow-hidden border border-white/10" style={{ backgroundColor: BRAND.colors.primary }}>
            {/* Map Background - Using bg-cover on a fixed aspect ratio container ensures consistent alignment */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center grayscale invert"></div>
            
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
               <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                     <path d="M0,0 L10,5 L0,10" fill={BRAND.colors.secondary} />
                  </marker>
               </defs>
               
               {LOCATIONS.map((loc, i) => (
                  <g key={i}>
                     {/* Connection Line */}
                     <line 
                       x1={`${loc.x}%`} y1={`${loc.y}%`} 
                       x2={`${RIYADH.x}%`} y2={`${RIYADH.y}%`} 
                       stroke={BRAND.colors.secondary} 
                       strokeWidth="0.5" 
                       strokeOpacity="0.3"
                       // strokeDasharray="2,2"
                     >
                        {/* <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" /> */}
                     </line>
                     
                     {/* Location Dot */}
                     <circle cx={`${loc.x}%`} cy={`${loc.y}%`} r="3" fill="white" className="opacity-80" />
                     {/* Hover Label logic could go here, simplified for visual clarity */}
                  </g>
               ))}

               {/* Riyadh Pulse */}
               <g>
                  <circle cx={`${RIYADH.x}%`} cy={`${RIYADH.y}%`} r="8" fill={BRAND.colors.accent} opacity="0.3">
                     <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                     <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={`${RIYADH.x}%`} cy={`${RIYADH.y}%`} r="4" fill={BRAND.colors.secondary} stroke="white" strokeWidth="1.5" />
                  <text x={`${RIYADH.x}%`} y={`${RIYADH.y + 12}%`} fill="white" fontSize="10" fontWeight="900" textAnchor="middle" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>RIYADH HQ</text>
               </g>
            </svg>
         </div>

      </div>
    </div>
  );
};

export default GlobalPresence;
