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
 * For mobile, we use more aggressive settings to improve detection.
 */
const getAudioConstraints = (): MediaStreamConstraints => {
  const isMobile = isMobileDevice();

  return {
    audio: {
      echoCancellation: true, // Reduces echo from speakers
      noiseSuppression: !isMobile, // Disable on mobile for better voice detection
      autoGainControl: true, // Normalizes microphone volume
      // Mobile-specific: Request high sample rate
      ...(isMobile && {
        sampleRate: 48000,
        channelCount: 1,
      }),
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

        // Configuration optimized for mobile devices
        recognition.lang = 'es-ES'; // Spanish language
        recognition.continuous = isMobile ? false : true; // Mobile: single-shot, Desktop: continuous
        recognition.interimResults = true; // Show interim results
        recognition.maxAlternatives = 1; // One alternative

        console.log(
          `🔧 Speech Recognition configured for ${isMobile ? 'MOBILE' : 'DESKTOP'}:`,
          {
            continuous: recognition.continuous,
            interimResults: recognition.interimResults,
            lang: recognition.lang,
          }
        );

        // Event handlers
        recognition.onstart = () => {
          console.log('🎤 Voice recognition started - Microphone is active');
          setIsListening(true);
          setError(null);
        };

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

          // If final result, set a silence timer to auto-stop after 1.5 seconds
          if (isFinal && transcriptText.trim()) {
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
          console.log('🔄 Voice recognition ended');

          // On mobile, if we have no transcript yet and the user is still trying,
          // automatically restart (up to 3 times)
          const isMobile = isMobileDevice();
          if (isMobile && isListening) {
            // Let the stopListening function handle the actual stop
            console.log('📱 Mobile: Recognition ended, waiting for user action...');
          }

          setIsListening(false);
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
   * Requests microphone permissions with audio quality filters.
   * This helps improve audio quality for voice recognition by setting
   * echo cancellation, noise suppression, and auto gain control.
   *
   * Note: While Web Speech API doesn't directly use this MediaStream,
   * requesting permissions with quality constraints influences the browser's
   * audio pipeline and may improve recognition accuracy.
   */
  const requestMicrophonePermissions = useCallback(async () => {
    try {
      const constraints = getAudioConstraints();
      const isMobile = isMobileDevice();

      console.log(
        `🎤 Requesting microphone (${isMobile ? 'MOBILE' : 'DESKTOP'} mode)...`,
        constraints.audio
      );

      // Request microphone with quality filters
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Store stream for potential cleanup
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      audioStreamRef.current = stream;

      // Test audio levels
      console.log('✅ Microphone permissions granted');
      console.log('🎙️ Audio tracks:', stream.getAudioTracks().length);

      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        console.log('🔊 Audio track settings:', audioTrack.getSettings());
        console.log('📊 Audio track capabilities:', audioTrack.getCapabilities());
      }

      return true;
    } catch (err) {
      console.error('❌ Error requesting microphone permissions:', err);

      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setError(
            'Permisos de micrófono denegados. Por favor, permite el acceso al micrófono.'
          );
        } else if (err.name === 'NotFoundError') {
          setError('No se encontró ningún micrófono. Verifica tu dispositivo.');
        } else {
          setError('Error al acceder al micrófono.');
        }
      }

      return false;
    }
  }, []);

  /**
   * Starts voice recognition with audio quality optimization.
   * First requests microphone permissions with quality filters,
   * then starts the Web Speech API recognition.
   */
  const startListening = useCallback(async () => {
    if (!recognitionRef.current) {
      setError('Reconocimiento de voz no disponible en este navegador.');
      return;
    }

    if (isListening) {
      return; // Already listening
    }

    try {
      setTranscript(''); // Clear previous transcript
      setError(null);

      // Request microphone permissions with quality filters first
      const hasPermissions = await requestMicrophonePermissions();

      if (!hasPermissions) {
        return; // Error already set by requestMicrophonePermissions
      }

      // Start speech recognition
      recognitionRef.current.start();
      console.log('🎙️ Voice recognition started with optimized audio settings');
    } catch (err) {
      console.error('❌ Error starting recognition:', err);
      setError('Error al iniciar el reconocimiento de voz.');
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
