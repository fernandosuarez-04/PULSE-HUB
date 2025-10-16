/**
 * useElevenLabsSynthesis Hook
 *
 * Custom hook for high-quality speech synthesis using ElevenLabs API.
 * Replaces Microsoft Sabina with professional ElevenLabs voices.
 *
 * Features:
 * - High-quality, natural-sounding voices
 * - Multilingual support
 * - Streaming audio playback
 * - Markdown cleaning for natural speech
 * - Robust barge-in interruption
 */

'use client';

import { useState, useCallback, useRef } from 'react';

export interface UseElevenLabsSynthesisReturn {
  isSupported: boolean;
  isSpeaking: boolean;
  isGenerating: boolean; // New: indicates when audio is being generated
  selectedVoice: { id: string; name: string } | null;
  speak: (text: string) => Promise<void>;
  stop: () => void;
  error: string | null;
  enable?: () => void;
}

/**
 * Cleans text of markdown formatting for natural speech synthesis.
 */
function cleanTextForSpeech(text: string): string {
  let cleaned = text;

  // Remove bold/italic asterisks (**, *, ***)
  cleaned = cleaned.replace(/\*\*\*/g, '');
  cleaned = cleaned.replace(/\*\*/g, '');
  cleaned = cleaned.replace(/\*/g, '');

  // Remove underscores for italics (_, __)
  cleaned = cleaned.replace(/__/g, '');
  cleaned = cleaned.replace(/_/g, '');

  // Remove markdown headings (#, ##, ###, etc.)
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');

  // Remove list numbers at start of line (1., 2., etc.)
  cleaned = cleaned.replace(/^\d+\.\s+/gm, '');

  // Remove list bullets at start of line (-, *)
  cleaned = cleaned.replace(/^[-*]\s+/gm, '');

  // Replace multiple line breaks with natural pauses
  cleaned = cleaned.replace(/\n{2,}/g, '. ');
  cleaned = cleaned.replace(/\n/g, ', ');

  // Remove multiple spaces
  cleaned = cleaned.replace(/\s{2,}/g, ' ');

  // Trim
  cleaned = cleaned.trim();

  return cleaned;
}

/**
 * Custom hook for managing speech synthesis with ElevenLabs API.
 */
export function useElevenLabsSynthesis(): UseElevenLabsSynthesisReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Get configuration from environment variables
  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
  const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID;
  const modelId = process.env.NEXT_PUBLIC_ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';

  const isSupported = !!(apiKey && voiceId);

  const selectedVoice = isSupported
    ? { id: voiceId, name: 'ElevenLabs Voice' }
    : null;

  /**
   * Stops current speech immediately (barge-in).
   */
  const stop = useCallback(() => {
    // Abort any ongoing fetch request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Stop and reset audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = '';
      audioRef.current = null;
    }

    setIsSpeaking(false);
    console.log('⏹️ ElevenLabs speech stopped (barge-in)');
  }, []);

  /**
   * Speaks the given text using ElevenLabs API with optimized settings for faster response.
   */
  const speak = useCallback(
    async (text: string) => {
      if (!isSupported) {
        console.warn('⚠️ ElevenLabs not configured');
        setError('ElevenLabs no está configurado. Verifica las variables de entorno.');
        return;
      }

      if (!text || text.trim().length === 0) {
        console.warn('⚠️ Empty text, skipping speech');
        return;
      }

      // Stop any current speech
      stop();

      // Clean text of markdown
      const cleanedText = cleanTextForSpeech(text);

      console.log('🗣️ Starting ElevenLabs speech:', cleanedText.substring(0, 50) + '...');

      // Set generating state immediately for better UX
      setIsGenerating(true);
      setIsSpeaking(false);
      setError(null);

      try {
        // Create abort controller for this request
        abortControllerRef.current = new AbortController();

        // Call ElevenLabs text-to-speech API with optimized settings
        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
          {
            method: 'POST',
            headers: {
              'Accept': 'audio/mpeg',
              'Content-Type': 'application/json',
              'xi-api-key': apiKey!,
            },
            body: JSON.stringify({
              text: cleanedText,
              model_id: 'eleven_turbo_v2', // Use faster model for better latency
              voice_settings: {
                stability: 0.4, // Slightly lower for faster generation
                similarity_boost: 0.7, // Slightly lower for faster generation
                style: 0.0,
                use_speaker_boost: true,
              },
            }),
            signal: abortControllerRef.current.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`ElevenLabs API error: ${response.status}`);
        }

        // Convert response to blob
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        // Create and play audio element
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        // Preload the audio for faster playback
        audio.preload = 'auto';

        audio.oncanplaythrough = () => {
          console.log('🎙️ ElevenLabs audio ready to play');
        };

        audio.onplay = () => {
          console.log('🎙️ ElevenLabs audio playing');
        };

        audio.onended = () => {
          setIsSpeaking(false);
          setIsGenerating(false);
          URL.revokeObjectURL(audioUrl);
          audioRef.current = null;
          console.log('✅ ElevenLabs finished speaking');
        };

        audio.onerror = (e) => {
          setIsSpeaking(false);
          setIsGenerating(false);
          URL.revokeObjectURL(audioUrl);
          audioRef.current = null;
          console.error('❌ Audio playback error:', e);
          setError('Error al reproducir el audio');
        };

        // Start playing immediately when ready
        audio.addEventListener('canplaythrough', () => {
          setIsGenerating(false);
          setIsSpeaking(true);
          audio.play().catch((err) => {
            console.error('❌ Audio play error:', err);
            setIsSpeaking(false);
            setIsGenerating(false);
          });
        }, { once: true });

        // Fallback: try to play after a short delay
        setTimeout(() => {
          if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
            setIsGenerating(false);
            setIsSpeaking(true);
            audio.play().catch((err) => {
              console.error('❌ Audio play fallback error:', err);
              setIsSpeaking(false);
              setIsGenerating(false);
            });
          }
        }, 100);

      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log('🔄 ElevenLabs request aborted');
          return;
        }

        console.error('❌ ElevenLabs error:', err);
        setIsSpeaking(false);
        setIsGenerating(false);
        
        if (err.message?.includes('401') || err.message?.includes('403')) {
          setError('API key de ElevenLabs inválida');
        } else if (err.message?.includes('quota')) {
          setError('Límite de cuota de ElevenLabs alcanzado');
        } else {
          setError('Error al generar la voz con ElevenLabs');
        }
      }
    },
    [isSupported, apiKey, voiceId, stop]
  );

  /**
   * Enable function for compatibility with Web Speech API hook.
   */
  const enable = useCallback(() => {
    if (!isSupported) return;
    
    // Test with a short phrase
    speak('Voz de ElevenLabs activada').catch(() => {
      // Ignore errors on enable
    });
  }, [isSupported, speak]);

  return {
    isSupported,
    isSpeaking,
    isGenerating,
    selectedVoice,
    speak,
    stop,
    error,
    enable,
  };
}

