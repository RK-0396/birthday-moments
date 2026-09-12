import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';

export const LoveGraph = () => {
  const canvasRef = useRef(null);
  const [selectedWord, setSelectedWord] = useState(null);

  const wordMessages = birthdayConfig.loveWordMessages || {};

  // Words arranged around the outer boundary of the heart with clean distance & spacing
  const outerWords = [
    { word: "Trust", position: "top-[6%] left-[6%] sm:left-[10%]" },
    { word: "Laughter", position: "top-[4%] left-[26%] sm:left-[28%]" },
    { word: "Memories", position: "top-[4%] right-[26%] sm:right-[28%]" },
    { word: "Joy", position: "top-[6%] right-[6%] sm:right-[10%]" },

    { word: "Comfort", position: "top-[26%] left-[2%] sm:left-[5%]" },
    { word: "Adventure", position: "top-[26%] right-[2%] sm:right-[5%]" },

    { word: "Love", position: "top-[50%] left-[2%] sm:left-[6%]" },
    { word: "Forever", position: "top-[50%] right-[2%] sm:right-[6%]" },

    { word: "Peace", position: "bottom-[22%] left-[6%] sm:left-[12%]" },
    { word: "Warmth", position: "bottom-[22%] right-[6%] sm:right-[12%]" },

    { word: "Softness", position: "bottom-[5%] left-[22%] sm:left-[28%]" },
    { word: "My Home", position: "bottom-[5%] right-[22%] sm:right-[28%]" },
  ];

  const handleWordClick = (word, isFunny = false) => {
    setSelectedWord(word);
    
    // Confetti burst on word click
    confetti({
      particleCount: isFunny ? 45 : 25,
      spread: isFunny ? 80 : 50,
      origin: { y: 0.55 },
      colors: isFunny ? ['#ff4d6d', '#e6c594', '#ffd166', '#ffffff'] : ['#f4a5b7', '#e6c594', '#ffffff']
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 520);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 520;
    };

    window.addEventListener('resize', handleResize);

    // Parametric heart formula points generator
    const heartPoints = [];
    const totalParticles = 200;

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
      // Scaled slightly smaller (div by 42 instead of 36) so pills around the heart have generous spacing!
      const scale = Math.min(width, height) / 42;

      // Draw faint connections
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(244, 165, 183, 0.09)';
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
      {/* Header */}
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
          Tap any word around or inside the heart to reveal a special note!
        </motion.p>
      </div>

      {/* Interactive Heart Canvas Container */}
      <div className="relative glass-panel rounded-3xl border border-[#e6c594]/30 overflow-hidden p-4 shadow-2xl flex flex-col items-center justify-center min-h-[520px]">
        <canvas ref={canvasRef} className="w-full h-[520px] cursor-pointer" />

        {/* 1. Words Positioned Around the Outer Boundary of the Heart */}
        <div className="absolute inset-0 pointer-events-none">
          {outerWords.map((item, index) => (
            <motion.button
              key={item.word}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleWordClick(item.word)}
              className={`absolute ${item.position} pointer-events-auto cursor-pointer px-3.5 py-1.5 rounded-full border text-xs font-serif-luxury transition-all shadow-lg active:scale-95 ${
                selectedWord === item.word
                  ? 'bg-[#4a121a] border-[#e6c594] text-[#fff2d6] scale-110 shadow-[0_0_20px_rgba(230,197,148,0.5)]'
                  : 'glass-panel-gold border-[#e6c594]/40 text-[#fff2d6] hover:scale-110 hover:border-[#e6c594]'
              }`}
            >
              {item.word}
            </motion.button>
          ))}
        </div>

        {/* 2. Special Funny Pill Positioned Right INSIDE the Heart Center */}
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          onClick={() => handleWordClick("Same to you! 😜", true)}
          className={`absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto cursor-pointer px-5 py-2.5 rounded-full border-2 text-xs font-serif-luxury font-bold transition-all shadow-2xl active:scale-95 animate-pulse ${
            selectedWord === "Same to you! 😜"
              ? 'bg-[#ff4d6d] border-[#fff2d6] text-white scale-115 shadow-[0_0_30px_rgba(255,77,109,0.8)]'
              : 'bg-gradient-to-r from-[#4a121a] via-[#6b1f2d] to-[#4a121a] border-[#e6c594] text-[#fff2d6] hover:scale-110 shadow-[0_0_25px_rgba(230,197,148,0.4)]'
          }`}
        >
          <span>Same to you! 😜</span>
        </motion.button>

        {/* Interactive Word Note Modal Card */}
        <AnimatePresence>
          {selectedWord && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute z-30 inset-x-6 sm:inset-x-auto max-w-md mx-auto p-6 rounded-3xl glass-panel-gold border border-[#e6c594] shadow-[0_15px_50px_rgba(0,0,0,0.9)] text-center space-y-4"
            >
              <button
                onClick={() => setSelectedWord(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#fce8ec]/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Note"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-[#4a121a] border border-[#e6c594] flex items-center justify-center mx-auto shadow-md">
                {selectedWord.includes('😜') ? (
                  <Smile className="w-6 h-6 text-[#ffd166]" />
                ) : (
                  <Heart className="w-6 h-6 text-[#f4a5b7] fill-[#f4a5b7] animate-heart-beat" />
                )}
              </div>

              <div>
                <h3 className="font-serif-luxury text-2xl font-bold gold-gradient-text">
                  {selectedWord}
                </h3>
                <p className="font-sans-clean text-sm text-[#fce8ec] mt-2 leading-relaxed font-normal">
                  "{wordMessages[selectedWord] || `You bring endless magic into my life every single day.`}"
                </p>
              </div>

              <button
                onClick={() => setSelectedWord(null)}
                className="px-6 py-2 rounded-full glass-panel border border-[#e6c594]/50 text-[#fff2d6] text-xs font-mono uppercase tracking-wider hover:border-[#e6c594] transition-colors"
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
