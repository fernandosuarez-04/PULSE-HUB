/**
 * useVoiceSynthesis Hook
 *
 * Custom hook for speech synthesis in Spanish with Web Speech API.
 * Based on proven implementation from agente-ia-conversacional.
 *
 * Features:
 * - Explicit selection of natural Spanish voice (Google/Microsoft preferred)
 * - Warm and professional tone (rate: 0.9, pitch: 1.05)
 * - Markdown cleaning for natural speech
 * - Robust barge-in interruption
 * - Simple, direct implementation without complex initialization
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

export interface VoiceSynthesisConfig {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export interface UseVoiceSynthesisReturn {
  isSupported: boolean;
  isSpeaking: boolean;
  selectedVoice: SpeechSynthesisVoice | null;
  availableVoices: SpeechSynthesisVoice[];
  speak: (text: string) => void;
  stop: () => void;
  // Optional helper some older implementations referenced
  warmUp?: () => void;
  // Attempt to enable voice via a user gesture (speaks a short confirmation)
  enable?: () => void;
  error: string | null;
}

const DEFAULT_CONFIG: Required<VoiceSynthesisConfig> = {
  lang: 'es-ES',
  rate: 0.9, // Slightly slower for clarity and warmth
  pitch: 1.05, // Slightly higher for warm, professional tone
  volume: 1.0, // Full volume
};

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
 * Selects the best Spanish voice available.
 *
 * Priority:
 * 1. Google female Spanish voices
 * 2. Microsoft female Spanish voices (Helena, Laura)
 * 3. Any quality Spanish voice (non-male)
 * 4. Any Spanish voice
 * 5. Fallback to first available
 */
function selectBestSpanishVoice(
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;

  // Priority 1: Google female Spanish voices
  const googleVoices = voices.filter(
    (voice) =>
      voice.lang.startsWith('es') &&
      voice.name.toLowerCase().includes('google') &&
      (voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('mujer') ||
        !voice.name.toLowerCase().includes('male'))
  );

  // Priority 2: Microsoft female Spanish voices
  const microsoftVoices = voices.filter(
    (voice) =>
      voice.lang.startsWith('es') &&
      voice.name.toLowerCase().includes('microsoft') &&
      (voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('helena') ||
        voice.name.toLowerCase().includes('laura'))
  );

  // Priority 3: Any quality Spanish voice (non-male)
  const qualityVoices = voices.filter(
    (voice) =>
      voice.lang.startsWith('es') && !voice.name.toLowerCase().includes('male')
  );

  // Priority 4: Any Spanish voice
  const spanishVoices = voices.filter((voice) => voice.lang.startsWith('es'));

  // Select the best available
  if (googleVoices.length > 0) {
    console.log('✅ Google voice selected:', googleVoices[0].name);
    return googleVoices[0];
  } else if (microsoftVoices.length > 0) {
    console.log('✅ Microsoft voice selected:', microsoftVoices[0].name);
    return microsoftVoices[0];
  } else if (qualityVoices.length > 0) {
    console.log('✅ Quality voice selected:', qualityVoices[0].name);
    return qualityVoices[0];
  } else if (spanishVoices.length > 0) {
    console.log('⚠️ Basic Spanish voice selected:', spanishVoices[0].name);
    return spanishVoices[0];
  } else {
    console.warn('⚠️ No Spanish voice found, using default');
    return voices[0];
  }
}

/**
 * Custom hook for managing speech synthesis with high-quality Spanish voices.
 * Simple, direct implementation without complex warm-up logic.
 */
export function useVoiceSynthesis(
  config: VoiceSynthesisConfig = {}
): UseVoiceSynthesisReturn {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  /**
   * Loads and selects the best Spanish voice.
   */
  const loadVoices = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      setError('Tu navegador no soporta síntesis de voz. Usa Chrome o Edge.');
      return;
    }

    setIsSupported(true);

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      setAvailableVoices(voices);
      const bestVoice = selectBestSpanishVoice(voices);
      setSelectedVoice(bestVoice);

      console.log(
        '🎤 Available voices:',
        voices.map((v) => `${v.name} (${v.lang})`)
      );
    }
  }, []);

  /**
   * Initialize voices on mount and when they change.
   */
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      setError('Tu navegador no soporta síntesis de voz. Usa Chrome o Edge.');
      return;
    }

    setIsSupported(true);

    // Load voices immediately (works in Firefox)
    loadVoices();

    // Listen for voice changes (required for Chrome)
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      // Cleanup
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [loadVoices]);

  /**
   * Speaks the given text with high-quality Spanish voice.
   * DIRECT IMPLEMENTATION - No warm-up, no complex logic.
   */
  const speak = useCallback(
    (text: string) => {
      if (!isSupported) {
        console.warn('⚠️ Speech synthesis not supported');
        return;
      }

      if (!text || text.trim().length === 0) {
        console.warn('⚠️ Empty text, skipping speech');
        return;
      }

      // Stop any current speech
      window.speechSynthesis.cancel();

      // Clean text of markdown
      const cleanedText = cleanTextForSpeech(text);

      console.log('🗣️ Starting speech:', cleanedText.substring(0, 50) + '...');

      // Create utterance
      const utterance = new SpeechSynthesisUtterance(cleanedText);

      // Apply configuration
      utterance.lang = finalConfig.lang;
      utterance.rate = finalConfig.rate;
      utterance.pitch = finalConfig.pitch;
      utterance.volume = finalConfig.volume;

      // Set selected voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log('✅ Using voice:', selectedVoice.name);
      }

      // Event handlers
      utterance.onstart = () => {
        setIsSpeaking(true);
        setError(null);
        console.log('🎙️ Agent speaking');
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        console.log('✅ Agent finished speaking');
      };

      utterance.onerror = (event) => {
        setIsSpeaking(false);
        const errorType = event.error || 'unknown';

        // Common Chrome/Browser restriction: not-allowed happens when
        // autoplay of audio is blocked until user interacts. Treat this
        // as informational and suggest the user interact (click) to
        // enable audio. Only show real errors to the user.
        if (errorType === 'not-allowed') {
          console.warn('⚠️ Speech permission blocked until user interacts');
          setError('Reproducción de audio bloqueada por el navegador. Haz clic en la página para habilitar voz.');
          return;
        }

        console.error('❌ Speech error:', errorType);

        if (errorType !== 'canceled' && errorType !== 'interrupted') {
          setError(`Error de síntesis de voz: ${errorType}`);
        }
      };

      // Start speaking
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, selectedVoice, finalConfig]
  );

    /**
     * Optional warmUp helper: attempts to speak a short silent utterance
     * to prompt the browser audio permission flow without interrupting the UX.
     * This is safe to call; if not supported, it's a no-op.
     */
    const warmUp = useCallback(() => {
      if (!isSupported) return;

      try {
        // Small invisible utterance; if browser blocks it, we handle error silently
        const u = new SpeechSynthesisUtterance('');
        u.volume = 0; // try to keep it silent
        u.onstart = () => {
          // Immediately cancel so user won't hear anything
          window.speechSynthesis.cancel();
        };
        u.onerror = () => {
          // Ignore warm-up errors
        };
        window.speechSynthesis.speak(u);
      } catch (e) {
        // Some engines may throw; ignore to keep warmUp non-failing
        // console.debug('warmUp error', e);
      }
    }, [isSupported]);

  /**
   * Stops current speech immediately (barge-in).
   */
  const stop = useCallback(() => {
    if (!isSupported) return;

    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    console.log('⏹️ Speech stopped (barge-in)');
  }, [isSupported]);

  const enable = useCallback(() => {
    if (!isSupported) return;

    try {
      const testText = 'Voz activada';
      const u = new SpeechSynthesisUtterance(testText);
      u.lang = finalConfig.lang;
      u.rate = finalConfig.rate;
      u.pitch = finalConfig.pitch;
      u.volume = Math.max(0.2, finalConfig.volume);
      if (selectedVoice) u.voice = selectedVoice;

      u.onstart = () => {
        setError(null);
        setIsSpeaking(true);
      };

      u.onend = () => {
        setIsSpeaking(false);
        // clear any lingering not-allowed message after a successful user gesture
        setError(null);
      };

      u.onerror = (ev) => {
        setIsSpeaking(false);
        const err = (ev && (ev as any).error) || 'unknown';
        // If still not allowed, keep the informative message
        if (err === 'not-allowed') {
          setError('Reproducción de audio bloqueada por el navegador. Haz clic en la página para habilitar voz.');
        } else {
          setError(`Error de síntesis de voz: ${err}`);
        }
      };

      window.speechSynthesis.speak(u);
    } catch (e) {
      // ignore
    }
  }, [isSupported, selectedVoice, finalConfig]);

  return {
    isSupported,
    isSpeaking,
    selectedVoice,
    availableVoices,
    speak,
    stop,
    error,
  };
}
