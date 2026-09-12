import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';

export const LoveGraph = () => {
  const canvasRef = useRef(null);
  const [selectedWord, setSelectedWord] = useState(null);

  const loveWords = birthdayConfig.loveWords;
  const wordMessages = birthdayConfig.loveWordMessages || {};

  const handleWordClick = (word) => {
    setSelectedWord(word);
    
    // Heart confetti burst on word click
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#f4a5b7', '#e6c594', '#ffffff']
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 480);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 480;
    };

    window.addEventListener('resize', handleResize);

    // Parametric heart formula points generator
    const heartPoints = [];
    const totalParticles = 180;

    for (let i = 0; i < totalParticles; i++) {
      const t = (Math.PI * 2 * i) / totalParticles;
      const x = 16 * Math.sin(t) ** 3;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      heartPoints.push({
        baseX: x,
        baseY: y,
        x: 0,
        y: 0,
        size: Math.random() * 2.5 + 1.5,
        speed: Math.random() * 0.02 + 0.01,
        offset: Math.random() * Math.PI * 2,
        color: i % 4 === 0 ? '#e6c594' : i % 2 === 0 ? '#f4a5b7' : '#ffffff'
      });
    }

    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', (e) => {
      if (e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.active = true;
      }
    });

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 - 10;
      const scale = Math.min(width, height) / 36;

      // Draw faint connections
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(244, 165, 183, 0.08)';
      ctx.lineWidth = 1;

      heartPoints.forEach((pt, idx) => {
        const pulse = 1 + Math.sin(time * 2 + pt.offset) * 0.04;
        const targetX = centerX + pt.baseX * scale * pulse;
        const targetY = centerY + pt.baseY * scale * pulse;

        let dx = mouse.x - targetX;
        let dy = mouse.y - targetY;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let force = mouse.active && dist < 100 ? (100 - dist) / 100 : 0;

        pt.x = targetX - (dx / (dist || 1)) * force * 20;
        pt.y = targetY - (dy / (dist || 1)) * force * 20;

        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();

      // Render Particles
      heartPoints.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = pt.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-24 px-6 relative max-w-5xl mx-auto overflow-hidden">
      <div className="text-center space-y-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#e6c594]/30 text-xs text-[#e6c594] font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Chemistry of Us</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif-luxury text-4xl sm:text-5xl text-[#fff2d6]"
        >
          What Holds Us Together ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-2xl text-[#f4a5b7]"
        >
          Tap any word to reveal a secret note from my heart.
        </motion.p>
      </div>

      {/* Interactive Heart Canvas Container */}
      <div className="relative glass-panel rounded-3xl border border-[#e6c594]/30 overflow-hidden p-4 shadow-2xl flex flex-col items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-[480px] cursor-pointer" />

        {/* Floating Interactive Word Badges around/inside canvas */}
        <div className="absolute inset-0 pointer-events-none flex flex-wrap items-center justify-center gap-3 p-8">
          {loveWords.map((word, index) => (
            <motion.button
              key={word}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              onClick={() => handleWordClick(word)}
              className={`pointer-events-auto cursor-pointer px-4 py-1.5 rounded-full border text-xs font-serif-luxury transition-all shadow-lg active:scale-95 ${
                selectedWord === word
                  ? 'bg-[#4a121a] border-[#e6c594] text-[#fff2d6] scale-110 shadow-[0_0_20px_rgba(230,197,148,0.5)]'
                  : 'glass-panel-gold border-[#e6c594]/40 text-[#fff2d6] hover:scale-110 hover:border-[#e6c594]'
              }`}
            >
              {word}
            </motion.button>
          ))}
        </div>

        {/* Interactive Word Note Modal Card */}
        <AnimatePresence>
          {selectedWord && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute z-30 inset-x-6 sm:inset-x-auto max-w-md mx-auto p-6 rounded-3xl glass-panel-gold border border-[#e6c594] shadow-[0_15px_50px_rgba(0,0,0,0.8)] text-center space-y-4"
            >
              <button
                onClick={() => setSelectedWord(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#fce8ec]/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Note"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-10 h-10 rounded-full bg-[#4a121a] border border-[#e6c594] flex items-center justify-center mx-auto shadow-md">
                <Heart className="w-5 h-5 text-[#f4a5b7] fill-[#f4a5b7] animate-heart-beat" />
              </div>

              <div>
                <h3 className="font-serif-luxury text-2xl font-bold gold-gradient-text">
                  {selectedWord} ❤️
                </h3>
                <p className="font-sans-clean text-sm text-[#fce8ec] mt-2 leading-relaxed font-normal">
                  "{wordMessages[selectedWord] || `You bring endless ${selectedWord.toLowerCase()} into my life every single day.`}"
                </p>
              </div>

              <button
                onClick={() => setSelectedWord(null)}
                className="px-5 py-2 rounded-full glass-panel border border-[#e6c594]/50 text-[#fff2d6] text-xs font-mono uppercase tracking-wider hover:border-[#e6c594] transition-colors"
              >
                Close Note ✨
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
