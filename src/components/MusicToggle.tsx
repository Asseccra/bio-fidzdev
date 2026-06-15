import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MusicToggleProps {
  themeColor?: 'cyan' | 'blue' | 'green' | 'purple';
}

// Beautiful atmospheric procedural Web Audio synthesiser fallback
class CyberSynth {
  private ctx: AudioContext | null = null;
  private isRunning = false;
  private oscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private mainGain: GainNode | null = null;
  private loopInterval: any = null;

  constructor() {}

  start() {
    if (this.isRunning) return;
    try {
      // @ts-ignore
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      
      this.ctx = new AudioContextClass();
      this.mainGain = this.ctx.createGain();
      // Set volume/gain to exactly 40% (0.4)
      this.mainGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.mainGain.connect(this.ctx.destination);
      this.isRunning = true;

      this.playAtmosphere();
      let step = 0;
      this.loopInterval = setInterval(() => {
        if (!this.ctx || this.ctx.state === 'suspended') return;
        this.playChordStep(step);
        step = (step + 1) % 4;
      }, 3500);
    } catch (e) {
      console.warn("Web Audio API synthesis failure: ", e);
    }
  }

  playAtmosphere() {
    if (!this.ctx || !this.mainGain) return;
    // Layer 1: Atmospheric drone bass
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gainNode1 = this.ctx.createGain();
      const gainNode2 = this.ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2 chord bass

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(130.81, this.ctx.currentTime); // C3 chord octave

      gainNode1.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gainNode2.gain.setValueAtTime(0.08, this.ctx.currentTime);

      osc1.connect(gainNode1);
      gainNode1.connect(this.mainGain);
      osc2.connect(gainNode2);
      gainNode2.connect(this.mainGain);

      osc1.start();
      osc2.start();

      this.oscillators.push({ osc: osc1, gain: gainNode1 }, { osc: osc2, gain: gainNode2 });
    } catch (e) {}
  }

  playChordStep(step: number) {
    if (!this.ctx || !this.mainGain) return;
    
    // Choose beautiful Cyberpunk Lofi Minor chords: C minor, Eb major, G minor, Ab major
    const roots = [130.81, 155.56, 196.00, 207.65]; // C3, Eb3, G3, Ab3
    const root = roots[step % roots.length];

    const generateNote = (freq: number, duration: number, vol: number) => {
      if (!this.ctx || !this.mainGain) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        // Beautiful cyberpunk lofi slide effect
        osc.frequency.exponentialRampToValueAtTime(freq * 1.003, this.ctx.currentTime + duration * 0.5);
        osc.frequency.exponentialRampToValueAtTime(freq, this.ctx.currentTime + duration);

        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.mainGain);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (err) {}
    };

    // Minor chord components (root, minor third/major third, fifth)
    if (step === 0) {
      // C minor pad
      generateNote(130.81, 3.4, 0.15); // C3
      generateNote(155.56, 3.4, 0.12); // Eb3
      generateNote(196.00, 3.4, 0.10); // G3
      generateNote(261.63, 3.4, 0.08); // C4
    } else if (step === 1) {
      // Eb major pad
      generateNote(155.56, 3.4, 0.15); // Eb3
      generateNote(196.00, 3.4, 0.12); // G3
      generateNote(233.08, 3.4, 0.10); // Bb3
      generateNote(311.13, 3.4, 0.08); // Eb4
    } else if (step === 2) {
      // G minor pad
      generateNote(196.00, 3.4, 0.15); // G3
      generateNote(233.08, 3.4, 0.12); // Bb3
      generateNote(293.66, 3.4, 0.10); // D4
      generateNote(392.00, 3.4, 0.08); // G4
    } else {
      // Ab major pad
      generateNote(207.65, 3.4, 0.15); // Ab3
      generateNote(261.63, 3.4, 0.12); // C4
      generateNote(311.13, 3.4, 0.10); // Eb4
      generateNote(415.30, 3.4, 0.08); // Ab4
    }
  }

  stop() {
    this.isRunning = false;
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
    this.oscillators.forEach(({ osc, gain }) => {
      try {
        osc.stop();
        osc.disconnect();
        gain.disconnect();
      } catch (err) {}
    });
    this.oscillators = [];
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (err) {}
      this.ctx = null;
    }
  }
}

export default function MusicToggle({ themeColor = 'cyan' }: MusicToggleProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    // Read the saved state from localStorage ("music-enabled" key as requested)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('music-enabled');
      return saved === 'true';
    }
    return false;
  });

  const [useSynth, setUseSynth] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<CyberSynth | null>(null);

  // Initialize synth class
  useEffect(() => {
    synthRef.current = new CyberSynth();
    return () => {
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  // 1. Initialize HTML5 Audio instance pointing to /audio/music.mp3
  useEffect(() => {
    const audio = new Audio('/audio/music.mp3');
    audio.volume = 0.4;
    audio.loop = true;
    audio.preload = 'auto';

    // Error event: If local music.mp3 fails to load, mark useSynth as true
    audio.addEventListener('error', (e) => {
      console.warn("Local '/audio/music.mp3' not found or failed to load. Automatically falling back to procedurally generated Web Audio ambient synth.", e);
      setUseSynth(true);
    });

    audioRef.current = audio;

    // First autoplay sync if preference is ON on initial render
    if (isPlaying) {
      if (useSynth) {
        // Fallback procedural synthesizer sound
        synthRef.current?.start();
      } else {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Autoplay blocked on mount. Will wait for manual trigger.", err);
            setIsAutoplayBlocked(true);
          });
        }
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, [useSynth]);

  // Synchronize playing state with browser systems & Web Audio synth
  useEffect(() => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      if (useSynth) {
        // Start synthesized ambient lofi audio stream
        synthRef.current?.start();
        setIsAutoplayBlocked(false);
      } else if (audio) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsAutoplayBlocked(false);
          }).catch((err) => {
            console.warn("Autoplay blocked. Switching fallback:", err);
            setIsAutoplayBlocked(true);
          });
        }
      }
      localStorage.setItem('music-enabled', 'true');
    } else {
      if (audio) {
        audio.pause();
      }
      if (synthRef.current) {
        synthRef.current.stop();
      }
      localStorage.setItem('music-enabled', 'false');
    }
  }, [isPlaying, useSynth]);

  // Handle manual click toggles
  const handleToggle = async () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    setIsAutoplayBlocked(false);
  };

  const isActuallyPlaying = isPlaying && !isAutoplayBlocked;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* 1. CYBER NEON GLO-RIPPLE WHEN MUSIC ACTIVE */}
      {isActuallyPlaying && (
        <>
          <div 
            className="absolute inset-0 rounded-[18px] animate-ping opacity-30 scale-115 pointer-events-none bg-cyan-400/25"
          />
          <div 
            className="absolute inset-0 rounded-[18px] animate-pulse opacity-20 scale-105 pointer-events-none bg-cyan-400/15"
          />
        </>
      )}

      {/* 2. THE SIMPLIFIED MUSIC CONTROLLER AS SPECIFIED */}
      <motion.button
        id="navbar-music-toggle"
        onClick={handleToggle}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[18px] backdrop-blur-md border text-[10px] font-mono tracking-wider font-bold leading-none uppercase transition-all duration-300 cursor-pointer select-none ${
          isActuallyPlaying
            ? 'bg-cyan-500/10 border-cyan-400 text-[#00d9ff] shadow-[0_0_12px_rgba(6,182,212,0.45)] drop-shadow-[0_0_4px_rgba(6,182,212,0.35)]'
            : isAutoplayBlocked
            ? 'bg-amber-500/10 text-amber-300 border-amber-400/45 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
            : 'bg-slate-950/45 text-slate-300/75 border-cyan-500/20 opacity-75 hover:opacity-100 hover:text-white hover:bg-slate-900/60 hover:border-cyan-400/40 hover:shadow-[0_0_8px_rgba(6,182,212,0.25)]'
        }`}
      >
        <span>🎵</span>
        <span className="font-mono tracking-widest text-[9px]">
          {isActuallyPlaying ? 'PLAY ON' : 'PLAY OFF'}
        </span>
      </motion.button>

      {/* 3. TOOLTIP EXPLAINER */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2.5 right-0 z-50 whitespace-nowrap bg-slate-950/95 border border-slate-800 text-[9px] font-mono tracking-widest uppercase font-black text-slate-300 py-1.5 px-3 rounded-md shadow-2xl pointer-events-none"
          >
            {isAutoplayBlocked ? (
              <span className="text-amber-400">Autoplay Blocked - Click to Play</span>
            ) : isActuallyPlaying ? (
              <span className="text-cyan-400">
                {useSynth ? 'Synthesizing Atmospheric Cyber-beats' : 'Playing /audio/music.mp3'} (Volume: 40%)
              </span>
            ) : (
              <span>Ambient Audio Silenced</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
