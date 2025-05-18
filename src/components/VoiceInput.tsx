
import React, { useState } from 'react';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';

interface VoiceInputProps {
  onStartListening: () => void;
  isListening: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onStartListening, isListening }) => {
  const handleVoiceInput = async () => {
    if (!isListening) {
      try {
        onStartListening();
      } catch (error) {
        console.error('Voice recording error:', error);
        toast.error('Error with voice recording. Please try again.');
      }
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
    </div>
  );
};

export default VoiceInput;
