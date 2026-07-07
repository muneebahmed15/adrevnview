let sharedContext: AudioContext | null = null;

export function getPianoContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedContext) sharedContext = new AudioCtx();
  return sharedContext;
}

export async function resumePianoContext(): Promise<AudioContext | null> {
  const ctx = getPianoContext();
  if (!ctx) return null;
  if (ctx.state === "suspended") await ctx.resume();
  return ctx;
}

export function playPianoNote(frequency: number, volume = 0.1, duration = 0.85): void {
  const ctx = getPianoContext();
  if (!ctx || ctx.state !== "running") return;

  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.setValueAtTime(volume, now);
  master.connect(ctx.destination);

  const partials = [
    { ratio: 1, gain: 1 },
    { ratio: 2, gain: 0.32 },
    { ratio: 3, gain: 0.12 },
  ];

  for (const { ratio, gain } of partials) {
    const osc = ctx.createOscillator();
    const envelope = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(frequency * ratio, now);
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(gain, now + 0.015);
    envelope.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(envelope);
    envelope.connect(master);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  }
}

export function suspendPianoContext(): void {
  void sharedContext?.suspend();
}
