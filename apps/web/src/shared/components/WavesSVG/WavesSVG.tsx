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
          {/* Gradient 1 - Primary blue */}
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8EFFD" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#D0E0FB" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E8EFFD" stopOpacity="0.1" />
          </linearGradient>
          
          {/* Gradient 2 - Subtle violet */}
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F0F4FF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#E6EDFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F0F4FF" stopOpacity="0.05" />
          </linearGradient>
          
          {/* Gradient 3 - Soft blue-gray */}
          <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F7F9FB" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#E3E8F0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F7F9FB" stopOpacity="0.08" />
          </linearGradient>
          
          {/* Gradient 4 - Light accent */}
          <linearGradient id="wave-gradient-4" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF4F0" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFE8E0" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFF4F0" stopOpacity="0.05" />
          </linearGradient>
          
          {/* Gradient 5 - Deep blue */}
          <linearGradient id="wave-gradient-5" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1F5AF6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#1F5AF6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1F5AF6" stopOpacity="0.03" />
          </linearGradient>
          
          {/* Blur filters for depth */}
          <filter id="blur-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
          
          <filter id="blur-medium" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>
        
        {/* Wave Layer 1 - Deep background with blur */}
        <motion.path
          d="M0,520 Q360,460 720,520 T1440,520 L1440,800 L0,800 Z"
          fill="url(#wave-gradient-5)"
          opacity="0.8"
          filter="url(#blur-medium)"
          animate={animated ? {
            d: [
              "M0,520 Q360,460 720,520 T1440,520 L1440,800 L0,800 Z",
              "M0,540 Q360,480 720,540 T1440,540 L1440,800 L0,800 Z",
              "M0,520 Q360,460 720,520 T1440,520 L1440,800 L0,800 Z",
            ],
          } : undefined}
          transition={animated ? {
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          } : undefined}
        />
        
        {/* Wave Layer 2 - Soft background */}
        <motion.path
          d="M0,480 Q360,420 720,480 T1440,480 L1440,800 L0,800 Z"
          fill="url(#wave-gradient-3)"
          opacity="0.6"
          filter="url(#blur-soft)"
          animate={animated ? {
            d: [
              "M0,480 Q360,420 720,480 T1440,480 L1440,800 L0,800 Z",
              "M0,500 Q360,440 720,500 T1440,500 L1440,800 L0,800 Z",
              "M0,480 Q360,420 720,480 T1440,480 L1440,800 L0,800 Z",
            ],
          } : undefined}
          transition={animated ? {
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          } : undefined}
        />
        
        {/* Wave Layer 3 - Primary wave */}
        <motion.path
          d="M0,420 Q360,360 720,420 T1440,420 L1440,800 L0,800 Z"
          fill="url(#wave-gradient-1)"
          opacity="0.7"
          animate={animated ? {
            d: [
              "M0,420 Q360,360 720,420 T1440,420 L1440,800 L0,800 Z",
              "M0,440 Q360,380 720,440 T1440,440 L1440,800 L0,800 Z",
              "M0,420 Q360,360 720,420 T1440,420 L1440,800 L0,800 Z",
            ],
          } : undefined}
          transition={animated ? {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          } : undefined}
        />
        
        {/* Wave Layer 4 - Accent wave */}
        <motion.path
          d="M0,380 Q360,320 720,380 T1440,380 L1440,800 L0,800 Z"
          fill="url(#wave-gradient-2)"
          opacity="0.5"
          animate={animated ? {
            d: [
              "M0,380 Q360,320 720,380 T1440,380 L1440,800 L0,800 Z",
              "M0,400 Q360,340 720,400 T1440,400 L1440,800 L0,800 Z",
              "M0,380 Q360,320 720,380 T1440,380 L1440,800 L0,800 Z",
            ],
          } : undefined}
          transition={animated ? {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          } : undefined}
        />
        
        {/* Wave Layer 5 - Top accent */}
        <motion.path
          d="M0,340 Q360,280 720,340 T1440,340 L1440,800 L0,800 Z"
          fill="url(#wave-gradient-4)"
          opacity="0.4"
          animate={animated ? {
            d: [
              "M0,340 Q360,280 720,340 T1440,340 L1440,800 L0,800 Z",
              "M0,360 Q360,300 720,360 T1440,360 L1440,800 L0,800 Z",
              "M0,340 Q360,280 720,340 T1440,340 L1440,800 L0,800 Z",
            ],
          } : undefined}
          transition={animated ? {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          } : undefined}
        />
        
        {/* Wave Layer 6 - Subtle top layer */}
        <motion.path
          d="M0,300 Q360,240 720,300 T1440,300 L1440,800 L0,800 Z"
          fill="url(#wave-gradient-1)"
          opacity="0.3"
          animate={animated ? {
            d: [
              "M0,300 Q360,240 720,300 T1440,300 L1440,800 L0,800 Z",
              "M0,320 Q360,260 720,320 T1440,320 L1440,800 L0,800 Z",
              "M0,300 Q360,240 720,300 T1440,300 L1440,800 L0,800 Z",
            ],
          } : undefined}
          transition={animated ? {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          } : undefined}
        />
      </svg>
    </div>
  );
};

export default WavesSVG;

