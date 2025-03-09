
from flask import Flask, request, jsonify
import speech_recognition as sr
import threading
import time
import os

app = Flask(__name__)

# Global variables for managing recording state
recording_thread = None
is_recording = False
recognizer = sr.Recognizer()
audio_data = None

def voice_recording_worker():
    """Background worker that handles the actual recording"""
    global is_recording, audio_data
    
    try:
        # Using the default microphone as the audio source
        with sr.Microphone() as source:
            print("Adjusting for ambient noise...")
            recognizer.adjust_for_ambient_noise(source, duration=0.5)
            print("Recording started...")
            
            # Record audio while the is_recording flag is True
            audio_data = recognizer.listen(source, timeout=10, phrase_time_limit=None)
            print("Recording complete!")
    except Exception as e:
        print(f"Error in recording thread: {e}")
    finally:
        is_recording = False

@app.route('/api/record', methods=['POST'])
def record_voice():
    """
    Endpoint that handles voice recording requests.
    Accepts 'start_recording' and 'stop_recording' actions.
    """
    global recording_thread, is_recording, audio_data
    
    data = request.json
    action = data.get('action', '')
    
    if action == 'start_recording':
        if not is_recording:
            # Reset audio data
            audio_data = None
            
            # Start recording in a background thread
            is_recording = True
            recording_thread = threading.Thread(target=voice_recording_worker)
            recording_thread.daemon = True
            recording_thread.start()
            
            return jsonify({"status": "recording_started"})
        else:
            return jsonify({"status": "already_recording"})
            
    elif action == 'stop_recording':
        is_recording = False
        
        # Wait for the recording thread to finish if it's running
        if recording_thread and recording_thread.is_alive():
            recording_thread.join(timeout=2)
        
        # Process the recorded audio to get a transcript
        transcript = ""
        if audio_data:
            try:
                # For Swedish language, use 'sv-SE'
                transcript = recognizer.recognize_google(audio_data, language='sv-SE')
                print(f"Transcription: {transcript}")
            except sr.UnknownValueError:
                print("Google Speech Recognition could not understand audio")
            except sr.RequestError as e:
                print(f"Could not request results from Google Speech Recognition service; {e}")
        
        return jsonify({"transcript": transcript})
    
    return jsonify({"error": "Invalid action"}), 400

@app.route('/api/message', methods=['POST'])
def process_message():
    """
    Original endpoint that receives messages from the frontend
    """
    from python_backend_example import manage_incoming_message
    
    data = request.json
    user_input = data.get('user_input', '')
    
    if not user_input:
        return jsonify({"error": "No input provided"}), 400
    
    # Call the manage_incoming_message function from python_backend_example.py
    response = manage_incoming_message(user_input)
    
    return jsonify({"response": response})

if __name__ == '__main__':
    print("Starting Flask server for Stockholm Metro voice assistant...")
    print("Server running at http://localhost:5000")
    print("Ready to receive requests at:")
    print("- http://localhost:5000/api/record (for voice recording)")
    print("- http://localhost:5000/api/message (for text processing)")
    
    # You'll need to install the SpeechRecognition package and PyAudio:
    # pip install SpeechRecognition pyaudio
    
    app.run(host='0.0.0.0', port=5000, debug=True)
