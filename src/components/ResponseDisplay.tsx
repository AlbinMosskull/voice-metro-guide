
import React from 'react';

interface ResponseDisplayProps {
  transcript: string;
  response: string | null;
  isLoading: boolean;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ transcript, response, isLoading }) => {
  if (!transcript && !response) return null;

  return (
    <div className="w-full max-w-2xl space-y-6 animate-in fade-in duration-500">
      {transcript && (
        <div className="relative">
          <div className="absolute inset-0 bg-metro-blue/5 rounded-xl blur-md transform scale-105 -z-10"></div>
          <div className="bg-white/90 p-6 rounded-xl backdrop-blur-sm shadow-sm border border-metro-blue/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-metro-blue"></div>
              <p className="text-sm font-medium text-metro-blue">You said:</p>
            </div>
            <p className="text-lg text-gray-800 leading-relaxed">{transcript}</p>
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-metro-red/10 border-t-metro-red animate-spin"></div>
            <div className="absolute inset-0 bg-metro-red/5 rounded-full blur-lg"></div>
          </div>
        </div>
      )}
      
      {response && (
        <div className="relative">
          <div className="absolute inset-0 bg-metro-red/5 rounded-xl blur-md transform scale-105 -z-10"></div>
          <div className="bg-white/90 p-6 rounded-xl backdrop-blur-sm shadow-sm border border-metro-red/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-metro-red"></div>
              <p className="text-sm font-medium text-metro-red">Response:</p>
            </div>
            <p className="text-lg text-gray-800 leading-relaxed">{response}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponseDisplay;
