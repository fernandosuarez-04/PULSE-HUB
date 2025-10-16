/**
 * useHybridVoice Hook
 *
 * Hybrid voice synthesis hook that uses ElevenLabs audio when available,
 * with automatic fallback to browser's Web Speech API if ElevenLabs fails.
 *
 * Features:
 * - Primary: Play ElevenLabs audio from base64
 * - Fallback: Use browser SpeechSynthesis API
 * - Automatic barge-in (stop audio on interruption)
 * - Unified interface for both voice systems
 * - Robust error handling (AbortError expected during interruption)
 * - Optimized: Reuses single Audio element
 */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useVoiceSynthesis } from './useVoiceSynthesis';

export interface UseHybridVoiceReturn {
  isSpeaking: boolean;
  error: string | null;
  playElevenLabsAudio: (base64Audio: string) => void;
  speakText: (text: string) => void; // Fallback to Web Speech API
  stopSpeaking: () => void;
  voiceName: string | null; // Name of current voice (ElevenLabs or browser)
}

/**
 * Custom hook for hybrid voice synthesis (ElevenLabs + Web Speech API fallback)
 */
export function useHybridVoice(): UseHybridVoiceReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voiceName, setVoiceName] = useState<string | null>(null);

  // Web Speech API fallback
  const webSpeechSynthesis = useVoiceSynthesis();

  // Reusable audio element (optimización: no crear uno nuevo cada vez)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Current object URL for cleanup
  const objectUrlRef = useRef<string | null>(null);

  // Track which system is currently speaking
  const currentSystemRef = useRef<'elevenlabs' | 'webspeech' | null>(null);

  // Track active playback promise to handle interruptions gracefully
  const playbackPromiseRef = useRef<Promise<void> | null>(null);

  // Flag to indicate intentional stop (barge-in) vs error
  const isIntentionalStopRef = useRef(false);

  /**
   * Safely stops audio playback without throwing errors
   */
  const stopAudioSafely = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set flag to indicate this is an intentional stop
    isIntentionalStopRef.current = true;

    // Only pause if not already paused (avoid redundant pause() calls)
    if (!audio.paused) {
      audio.pause();
    }

    // Reset to beginning
    audio.currentTime = 0;
  }, []);

  /**
   * Cleanup old object URL
   */
  const cleanupObjectUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  /**
   * Stops all voice output (ElevenLabs or Web Speech API)
   */
  const stopSpeaking = useCallback(() => {
    console.log('⏹️ Stopping voice output (barge-in)');

    // Stop ElevenLabs audio safely
    if (currentSystemRef.current === 'elevenlabs') {
      stopAudioSafely();
      cleanupObjectUrl();
    }

    // Stop Web Speech API
    if (currentSystemRef.current === 'webspeech') {
      webSpeechSynthesis.stop();
    }

    currentSystemRef.current = null;
    setIsSpeaking(false);
    setVoiceName(null);
    isIntentionalStopRef.current = false;
  }, [stopAudioSafely, cleanupObjectUrl, webSpeechSynthesis]);

  /**
   * Plays audio from ElevenLabs (base64-encoded MP3)
   * @param base64Audio - Base64-encoded audio from backend
   */
  const playElevenLabsAudio = useCallback(
    (base64Audio: string) => {
      if (!base64Audio || base64Audio.trim().length === 0) {
        console.warn('⚠️ Empty audio data, skipping playback');
        return;
      }

      console.log('🎙️ Playing ElevenLabs audio...');

      // Stop any currently playing audio or speech
      // But DON'T reset the intentional flag yet - we're stopping the OLD audio
      const wasIntentional = isIntentionalStopRef.current;
      stopSpeaking();

      // Now reset for the NEW playback we're about to start
      isIntentionalStopRef.current = false;

      try {
        // Decode base64 to binary
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Create blob from binary data
        const blob = new Blob([bytes], { type: 'audio/mpeg' });
        console.log(`   Audio blob: ${blob.size} bytes`);

        // Create or reuse audio element
        let audio = audioRef.current;
        if (!audio) {
          audio = new Audio();
          audioRef.current = audio;
          console.log('   Created new Audio element');
        } else {
          console.log('   Reusing existing Audio element');
        }

        // Cleanup old object URL before creating new one
        cleanupObjectUrl();

        // Create new object URL
        const url = URL.createObjectURL(blob);
        objectUrlRef.current = url;

        // Set new source
        audio.src = url;
        audio.load(); // Force load of new source

        // Update state
        currentSystemRef.current = 'elevenlabs';
        setVoiceName('ElevenLabs');
        setError(null);

        // Event handlers
        audio.onloadeddata = () => {
          console.log('✅ Audio loaded');
        };

        audio.onplay = () => {
          setIsSpeaking(true);
          console.log('🎙️ Audio playing');
        };

        audio.onended = () => {
          console.log('✅ Audio finished');
          setIsSpeaking(false);
          setVoiceName(null);
          currentSystemRef.current = null;
          cleanupObjectUrl();
        };

        audio.onerror = (e) => {
          // Only log real errors, not interruptions
          if (!isIntentionalStopRef.current) {
            console.error('❌ Audio playback error:', {
              error: e,
              readyState: audio?.readyState,
              networkState: audio?.networkState,
            });
            setError('Error al reproducir audio de ElevenLabs');
          }
          setIsSpeaking(false);
          setVoiceName(null);
          currentSystemRef.current = null;
        };

        audio.onpause = () => {
          // Only update state if pause was intentional (not just buffering)
          if (isIntentionalStopRef.current || audio.ended) {
            setIsSpeaking(false);
          }
        };

        // Start playback with proper error handling
        const playPromise = audio.play();
        playbackPromiseRef.current = playPromise;

        playPromise
          .then(() => {
            console.log('✅ Playback started successfully');
            playbackPromiseRef.current = null;
          })
          .catch((err) => {
            playbackPromiseRef.current = null;

            // AbortError is EXPECTED during barge-in, don't log as error
            if (err.name === 'AbortError') {
              if (isIntentionalStopRef.current) {
                console.log('⏹️ Playback interrupted (barge-in)');
              } else {
                console.warn('⚠️ Playback aborted unexpectedly');
              }
              return; // Don't show error to user for barge-in
            }

            // Handle other errors
            if (err.name === 'NotAllowedError') {
              console.warn('⚠️ Autoplay blocked by browser');
              setError('Audio bloqueado. Haz clic en la página para habilitar.');
            } else if (err.name === 'NotSupportedError') {
              console.error('❌ Audio format not supported');
              setError('Formato de audio no soportado');
            } else {
              console.error('❌ Playback error:', err);
              setError('Error al reproducir audio');
            }

            setIsSpeaking(false);
            setVoiceName(null);
            currentSystemRef.current = null;
          });
      } catch (err) {
        console.error('❌ Error processing audio:', err);
        setError('Error al procesar audio');
        setIsSpeaking(false);
        setVoiceName(null);
        currentSystemRef.current = null;
      }
    },
    [stopSpeaking, cleanupObjectUrl]
  );

  /**
   * Speaks text using Web Speech API (fallback)
   * @param text - Text to speak
   */
  const speakText = useCallback(
    (text: string) => {
      if (!text || text.trim().length === 0) {
        console.warn('⚠️ Empty text, skipping speech');
        return;
      }

      // Stop any currently playing audio
      stopSpeaking();

      console.log('🗣️ Using Web Speech API fallback');
      currentSystemRef.current = 'webspeech';

      // Set voice name from Web Speech API
      if (webSpeechSynthesis.selectedVoice) {
        setVoiceName(webSpeechSynthesis.selectedVoice.name);
      } else {
        setVoiceName('Navegador (fallback)');
      }

      // Use Web Speech API
      webSpeechSynthesis.speak(text);
    },
    [stopSpeaking, webSpeechSynthesis]
  );

  /**
   * Sync isSpeaking state with Web Speech API
   */
  useEffect(() => {
    if (currentSystemRef.current === 'webspeech') {
      setIsSpeaking(webSpeechSynthesis.isSpeaking);

      // Clear voice name when Web Speech API stops
      if (!webSpeechSynthesis.isSpeaking && isSpeaking) {
        setVoiceName(null);
        currentSystemRef.current = null;
      }
    }
  }, [webSpeechSynthesis.isSpeaking, isSpeaking]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      // Stop any playing audio
      stopSpeaking();

      // Cleanup audio element
      if (audioRef.current) {
        audioRef.current.src = '';
        audioRef.current = null;
      }

      // Cleanup object URL
      cleanupObjectUrl();
    };
  }, [stopSpeaking, cleanupObjectUrl]);

  return {
    isSpeaking,
    error: error || webSpeechSynthesis.error,
    playElevenLabsAudio,
    speakText,
    stopSpeaking,
    voiceName,
  };
}
