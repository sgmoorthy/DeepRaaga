import torch
import numpy as np
import sys
sys.path.append('..')
from model.model import DeepRagaModel
import json

def load_raga_data(json_path):
    """Load raga patterns from JSON file"""
    with open(json_path, 'r') as f:
        data = json.load(f)
    for raga in data['ragas']:
        if raga['name'].lower() == 'kanakangi':
            return raga
    return None

def preprocess_swara_sequence(swara_sequence):
    """Convert swara sequence to numerical representation"""
    # Define swara to numerical mapping
    swara_map = {
        'S': 0, 'R1': 1, 'R2': 2, 'R3': 3,
        'G1': 4, 'G2': 5, 'G3': 6,
        'M1': 7, 'M2': 8,
        'P': 9,
        'D1': 10, 'D2': 11, 'D3': 12,
        'N1': 13, 'N2': 14, 'N3': 15,
        "S'": 16
    }
    
    sequence = swara_sequence.split()
    return torch.tensor([swara_map[s] for s in sequence], dtype=torch.float32)

def generate_kanada_sequence(model, raga_pattern, sequence_length=32):
    """Generate new sequence based on Kanada raga pattern"""
    model.eval()
    
    # Prepare input sequence from ascending pattern
    input_sequence = preprocess_swara_sequence(raga_pattern['ascending'])
    input_sequence = input_sequence.unsqueeze(0).unsqueeze(2)  # Add batch and feature dimensions
    
    generated_sequence = []
    
    with torch.no_grad():
        for _ in range(sequence_length):
            # Generate next note
            output = model(input_sequence)
            
            # Get the predicted note
            predicted = torch.argmax(output, dim=1)
            generated_sequence.append(predicted.item())
            
            # Update input sequence
            input_sequence = torch.cat([
                input_sequence[:, 1:, :],
                predicted.unsqueeze(0).unsqueeze(1).unsqueeze(2)
            ], dim=1)
    
    return generated_sequence

def main():
    # Load Kanada raga pattern
    raga_pattern = load_raga_data('../data/raw/Ragas-mp3/raga-swaras.json')
    if not raga_pattern:
        print("Kanada raga pattern not found")
        return
    
    # Initialize model
    model = DeepRagaModel(
        input_size=1,  # Single feature (note)
        hidden_size=128,
        num_layers=2,
        output_size=17  # Number of possible swaras
    )
    
    # Load trained weights
    try:
        model.load_state_dict(torch.load('../model/weights/deepraga_model.pth'))
        print("Model weights loaded successfully")
    except Exception as e:
        print(f"Error loading model weights: {str(e)}")
        return
    
    # Generate sequence
    generated_sequence = generate_kanada_sequence(model, raga_pattern)
    
    # Convert numerical sequence back to swaras
    swara_map = {
        0: 'S', 1: 'R1', 2: 'R2', 3: 'R3',
        4: 'G1', 5: 'G2', 6: 'G3',
        7: 'M1', 8: 'M2',
        9: 'P',
        10: 'D1', 11: 'D2', 12: 'D3',
        13: 'N1', 14: 'N2', 15: 'N3',
        16: "S'"
    }
    
    generated_swaras = [swara_map[note] for note in generated_sequence]
    print("\nGenerated Kanada Raga Sequence:")
    print(' '.join(generated_swaras))

if __name__ == '__main__':
    main()