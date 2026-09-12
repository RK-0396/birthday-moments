import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { getPlaceholderSvg } from '../utils/imageUtils';

export const Timeline = () => {
  const milestones = birthdayConfig.storyMilestones;
  const [failedImages, setFailedImages] = useState({});

  return (
    <section id="story" className="py-24 px-6 relative max-w-5xl mx-auto overflow-hidden">
      {/* Background romantic glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#4a121a]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#e6c594]/30 text-xs text-[#e6c594] font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Journey Together</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif-luxury text-4xl sm:text-5xl text-[#fff2d6]"
        >
          Our Story ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-2xl text-[#f4a5b7]"
        >
          “How a simple meeting grew into my favorite story.”
        </motion.p>
      </div>

      {/* Timeline Node Tree */}
      <div className="relative">
        {/* Central Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#e6c594]/10 via-[#f4a5b7]/40 to-[#e6c594]/10" />

        <div className="space-y-16">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Heart Badge Icon */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 w-9 h-9 rounded-full glass-panel-gold border border-[#e6c594] flex items-center justify-center shadow-[0_0_15px_rgba(230,197,148,0.4)]">
                  <Heart className="w-4 h-4 text-[#f4a5b7] fill-[#f4a5b7]" />
                </div>

                {/* Content Card (Left or Right) */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#e6c594]/30 hover:border-[#e6c594]/60 transition-all duration-300 shadow-xl space-y-4 group">
                    
                    <div className="flex items-center gap-2 text-xs font-mono text-[#e6c594]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="font-serif-luxury text-2xl font-semibold text-[#fff2d6] group-hover:text-[#f4a5b7] transition-colors">
                      {item.title}
                    </h3>

                    <p className="font-sans-clean text-sm sm:text-base text-[#fce8ec]/80 leading-relaxed font-light">
                      {item.description}
                    </p>

                    {/* Milestone Image */}
                    {item.image && (
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-[#1a060a] border border-white/10 mt-3">
                        <img
                          src={failedImages[item.id] ? getPlaceholderSvg(item.title, "story") : item.image}
                          alt={item.title}
                          onError={() => setFailedImages(prev => ({ ...prev, [item.id]: true }))}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty Space for opposing side desktop balance */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

