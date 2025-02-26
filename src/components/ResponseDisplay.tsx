
import React from 'react';

interface ResponseDisplayProps {
  transcript: string;
  response: string | null;
  isLoading: boolean;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ transcript, response, isLoading }) => {
  if (!transcript && !response) return null;

  return (
    <div className="w-full max-w-2xl space-y-4 animate-in fade-in duration-500">
      {transcript && (
        <div className="bg-metro-gray/50 p-6 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-gray-500 mb-2">You said:</p>
          <p className="text-lg text-gray-900">{transcript}</p>
        </div>
      )}
      
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-metro-red/20 border-t-metro-red rounded-full animate-spin" />
        </div>
      )}
      
      {response && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-2">Response:</p>
          <p className="text-lg text-gray-900">{response}</p>
        </div>
      )}
    </div>
  );
};

export default ResponseDisplay;
