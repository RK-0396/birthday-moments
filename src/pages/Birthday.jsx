import React, { useState } from 'react';
import { FloatingHearts } from '../components/FloatingHearts';
import { Navigation } from '../components/Navigation';
import { OpeningSurprise } from '../components/OpeningSurprise';
import { BirthdayHero } from '../components/BirthdayHero';
import { MemoryGallery } from '../components/MemoryGallery';
import { Timeline } from '../components/Timeline';
import { Reasons } from '../components/Reasons';
import { LoveGraph } from '../components/LoveGraph';
import { PhotoCollage } from '../components/PhotoCollage';
import { LoveLetter } from '../components/LoveLetter';
import { ILoveYouSequence } from '../components/ILoveYouSequence';
import { FinalSurprise } from '../components/FinalSurprise';
import { SingleAudioPlayer } from '../components/SingleAudioPlayer';

export const BirthdayPage = () => {
  const [showOpening, setShowOpening] = useState(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleStartExperience = () => {
    setShowOpening(false);
    setIsPlayingMusic(true); // Plays automatically when opening surprise!
  };

  const toggleMusic = () => {
    setIsPlayingMusic(!isPlayingMusic);
  };

  return (
    <div className="relative min-h-screen bg-[#0f0408] text-[#fce8ec] overflow-x-hidden selection:bg-[#e6c594] selection:text-[#2b0910]">
      {/* Ambient background particles & lighting */}
      <FloatingHearts />

      {/* Opening Intro Modal Sequence */}
      {showOpening && <OpeningSurprise onOpen={handleStartExperience} />}

      {/* Navigation Header */}
      <Navigation isMusicPlaying={isPlayingMusic} toggleMusic={toggleMusic} showMusicButton={true} />

      {/* Main Chapters */}
      <main className="relative z-10 space-y-12">
        <BirthdayHero onPlayMusic={toggleMusic} showMusicButton={true} isPlaying={isPlayingMusic} />
        <MemoryGallery />
        <Timeline />
        <Reasons />
        <LoveGraph />
        <PhotoCollage />
        <LoveLetter />
        <ILoveYouSequence />
        <FinalSurprise />
      </main>

      {/* Single Dedicated Audio Player & Control Pill */}
      <SingleAudioPlayer isPlaying={isPlayingMusic} setIsPlaying={setIsPlayingMusic} />

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-xs text-[#fce8ec]/50 font-sans-clean relative z-10 space-y-2">
        <p className="font-handwriting text-xl text-[#f4a5b7]">Made with endless love ❤️</p>
        <p>© {new Date().getFullYear()} Our Little Love Story. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
