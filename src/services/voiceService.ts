
/**
 * Service to handle communication with the Python backend for voice recording
 */

/**
 * Sends a signal to the Python backend to start voice recording
 * @returns A promise that resolves with the transcription result
 */
export const startVoiceRecording = async (): Promise<string> => {
  try {
    // Send a request to the Python backend to start recording
    const response = await fetch('http://localhost:5000/api/record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'start_recording' }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.transcript;
  } catch (error) {
    console.error('Error communicating with voice recording service:', error);
    throw error;
  }
};

/**
 * Sends a signal to the Python backend to stop voice recording
 * @returns A promise that resolves with the transcription result
 */
export const stopVoiceRecording = async (): Promise<string> => {
  try {
    // Send a request to the Python backend to stop recording and get the transcript
    const response = await fetch('http://localhost:5000/api/record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'stop_recording' }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.transcript;
  } catch (error) {
    console.error('Error communicating with voice recording service:', error);
    throw error;
  }
};
