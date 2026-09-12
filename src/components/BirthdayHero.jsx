import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Music, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { getPlaceholderSvg } from '../utils/imageUtils';

export const BirthdayHero = ({ onPlayMusic, showMusicButton = true }) => {
  const [imgSrc, setImgSrc] = useState(birthdayConfig.heroPortrait);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 px-6 flex items-center justify-center overflow-hidden">
      {/* Soft romantic light leak background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl h-[450px] bg-gradient-to-b from-[#4a121a]/30 via-[#2b0910]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & Emotional Greeting */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-7 text-center lg:text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#e6c594]/30 text-xs text-[#e6c594] font-medium tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Today is all about you</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.1] text-[#fff2d6]">
            Happy Birthday, <br />
            <span className="font-handwriting text-5xl sm:text-7xl lg:text-8xl text-[#f4a5b7] block mt-1">
              {birthdayConfig.girlfriendName} ❤️
            </span>
          </h1>

          <p className="font-sans-clean text-base sm:text-xl text-[#fce8ec]/80 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
            {birthdayConfig.heroSubtitle}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            {showMusicButton && (
              <button
                onClick={onPlayMusic}
                className="px-7 py-3.5 rounded-full glass-panel-gold border border-[#e6c594]/60 text-[#fff2d6] font-medium text-sm flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_25px_rgba(230,197,148,0.25)] active:scale-95"
              >
                <Music className="w-4 h-4 text-[#e6c594]" />
                <span>Play Our Romantic Track 🎵</span>
              </button>
            )}

            <a
              href="#story"
              className="px-7 py-3.5 rounded-full glass-panel border border-white/10 text-[#fce8ec]/90 font-medium text-sm flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <span>Explore Our Story</span>
              <Heart className="w-4 h-4 text-[#f4a5b7]" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Framed Luxury Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4]">
            {/* Animated Gold/Rose Glowing Border Aura */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#e6c594] via-[#f4a5b7] to-[#4a121a] opacity-60 blur-lg group-hover:opacity-90 transition duration-700 animate-pulse-glow" />

            {/* Main Picture Frame */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden glass-panel border border-[#e6c594]/40 p-3 shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#1f070c]">
                <img
                  src={imgSrc}
                  alt={birthdayConfig.girlfriendName}
                  onError={() => setImgSrc(getPlaceholderSvg(birthdayConfig.girlfriendName, "portrait"))}
                  onLoad={() => setImgLoaded(true)}
                  className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${
                    imgLoaded ? 'opacity-100 filter brightness-[1.02]' : 'opacity-80'
                  }`}
                />

                {/* Shimmer light reflection overlay */}
                <div className="absolute inset-0 shimmer-effect pointer-events-none opacity-40" />

                {/* Bottom romantic overlay vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0408] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="font-handwriting text-2xl text-[#fff2d6]">My Favorite Person</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

