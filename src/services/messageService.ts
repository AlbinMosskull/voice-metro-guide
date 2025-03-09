
/**
 * Service to handle communication with the external Python backend
 */

/**
 * Sends the user input to the external Python API endpoint
 * @param userInput The user's query (text or voice transcript)
 * @returns The response from the Python backend
 */
export const sendMessageToPythonBackend = async (userInput: string): Promise<string> => {
  try {
    // Replace this URL with your actual Python API endpoint
    const response = await fetch('http://localhost:5000/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_input: userInput }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending message to Python backend:', error);
    throw error;
  }
};
