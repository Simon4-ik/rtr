import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Clock,
  Sparkles,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { VideoData } from '../types';

interface VideoPlayerProps {
  video: VideoData;
  paraNumber: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, paraNumber }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.durationMin * 60 || 360);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const storageKey = `kiberxavfsizlik_video_pos_para_${paraNumber}`;

  // Restore saved position
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && videoRef.current) {
        const time = parseFloat(saved);
        videoRef.current.currentTime = time;
        setCurrentTime(time);
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleMute();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekRelative(-5);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekRelative(5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        setIsPlaying(true);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    setIsMuted(next);
    videoRef.current.muted = next;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    if (videoRef.current) {
      videoRef.current.playbackRate = next;
    }
  };

  const seekRelative = (delta: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + delta));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const jumpToChapter = (minutesStr: string) => {
    const parts = minutesStr.split(':').map(Number);
    const secs = parts.length === 2 ? parts[0] * 60 + parts[1] : 0;
    if (videoRef.current) {
      videoRef.current.currentTime = secs;
      setCurrentTime(secs);
      if (!isPlaying) togglePlay();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const chapters = video.timestamps || [
    { time: '00:00', title: 'Kirish va fanning dolzarbligi' },
    { time: '02:30', title: 'CIA triadasi va axborot xususiyatlari' },
    { time: '06:00', title: 'Chuqurlashtirilgan himoya modeli' },
    { time: '09:15', title: 'Xulosa va mustaqil topshiriqlar' },
  ];

  return (
    <div className="space-y-6">
      {/* Video Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-card border border-border bg-black text-white shadow-2xl select-none"
      >
        <div className="relative aspect-video w-full flex items-center justify-center bg-slate-950">
          <video
            ref={videoRef}
            src={video.src || `./content/para-01/${video.file}`}
            className={`h-full w-full object-cover ${videoError ? 'hidden' : 'block'}`}
            onError={() => setVideoError(true)}
            onTimeUpdate={() => {
              if (videoRef.current) {
                const cur = videoRef.current.currentTime;
                setCurrentTime(cur);
                try {
                  localStorage.setItem(storageKey, String(cur));
                } catch {}
              }
            }}
            onLoadedMetadata={() => {
              if (videoRef.current) setDuration(videoRef.current.duration);
            }}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Interactive Poster / Simulator Screen if video file not yet placed */}
          {videoError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-[#0B1220] to-black">
              <div className="h-16 w-16 rounded-2xl bg-accent-soft text-accent flex items-center justify-center mb-4 border border-accent/30 shadow-accent-glow">
                <Play className="h-8 w-8 ml-1" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                {paraNumber}-para Video ma'ruzasi
              </h4>
              <p className="text-xs text-slate-400 max-w-md mb-4 leading-relaxed">
                Mahalliy MP4 video pleyer. Klaviaturada: Bo'shliq (Play/Pause), M (Ovoz), F (To'liq ekran), ← / → (5s o'tkazish).
              </p>
              <div className="flex items-center gap-2">
                <span className="rounded bg-accent/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-accent border border-accent/40">
                  {video.resolution || '720p HD'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Davomiyligi: ~{video.durationMin || 12} daqiqa
                </span>
              </div>
            </div>
          )}

          {/* Large Center Play Overlay */}
          {!isPlaying && !videoError && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Ijro etish"
              className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-accent-glow hover:scale-110 transition-transform focus:outline-none"
            >
              <Play className="h-8 w-8 ml-1 fill-current" />
            </button>
          )}
        </div>

        {/* Video Player Control Bar */}
        <div className="border-t border-white/10 bg-black/85 backdrop-blur px-4 py-3 space-y-2">
          {/* Progress Seek Bar */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Video vaqtini surish"
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent"
          />

          <div className="flex items-center justify-between text-xs text-slate-300">
            {/* Left Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pauza' : 'Ijro'}
                className="hover:text-accent transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Ovozni yoqish' : 'Ovozni o\'chirish'}
                  className="hover:text-accent transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Ovoz balandligi"
                  className="w-14 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>

              <span className="font-mono text-[11px] text-slate-400">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono font-bold text-accent border border-white/10">
                720p HD
              </span>

              <button
                type="button"
                onClick={cycleSpeed}
                aria-label="Tezlikni o'zgartirish"
                className="font-mono text-xs font-bold px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors"
              >
                {speed}x
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="To'liq ekran"
                className="hover:text-accent transition-colors"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters / Timestamps List */}
      <div className="rounded-card border border-border bg-surface p-5 shadow-card space-y-3">
        <h4 className="font-bold text-text text-sm flex items-center gap-2">
          <Clock className="h-4 w-4 text-accent" />
          <span>Mavzu bo'limlari (Vaqt belgilari)</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {chapters.map((ch, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => jumpToChapter(ch.time)}
              className="flex items-center justify-between rounded-btn border border-border bg-surface-2/40 p-2.5 text-xs text-left hover:border-accent hover:bg-surface-2 transition-colors"
            >
              <span className="font-medium text-text">{ch.title}</span>
              <span className="rounded bg-surface px-2 py-0.5 font-mono text-[10px] font-bold text-accent border border-border">
                {ch.time}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

