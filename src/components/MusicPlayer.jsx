import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ListMusic, Music, Disc, ExternalLink, Radio } from 'lucide-react';
import { songs, AmbientSoundGenerator } from '../data/songs';
import { getPlaceholderSvg } from '../utils/imageUtils';

export const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showSunoStream, setShowSunoStream] = useState(false);
  const [coverError, setCoverError] = useState({});

  const audioRef = useRef(null);
  const synthRef = useRef(null);

  const currentSong = songs[currentSongIndex];

  // Initialize synth instance
  useEffect(() => {
    synthRef.current = new AmbientSoundGenerator();
    return () => {
      if (synthRef.current) synthRef.current.stop();
    };
  }, []);

  // Handle play/pause state changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If local audio missing, trigger synthetic ambient audio fallback!
          if (synthRef.current) {
            synthRef.current.playChordSequence(currentSongIndex);
          }
        });
      }
    } else {
      audioRef.current.pause();
      if (synthRef.current) {
        synthRef.current.stop();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        onError={() => {
          // If local MP3 missing, try direct Suno online stream
          if (audioRef.current && audioRef.current.src !== currentSong.onlineSrc) {
            audioRef.current.src = currentSong.onlineSrc;
            audioRef.current.play().catch(() => {
              if (isPlaying && synthRef.current) {
                synthRef.current.playChordSequence(currentSongIndex);
              }
            });
          } else if (isPlaying && synthRef.current) {
            synthRef.current.playChordSequence(currentSongIndex);
          }
        }}
      />

      {/* Floating Spotify-inspired Mini Player */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-lg transition-all duration-300">
        
        {/* Suno Stream Live Iframe Embed Modal/Drawer */}
        {showSunoStream && (
          <div className="mb-3 glass-panel rounded-2xl p-4 border border-[#e6c594]/40 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-xs font-serif-luxury text-[#e6c594]">
                <Radio className="w-4 h-4 text-[#f4a5b7] animate-pulse" />
                <span>Live Suno Stream ({currentSong.title})</span>
              </div>
              <a
                href={currentSong.sunoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#f4a5b7] hover:underline flex items-center gap-1"
              >
                <span>Open on Suno</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="w-full rounded-xl overflow-hidden bg-black/60 aspect-[16/5]">
              <iframe
                title={currentSong.title}
                src={`https://suno.com/embed/${currentSong.uuid}`}
                className="w-full h-full border-0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </div>
          </div>
        )}

        <div className="glass-panel-gold rounded-2xl p-3 sm:p-4 border border-[#e6c594]/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col gap-2">
          
          <div className="flex items-center gap-3">
            {/* Vinyl/Album Artwork */}
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#e6c594]/40 bg-[#1a060a]">
              <img
                src={coverError[currentSong.id] ? getPlaceholderSvg(currentSong.title, "cover") : currentSong.cover}
                alt={currentSong.title}
                onError={() => setCoverError(prev => ({ ...prev, [currentSong.id]: true }))}
                className={`w-full h-full object-cover transition-transform duration-1000 ${
                  isPlaying ? 'rotate-animation scale-105' : ''
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Disc className={`w-5 h-5 text-[#e6c594] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              </div>
            </div>

            {/* Song Meta */}
            <div className="flex-1 min-w-0">
              <h4 className="font-serif-luxury text-sm font-medium text-[#fff2d6] truncate">
                {currentSong.title}
              </h4>
              <p className="text-xs text-[#f4a5b7] truncate font-sans-clean flex items-center gap-1">
                <span>{currentSong.artist}</span>
                <a
                  href={currentSong.sunoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#e6c594] inline-flex items-center ml-1"
                  title="Open on Suno"
                >
                  <ExternalLink className="w-3 h-3 opacity-70 hover:opacity-100" />
                </a>
              </p>
            </div>

            {/* Main Playback Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handlePrev}
                className="p-1.5 text-[#fce8ec]/70 hover:text-[#fff2d6] transition-colors"
                aria-label="Previous Track"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="p-2.5 rounded-full bg-gradient-to-r from-[#e6c594] to-[#f4a5b7] text-[#2b0910] hover:scale-105 transition-transform shadow-md"
                aria-label={isPlaying ? "Pause Music" : "Play Music"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                className="p-1.5 text-[#fce8ec]/70 hover:text-[#fff2d6] transition-colors"
                aria-label="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowSunoStream(!showSunoStream)}
                className={`p-1.5 rounded-lg transition-colors ml-0.5 ${showSunoStream ? 'text-[#f4a5b7] bg-white/10' : 'text-[#fce8ec]/70 hover:text-[#fff2d6]'}`}
                title="Toggle Suno Live Stream Embed"
              >
                <Radio className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`p-1.5 rounded-lg transition-colors ${showPlaylist ? 'text-[#e6c594] bg-white/10' : 'text-[#fce8ec]/70 hover:text-[#fff2d6]'}`}
                aria-label="Toggle Playlist"
              >
                <ListMusic className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar & Timing */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#fce8ec]/60 px-1">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 rounded-lg appearance-none bg-white/10 accent-[#e6c594] cursor-pointer"
            />
            <span>{formatTime(duration)}</span>

            {/* Volume slider (desktop) */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2 border-l border-white/10 pl-2">
              <button onClick={toggleMute} className="text-[#fce8ec]/70 hover:text-[#e6c594]">
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-14 h-1 appearance-none bg-white/10 accent-[#e6c594] rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Floating Playlist Drawer */}
        {showPlaylist && (
          <div className="absolute bottom-full mb-2 right-0 left-0 glass-panel rounded-2xl p-3 border border-[#e6c594]/30 shadow-2xl max-h-60 overflow-y-auto space-y-1 animate-in fade-in slide-in-from-bottom-3">
            <div className="flex items-center justify-between text-xs font-serif-luxury text-[#e6c594] px-2 py-1 border-b border-white/10 mb-1">
              <span>Our Special Playlist ❤️</span>
              <span className="text-[10px] text-[#fce8ec]/60">{songs.length} Tracks</span>
            </div>
            {songs.map((song, idx) => (
              <button
                key={song.id}
                onClick={() => {
                  setCurrentSongIndex(idx);
                  setIsPlaying(true);
                  setShowPlaylist(false);
                }}
                className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  idx === currentSongIndex ? 'bg-[#4a121a] text-[#fff2d6] border border-[#e6c594]/40' : 'hover:bg-white/5 text-[#fce8ec]/80'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Music className={`w-3.5 h-3.5 ${idx === currentSongIndex ? 'text-[#e6c594]' : 'text-gray-500'}`} />
                  <span className="truncate">{song.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] opacity-60">{song.artist}</span>
                  <a
                    href={song.sunoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#f4a5b7] hover:underline text-[10px]"
                  >
                    Suno ↗
                  </a>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
