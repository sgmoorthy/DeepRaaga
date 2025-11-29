import json
import numpy as np
import os

def load_raga_data(json_path):
    """Load and parse the raga-swaras.json file"""
    with open(json_path, 'r') as f:
        data = json.load(f)
    return data['ragas']

def swara_to_midi(swara):
    """Convert Carnatic swara to MIDI note number"""
    # Base MIDI note number for Sa (C4)
    base_note = 60
    
    # Swara to semitone mapping
    swara_map = {
        'S': 0,  # Sa
        'R1': 1, # Suddha Rishabham
        'R2': 2, # Chatusruti Rishabham
        'G1': 2, # Suddha Gandharam
        'G2': 3, # Sadharana Gandharam
        'G3': 4, # Antara Gandharam
        'M1': 5, # Suddha Madhyamam
        'M2': 6, # Prati Madhyamam
        'P': 7,  # Panchamam
        'D1': 8, # Suddha Dhaivatam
        'D2': 9, # Chatusruti Dhaivatam
        'D3': 10, # Shatsruti Dhaivatam
        'N1': 10, # Suddha Nishadam
        'N2': 11, # Kaisiki Nishadam
        'N3': 12, # Kakali Nishadam
        "S'": 12  # Upper Sa
    }
    
    # Remove any whitespace and handle upper octave notation
    swara = swara.strip()
    return base_note + swara_map.get(swara, 0)

def convert_pattern_to_midi(pattern):
    """Convert a swara pattern to MIDI note numbers"""
    swaras = pattern.split()
    return [swara_to_midi(swara) for swara in swaras]

def create_raga_features(raga):
    """Create feature vector for a raga from its ascending and descending patterns"""
    # Convert ascending and descending patterns to MIDI notes
    arohanam = convert_pattern_to_midi(raga['ascending'])
    avarohanam = convert_pattern_to_midi(raga['descending'])
    
    # Combine both patterns and pad/truncate to fixed length
    combined = arohanam + avarohanam
    target_length = 128  # Match the input_size in train.py
    
    if len(combined) < target_length:
        # Pad with zeros if shorter
        combined = combined + [0] * (target_length - len(combined))
    else:
        # Truncate if longer
        combined = combined[:target_length]
    
    return np.array(combined, dtype=np.float32)

def preprocess_ragas(json_path, output_dir):
    """Preprocess all ragas and save as numpy arrays"""
    ragas = load_raga_data(json_path)
    
    # Create features for each raga
    midi_features = []
    labels = []
    
    for i, raga in enumerate(ragas):
        feature = create_raga_features(raga)
        midi_features.append(feature)
        labels.append(i)
    
    # Convert to numpy arrays
    midi_features = np.array(midi_features)
    labels = np.array(labels)
    
    # Create processed directory if it doesn't exist
    processed_dir = os.path.join(output_dir, 'processed')
    os.makedirs(processed_dir, exist_ok=True)
    
    # Save the preprocessed data
    np.save(os.path.join(processed_dir, 'raga_midi_features.npy'), midi_features)
    np.save(os.path.join(processed_dir, 'raga_labels.npy'), labels)
    
    return len(ragas)

if __name__ == '__main__':
    json_path = os.path.join('data', 'raw', 'Ragas-mp3', 'raga-swaras.json')
    output_dir = 'data'
    num_ragas = preprocess_ragas(json_path, output_dir)
    print(f'Successfully preprocessed {num_ragas} ragas')