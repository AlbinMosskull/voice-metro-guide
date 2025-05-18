
import { useState, useEffect, useCallback } from 'react';
import VoiceInput from '../components/VoiceInput';
import ResponseDisplay from '../components/ResponseDisplay';
import { toast } from 'sonner';
import { startVoiceRecording } from '../services/voiceService';
import { getPendingAction, Action } from '../services/actionService';

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentAction, setCurrentAction] = useState<Action | null>(null);

  // Function to poll for actions
  const pollForActions = useCallback(async () => {
    if (!isListening) return;

    try {
      const action = await getPendingAction();
      
      // If we got a meaningful action, stop listening and update the UI
      if (action && action.action !== 'none') {
        setCurrentAction(action);
        setIsListening(false);
      }
    } catch (error) {
      console.error('Error polling for actions:', error);
      toast.error('Failed to get action information. Please try again.');
      setIsListening(false);
    }
  }, [isListening]);

  // Setup polling at regular intervals
  useEffect(() => {
    let intervalId: number | undefined;
    
    if (isListening) {
      intervalId = window.setInterval(pollForActions, 1000); // Poll every second
    }
    
    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [isListening, pollForActions]);

  // Handle starting the voice recording
  const handleStartListening = async () => {
    setIsListening(true);
    setCurrentAction(null);
    
    try {
      await startVoiceRecording();
    } catch (error) {
      console.error('Error starting voice recording:', error);
      toast.error('Failed to start voice recording. Please try again.');
      setIsListening(false);
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
            Ask questions about the Stockholm metro system using your voice
          </p>
        </div>

        <VoiceInput onStartListening={handleStartListening} isListening={isListening} />
        
        <ResponseDisplay action={currentAction} />

        <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-r from-metro-red/5 to-metro-blue/5 blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default Index;
