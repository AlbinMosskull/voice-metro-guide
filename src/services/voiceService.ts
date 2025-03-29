
/**
 * Service to handle communication with the Python backend for voice recording
 */

/**
 * Sends a signal to the Python backend to toggle voice recording
 * @param isRecording Boolean indicating whether to start or stop recording
 * @returns A promise that resolves with the transcription result
 */
export const toggleVoiceRecording = async (isRecording: boolean): Promise<string> => {
  try {
    // Send a request to the Python backend with the recording state
    const response = await fetch('http://localhost:5000/api/record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_recording: isRecording }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the transcript or an empty string
    return data.response || '';
  } catch (error) {
    console.error('Error communicating with voice recording service:', error);
    throw error;
  }
};
