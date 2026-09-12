import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';
import { getPlaceholderSvg } from '../utils/imageUtils';

export const FinalSurprise = () => {
  const [revealed, setRevealed] = useState(false);
  const [imgSrc, setImgSrc] = useState(birthdayConfig.couplePhoto);

  const handleReveal = () => {
    setRevealed(true);

    // Continuous celebration confetti wave
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f4a5b7', '#e6c594', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f4a5b7', '#e6c594', '#ffffff']
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const scrollToTop = () => {
    const hero = document.querySelector('#hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="surprise" className="py-28 px-6 relative max-w-4xl mx-auto text-center overflow-hidden">
      <div className="glass-panel rounded-3xl p-8 sm:p-16 border border-[#e6c594]/40 shadow-2xl relative">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="pre-reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-[#e6c594]">
                The Final Chapter
              </span>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#fff2d6]">
                {birthdayConfig.finalSurprise.heading}
              </h2>

              <p className="font-handwriting text-2xl text-[#f4a5b7]">
                {birthdayConfig.finalSurprise.subheading}
              </p>

              <button
                onClick={handleReveal}
                className="px-9 py-4 rounded-full glass-panel-gold border border-[#e6c594] text-[#fff2d6] font-serif-luxury text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(230,197,148,0.4)] flex items-center gap-3 mx-auto"
              >
                <Heart className="w-5 h-5 text-[#f4a5b7] fill-[#f4a5b7] animate-pulse" />
                <span>{birthdayConfig.finalSurprise.buttonText}</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="post-reveal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#e6c594]/30 text-xs text-[#e6c594]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Forever & Always</span>
                </span>

                <h2 className="font-serif-luxury text-4xl sm:text-6xl text-[#fff2d6] gold-gradient-text font-bold">
                  Happy Birthday, {birthdayConfig.girlfriendName} ❤️
                </h2>

                <p className="font-handwriting text-3xl text-[#f4a5b7]">
                  "{birthdayConfig.finalSurprise.revealMessage}"
                </p>
              </div>

              {/* Framed Couple Photo */}
              <div className="relative max-w-md mx-auto aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-[#e6c594]/50 shadow-2xl p-3">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-[#1f070c] relative">
                  <img
                    src={imgSrc}
                    alt="Us Together"
                    onError={() => setImgSrc(getPlaceholderSvg("Us Together", "polaroid"))}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0408] via-transparent to-transparent opacity-60" />
                </div>
              </div>

              <p className="font-sans-clean text-sm sm:text-base text-[#fce8ec]/90 max-w-xl mx-auto font-light leading-relaxed">
                {birthdayConfig.finalSurprise.closingText}
              </p>

              <div className="pt-4 flex flex-col items-center gap-4">
                <span className="font-serif-luxury text-xl text-[#e6c594] italic">
                  Happy Birthday, My Love ❤️
                </span>

                <button
                  onClick={scrollToTop}
                  className="px-7 py-3 rounded-full glass-panel border border-white/20 text-[#fff2d6] text-xs font-mono uppercase tracking-widest hover:border-[#e6c594] transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#e6c594]" />
                  <span>{birthdayConfig.finalSurprise.replayButtonText}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

