import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';

export const OpeningSurprise = ({ onOpen }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Cinematic timed sequence progression
    const timer1 = setTimeout(() => setStep(1), 1800);
    const timer2 = setTimeout(() => setStep(2), 3800);
    const timer3 = setTimeout(() => setStep(3), 5800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStart = () => {
    // Trigger celebratory subtle heart confetti burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f4a5b7', '#e6c594', '#ffffff', '#4a121a']
    });
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0408] px-6 text-center overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#4a121a]/40 via-[#0f0408] to-[#0f0408] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f4a5b7]/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-16 h-16 rounded-full glass-panel flex items-center justify-center mb-2 border border-[#e6c594]/40 shadow-glow"
        >
          <Heart className="w-8 h-8 text-[#f4a5b7] fill-[#f4a5b7] animate-heart-beat" />
        </motion.div>

        {/* Text Animation Steps */}
        <div className="min-h-[160px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.h1
                key="step0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="font-handwriting text-5xl md:text-7xl text-[#fce8ec]"
              >
                {birthdayConfig.welcomeTitle}
              </motion.h1>
            )}

            {step === 1 && (
              <motion.p
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="font-serif-luxury text-2xl md:text-4xl text-[#fff2d6] italic"
              >
                {birthdayConfig.welcomeSub}
              </motion.p>
            )}

            {step === 2 && (
              <motion.p
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="font-sans-clean text-lg md:text-2xl text-[#fce8ec]/80 tracking-wide font-light"
              >
                Because today isn't just your birthday…
              </motion.p>
            )}

            {step >= 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="space-y-4"
              >
                <h2 className="font-serif-luxury text-3xl md:text-5xl text-[#fff2d6] leading-tight gold-gradient-text">
                  "Today is the day the world became a little more beautiful."
                </h2>
                <p className="font-handwriting text-2xl text-[#f4a5b7]">
                  Happy Birthday, {birthdayConfig.girlfriendName}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Glowing Entry Button */}
        {step >= 3 && (
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onClick={handleStart}
            className="group relative px-8 py-4 rounded-full glass-panel-gold border border-[#e6c594] text-[#fff2d6] font-serif-luxury text-lg tracking-wider hover:scale-105 transition-all shadow-[0_0_30px_rgba(230,197,148,0.3)] hover:shadow-[0_0_50px_rgba(230,197,148,0.6)] active:scale-95 flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-[#e6c594] group-hover:rotate-12 transition-transform" />
            <span>Open Your Surprise ✨</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

