import React, { useRef, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, Music } from 'lucide-react';
import { AmbientSoundGenerator } from '../data/songs';

export const SingleAudioPlayer = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    synthRef.current = new AmbientSoundGenerator();
    return () => {
      if (synthRef.current) synthRef.current.stop();
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio autoplay fallback to synth:", err);
          if (synthRef.current) {
            synthRef.current.playChordSequence();
          }
        });
      }
    } else {
      audioRef.current.pause();
      if (synthRef.current) {
        synthRef.current.stop();
      }
    }
  }, [isPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/our-song.webm"
        loop
        onError={() => {
          if (isPlaying && synthRef.current) {
            synthRef.current.playChordSequence();
          }
        }}
      />

      {/* Sleek Floating Single Audio Control Pill (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`group px-4 py-2.5 rounded-full glass-panel-gold border border-[#e6c594]/60 text-[#fff2d6] text-xs font-serif-luxury flex items-center gap-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:scale-105 transition-all active:scale-95 ${
            isPlaying ? 'ring-2 ring-[#e6c594]/40' : ''
          }`}
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          <div className="w-6 h-6 rounded-full bg-[#4a121a] flex items-center justify-center border border-[#e6c594]/40">
            {isPlaying ? (
              <Pause className="w-3 h-3 text-[#e6c594] fill-current" />
            ) : (
              <Play className="w-3 h-3 text-[#e6c594] fill-current ml-0.5" />
            )}
          </div>

          <span className="font-medium tracking-wide">
            {isPlaying ? 'Pause Song 🎵' : 'Play Song 🎵'}
          </span>
        </button>
      </div>
    </>
  );
};
