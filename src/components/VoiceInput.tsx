
import React, { useState, useCallback } from 'react';
import { Mic, Send } from 'lucide-react';
import { toast } from 'sonner';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [textInput, setTextInput] = useState("");

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

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      onTranscript(textInput);
      setTextInput("");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md">
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

      <div className="w-full">
        <p className="text-center text-sm text-gray-500 mb-2">or type your question</p>
        <form onSubmit={handleTextSubmit} className="flex gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-metro-red/50"
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-metro-red text-white hover:bg-metro-red/90 transition-colors disabled:opacity-50"
            disabled={!textInput.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoiceInput;
