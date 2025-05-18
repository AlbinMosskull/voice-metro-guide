
/**
 * Service to handle communication with the Python backend for voice recording
 */

/**
 * Sends a signal to the Python backend to start voice recording
 * @returns A promise that resolves when the start command is sent
 */
export const startVoiceRecording = async (): Promise<void> => {
  try {
    // Send a request to the Python backend to start the program
    const response = await fetch('http://localhost:5000/api/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // The backend will handle the recording
    console.log('Backend program started');
  } catch (error) {
    console.error('Error communicating with voice recording service:', error);
    throw error;
  }
};
