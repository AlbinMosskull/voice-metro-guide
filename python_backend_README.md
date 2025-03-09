
# Stockholm Metro Assistant - Python Backend

This is an example Python backend for the Stockholm Metro Voice Assistant. It demonstrates how to set up a simple Flask server that can receive requests from the frontend and send back responses.

## Setup Instructions

1. Install the required Python packages:

```bash
pip install flask flask-cors speech_recognition pyaudio
```

2. Start one of the Python backend servers:

```bash
# For basic text processing only:
python python_backend_example.py

# For text processing + voice recording:
python python_voice_recording_example.py
```

3. The server will start on port 5000 and will be accessible at:
   - http://localhost:5000/api/message (text processing endpoint)
   - http://localhost:5000/api/record (voice recording endpoint - only in voice_recording_example.py)

## Testing with the Frontend

Once the Python backend is running, the React frontend should be able to communicate with it. You can test this by:

1. Clicking the microphone button to toggle recording via the Python backend
2. Speaking into the microphone (handled by Python)
3. Or typing in the text input
4. The frontend will send the request to this Python backend
5. The backend will process the request and return a response
6. The response will be displayed in the frontend UI

## Voice Recording Backend

The `python_voice_recording_example.py` file demonstrates:
- How to handle a simple boolean toggle for recording
- Using SpeechRecognition library to record and transcribe audio
- Managing recording state in a background thread
- Returning the transcription to the frontend when recording stops

## Text Processing Backend 

The `python_backend_example.py` file demonstrates:
- How to receive and process text queries
- A simple pattern-matching system for Stockholm metro queries
- How to return formatted responses to the frontend

## Customizing the Backend

You can customize the `manage_incoming_message` function to:
- Connect to the SL API for real-time data
- Use OpenAI or other AI models for processing queries
- Implement database connections for storing user queries or cached data
- Add authentication and authorization as needed

## API Endpoint Details

### POST /api/message

**Request Body:**
```json
{
  "user_input": "When is the next train to T-Centralen?"
}
```

**Response:**
```json
{
  "response": "The next train to T-Centralen will arrive in 5 minutes."
}
```

### POST /api/record

**Request Body:**
```json
{
  "is_recording": true
}
```

**Response when starting recording:**
```json
{
  "status": "recording_started"
}
```

**Response when stopping recording:**
```json
{
  "transcript": "När går nästa tåg till T-Centralen?"
}
```
