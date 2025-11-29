import os
import tensorflow as tf
import numpy as np
from model.basic_model import BasicRaagaModel
from data.raw.process_raga_audio import parse_raga_pattern, convert_swaras_to_midi_notes

def prepare_training_data(raga_dir):
    """Prepare training data from raga patterns."""
    sequences = []
    
    # Process each raga file
    for file in os.listdir(raga_dir):
        if file.endswith('_avarohanam.txt'):
            text_file = os.path.join(raga_dir, file)
            patterns = parse_raga_pattern(text_file)
            
            # Convert swaras to MIDI notes
            arohanam_notes = convert_swaras_to_midi_notes(patterns['arohanam'])
            avarohanam_notes = convert_swaras_to_midi_notes(patterns['avarohanam'])
            
            # Create sequence
            sequence = np.array(arohanam_notes + avarohanam_notes)
            sequences.append(sequence)
    
    # Convert to TensorFlow dataset
    dataset = tf.data.Dataset.from_tensor_slices(sequences)
    return dataset

def train_model():
    """Train the BasicRaagaModel on raga patterns."""
    # Initialize model
    config = {
        'num_layers': 3,
        'units_per_layer': 256,
        'dropout_rate': 0.3,
        'input_dim': 128,
        'output_dim': 128,
        'epochs': 100,
        'batch_size': 32
    }
    model = BasicRaagaModel(config)
    model.build()
    
    # Prepare training data
    raga_dir = os.path.join('data', 'raw', 'Ragas-mp3')
    dataset = prepare_training_data(raga_dir)
    
    # Split into training and validation sets
    total_size = len(list(dataset))
    train_size = int(total_size * 0.8)
    
    train_dataset = dataset.take(train_size).batch(config['batch_size'])
    val_dataset = dataset.skip(train_size).batch(config['batch_size'])
    
    # Train model
    print('Starting model training...')
    model.train(train_dataset, val_dataset)
    
    # Save model
    model_dir = os.path.join('model', 'saved_models')
    os.makedirs(model_dir, exist_ok=True)
    model.save(os.path.join(model_dir, 'basic_model'))
    print('Model training completed!')

if __name__ == '__main__':
    train_model()