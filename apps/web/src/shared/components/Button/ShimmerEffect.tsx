'use client';

import { motion } from 'framer-motion';

export const ShimmerEffect = () => {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden rounded-[var(--radius-base)]"
      initial={{ x: '-100%' }}
      whileHover={{
        x: '100%',
        transition: {
          duration: 0.6,
          ease: 'easeInOut'
        }
      }}
    >
      <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
    </motion.div>
  );
};
