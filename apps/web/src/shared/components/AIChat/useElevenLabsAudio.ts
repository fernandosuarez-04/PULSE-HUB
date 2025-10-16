/**
 * useElevenLabsAudio Hook
 *
 * Custom hook for playing audio from ElevenLabs Text-to-Speech.
 * Handles base64-encoded audio playback with proper cleanup and interruption.
 *
 * Features:
 * - Automatic audio playback from base64 data
 * - Interrupt capability (stop current audio)
 * - Loading/playing state management
 * - Error handling
 * - Memory cleanup
 */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseElevenLabsAudioReturn {
  isPlaying: boolean;
  error: string | null;
  playAudio: (base64Audio: string) => void;
  stopAudio: () => void;
}

/**
 * Custom hook for managing ElevenLabs audio playback
 */
export function useElevenLabsAudio(): UseElevenLabsAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ref to current audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Ref to current object URL for cleanup
  const objectUrlRef = useRef<string | null>(null);

  /**
   * Cleanup function to revoke object URLs and stop audio
   */
  const cleanup = useCallback(() => {
    // Stop and cleanup audio element
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = '';
      audioRef.current = null;
    }

    // Revoke object URL to free memory
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  /**
   * Stops currently playing audio
   */
  const stopAudio = useCallback(() => {
    cleanup();
    setIsPlaying(false);
    console.log('⏹️ ElevenLabs audio stopped');
  }, [cleanup]);

  /**
   * Plays audio from base64-encoded data
   * @param base64Audio - Base64-encoded audio (MP3 format)
   */
  const playAudio = useCallback(
    (base64Audio: string) => {
      if (!base64Audio || base64Audio.trim().length === 0) {
        console.warn('⚠️ Empty audio data, skipping playback');
        return;
      }

      try {
        // Stop any currently playing audio
        stopAudio();

        console.log('🎙️ Playing ElevenLabs audio...');

        // Convert base64 to binary
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Create blob from binary data
        const blob = new Blob([bytes], { type: 'audio/mpeg' });

        // Create object URL
        const url = URL.createObjectURL(blob);
        objectUrlRef.current = url;

        // Create audio element
        const audio = new Audio(url);
        audioRef.current = audio;

        // Event handlers
        audio.onloadeddata = () => {
          console.log('✅ Audio loaded, starting playback');
        };

        audio.onplay = () => {
          setIsPlaying(true);
          setError(null);
          console.log('🎙️ Audio playing');
        };

        audio.onended = () => {
          setIsPlaying(false);
          cleanup();
          console.log('✅ Audio finished playing');
        };

        audio.onerror = (e) => {
          setIsPlaying(false);
          const errorMsg = 'Error al reproducir audio';
          setError(errorMsg);
          console.error('❌ Audio playback error:', e);
          cleanup();
        };

        audio.onpause = () => {
          setIsPlaying(false);
          console.log('⏸️ Audio paused');
        };

        // Start playback
        audio
          .play()
          .catch((err) => {
            console.error('❌ Error starting audio playback:', err);

            // Handle autoplay blocking
            if (err.name === 'NotAllowedError') {
              setError('Reproducción bloqueada por el navegador. Haz clic para habilitar audio.');
            } else {
              setError('Error al reproducir audio');
            }

            setIsPlaying(false);
            cleanup();
          });
      } catch (err) {
        console.error('❌ Error processing audio:', err);
        setError('Error al procesar audio');
        setIsPlaying(false);
        cleanup();
      }
    },
    [cleanup, stopAudio]
  );

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    isPlaying,
    error,
    playAudio,
    stopAudio,
  };
}
