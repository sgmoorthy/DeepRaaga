import os
import librosa
import pretty_midi
import numpy as np

def parse_raga_pattern(text_file):
    """Parse arohanam and avarohanam patterns from text file."""
    with open(text_file, 'r') as f:
        lines = f.readlines()
    
    patterns = {}
    for line in lines:
        if 'Arohanam' in line:
            patterns['arohanam'] = line.split(':')[-1].strip().split()
        elif 'Avarohanam' in line:
            patterns['avarohanam'] = line.split(':')[-1].strip().split()
    return patterns

def convert_swaras_to_midi_notes(swaras):
    """Convert Carnatic swaras to MIDI note numbers."""
    # Basic swara to MIDI note mapping (starting from middle C)
    swara_map = {
        'S': 60,  # C
        'R1': 61, 'R2': 62, 'R3': 63,  # C#/Db, D, D#/Eb
        'G1': 63, 'G2': 64, 'G3': 65,  # D#/Eb, E, F
        'M1': 65, 'M2': 66,  # F, F#/Gb
        'P': 67,  # G
        'D1': 68, 'D2': 69, 'D3': 70,  # G#/Ab, A, A#/Bb
        'N1': 70, 'N2': 71, 'N3': 72,  # A#/Bb, B, C
    }
    return [swara_map[s] for s in swaras if s in swara_map]

def create_midi_sequence(midi_notes, duration=0.5):
    """Create a MIDI sequence from note numbers with voice-like expression."""
    pm = pretty_midi.PrettyMIDI()
    # Use choir instrument instead of piano for more voice-like sound
    voice = pretty_midi.Instrument(program=52)  # Choir Aahs
    
    current_time = 0.0
    for note_num in midi_notes:
        # Add slight pitch bend for more natural sound
        pitch_bend = pretty_midi.PitchBend(pitch=100, time=current_time)
        voice.pitch_bends.append(pitch_bend)
        
        # Add vibrato effect
        vibrato_rate = 5  # Hz
        vibrato_depth = 30  # cents
        num_vibrato_samples = int(duration * 20)  # 20 samples per second
        for i in range(num_vibrato_samples):
            t = current_time + (i / num_vibrato_samples) * duration
            bend_amount = int(vibrato_depth * np.sin(2 * np.pi * vibrato_rate * t))
            voice.pitch_bends.append(pretty_midi.PitchBend(bend_amount, t))
        
        # Create note with dynamic velocity and expression
        note = pretty_midi.Note(
            velocity=90 + np.random.randint(-10, 10),  # Slight velocity variation
            pitch=note_num,
            start=current_time,
            end=current_time + duration
        )
        voice.notes.append(note)
        
        # Add control changes for expression
        voice.control_changes.append(pretty_midi.ControlChange(11, 100, current_time))  # Expression
        voice.control_changes.append(pretty_midi.ControlChange(1, 64, current_time))    # Modulation
        
        current_time += duration
    
    pm.instruments.append(voice)
    return pm

def process_raga_files(input_dir):
    """Process all raga files in the input directory."""
    # Create output directories if they don't exist
    midi_output_dir = os.path.join(os.path.dirname(input_dir), 'midi')
    os.makedirs(midi_output_dir, exist_ok=True)
    
    # Process each text file
    for file in os.listdir(input_dir):
        if file.endswith('_avarohanam.txt'):
            raga_name = file.split('-')[1].split('_')[0]
            text_file = os.path.join(input_dir, file)
            
            # Parse the raga pattern
            patterns = parse_raga_pattern(text_file)
            
            # Convert swaras to MIDI notes
            arohanam_notes = convert_swaras_to_midi_notes(patterns['arohanam'])
            avarohanam_notes = convert_swaras_to_midi_notes(patterns['avarohanam'])
            
            # Create MIDI sequence
            all_notes = arohanam_notes + avarohanam_notes
            midi_data = create_midi_sequence(all_notes)
            
            # Save MIDI file
            output_file = os.path.join(midi_output_dir, f'{raga_name}.mid')
            midi_data.write(output_file)
            print(f'Processed {raga_name}: Created {output_file}')

if __name__ == '__main__':
    input_dir = os.path.join(os.path.dirname(__file__), 'Ragas-mp3')
    process_raga_files(input_dir)
    print('Raga processing completed!')