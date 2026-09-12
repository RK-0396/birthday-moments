import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { getPlaceholderSvg } from '../utils/imageUtils';

export const PhotoCollage = () => {
  const memories = birthdayConfig.memories;
  const [failedImages, setFailedImages] = useState({});

  return (
    <section className="py-28 px-6 relative max-w-6xl mx-auto overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#4a121a]/25 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 space-y-16">
        {/* Center Quote Banner */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center mx-auto border border-[#e6c594]/40"
          >
            <Heart className="w-6 h-6 text-[#f4a5b7] fill-[#f4a5b7]" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif-luxury text-3xl sm:text-4xl text-[#fff2d6] italic"
          >
            "Every picture has a story…"
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-handwriting text-4xl sm:text-6xl text-[#f4a5b7]"
          >
            “But my favorite story is us.”
          </motion.h2>
        </div>

        {/* Dynamic Parallax Collage Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
          {memories.slice(0, 4).map((item, index) => {
            // Alternating offsets for depth
            const offsets = [
              'translate-y-0',
              'translate-y-6 sm:translate-y-10',
              '-translate-y-4 sm:-translate-y-8',
              'translate-y-2'
            ][index % 4];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.12 }}
                className={`relative rounded-3xl overflow-hidden glass-panel border border-[#e6c594]/30 shadow-2xl group hover:z-20 transition-all duration-500 ${offsets}`}
              >
                <div className="aspect-[3/4] overflow-hidden bg-[#1f070c]">
                  <img
                    src={failedImages[item.id] ? getPlaceholderSvg(item.title, "polaroid") : item.image}
                    alt={item.title}
                    onError={() => setFailedImages(prev => ({ ...prev, [item.id]: true }))}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0408] via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 p-2 text-center">
                  <span className="font-handwriting text-lg text-[#fff2d6] opacity-90">{item.title}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

