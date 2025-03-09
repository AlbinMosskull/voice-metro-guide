
# Stockholm Metro Assistant - Python Backend

This is an example Python backend for the Stockholm Metro Voice Assistant. It demonstrates how to set up a simple Flask server that can receive requests from the frontend and send back responses.

## Setup Instructions

1. Install the required Python packages:

```bash
pip install flask flask-cors
```

2. Start the Python backend server:

```bash
python python_backend_example.py
```

3. The server will start on port 5000 and will be accessible at:
   - http://localhost:5000/api/message

## Testing with the Frontend

Once the Python backend is running, the React frontend should be able to communicate with it. You can test this by:

1. Speaking into the microphone or typing in the text input
2. The frontend will send the request to this Python backend
3. The backend will process the request and return a response
4. The response will be displayed in the frontend UI

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
