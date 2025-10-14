/**
 * useVoiceRecognition Hook
 *
 * Custom hook for managing Web Speech API voice recognition.
 * Handles microphone permissions, continuous listening, and transcription.
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

export function useVoiceRecognition(): UseVoiceRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<any>(null);

  // Check if Speech Recognition is supported
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();

        // Configuration
        recognition.lang = 'es-ES'; // Spanish language
        recognition.continuous = false; // Stop after one result
        recognition.interimResults = false; // Only final results
        recognition.maxAlternatives = 1; // One alternative

        // Event handlers
        recognition.onstart = () => {
          console.log('🎤 Voice recognition started');
          setIsListening(true);
          setError(null);
        };

        recognition.onresult = (event: any) => {
          const result = event.results[event.results.length - 1];
          const transcriptText = result[0].transcript;
          const confidence = result[0].confidence;

          console.log(
            `📝 Transcription: "${transcriptText}" (confidence: ${(confidence * 100).toFixed(1)}%)`
          );

          setTranscript(transcriptText);
        };

        recognition.onerror = (event: any) => {
          console.error('❌ Voice recognition error:', event.error);

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
    };
  }, []);

  /**
   * Starts voice recognition
   */
  const startListening = useCallback(() => {
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
      recognitionRef.current.start();
    } catch (err) {
      console.error('❌ Error starting recognition:', err);
      setError('Error al iniciar el reconocimiento de voz.');
    }
  }, [isListening]);

  /**
   * Stops voice recognition
   */
  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) {
      return;
    }

    try {
      recognitionRef.current.stop();
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
