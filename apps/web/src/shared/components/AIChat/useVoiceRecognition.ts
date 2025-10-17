/**
 * useVoiceRecognition Hook
 *
 * Custom hook for managing Web Speech API voice recognition with audio quality optimization.
 * Based on proven implementation from agente-ia-conversacional.
 *
 * Features:
 * - Spanish language recognition (es-ES)
 * - Audio quality filters (echoCancellation, noiseSuppression, autoGainControl)
 * - Optimized VAD (Voice Activity Detection) for fluid conversation
 * - Comprehensive error handling with user-friendly messages
 * - Single-shot recognition (stops after one result for natural conversation flow)
 *
 * Note: Web Speech API doesn't directly accept MediaStream input, but we request
 * microphone permissions with quality constraints to influence the browser's audio pipeline.
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Extend Window interface for browser compatibility
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface UseVoiceRecognitionReturn {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  clearTranscript: () => void;
}

/**
 * Detect if running on mobile device
 */
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Audio constraints for high-quality voice recognition.
 * These settings help reduce echo, background noise, and normalize volume levels.
 *
 * IMPORTANT NOTE (Mobile):
 * - On desktop: We request getUserMedia with quality filters for diagnostics
 * - On mobile: We skip getUserMedia to avoid conflicts with SpeechRecognition
 * - SpeechRecognition manages microphone access natively on mobile devices
 */
const getAudioConstraints = (): MediaStreamConstraints => {
  return {
    audio: {
      echoCancellation: true, // Reduces echo from speakers
      noiseSuppression: true, // Filters background noise
      autoGainControl: true, // Normalizes microphone volume
    },
  };
};

export function useVoiceRecognition(): UseVoiceRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<any>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check if Speech Recognition is supported
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        const isMobile = isMobileDevice();

        // Platform-specific configuration
        recognition.lang = 'es-ES'; // Spanish language
        recognition.continuous = !isMobile; // Desktop: continuous, Mobile: single-shot for stability
        recognition.interimResults = true; // Show interim results for immediate feedback
        recognition.maxAlternatives = 1; // One alternative to reduce processing

        console.log(
          `🔧 Speech Recognition configured for ${isMobile ? 'MOBILE' : 'DESKTOP'}:`,
          {
            continuous: recognition.continuous,
            interimResults: recognition.interimResults,
            lang: recognition.lang,
            device: isMobile ? 'Mobile' : 'Desktop',
            note: isMobile ? 'Single-shot mode for better stability' : 'Continuous mode enabled'
          }
        );

        // Event handlers
        recognition.onstart = () => {
          console.log('🎤 Voice recognition started - Microphone is active');
          setIsListening(true);
          setError(null);
        };

        // Optional diagnostic events (not reliable on mobile browsers)
        recognition.onaudiostart = () => {
          console.log('🔊 Audio capture started - System is receiving audio');
        };

        recognition.onsoundstart = () => {
          console.log('🎵 Sound detected - Microphone is picking up sound');
        };

        recognition.onspeechstart = () => {
          console.log('🗣️ Speech detected - Voice recognition active');
        };

        recognition.onspeechend = () => {
          console.log('🔇 Speech ended - No more speech detected');
        };

        recognition.onsoundend = () => {
          console.log('🔕 Sound ended - No more sound detected');
        };

        recognition.onaudioend = () => {
          console.log('🔇 Audio capture ended');
        };

        recognition.onresult = (event: any) => {
          const isMobile = isMobileDevice();

          // Clear any existing silence timer
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }

          // Get the last result (most recent)
          const result = event.results[event.results.length - 1];
          const transcriptText = result[0].transcript;
          const confidence = result[0].confidence;
          const isFinal = result.isFinal;

          console.log(
            `📝 ${isFinal ? 'Final' : 'Interim'} transcription: "${transcriptText}" (confidence: ${(confidence * 100).toFixed(1)}%)`
          );

          // Update transcript (both interim and final)
          setTranscript(transcriptText);

          // Platform-specific behavior for final results
          if (isFinal && transcriptText.trim()) {
            if (isMobile) {
              // Mobile: Single-shot mode, stops automatically after final result
              console.log('📱 Mobile: Final result received, recognition will stop automatically');
            } else {
              // Desktop: Continuous mode, set silence timer to auto-stop
              silenceTimerRef.current = setTimeout(() => {
                console.log('🔇 Silence detected, stopping recognition');
                if (recognitionRef.current) {
                  try {
                    recognitionRef.current.stop();
                  } catch (e) {
                    console.error('Error stopping recognition:', e);
                  }
                }
              }, 1500); // Stop after 1.5s of silence
            }
          }
        };

        recognition.onerror = (event: any) => {
          // console.error('❌ Voice recognition error:', event.error);

          switch (event.error) {
            case 'not-allowed':
            case 'service-not-allowed':
              setError(
                'Permisos de micrófono denegados. Por favor, permite el acceso al micrófono.'
              );
              break;
            case 'no-speech':
              setError('No se detectó voz. Intenta de nuevo.');
              break;
            case 'audio-capture':
              setError(
                'No se pudo capturar audio. Verifica tu micrófono.'
              );
              break;
            case 'network':
              setError('Error de red. Verifica tu conexión a internet.');
              break;
            case 'aborted':
              // User stopped, not an error
              setError(null);
              break;
            default:
              setError(`Error de reconocimiento: ${event.error}`);
          }

          setIsListening(false);
        };

        recognition.onend = () => {
          const isMobile = isMobileDevice();
          console.log(`🔄 Voice recognition ended (${isMobile ? 'MOBILE' : 'DESKTOP'})`);

          // Always set listening to false when recognition ends
          setIsListening(false);

          // Log device-specific info for debugging
          if (isMobile) {
            console.log('📱 Mobile device - recognition stopped naturally');
            console.log('💡 TIP: On mobile, speak clearly and ensure microphone permissions are granted');
          }
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      // Cleanup on unmount
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }

      // Clear silence timer
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }

      // Stop audio stream if active
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
        audioStreamRef.current = null;
        console.log('🔇 Audio stream cleaned up');
      }
    };
  }, []);

  /**
   * Checks microphone permissions before starting recognition.
   *
   * Platform-specific behavior:
   * - Desktop: Requests getUserMedia with quality filters for diagnostics
   * - Mobile: Skips getUserMedia to avoid conflicts, lets SpeechRecognition handle permissions
   *
   * IMPORTANT: SpeechRecognition doesn't use MediaStream directly.
   * On mobile, requesting getUserMedia can cause conflicts and permission issues.
   */
  const requestMicrophonePermissions = useCallback(async () => {
    const isMobile = isMobileDevice();

    try {
      if (isMobile) {
        // Mobile: Skip getUserMedia, let SpeechRecognition handle permissions natively
        console.log('📱 Mobile mode: Skipping getUserMedia, SpeechRecognition will handle permissions');
        console.log('💡 TIP: Accept microphone permission when prompted by the browser');
        return true;
      }

      // Desktop: Request getUserMedia for diagnostics
      const constraints = getAudioConstraints();
      console.log('🎤 Requesting microphone (DESKTOP mode)...', constraints.audio);

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Store stream for potential cleanup
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      audioStreamRef.current = stream;

      // Log diagnostic info
      console.log('✅ Microphone permissions granted');
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        const settings = audioTrack.getSettings();
        console.log('🔊 Audio track settings:', settings);
      }

      return true;
    } catch (err) {
      console.error('❌ Error requesting microphone permissions:', err);

      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          const mobileHint = isMobile
            ? ' En móvil, revisa la configuración del navegador y permisos del sistema.'
            : '';
          setError(
            `Permisos de micrófono denegados. Por favor, permite el acceso al micrófono.${mobileHint}`
          );
        } else if (err.name === 'NotFoundError') {
          setError('No se encontró ningún micrófono. Verifica tu dispositivo.');
        } else if (err.name === 'NotReadableError') {
          setError(
            isMobile
              ? 'El micrófono está en uso por otra app. Cierra otras apps y vuelve a intentar.'
              : 'El micrófono está siendo usado por otra aplicación.'
          );
        } else {
          setError(`Error al acceder al micrófono: ${err.message}`);
        }

        // Additional mobile troubleshooting tips
        if (isMobile) {
          console.log('🔧 Troubleshooting móvil:');
          console.log('  1. Verifica permisos del navegador en configuración del sistema');
          console.log('  2. Asegúrate de usar HTTPS (requerido en móviles)');
          console.log('  3. Cierra otras apps que puedan estar usando el micrófono');
          console.log('  4. Intenta recargar la página');
        }
      }

      return false;
    }
  }, []);

  /**
   * Starts voice recognition with platform-specific optimization.
   *
   * Desktop: Requests getUserMedia first (for diagnostics), then starts recognition
   * Mobile: Directly starts recognition (avoids permission conflicts)
   */
  const startListening = useCallback(async () => {
    if (!recognitionRef.current) {
      setError('Reconocimiento de voz no disponible en este navegador.');
      return;
    }

    if (isListening) {
      return; // Already listening
    }

    const isMobile = isMobileDevice();

    try {
      setTranscript(''); // Clear previous transcript
      setError(null);

      // Check/request permissions (platform-specific)
      const hasPermissions = await requestMicrophonePermissions();

      if (!hasPermissions) {
        return; // Error already set by requestMicrophonePermissions
      }

      // Start speech recognition
      recognitionRef.current.start();
      console.log(
        `🎙️ Voice recognition started (${isMobile ? 'MOBILE - single-shot' : 'DESKTOP - continuous'} mode)`
      );
    } catch (err) {
      console.error('❌ Error starting recognition:', err);

      if (err instanceof Error && err.name === 'NotAllowedError') {
        setError(
          isMobile
            ? 'Permisos de micrófono denegados. Revisa configuración del navegador.'
            : 'Permisos de micrófono denegados. Por favor, permite el acceso.'
        );
      } else {
        setError('Error al iniciar el reconocimiento de voz.');
      }
    }
  }, [isListening, requestMicrophonePermissions]);

  /**
   * Stops voice recognition and cleans up audio stream.
   */
  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) {
      return;
    }

    try {
      // Clear silence timer
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }

      recognitionRef.current.stop();

      // Clean up audio stream
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
        audioStreamRef.current = null;
        console.log('🔇 Audio stream stopped');
      }
    } catch (err) {
      console.error('❌ Error stopping recognition:', err);
    }
  }, [isListening]);

  /**
   * Clears the current transcript
   */
  const clearTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening,
    clearTranscript,
  };
}
