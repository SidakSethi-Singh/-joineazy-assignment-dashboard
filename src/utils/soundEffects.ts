/**
 * Web Audio API synthesized sound effects.
 * Zero external audio assets required; runs 100% offline and in-browser.
 */

let isAudioEnabled = true;

export function toggleAudio(enabled?: boolean): boolean {
  if (typeof enabled === 'boolean') {
    isAudioEnabled = enabled;
  } else {
    isAudioEnabled = !isAudioEnabled;
  }
  try {
    localStorage.setItem('joineazy_audio_enabled', JSON.stringify(isAudioEnabled));
  } catch {
    // fallback
  }
  return isAudioEnabled;
}

export function getAudioEnabled(): boolean {
  try {
    const val = localStorage.getItem('joineazy_audio_enabled');
    if (val !== null) {
      isAudioEnabled = JSON.parse(val);
    }
  } catch {
    // fallback
  }
  return isAudioEnabled;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  return new AudioCtx();
}

/**
 * Play a pleasant success chime (e.g., when submitting an assignment or grading)
 */
export function playSuccessSound(): void {
  if (!getAudioEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Arpeggio chords
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
    osc.frequency.setValueAtTime(1046.5, now + 0.24); // C6

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.start(now);
    osc.stop(now + 0.52);
  } catch {
    // Audio contexts might be blocked until user gesture, ignore gracefully
  }
}

/**
 * Play a subtle click/switch pop sound (e.g., when switching users)
 */
export function playSwitchSound(): void {
  if (!getAudioEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch {
    // ignore
  }
}

/**
 * Play an attention / revision notification chime
 */
export function playAlertSound(): void {
  if (!getAudioEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(622.25, now); // D#5
    osc.frequency.setValueAtTime(587.33, now + 0.12); // D5

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.start(now);
    osc.stop(now + 0.36);
  } catch {
    // ignore
  }
}
