'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AnnouncementBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('comet-banner-dismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('comet-banner-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-[#1F5AF6] to-[#4F7BF7] text-white border-b border-white/10"
          style={{ marginTop: 'var(--navbar-height, 80px)' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 py-3">
              {/* Badge + Mensaje */}
              <div className="flex items-center gap-3 flex-1">
                {/* Badge con icono */}
                <div className="hidden sm:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Sparkles size={16} className="text-yellow-300" />
                  <span className="text-xs font-semibold">RECOMENDADO</span>
                </div>
                
                {/* Mensaje principal */}
                <p className="text-sm sm:text-base font-medium">
                  Para una mejor experiencia, te recomendamos usar{' '}
                  <span className="font-bold">Perplexity Comet</span> como navegador
                </p>
              </div>

              {/* Botón CTA + Cerrar */}
              <div className="flex items-center gap-2">
                <a
                  href="https://www.perplexity.ai/comet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center px-4 py-2 bg-white text-[#1F5AF6] font-semibold text-sm rounded-lg hover:bg-white/90 transition-colors"
                >
                  Probar Comet
                </a>
                
                <button
                  onClick={handleDismiss}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Cerrar anuncio"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
