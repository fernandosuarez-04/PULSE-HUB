'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WavesSVGProps {
  className?: string;
  animated?: boolean;
}

const WavesSVG: React.FC<WavesSVGProps> = ({ className = '', animated = true }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8EFFD" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#E8EFFD" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#E8EFFD" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Wave 1 */}
        <motion.path
          d="M0,400 Q360,300 720,400 T1440,400 L1440,800 L0,800 Z"
          fill="url(#wave-gradient)"
          opacity="0.3"
          animate={animated ? {
            d: [
              "M0,400 Q360,300 720,400 T1440,400 L1440,800 L0,800 Z",
              "M0,420 Q360,320 720,420 T1440,420 L1440,800 L0,800 Z",
              "M0,400 Q360,300 720,400 T1440,400 L1440,800 L0,800 Z",
            ],
          } : undefined}
          transition={animated ? {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          } : undefined}
        />
        
        {/* Wave 2 */}
        <motion.path
          d="M0,450 Q360,380 720,450 T1440,450 L1440,800 L0,800 Z"
          fill="url(#wave-gradient)"
          opacity="0.2"
          animate={animated ? {
            d: [
              "M0,450 Q360,380 720,450 T1440,450 L1440,800 L0,800 Z",
              "M0,430 Q360,360 720,430 T1440,430 L1440,800 L0,800 Z",
              "M0,450 Q360,380 720,450 T1440,450 L1440,800 L0,800 Z",
            ],
          } : undefined}
          transition={animated ? {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          } : undefined}
        />
        
        {/* Wave 3 */}
        <motion.path
          d="M0,500 Q360,430 720,500 T1440,500 L1440,800 L0,800 Z"
          fill="url(#wave-gradient)"
          opacity="0.15"
          animate={animated ? {
            d: [
              "M0,500 Q360,430 720,500 T1440,500 L1440,800 L0,800 Z",
              "M0,480 Q360,410 720,480 T1440,480 L1440,800 L0,800 Z",
              "M0,500 Q360,430 720,500 T1440,500 L1440,800 L0,800 Z",
            ],
          } : undefined}
          transition={animated ? {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          } : undefined}
        />
      </svg>
    </div>
  );
};

export default WavesSVG;

