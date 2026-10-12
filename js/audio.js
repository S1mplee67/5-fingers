/**
 * 5 F!NGERS - Web Audio Synthesizer
 * Created by S1mplee67 (W3NCY?)
 * 
 * 100% Offline synthesized mechanical keyboard switches:
 * Cherry MX Blue, Red, Brown, and Vintage Typewriter with Bell.
 * Zero external audio files required.
 */

class SoundEngine {
  constructor(switchType = 'cherry-blue', volume = 0.5) {
    this.switchType = switchType;
    this.volume = Math.max(0.0, Math.min(1.0, volume));
    this.ctx = null;
    this.masterGain = null;
    this.isUnlocked = false;
  }

  _initContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      } catch (e) {
        console.warn('AudioContext initialization deferred:', e);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.isUnlocked = true;
      }).catch(() => {});
    }
  }

  setSwitch(type) {
    const valid = ['cherry-blue', 'cherry-red', 'cherry-brown', 'typewriter', 'mute'];
    if (valid.includes(type)) {
      this.switchType = type;
    }
  }

  setVolume(level) {
    this.volume = Math.max(0.0, Math.min(1.0, level));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  playClick() {
    if (this.switchType === 'mute') return;
    this._initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    switch (this.switchType) {
      case 'cherry-blue':
        this._synthCherryBlue(t);
        break;
      case 'cherry-red':
        this._synthCherryRed(t);
        break;
      case 'cherry-brown':
        this._synthCherryBrown(t);
        break;
      case 'typewriter':
        this._synthTypewriter(t);
        break;
      default:
        this._synthCherryBlue(t);
        break;
    }
  }

  _synthCherryBlue(t) {
    // Sharp high-frequency click + tactile tap
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2800, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.025);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3000, t);
    filter.Q.setValueAtTime(3.0, t);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  _synthCherryRed(t) {
    // Soft damped bottom-out clack
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.04);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.055);
  }

  _synthCherryBrown(t) {
    // Subtle double tactile bump
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.03);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.045);
  }

  _synthTypewriter(t) {
    // Chunky mechanical impact
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.06);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, t);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.075);
  }

  playError() {
    if (this.switchType === 'mute') return;
    this._initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, t);
    osc.frequency.linearRampToValueAtTime(100, t + 0.08);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.1);
  }

  playLevelComplete() {
    if (this.switchType === 'mute') return;
    this._initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Pleasant 4-note victory chime (C5, E5, G5, C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];

    notes.forEach((freq, idx) => {
      const noteTime = t + idx * 0.09;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.2, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.28);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.3);
    });
  }
}
