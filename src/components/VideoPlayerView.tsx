import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Clock, FileText, CheckCircle } from 'lucide-react';
import { VideoData } from '../types';

interface VideoPlayerProps {
  video: VideoData;
}

export const VideoPlayerView: React.FC<VideoPlayerProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState<'timestamps' | 'transcript'>('timestamps');
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        setIsPlaying(true); // fall back to simulated player state
      });
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  return (
    <div className="space-y-6">
      {/* Video Container */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-white shadow-xl dark:border-slate-800">
        <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center">
          <video
            ref={videoRef}
            src={video.src}
            className={`h-full w-full object-cover ${videoError ? 'hidden' : 'block'}`}
            onError={() => setVideoError(true)}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Fallback Simulator Screen if mp4 file is not yet placed in directory */}
          {videoError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-[#0a0f1d]">
              <div className="h-16 w-16 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center mb-4 border border-brand-500/30">
                <Play className="h-8 w-8 ml-1" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{video.title}</h4>
              <p className="text-xs text-slate-300 max-w-md mb-4 leading-relaxed">
                {video.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="rounded bg-slate-800 px-2 py-1 font-mono border border-slate-700">
                  {video.resolution}
                </span>
                <span>•</span>
                <span>Davomiyligi: {video.duration}</span>
                <span>•</span>
                <span className="text-emerald-400">Mahalliy MP4 pleyer</span>
              </div>
            </div>
          )}

          {/* Central play button overlay when paused */}
          {!isPlaying && !videoError && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Videoni ijro etish"
              className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-brand-600/90 text-white shadow-lg backdrop-blur hover:scale-110 hover:bg-brand-500 transition-all focus:outline-none focus:ring-4 focus:ring-brand-500/50"
            >
              <Play className="h-8 w-8 ml-1" />
            </button>
          )}
        </div>

        {/* Video Player Controls Bar */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/95 px-4 py-3 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            <span className="font-mono text-[11px] text-slate-400">
              00:00 / {video.duration}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-brand-300 border border-slate-700">
              {video.resolution}
            </span>

            <button
              type="button"
              onClick={handleSpeedChange}
              className="rounded bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
            >
              {playbackSpeed}x
            </button>
          </div>
        </div>
      </div>

      {/* Tabs for Timestamps and Transcripts */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex border-b border-slate-200 pb-3 dark:border-slate-800 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('timestamps')}
            className={`flex items-center gap-2 pb-1 text-xs font-semibold transition-colors border-b-2 ${
              activeTab === 'timestamps'
                ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Mavzu vaqt belgilari ({video.timestamps.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('transcript')}
            className={`flex items-center gap-2 pb-1 text-xs font-semibold transition-colors border-b-2 ${
              activeTab === 'transcript'
                ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Video transkripti</span>
          </button>
        </div>

        <div className="pt-4">
          {activeTab === 'timestamps' ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {video.timestamps.map((stamp, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-2.5 text-xs hover:bg-slate-100 dark:border-slate-800/80 dark:bg-slate-800/40 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {stamp.title}
                  </span>
                  <span className="font-mono text-brand-600 dark:text-brand-400 font-semibold bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded">
                    {stamp.time}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {video.transcripts.map((item, idx) => (
                <div key={idx} className="rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-800/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {item.speaker}
                    </span>
                    <span className="font-mono text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

