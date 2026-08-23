// Luxury Web Audio Synthesizer for VIBE
// Generates ambient nocturnal drones, crystal glass chimes, and tactile micro-interactions

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.masterGain = null;
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.ambientGain = null;
    this.filter = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (!this.isInitialized) this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended' && !muted) {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    if (muted) {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(0, now, 0.2);
      this.stopAmbientDrone();
    } else {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(0.35, now, 0.2);
      this.startAmbientDrone();
      this.playChime(520, 'sine', 0.8);
    }
  }

  startAmbientDrone(flavor = 'blackTea') {
    if (this.isMuted || !this.ctx) return;
    if (this.ambientGain) return; // Already playing

    const now = this.ctx.currentTime;
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0, now);
    this.ambientGain.gain.setTargetAtTime(0.08, now, 2);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(flavor === 'blackTea' ? 240 : 380, now);
    this.filter.Q.setValueAtTime(2, now);

    // Warm nocturnal root drone (A1 vs C2)
    const baseFreq = flavor === 'blackTea' ? 55 : 65.4;
    this.ambientOsc1 = this.ctx.createOscillator();
    this.ambientOsc1.type = 'sine';
    this.ambientOsc1.frequency.setValueAtTime(baseFreq, now);

    // Fifth harmonic with subtle detune
    this.ambientOsc2 = this.ctx.createOscillator();
    this.ambientOsc2.type = 'triangle';
    this.ambientOsc2.frequency.setValueAtTime(baseFreq * 1.5 + 0.3, now);

    this.ambientOsc1.connect(this.filter);
    this.ambientOsc2.connect(this.filter);
    this.filter.connect(this.ambientGain);
    this.ambientGain.connect(this.masterGain);

    this.ambientOsc1.start();
    this.ambientOsc2.start();
  }

  updateAmbientFlavor(flavor) {
    if (!this.ctx || !this.filter || !this.ambientOsc1) return;
    const now = this.ctx.currentTime;
    const baseFreq = flavor === 'blackTea' ? 55 : 65.4;
    this.filter.frequency.setTargetAtTime(flavor === 'blackTea' ? 240 : 380, now, 1.2);
    this.ambientOsc1.frequency.setTargetAtTime(baseFreq, now, 1.2);
    this.ambientOsc2.frequency.setTargetAtTime(baseFreq * 1.5 + 0.3, now, 1.2);
  }

  stopAmbientDrone() {
    if (!this.ambientGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.ambientGain.gain.setTargetAtTime(0, now, 0.5);
    setTimeout(() => {
      try {
        if (this.ambientOsc1) {
          this.ambientOsc1.stop();
          this.ambientOsc1.disconnect();
        }
        if (this.ambientOsc2) {
          this.ambientOsc2.stop();
          this.ambientOsc2.disconnect();
        }
        this.ambientGain = null;
        this.ambientOsc1 = null;
        this.ambientOsc2 = null;
      } catch (e) {}
    }, 600);
  }

  // Crystal chime for flavor switch or selection
  playChime(freq = 659.25, type = 'sine', duration = 1.2) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + duration);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  }

  // Soft tactile click for button hover or slider scrub
  playClick(pitch = 800) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  // Fluid transition whoosh on flavor morph
  playWhoosh(direction = 'up') {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(3, now);

      if (direction === 'up') {
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.exponentialRampToValueAtTime(1400, now + 0.35);
      } else {
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.35);
      }

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      whiteNoise.start(now);
    } catch (e) {}
  }
}

export const soundEngine = new SoundEngine();
