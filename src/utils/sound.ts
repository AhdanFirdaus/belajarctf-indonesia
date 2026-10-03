// Web Audio API Retro Sound Effects Generator (Tactile Mechanical Clicks & Chimes)

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

/**
 * Play a short, crisp retro mechanical keyboard click
 */
export const playRetroClick = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(850, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    console.debug('Audio error:', e);
  }
};

/**
 * Play a high-pitch terminal beep
 */
export const playTerminalBeep = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.setValueAtTime(1600, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.debug('Audio error:', e);
  }
};

/**
 * Play a success chime for checklist completion
 */
export const playSuccessChime = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(659.25, now + 0.06);
    osc.frequency.setValueAtTime(783.99, now + 0.12);
    osc.frequency.setValueAtTime(1046.5, now + 0.18);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {
    console.debug('Audio error:', e);
  }
};

/**
 * Play a nostalgic 8-bit / 16-bit RPG quest fail / defeat descending arpeggio sound
 */
export const playRpgFailSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    
    // 4 descending sad minor notes: E4 -> C4 -> G#3 -> G3
    const notes = [
      { freq: 329.63, start: 0, dur: 0.12 },
      { freq: 261.63, start: 0.13, dur: 0.12 },
      { freq: 207.65, start: 0.26, dur: 0.14 },
      { freq: 174.61, start: 0.41, dur: 0.35 },
    ];

    notes.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.freq, now + n.start);

      // Add a slight retro pitch slide on the final note
      if (n.freq < 200) {
        osc.frequency.exponentialRampToValueAtTime(n.freq * 0.88, now + n.start + n.dur);
      }

      gain.gain.setValueAtTime(0.12, now + n.start);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + n.start);
      osc.stop(now + n.start + n.dur);
    });
  } catch (e) {
    console.debug('Audio error:', e);
  }
};
