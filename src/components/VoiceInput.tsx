
import React, { useState } from 'react';
import { Mic, Send } from 'lucide-react';
import { toast } from 'sonner';
import { toggleVoiceRecording } from '../services/voiceService';

interface VoiceInputProps {
  onTranscript: (text: string, response?: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [textInput, setTextInput] = useState("");

  const handleVoiceInput = async () => {
    try {
      if (!isListening) {
        // Start recording
        setIsListening(true);
        
        // Send request to start recording
        const result = await toggleVoiceRecording(true);
        
        // Process the transcript and response (if any)
        if (result.user_prompt || result.response) {
          onTranscript(result.user_prompt || '', result.response);
        }
        
        // Reset the listening state
        setIsListening(false);
      }
    } catch (error) {
      console.error('Voice recording error:', error);
      toast.error('Error with voice recording. Please try again or use text input instead.');
      setIsListening(false);
    }
  };

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
          onClick={handleVoiceInput}
          disabled={isListening}
          className={`relative p-7 rounded-full transition-all duration-300 ease-in-out shadow-lg 
            ${isListening 
              ? 'bg-gradient-to-br from-metro-red to-metro-red/80 scale-105' 
              : 'bg-white hover:bg-gray-50 border border-gray-100'}`}
          aria-label={isListening ? "Recording in progress" : "Start voice recording"}
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
