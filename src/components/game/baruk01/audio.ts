type SoundName = "flap" | "score" | "hit" | "best";

type WebkitWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

/**
 * Small synthesized sound layer. No audio files, no third-party library.
 * The context is only created after a user gesture (start / toggle).
 */
export class GameAudio {
  enabled = false;

  private context: AudioContext | null = null;
  private master: GainNode | null = null;

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      void this.context?.suspend();
      return;
    }
    this.ensureContext();
  }

  unlock() {
    if (!this.enabled) return;
    this.ensureContext();
    if (this.context?.state === "suspended") {
      void this.context.resume();
    }
  }

  play(sound: SoundName) {
    if (!this.enabled) return;
    const context = this.ensureContext();
    const master = this.master;
    if (!context || !master || context.state !== "running") return;

    const now = context.currentTime;

    if (sound === "flap") {
      this.tone(context, master, {
        from: 310,
        to: 540,
        duration: 0.09,
        type: "triangle",
        volume: 0.09,
        start: now,
      });
      return;
    }

    if (sound === "score") {
      this.tone(context, master, {
        from: 880,
        to: 880,
        duration: 0.1,
        type: "sine",
        volume: 0.07,
        start: now,
      });
      this.tone(context, master, {
        from: 1318,
        to: 1318,
        duration: 0.12,
        type: "sine",
        volume: 0.05,
        start: now + 0.07,
      });
      return;
    }

    if (sound === "hit") {
      this.noise(context, master, now, 0.32, 0.22);
      this.tone(context, master, {
        from: 150,
        to: 46,
        duration: 0.4,
        type: "sine",
        volume: 0.16,
        start: now,
      });
      return;
    }

    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((frequency, index) => {
      this.tone(context, master, {
        from: frequency,
        to: frequency,
        duration: 0.16,
        type: "triangle",
        volume: 0.06,
        start: now + index * 0.09,
      });
    });
  }

  dispose() {
    void this.context?.close();
    this.context = null;
    this.master = null;
  }

  private ensureContext() {
    if (this.context) return this.context;
    if (typeof window === "undefined") return null;

    const AudioContextClass =
      window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;
    if (!AudioContextClass) return null;

    this.context = new AudioContextClass();
    this.master = this.context.createGain();
    this.master.gain.value = 0.22;
    this.master.connect(this.context.destination);
    return this.context;
  }

  private tone(
    context: AudioContext,
    destination: AudioNode,
    options: {
      from: number;
      to: number;
      duration: number;
      type: OscillatorType;
      volume: number;
      start: number;
    },
  ) {
    const { from, to, duration, type, volume, start } = options;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(from, start);
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(30, to),
      start + duration,
    );

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(gain);
    gain.connect(destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  private noise(
    context: AudioContext,
    destination: AudioNode,
    start: number,
    duration: number,
    volume: number,
  ) {
    const frameCount = Math.floor(context.sampleRate * duration);
    const buffer = context.createBuffer(1, frameCount, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < frameCount; index += 1) {
      const decay = 1 - index / frameCount;
      data[index] = (Math.random() * 2 - 1) * decay * decay;
    }

    const source = context.createBufferSource();
    source.buffer = buffer;

    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1600, start);
    filter.frequency.exponentialRampToValueAtTime(180, start + duration);

    const gain = context.createGain();
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(destination);
    source.start(start);
  }
}
