from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import torch
import numpy as np
from model.model import DeepRagaModel
from model.data_processor import DataProcessor

app = Flask(__name__)
CORS(app)

# Global variables to hold model and processor
model = None
processor = None
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

def load_model():
    global model, processor
    try:
        processor = DataProcessor()
        vocab_path = os.path.join('data', 'processed', 'vocab.pkl')
        model_path = os.path.join('model', 'trained_model.pth')
        
        if os.path.exists(vocab_path) and os.path.exists(model_path):
            processor.load_vocab(vocab_path)
            vocab_size = len(processor.note_to_int)
            
            # Hyperparameters must match training
            embedding_dim = 64
            hidden_size = 256
            num_layers = 2
            
            model = DeepRagaModel(vocab_size, embedding_dim, hidden_size, num_layers).to(device)
            model.load_state_dict(torch.load(model_path, map_location=device))
            model.eval()
            print("Model and vocabulary loaded successfully.")
        else:
            print("Model or vocabulary not found. Generation will be simulated.")
    except Exception as e:
        print(f"Error loading model: {str(e)}")

# Load model on startup
# Load model on startup
load_model()

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'message': 'Deep Raga API is running. Use /api/generate to generate music.',
        'status': 'online'
    })

@app.route('/api/generate', methods=['POST'])
def generate_audio():
    data = request.get_json()
    raga = data.get('raga')
    duration = data.get('duration', 30) # duration in notes, roughly
    temperature = float(data.get('temperature', 1.0))
    
    if model is None or processor is None:
        # Fallback for when model is not trained yet
        return jsonify({
            'notes': ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
            'message': 'Model not trained yet. Returning scale.'
        })
        
    try:
        # Seed sequence (could be random or specific to raga if we had raga conditioning)
        # For now, pick a random start sequence from vocab
        start_seq = [np.random.randint(0, len(processor.note_to_int))]
        
        generated_indices = start_seq[:]
        input_seq = torch.LongTensor([start_seq]).to(device)
        hidden = None
        
        # Generate notes
        num_notes = int(duration) # Treat duration as number of notes for now
        
        with torch.no_grad():
            for _ in range(num_notes):
                output, hidden = model(input_seq, hidden)
                
                # Apply temperature
                logits = output / temperature
                probs = torch.softmax(logits, dim=1)
                
                # Sample next note
                next_note_idx = torch.multinomial(probs, 1).item()
                generated_indices.append(next_note_idx)
                
                # Prepare input for next step
                input_seq = torch.LongTensor([[next_note_idx]]).to(device)
        
        # Convert indices back to note names
        generated_notes = [processor.int_to_note[idx] for idx in generated_indices]
        
        return jsonify({
            'notes': generated_notes,
            'raga': raga
        })
        
    except Exception as e:
        print(f"Generation error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)