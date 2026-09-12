import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Grid, Heart, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { getPlaceholderSvg } from '../utils/imageUtils';

export const MemoryGallery = () => {
  const [viewMode, setViewMode] = useState('polaroid'); // 'polaroid' | 'masonry'
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [failedImages, setFailedImages] = useState({});

  const memories = birthdayConfig.memories;

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const nextImage = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % memories.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  return (
    <section id="memories" className="py-24 px-6 relative max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#e6c594]/30 text-xs text-[#e6c594] font-medium"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Captured Moments</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif-luxury text-4xl sm:text-5xl text-[#fff2d6]"
        >
          Her Beautiful Memories
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-2xl text-[#f4a5b7]"
        >
          “Every smile of yours is a favorite memory of mine.”
        </motion.p>

        {/* View Mode Switcher */}
        <div className="pt-4 flex justify-center">
          <div className="glass-panel p-1 rounded-full border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setViewMode('polaroid')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
                viewMode === 'polaroid' ? 'bg-[#4a121a] text-[#fff2d6] border border-[#e6c594]/40 shadow-sm' : 'text-[#fce8ec]/70 hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Polaroids</span>
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
                viewMode === 'masonry' ? 'bg-[#4a121a] text-[#fff2d6] border border-[#e6c594]/40 shadow-sm' : 'text-[#fce8ec]/70 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Masonry Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* POLAROID VIEW */}
      {viewMode === 'polaroid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {memories.map((item, index) => {
            const rotationDegrees = [-3, 2, -2, 4, -4, 3][index % 6];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
                style={{ rotate: `${rotationDegrees}deg` }}
                onClick={() => openLightbox(index)}
                className="cursor-pointer bg-[#fffaf5] text-[#2b0910] p-4 rounded-lg shadow-2xl transition-all duration-300 group border border-white/20"
              >
                <div className="relative aspect-square overflow-hidden rounded bg-[#1f070c] mb-4">
                  <img
                    src={failedImages[item.id] ? getPlaceholderSvg(item.title, "polaroid") : item.image}
                    alt={item.title}
                    onError={() => handleImageError(item.id)}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <span className="text-[11px] font-mono tracking-widest text-[#8c3a49] uppercase block font-semibold">
                    {item.date}
                  </span>
                  <h3 className="font-serif-luxury text-lg font-bold text-[#2b0910]">
                    {item.title}
                  </h3>
                  <p className="font-handwriting text-xl text-[#6b1f2d] line-clamp-2">
                    "{item.caption}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* MASONRY VIEW */}
      {viewMode === 'masonry' && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {memories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onClick={() => openLightbox(index)}
              className="break-inside-avoid relative rounded-2xl overflow-hidden glass-panel border border-[#e6c594]/30 cursor-pointer group shadow-xl"
            >
              <img
                src={failedImages[item.id] ? getPlaceholderSvg(item.title, "polaroid") : item.image}
                alt={item.title}
                onError={() => handleImageError(item.id)}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0408] via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-0 inset-x-0 p-5 space-y-1">
                <span className="text-xs text-[#e6c594] font-mono uppercase">{item.date}</span>
                <h3 className="font-serif-luxury text-lg text-white font-medium">{item.title}</h3>
                <p className="font-sans-clean text-xs text-[#fce8ec]/80 line-clamp-2">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 select-none"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full glass-panel text-white hover:text-[#e6c594] z-10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 p-3 rounded-full glass-panel text-white hover:text-[#e6c594] z-10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Lightbox Content Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] flex flex-col glass-panel rounded-3xl overflow-hidden border border-[#e6c594]/40 shadow-2xl"
            >
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[450px]">
                <img
                  src={failedImages[memories[selectedImageIndex].id] ? getPlaceholderSvg(memories[selectedImageIndex].title, "polaroid") : memories[selectedImageIndex].image}
                  alt={memories[selectedImageIndex].title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 bg-[#1a060a] border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs text-[#e6c594] font-mono tracking-wider">{memories[selectedImageIndex].date}</span>
                  <h3 className="font-serif-luxury text-xl text-white font-medium">{memories[selectedImageIndex].title}</h3>
                  <p className="font-handwriting text-2xl text-[#f4a5b7] mt-0.5">"{memories[selectedImageIndex].caption}"</p>
                </div>
                <div className="text-xs text-[#fce8ec]/60 font-mono">
                  {selectedImageIndex + 1} / {memories.length}
                </div>
              </div>
            </motion.div>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 p-3 rounded-full glass-panel text-white hover:text-[#e6c594] z-10 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

