'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface CustomVideoPlayerProps {
  src: string;
  className?: string;
  poster?: string;
}

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ 
  src, 
  className = '', 
  poster 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Format time helper
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      console.log('Metadatos cargados. Duración:', video.duration, 'ReadyState:', video.readyState);
      if (video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
        setDuration(video.duration);
        setIsLoading(false);
      }
    };

    const handleLoadedData = () => {
      if (video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
        setDuration(video.duration);
        setIsLoading(false);
      }
    };

    const handleCanPlay = () => {
      if (video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
        setDuration(video.duration);
        setIsLoading(false);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      // Verificar duración en cada actualización por si acaso
      if (duration === 0 && video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
        setDuration(video.duration);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlayThrough = () => {
      if (video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
        setDuration(video.duration);
        setIsLoading(false);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('waiting', handleWaiting);

    // Verificar si los metadatos ya están cargados
    const checkDuration = () => {
      if (video.readyState >= 1 && video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
        console.log('Duración detectada:', video.duration);
        setDuration(video.duration);
        setIsLoading(false);
      }
    };
    
    // Intentar obtener la duración inmediatamente
    checkDuration();
    
    // Si no está disponible, esperar un poco y reintentar
    const timeoutId = setTimeout(checkDuration, 100);

    return () => {
      clearTimeout(timeoutId);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('waiting', handleWaiting);
    };
  }, [duration]);

  // Control functions
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progress = progressRef.current;
    if (!video || !progress || !duration || duration === 0) return;

    const rect = progress.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    // Asegurar que el tiempo esté dentro del rango válido
    const clampedTime = Math.max(0, Math.min(newTime, duration));
    video.currentTime = clampedTime;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    video.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const restart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
  };

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const resetTimeout = () => {
      clearTimeout(timeout);
      setShowControls(true);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    const handleMouseMove = () => resetTimeout();
    const handleMouseLeave = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 1000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        preload="metadata"
        playsInline
        poster={poster}
        crossOrigin="anonymous"
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      {/* Loading overlay */}
      {isLoading && duration === 0 && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Custom Controls Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
          transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Center Play Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center 
                shadow-2xl transition-all duration-200 hover:scale-110 group-hover:opacity-100 opacity-80"
            >
              <Play size={32} className="text-gray-800 ml-1" fill="currentColor" />
            </button>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div 
            ref={progressRef}
            className="w-full h-1.5 bg-white/30 rounded-full mb-4 cursor-pointer group/progress hover:h-2 transition-all"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-white rounded-full relative"
              style={{ width: `${progressPercentage}%`, transition: 'width 0.1s linear' }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full 
                opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg" />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center 
                  transition-all duration-200 backdrop-blur-sm"
              >
                {isPlaying ? (
                  <Pause size={20} className="text-white" />
                ) : (
                  <Play size={20} className="text-white ml-0.5" fill="currentColor" />
                )}
              </button>

              {/* Restart */}
              <button
                onClick={restart}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center 
                  transition-all duration-200 backdrop-blur-sm"
              >
                <RotateCcw size={18} className="text-white" />
              </button>

              {/* Time Display */}
              <div className="text-white text-sm font-medium">
                {duration > 0 ? (
                  <>{formatTime(currentTime)} / {formatTime(duration)}</>
                ) : (
                  <>Cargando...</>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center 
                    transition-all duration-200 backdrop-blur-sm"
                >
                  {isMuted ? (
                    <VolumeX size={18} className="text-white" />
                  ) : (
                    <Volume2 size={18} className="text-white" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                    [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-white 
                    [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                />
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center 
                  transition-all duration-200 backdrop-blur-sm"
              >
                <Maximize size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
