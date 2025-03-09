
import { useState } from 'react';
import VoiceInput from '../components/VoiceInput';
import ResponseDisplay from '../components/ResponseDisplay';
import { toast } from 'sonner';
import { sendMessageToPythonBackend } from '../services/messageService';

const Index = () => {
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTranscript = async (text: string) => {
    setTranscript(text);
    setIsLoading(true);
    
    try {
      // Call the Python backend with the user input
      const pythonResponse = await sendMessageToPythonBackend(text);
      setResponse(pythonResponse);
    } catch (error) {
      console.error('Error fetching response:', error);
      toast.error('Failed to get metro information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-metro-gray/10">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-metro-blue/5 to-metro-red/5 blur-3xl -z-10"></div>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center space-y-16">
        <div className="text-center space-y-4 max-w-xl">
          <div className="flex items-center justify-center mb-4">
            <div className="h-1.5 w-16 bg-gradient-to-r from-metro-blue to-metro-red rounded-full"></div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
            Stockholm Metro Voice Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
            Ask questions about the Stockholm metro system using your voice or text
          </p>
        </div>

        <VoiceInput onTranscript={handleTranscript} />
        
        <ResponseDisplay 
          transcript={transcript}
          response={response}
          isLoading={isLoading}
        />

        <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-r from-metro-red/5 to-metro-blue/5 blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default Index;
