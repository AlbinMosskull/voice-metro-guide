
from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
import threading
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global variable to track recording state
is_recording = False
recognizer = sr.Recognizer()
recording_thread = None
transcript = ""

def record_audio():
    """Function to record audio in the background"""
    global is_recording, transcript
    
    try:
        with sr.Microphone() as source:
            print("Adjusting for ambient noise...")
            recognizer.adjust_for_ambient_noise(source, duration=0.5)
            print("Recording started...")
            
            # Record audio
            audio_data = recognizer.listen(source, timeout=10, phrase_time_limit=None)
            
            # Only process if we're still supposed to be recording
            if is_recording:
                try:
                    # For Swedish language, use 'sv-SE'
                    transcript = recognizer.recognize_google(audio_data, language='sv-SE')
                    print(f"Transcription: {transcript}")
                except sr.UnknownValueError:
                    print("Google Speech Recognition could not understand audio")
                    transcript = ""
                except sr.RequestError as e:
                    print(f"Could not request results from Google Speech Recognition service; {e}")
                    transcript = ""
    except Exception as e:
        print(f"Error recording audio: {e}")
    finally:
        is_recording = False
        print("Recording stopped")

@app.route('/api/record', methods=['POST'])
def toggle_recording():
    """Endpoint that handles the toggle recording request"""
    global is_recording, recording_thread, transcript
    
    data = request.json
    is_recording_new_state = data.get('is_recording', False)
    
    # Start recording
    if is_recording_new_state and not is_recording:
        is_recording = True
        transcript = ""  # Reset transcript
        
        # Start recording in a background thread
        recording_thread = threading.Thread(target=record_audio)
        recording_thread.daemon = True
        recording_thread.start()
        
        return jsonify({"status": "recording_started"})
    
    # Stop recording
    elif not is_recording_new_state and is_recording:
        is_recording = False
        
        # Wait for the recording thread to finish
        if recording_thread and recording_thread.is_alive():
            time.sleep(1)  # Give a moment for the recording to finish
        
        return jsonify({"transcript": transcript})
    
    # No change needed
    return jsonify({"status": "no_change"})

@app.route('/api/message', methods=['POST'])
def process_message():
    """Original endpoint that receives messages from the frontend"""
    from python_backend_example import manage_incoming_message
    
    data = request.json
    user_input = data.get('user_input', '')
    
    if not user_input:
        return jsonify({"error": "No input provided"}), 400
    
    # Call the manage_incoming_message function
    response = manage_incoming_message(user_input)
    
    return jsonify({"response": response})

if __name__ == '__main__':
    print("Starting Flask server for Stockholm Metro voice assistant...")
    print("Server running at http://localhost:5000")
    print("Ready to receive requests at:")
    print("- http://localhost:5000/api/record (for voice recording)")
    print("- http://localhost:5000/api/message (for text processing)")
    app.run(host='0.0.0.0', port=5000, debug=True)
