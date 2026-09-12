import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';

export const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullLetter = birthdayConfig.letterContent;

  const handleOpenLetter = () => {
    setIsOpen(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f4a5b7', '#e6c594', '#ffffff']
    });
  };

  // Typewriter effect generator
  useEffect(() => {
    if (!isOpen) return;

    let index = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const interval = setInterval(() => {
      if (index < fullLetter.length) {
        setDisplayedText(fullLetter.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 28); // Smooth typing cadence

    return () => clearInterval(interval);
  }, [isOpen, fullLetter]);

  return (
    <section id="letter" className="py-24 px-6 relative max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#e6c594]/30 text-xs text-[#e6c594] font-medium"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>From My Heart</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif-luxury text-4xl sm:text-5xl text-[#fff2d6]"
        >
          {birthdayConfig.letterTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-2xl text-[#f4a5b7]"
        >
          “Words written just for you.”
        </motion.p>
      </div>

      {/* Sealed Envelope / Opened Letter Container */}
      <div className="relative flex justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* SEALED ENVELOPE STATE */
            <motion.div
              key="envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.6 }}
              onClick={handleOpenLetter}
              className="cursor-pointer w-full max-w-md bg-gradient-to-br from-[#3d0e16] to-[#1f070c] rounded-3xl p-8 sm:p-12 border border-[#e6c594]/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col items-center gap-6 text-center group hover:border-[#e6c594] transition-all"
            >
              {/* Wax Seal */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#6b1f2d] to-[#b3394e] border-2 border-[#e6c594] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-[#fff2d6] fill-[#fff2d6] animate-heart-beat" />
              </div>

              <div>
                <h3 className="font-serif-luxury text-2xl text-[#fff2d6] font-semibold">
                  For {birthdayConfig.girlfriendName}
                </h3>
                <p className="font-handwriting text-xl text-[#f4a5b7] mt-1">
                  Sealed with Love ❤️
                </p>
              </div>

              <button className="px-6 py-3 rounded-full glass-panel-gold border border-[#e6c594] text-[#fff2d6] font-serif-luxury text-sm flex items-center gap-2 group-hover:bg-[#e6c594] group-hover:text-[#2b0910] transition-colors">
                <Sparkles className="w-4 h-4" />
                <span>Open My Letter</span>
              </button>
            </motion.div>
          ) : (
            /* OPENED PAPER LETTER STATE */
            <motion.div
              key="letter-paper"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-2xl bg-[#fffdfa] text-[#2b0910] p-8 sm:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-[#e6c594]/60 space-y-6 relative overflow-hidden"
            >
              {/* Subtle paper watermark texture */}
              <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
                <Heart className="w-32 h-32 text-[#2b0910] fill-current" />
              </div>

              {/* Letter Text Content with Typewriter */}
              <div className="space-y-6 min-h-[300px]">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#4a121a] whitespace-pre-line leading-relaxed font-semibold">
                  {displayedText}
                  {!isTypingComplete && <span className="animate-pulse text-[#b3394e]">|</span>}
                </p>
              </div>

              <div className="pt-8 border-t border-[#4a121a]/15 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="font-handwriting text-3xl text-[#6b1f2d]">
                  {birthdayConfig.letterSender}
                </span>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-mono text-[#6b1f2d] hover:underline uppercase tracking-wider"
                >
                  Close Letter
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

