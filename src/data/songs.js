/**
 * Romantic Music Playlist Configuration
 * Single dedicated romantic audio recording track!
 */

export const songs = [
  {
    id: 1,
    title: "Our Special Love Song ❤️",
    artist: "For My Beloved",
    album: "Personal Recording",
    src: "/music/our-song.webm",
    cover: "/images/hero-portrait-1.jpeg"
  }
];

/**
 * Web Audio Ambient Synthesizer Fallback
 */
export class AmbientSoundGenerator {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.intervalId = null;
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

  playChordSequence() {
    this.init();
    this.stop();
    this.isPlaying = true;

    const raga = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

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
