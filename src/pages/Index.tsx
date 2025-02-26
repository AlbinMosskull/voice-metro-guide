
import { useState } from 'react';
import VoiceInput from '../components/VoiceInput';
import ResponseDisplay from '../components/ResponseDisplay';
import { toast } from 'sonner';

const Index = () => {
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTranscript = async (text: string) => {
    setTranscript(text);
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual SL API integration
      // This is a mock response for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResponse("This is a mock response. The SL API integration will be implemented once you provide the API key.");
    } catch (error) {
      console.error('Error fetching response:', error);
      toast.error('Failed to get metro information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-metro-gray/20">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Stockholm Metro Voice Assistant</h1>
          <p className="text-lg text-gray-600 max-w-xl">
            Ask questions about the Stockholm metro system using your voice
          </p>
        </div>

        <VoiceInput onTranscript={handleTranscript} />
        
        <ResponseDisplay 
          transcript={transcript}
          response={response}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
