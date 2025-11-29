import os
import numpy as np
import torch
import json
import pickle
from typing import Tuple, List, Dict
from music21 import converter, note, chord
import librosa

class DataProcessor:
    def __init__(self, sample_rate=22050, hop_length=512, sequence_length=100):
        self.sample_rate = sample_rate
        self.hop_length = hop_length
        self.sequence_length = sequence_length
        self.note_to_int = {}
        self.int_to_note = {}
        
    def save_vocab(self, path: str):
        """Save the vocabulary mapping"""
        with open(path, 'wb') as f:
            pickle.dump({'note_to_int': self.note_to_int, 'int_to_note': self.int_to_note}, f)
            
    def load_vocab(self, path: str):
        """Load the vocabulary mapping"""
        if os.path.exists(path):
            with open(path, 'rb') as f:
                data = pickle.load(f)
                self.note_to_int = data['note_to_int']
                self.int_to_note = data['int_to_note']
                
    def extract_midi_features(self, midi_path: str, training=True) -> Tuple[np.ndarray, np.ndarray]:
        """Extract features from MIDI file for next-note prediction"""
        try:
            # Try to parse MIDI file with music21
            try:
                midi = converter.parse(midi_path)
                notes_to_parse = midi.flatten().notes
            except Exception as e:
                print(f"Music21 failed to parse {midi_path}: {str(e)}")
                return np.array([]), np.array([])
                
            notes = []
            for element in notes_to_parse:
                if isinstance(element, note.Note):
                    notes.append(str(element.pitch))
                elif isinstance(element, chord.Chord):
                    notes.append('.'.join(str(n) for n in element.normalOrder))
            
            if not notes:
                print(f"No notes found in {midi_path}")
                return np.array([]), np.array([])
            
            # Update vocabulary if training
            if training:
                for n in notes:
                    if n not in self.note_to_int:
                        new_id = len(self.note_to_int)
                        self.note_to_int[n] = new_id
                        self.int_to_note[new_id] = n
            
            # Create sequences
            network_input = []
            network_output = []
            
            # Need at least sequence_length + 1 notes
            if len(notes) <= self.sequence_length:
                # Pad if too short? Or just skip? For now, let's skip very short files or pad
                # Simple padding for now if needed, but better to just skip for quality
                return np.array([]), np.array([])
                
            for i in range(0, len(notes) - self.sequence_length, 1):
                sequence_in = notes[i:i + self.sequence_length]
                sequence_out = notes[i + self.sequence_length]
                
                # Check if all notes in sequence are in vocab
                try:
                    input_seq = [self.note_to_int[char] for char in sequence_in]
                    output_note = self.note_to_int[sequence_out]
                    
                    network_input.append(input_seq)
                    network_output.append(output_note)
                except KeyError:
                    # If we are not training and encounter unknown notes, we skip
                    continue
            
            if not network_input:
                return np.array([]), np.array([])
                
            return np.array(network_input), np.array(network_output)
            
        except Exception as e:
            print(f"Error processing MIDI file {midi_path}: {str(e)}")
            return np.array([]), np.array([])

    def process_dataset(self, midi_dir: str, output_dir: str):
        """Process all files in the dataset and save processed data"""
        all_inputs = []
        all_outputs = []
        
        # First pass: Build vocabulary
        print("Building vocabulary...")
        for root, dirs, files in os.walk(midi_dir):
            for file in files:
                if file.endswith('.mid') or file.endswith('.midi'):
                    self.extract_midi_features(os.path.join(root, file), training=True)
        
        print(f"Vocabulary size: {len(self.note_to_int)}")
        self.save_vocab(os.path.join(output_dir, 'vocab.pkl'))
        
        # Second pass: Create sequences
        print("Creating sequences...")
        for root, dirs, files in os.walk(midi_dir):
            for file in files:
                if file.endswith('.mid') or file.endswith('.midi'):
                    inputs, outputs = self.extract_midi_features(os.path.join(root, file), training=False)
                    if len(inputs) > 0:
                        all_inputs.append(inputs)
                        all_outputs.append(outputs)
        
        if all_inputs:
            X = np.concatenate(all_inputs)
            y = np.concatenate(all_outputs)
            
            np.save(os.path.join(output_dir, 'X.npy'), X)
            np.save(os.path.join(output_dir, 'y.npy'), y)
            print(f"Saved {len(X)} sequences to {output_dir}")
        else:
            print("No data processed!")