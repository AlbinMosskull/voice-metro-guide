
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
    <div className="flex flex-col items-center space-y-8 w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-metro-blue/20 to-metro-red/20 rounded-full blur-xl transform scale-105 -z-10"></div>
        <button
          onClick={startListening}
          className={`relative p-7 rounded-full transition-all duration-300 ease-in-out shadow-lg 
            ${isListening 
              ? 'bg-gradient-to-br from-metro-red to-metro-red/80 scale-105' 
              : 'bg-white hover:bg-gray-50 border border-gray-100'}`}
          aria-label="Start voice input"
        >
          <Mic 
            className={`w-8 h-8 transition-colors duration-300
              ${isListening ? 'text-white' : 'text-metro-blue'}`}
          />
          {isListening && (
            <span className="absolute inset-0 rounded-full animate-pulse-ring bg-metro-red/30" />
          )}
        </button>
      </div>

      <div className="w-full">
        <p className="text-center text-sm font-medium text-gray-500 mb-3">or type your question</p>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-metro-blue/10 to-metro-red/10 rounded-lg blur-md transform scale-105 -z-10"></div>
          <form onSubmit={handleTextSubmit} className="flex gap-2 relative">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 px-5 py-3 rounded-lg bg-white border border-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-metro-red/30 transition-all"
            />
            <button
              type="submit"
              className="p-3 rounded-lg bg-gradient-to-r from-metro-blue to-metro-red text-white hover:opacity-90 transition-all shadow-sm disabled:opacity-50 disabled:hover:opacity-50"
              disabled={!textInput.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;
