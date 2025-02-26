
import React, { useState, useCallback } from 'react';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = useCallback(async () => {
    try {
      const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
      recognition.lang = 'sv-SE';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast.error('Could not understand speech. Please try again.');
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      toast.error('Speech recognition is not supported in this browser.');
    }
  }, [onTranscript]);

  return (
    <button
      onClick={startListening}
      className={`relative p-6 rounded-full transition-all duration-300 ease-in-out
        ${isListening ? 'bg-metro-red' : 'bg-metro-gray hover:bg-gray-200'}`}
      aria-label="Start voice input"
    >
      <Mic 
        className={`w-8 h-8 transition-colors duration-300
          ${isListening ? 'text-white' : 'text-gray-700'}`}
      />
      {isListening && (
        <span className="absolute inset-0 rounded-full animate-pulse-ring bg-metro-red/50" />
      )}
    </button>
  );
};

export default VoiceInput;
