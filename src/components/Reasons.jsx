import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Coffee, Sun, Flame, Smile, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';

const iconMap = {
  Sparkles,
  Heart,
  Coffee,
  Sun,
  Flame,
  Smile
};

export const Reasons = () => {
  const [activeReason, setActiveReason] = useState(null);

  const reasons = birthdayConfig.reasons;

  const handleCardClick = (reason) => {
    setActiveReason(activeReason?.id === reason.id ? null : reason);

    // Subtle heart burst on click
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.7 },
      colors: ['#f4a5b7', '#e6c594']
    });
  };

  return (
    <section id="reasons" className="py-24 px-6 relative max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#e6c594]/30 text-xs text-[#e6c594] font-medium"
        >
          <Heart className="w-3.5 h-3.5 text-[#f4a5b7] fill-[#f4a5b7]" />
          <span>A Few Endless Reasons</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif-luxury text-4xl sm:text-5xl text-[#fff2d6]"
        >
          Reasons I Love You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans-clean text-sm sm:text-base text-[#fce8ec]/80 max-w-lg mx-auto font-light"
        >
          Tap any card below to reveal a special note from my heart.
        </motion.p>
      </div>

      {/* Grid of Interactive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => {
          const IconComponent = iconMap[reason.icon] || Heart;
          const isOpen = activeReason?.id === reason.id;

          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleCardClick(reason)}
              className={`cursor-pointer rounded-3xl p-6 sm:p-8 transition-all duration-500 relative overflow-hidden flex flex-col justify-between border ${
                isOpen
                  ? 'glass-panel-gold border-[#e6c594] shadow-[0_0_35px_rgba(230,197,148,0.25)] scale-102'
                  : 'glass-panel border-white/10 hover:border-[#e6c594]/40 hover:scale-[1.02]'
              }`}
            >
              {/* Background ambient heart icon */}
              <Heart
                className={`absolute -right-4 -bottom-4 w-32 h-32 transition-all duration-500 pointer-events-none ${
                  isOpen ? 'text-[#f4a5b7]/15 fill-[#f4a5b7]/15 scale-110' : 'text-white/5 fill-white/5'
                }`}
              />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                    isOpen ? 'bg-[#4a121a] border-[#e6c594] text-[#fff2d6]' : 'bg-white/5 border-white/10 text-[#f4a5b7]'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs text-[#e6c594] font-mono tracking-widest">
                    #{index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-2xl text-[#fff2d6] font-semibold">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-[#f4a5b7] font-sans-clean mt-1 font-light">
                    {reason.subtitle}
                  </p>
                </div>

                {/* Revealed Message */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="pt-3 border-t border-[#e6c594]/30"
                    >
                      <p className="font-sans-clean text-sm text-[#fce8ec] leading-relaxed font-normal">
                        "{reason.message}"
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#e6c594]">
                <span>{isOpen ? 'Tap to close' : 'Tap to reveal note'}</span>
                <Sparkles className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-45 text-[#f4a5b7]' : ''}`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

