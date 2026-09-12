import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ILoveYouSequence = () => {
  const [stage, setStage] = useState(0); // 0: Idle start, 1: "I", 2: "LOVE", 3: "YOU", 4: Explosion & Finale

  const startSequence = () => {
    setStage(1);

    setTimeout(() => setStage(2), 1200);
    setTimeout(() => setStage(3), 2400);
    setTimeout(() => {
      setStage(4);
      // Explode screen with hearts confetti!
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#f4a5b7', '#e6c594', '#ffffff', '#4a121a', '#ff4d6d']
      });
    }, 3800);
  };

  return (
    <section className="py-24 px-6 relative max-w-4xl mx-auto text-center overflow-hidden">
      <div className="glass-panel-gold rounded-3xl p-10 sm:p-16 border border-[#e6c594]/40 shadow-2xl relative min-h-[400px] flex flex-col items-center justify-center">
        
        {stage === 0 ? (
          <div className="space-y-6">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 rounded-full bg-[#4a121a] border border-[#e6c594] flex items-center justify-center mx-auto shadow-glow cursor-pointer"
              onClick={startSequence}
            >
              <Heart className="w-8 h-8 text-[#f4a5b7] fill-[#f4a5b7]" />
            </motion.div>

            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#fff2d6]">
              A Small Message From Deep Inside My Heart
            </h3>

            <button
              onClick={startSequence}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e6c594] to-[#f4a5b7] text-[#2b0910] font-medium text-base hover:scale-105 transition-transform shadow-lg"
            >
              Tap To Experience ❤️
            </button>
          </div>
        ) : (
          <div className="space-y-8 min-h-[220px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {stage === 1 && (
                <motion.span
                  key="word-i"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.8 }}
                  className="font-serif-luxury text-6xl sm:text-8xl gold-gradient-text font-bold"
                >
                  I
                </motion.span>
              )}

              {stage === 2 && (
                <motion.span
                  key="word-love"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.8 }}
                  className="font-serif-luxury text-6xl sm:text-8xl text-[#f4a5b7] font-bold tracking-wider"
                >
                  LOVE
                </motion.span>
              )}

              {stage === 3 && (
                <motion.span
                  key="word-you"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.8 }}
                  className="font-serif-luxury text-6xl sm:text-8xl text-[#fff2d6] font-bold"
                >
                  YOU
                </motion.span>
              )}

              {stage === 4 && (
                <motion.div
                  key="finale"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="space-y-4"
                >
                  <h2 className="font-serif-luxury text-4xl sm:text-6xl gold-gradient-text font-bold leading-tight">
                    I LOVE YOU ❤️
                  </h2>
                  <p className="font-handwriting text-3xl sm:text-4xl text-[#f4a5b7]">
                    More than words can ever explain.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

