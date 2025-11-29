import os
import shutil
import random
from pathlib import Path
import sys
sys.path.append('..')
from model.data_processor import DataProcessor
import numpy as np

def create_directory_structure():
    """Create the necessary directory structure for training"""
    dirs = ['train', 'val', 'test']
    for dir_name in dirs:
        for subdir in ['midi', 'audio']:
            path = Path(f'data/{dir_name}/{subdir}')
            path.mkdir(parents=True, exist_ok=True)

def split_dataset(raw_midi_dir: str, raw_audio_dir: str, split_ratio=(0.7, 0.15, 0.15)):
    """Split the dataset into train, validation and test sets"""
    # Get list of files
    midi_files = [f for f in os.listdir(raw_midi_dir) if f.endswith('.mid')]
    audio_files = [f for f in os.listdir(raw_audio_dir) if f.endswith(('.mp3', '.wav'))]
    
    # Shuffle files
    random.shuffle(midi_files)
    random.shuffle(audio_files)
    
    # Calculate split points
    midi_train_idx = int(len(midi_files) * split_ratio[0])
    midi_val_idx = midi_train_idx + int(len(midi_files) * split_ratio[1])
    
    audio_train_idx = int(len(audio_files) * split_ratio[0])
    audio_val_idx = audio_train_idx + int(len(audio_files) * split_ratio[1])
    
    # Split the files
    splits = {
        'train': {
            'midi': midi_files[:midi_train_idx],
            'audio': audio_files[:audio_train_idx]
        },
        'val': {
            'midi': midi_files[midi_train_idx:midi_val_idx],
            'audio': audio_files[audio_train_idx:audio_val_idx]
        },
        'test': {
            'midi': midi_files[midi_val_idx:],
            'audio': audio_files[audio_val_idx:]
        }
    }
    
    return splits

def copy_files(splits: dict, raw_midi_dir: str, raw_audio_dir: str):
    """Copy files to their respective directories"""
    for split_type, split_files in splits.items():
        # Copy MIDI files
        for midi_file in split_files['midi']:
            src = os.path.join(raw_midi_dir, midi_file)
            dst = os.path.join(f'data/{split_type}/midi', midi_file)
            shutil.copy2(src, dst)
        
        # Copy audio files
        for audio_file in split_files['audio']:
            src = os.path.join(raw_audio_dir, audio_file)
            dst = os.path.join(f'data/{split_type}/audio', audio_file)
            shutil.copy2(src, dst)

def process_split(split_type: str, processor: DataProcessor):
    """Process the data for a specific split"""
    midi_dir = f'data/{split_type}/midi'
    audio_dir = f'data/{split_type}/audio'
    
    midi_features, audio_features = processor.process_dataset(midi_dir, audio_dir)
    
    # Save processed features
    output_dir = f'data/processed/{split_type}'
    os.makedirs(output_dir, exist_ok=True)
    
    np.save(os.path.join(output_dir, 'midi_features.npy'), midi_features)
    np.save(os.path.join(output_dir, 'audio_features.npy'), audio_features)

def main():
    # Set random seed for reproducibility
    random.seed(42)
    
    # Create directory structure
    create_directory_structure()
    
    # Split dataset
    raw_midi_dir = 'data/raw/midi'
    raw_audio_dir = 'data/raw/Ragas-mp3'
    splits = split_dataset(raw_midi_dir, raw_audio_dir)
    
    # Copy files to their respective directories
    copy_files(splits, raw_midi_dir, raw_audio_dir)
    
    # Initialize data processor
    processor = DataProcessor()
    
    # Process each split
    for split_type in ['train', 'val', 'test']:
        process_split(split_type, processor)

if __name__ == '__main__':
    main()