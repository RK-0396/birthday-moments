import React, { useState, useEffect } from 'react';
import { Heart, Music, Menu, X, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const Navigation = ({ isMusicPlaying, toggleMusic, showMusicButton = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#story' },
    { label: 'Memories', href: '#memories' },
    { label: 'Reasons', href: '#reasons' },
    { label: 'Love Letter', href: '#letter' },
    { label: 'Surprise', href: '#surprise' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 w-[92%] max-w-4xl ${
        scrolled ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-90'
      }`}
    >
      <div className="glass-panel rounded-full px-5 py-3 flex items-center justify-between border border-[#e6c594]/30 shadow-2xl">
        {/* Brand/Heart Icon */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="flex items-center gap-2 text-[#fff2d6] font-serif-luxury text-sm md:text-base tracking-wide group"
        >
          <Heart className="w-5 h-5 text-[#f4a5b7] fill-[#f4a5b7]/40 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline font-medium">{birthdayConfig.girlfriendName}</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-sans-clean tracking-wider text-[#fce8ec]/80">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="hover:text-[#e6c594] transition-colors py-1 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#e6c594] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right side controls (Music Toggle & Mobile Menu Toggle) */}
        <div className="flex items-center gap-3">
          {showMusicButton && (
            <button
              onClick={toggleMusic}
              aria-label="Toggle Music"
              className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-[#4a121a]/60 hover:bg-[#4a121a] border border-[#e6c594]/40 text-[#fff2d6] transition-all active:scale-95"
            >
              <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? 'animate-bounce text-[#e6c594]' : 'text-gray-400'}`} />
              <span className="hidden sm:inline text-[11px] font-medium">{isMusicPlaying ? 'Playing ♪' : 'Music'}</span>
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-[#fce8ec] hover:text-[#e6c594]"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel rounded-2xl p-4 border border-[#e6c594]/30 shadow-2xl flex flex-col gap-3 text-center animate-in fade-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-sm py-2 text-[#fce8ec]/90 hover:text-[#e6c594] transition-colors border-b border-white/5 last:border-0 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3 h-3 text-[#e6c594]" />
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

