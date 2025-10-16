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
 * - Error handling and logging
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

  // Ref to current audio element (for ElevenLabs)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Ref to current object URL for cleanup
  const objectUrlRef = useRef<string | null>(null);

  // Track which system is currently speaking
  const currentSystemRef = useRef<'elevenlabs' | 'webspeech' | null>(null);

  // Track if audio is currently loading (prevent premature cleanup)
  const isLoadingRef = useRef(false);

  /**
   * Cleanup function to revoke object URLs and stop audio
   */
  const cleanup = useCallback(() => {
    // Don't cleanup if audio is still loading
    if (isLoadingRef.current) {
      console.warn('⚠️ Audio still loading (flag=true), deferring cleanup');
      console.trace('Cleanup attempt blocked:');
      return;
    }

    console.log(`🧹 Cleaning up audio resources (flag=${isLoadingRef.current})`);

    // Stop and cleanup audio element (ElevenLabs)
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

    // Stop Web Speech API if speaking
    if (currentSystemRef.current === 'webspeech') {
      webSpeechSynthesis.stop();
    }

    currentSystemRef.current = null;
  }, [webSpeechSynthesis]);

  /**
   * Stops all voice output (ElevenLabs or Web Speech API)
   */
  const stopSpeaking = useCallback(() => {
    cleanup();
    setIsSpeaking(false);
    setVoiceName(null);
    console.log('⏹️ Voice output stopped (barge-in)');
  }, [cleanup]);

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

      try {
        console.log('🎙️ Playing ElevenLabs audio...');
        console.log(`   Audio length: ${base64Audio.length} chars`);

        // Capture OLD audio element and URL for cleanup BEFORE creating new ones
        const oldAudio = audioRef.current;
        const oldUrl = objectUrlRef.current;
        const oldSystem = currentSystemRef.current;

        // Clear refs immediately to prevent any accidental access to old resources
        audioRef.current = null;
        objectUrlRef.current = null;

        // Stop and cleanup OLD audio (won't affect new audio we're about to create)
        if (oldAudio || oldSystem === 'webspeech') {
          console.log('⏹️ Stopping previous audio before playing new one');

          // Cleanup old audio element
          if (oldAudio) {
            oldAudio.pause();
            oldAudio.currentTime = 0;
            oldAudio.src = '';
          }

          // Revoke old object URL
          if (oldUrl) {
            URL.revokeObjectURL(oldUrl);
          }

          // Stop Web Speech API if was speaking
          if (oldSystem === 'webspeech') {
            webSpeechSynthesis.stop();
          }

          setIsSpeaking(false);
          setVoiceName(null);
        }

        // Now set loading flag to protect the NEW audio we're about to create
        isLoadingRef.current = true;
        currentSystemRef.current = 'elevenlabs';
        setVoiceName('ElevenLabs');
        console.log(`🔒 Loading flag SET (true), audio protected from cleanup`);

        // Convert base64 to binary
        let binaryString: string;
        try {
          binaryString = atob(base64Audio);
          console.log(`   Decoded binary length: ${binaryString.length} bytes`);
        } catch (decodeErr) {
          console.error('❌ Error decoding base64:', decodeErr);
          isLoadingRef.current = false;
          throw new Error('Invalid base64 audio data');
        }

        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Create blob from binary data
        const blob = new Blob([bytes], { type: 'audio/mpeg' });
        console.log(`   Blob created: ${blob.size} bytes, type: ${blob.type}`);

        // Create object URL
        const url = URL.createObjectURL(blob);
        objectUrlRef.current = url;
        console.log(`   Object URL created: ${url.substring(0, 50)}...`);

        // Create audio element
        const audio = new Audio(url);
        audioRef.current = audio;

        // Event handlers
        audio.onloadeddata = () => {
          console.log('✅ ElevenLabs audio loaded, ready to play');
        };

        audio.onplay = () => {
          // Clear loading flag once playback starts
          isLoadingRef.current = false;
          console.log('🔓 Loading flag CLEARED (false), audio playback started');
          setIsSpeaking(true);
          setError(null);
          console.log('🎙️ ElevenLabs audio playing');
        };

        audio.onended = () => {
          isLoadingRef.current = false;
          setIsSpeaking(false);
          setVoiceName(null);
          cleanup();
          console.log('✅ ElevenLabs audio finished');
        };

        audio.onerror = (e) => {
          isLoadingRef.current = false;
          setIsSpeaking(false);
          setVoiceName(null);
          const errorMsg = 'Error al reproducir audio de ElevenLabs';
          setError(errorMsg);

          // Log detallado del error
          console.error('❌ ElevenLabs audio playback error:', {
            error: e,
            errorType: e?.type,
            target: e?.target,
            currentSrc: audio?.currentSrc,
            readyState: audio?.readyState,
            networkState: audio?.networkState,
          });

          cleanup();
        };

        audio.onpause = () => {
          if (audioRef.current?.currentTime === 0) {
            isLoadingRef.current = false;
            setIsSpeaking(false);
            setVoiceName(null);
          }
        };

        // Start playback
        audio
          .play()
          .then(() => {
            console.log('✅ Audio playback started successfully');
          })
          .catch((err) => {
            isLoadingRef.current = false;
            console.error('❌ Error starting ElevenLabs playback:', {
              name: err?.name,
              message: err?.message,
              code: err?.code,
              error: err,
            });

            // Handle autoplay blocking
            if (err.name === 'NotAllowedError') {
              setError('Audio bloqueado por el navegador. Haz clic para habilitar.');
            } else if (err.name === 'NotSupportedError') {
              setError('Formato de audio no soportado. Usando fallback.');
              console.warn('⚠️ Audio format not supported, trying Web Speech API fallback');
            } else {
              setError('Error al reproducir audio de ElevenLabs');
            }

            setIsSpeaking(false);
            setVoiceName(null);
            cleanup();
          });
      } catch (err) {
        isLoadingRef.current = false;
        console.error('❌ Error processing ElevenLabs audio:', {
          error: err,
          message: err instanceof Error ? err.message : 'Unknown error',
        });
        setError('Error al procesar audio');
        setIsSpeaking(false);
        setVoiceName(null);
        cleanup();
      }
    },
    [cleanup, webSpeechSynthesis]
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
      }
    }
  }, [webSpeechSynthesis.isSpeaking, isSpeaking]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    isSpeaking,
    error: error || webSpeechSynthesis.error,
    playElevenLabsAudio,
    speakText,
    stopSpeaking,
    voiceName,
  };
}
