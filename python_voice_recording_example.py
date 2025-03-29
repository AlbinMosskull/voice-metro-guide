
from flask import Flask, request, jsonify
from flask_cors import CORS
import threading
import time
from backend import manage_incoming_message_default_settings as manage_incoming_message
from speech import speech_to_text
from time import sleep


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/api/record', methods=['POST'])
def start_recording():
    data = request.json
    is_recording = data.get('is_recording', False)
    
    if is_recording:
        print("Recording started...")
        user_prompt = speech_to_text(play_recording=False)
        print("user prompt is: ", user_prompt)
        
        # Process the speech input
        response = manage_incoming_message(user_prompt)
        
        return jsonify({
            "user_prompt": user_prompt,
            "response": response
        })
    
    return jsonify({"error": "Recording not started"}), 400

@app.route('/api/message', methods=['POST'])
def process_message():
    """Original endpoint that receives messages from the frontend"""
    
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
