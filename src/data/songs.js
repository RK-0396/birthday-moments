/**
 * Romantic Music Playlist Configuration
 * Uses your personal audio recording track!
 */

export const songs = [
  {
    id: 1,
    title: "Our Special Love Song ❤️",
    artist: "For My Beloved",
    album: "Personal Recording",
    sunoUrl: "https://suno.com/s/bLH3Bsxni5qXCv5x",
    uuid: "34324e1a-1d49-4aa2-ba3c-4592505dd446",
    src: "/music/our-song.webm",
    onlineSrc: "https://cdn1.suno.ai/34324e1a-1d49-4aa2-ba3c-4592505dd446.mp3",
    cover: "https://cdn2.suno.ai/image_large_34324e1a-1d49-4aa2-ba3c-4592505dd446.jpeg",
    ragaNotes: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]
  },
  {
    id: 2,
    title: "Tum Ho Toh Sab kuch Hai",
    artist: "Hindi Romantic Song",
    album: "Suno Track #1",
    sunoUrl: "https://suno.com/s/bLH3Bsxni5qXCv5x",
    uuid: "34324e1a-1d49-4aa2-ba3c-4592505dd446",
    src: "/music/recording-2026-09-12T17-47-33-090Z.webm",
    onlineSrc: "https://cdn1.suno.ai/34324e1a-1d49-4aa2-ba3c-4592505dd446.mp3",
    cover: "https://cdn2.suno.ai/image_large_34324e1a-1d49-4aa2-ba3c-4592505dd446.jpeg",
    ragaNotes: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]
  },
  {
    id: 3,
    title: "Muskurahat Teri",
    artist: "Hindi Soft Romance",
    album: "Suno Track #2",
    sunoUrl: "https://suno.com/s/BTAqbU8xE9RlCEQT",
    uuid: "6bbd253c-e896-4ad7-8506-07ba6c22b7eb",
    src: "/music/recording-2026-09-12T17-47-33-090Z.webm",
    onlineSrc: "https://cdn1.suno.ai/6bbd253c-e896-4ad7-8506-07ba6c22b7eb.mp3",
    cover: "https://cdn2.suno.ai/image_large_6bbd253c-e896-4ad7-8506-07ba6c22b7eb.jpeg",
    ragaNotes: [293.66, 329.63, 369.99, 440.00, 493.88, 587.33]
  },
  {
    id: 4,
    title: "Humesha Tum Aur Main (Forever Us)",
    artist: "Hindi Romantic Ballad",
    album: "Suno Track #3",
    sunoUrl: "https://suno.com/s/XaJkA7RqfCd5WuGm",
    uuid: "41f68f14-639f-4b55-aa7c-9c9ab9df50ee",
    src: "/music/recording-2026-09-12T17-47-33-090Z.webm",
    onlineSrc: "https://cdn1.suno.ai/41f68f14-639f-4b55-aa7c-9c9ab9df50ee.mp3",
    cover: "https://cdn2.suno.ai/image_large_41f68f14-639f-4b55-aa7c-9c9ab9df50ee.jpeg",
    ragaNotes: [220.00, 261.63, 293.66, 329.63, 392.00, 440.00]
  },
  {
    id: 5,
    title: "Sirf Tum Aur Main (Just You & Me)",
    artist: "Hindi Midnight Love",
    album: "Suno Track #5",
    sunoUrl: "https://suno.com/s/hJHulBjtiPEmMHfE",
    uuid: "c96c5809-1312-487a-a981-e9affd1c70b6",
    src: "/music/recording-2026-09-12T17-47-33-090Z.webm",
    onlineSrc: "https://cdn1.suno.ai/c96c5809-1312-487a-a981-e9affd1c70b6.mp3",
    cover: "https://cdn2.suno.ai/image_large_c96c5809-1312-487a-a981-e9affd1c70b6.jpeg",
    ragaNotes: [196.00, 246.94, 293.66, 329.63, 392.00, 493.88]
  }
];

/**
 * Web Audio Hindi Ambient Synthesizer Fallback
 * Plays soft piano & flute chords based on Indian romantic ragas
 */
export class AmbientSoundGenerator {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.activeTrackIndex = 0;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playChordSequence(trackIndex = 0) {
    this.init();
    this.stop();
    this.isPlaying = true;
    this.activeTrackIndex = trackIndex;

    const track = songs[trackIndex] || songs[0];
    const raga = track.ragaNotes;

    const triggerNote = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      const freq = raga[Math.floor(Math.random() * raga.length)];
      
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      const subOsc = this.audioCtx.createOscillator();
      const subGain = this.audioCtx.createGain();

      osc.type = 'sine';
      subOsc.type = 'triangle';

      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      subOsc.frequency.setValueAtTime(freq / 2, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.09, this.audioCtx.currentTime + 0.9);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 3.8);

      subGain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.03, this.audioCtx.currentTime + 1.2);
      subGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 4.2);

      osc.connect(gain);
      subOsc.connect(subGain);

      gain.connect(this.audioCtx.destination);
      subGain.connect(this.audioCtx.destination);

      osc.start();
      subOsc.start();

      osc.stop(this.audioCtx.currentTime + 3.9);
      subOsc.stop(this.audioCtx.currentTime + 4.3);
    };

    triggerNote();
    this.intervalId = setInterval(triggerNote, 1600);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
