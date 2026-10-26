// Synthesized Web Audio Engine
// Emil Kowalski style: lightweight, instant zero-latency feedback, no audio asset network lag.

class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Realistic metallic coin clink with high harmonic bell resonance
  playCoin() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Dual chime frequencies for metallic clink
    const freqs = [1850, 2400, 3200];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq + (Math.random() * 80 - 40), now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.85, now + 0.18);

      gain.gain.setValueAtTime(0.25 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2 + idx * 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    });
  }

  // Crisp banknote paper swish / count sound
  playNote() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Filtered noise burst for crisp paper friction
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(3.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  // Zen Temple Bell / Tibetan Singing Bowl for Arigato Stamp
  playGong() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const baseFreq = 432; // Calming 432Hz harmonic
    const harmonics = [1, 2.76, 4.4, 6.2];

    harmonics.forEach((ratio, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * ratio, now);

      const initialVolume = (0.28 / (i + 1)) * 0.8;
      gain.gain.setValueAtTime(initialVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + i * 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.5);
    });
  }

  // Ice crack / shatter sound when breaking impulse freeze
  playIceCrack() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const offset = i * 0.04;
      osc.frequency.setValueAtTime(1200 + Math.random() * 900, now + offset);
      osc.frequency.exponentialRampToValueAtTime(300, now + offset + 0.07);

      gain.gain.setValueAtTime(0.2, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.1);
    }
  }

  // Celebratory harp arpeggio
  playSuccess() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const time = now + idx * 0.08;
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.22, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.45);
    });
  }

  // Light tactile UI tap
  playTap() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }
}

export const sounds = new SoundEngine();
