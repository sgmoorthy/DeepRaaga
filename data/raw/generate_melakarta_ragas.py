import pretty_midi
import os

def create_raga_sequence(notes, tempo=120):
    pm = pretty_midi.PrettyMIDI()
    instrument = pretty_midi.Instrument(program=0)  # Piano
    
    current_time = 0.0
    note_duration = 60 / tempo  # Duration for each note in seconds
    
    # Ascending (Arohanam)
    for note in notes:
        note_number = pretty_midi.note_name_to_number(note)
        note = pretty_midi.Note(velocity=100, pitch=note_number, start=current_time, end=current_time + note_duration)
        instrument.notes.append(note)
        current_time += note_duration
    
    # Add a slight pause between ascending and descending
    current_time += note_duration / 2
    
    # Descending (Avarohanam)
    for note in reversed(notes):
        note_number = pretty_midi.note_name_to_number(note)
        note = pretty_midi.Note(velocity=100, pitch=note_number, start=current_time, end=current_time + note_duration)
        instrument.notes.append(note)
        current_time += note_duration
    
    pm.instruments.append(instrument)
    return pm

# Define the basic notes for Carnatic music (Sa, Ri, Ga, Ma, Pa, Dha, Ni)
base_notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

# Define variations for each note (except Sa and Pa which are fixed)
ri_variants = ['D', 'D#']
ga_variants = ['E', 'F']
ma_variants = ['F', 'F#']
dha_variants = ['A', 'A#']
ni_variants = ['B', 'C']

# Create output directory if it doesn't exist
output_dir = os.path.join(os.path.dirname(__file__), 'midi', 'melakarta')
os.makedirs(output_dir, exist_ok=True)

# Generate all 72 Melakarta ragas
raga_number = 1
for ri in ri_variants:
    for ga in ga_variants:
        for ma in ma_variants:
            for dha in dha_variants:
                for ni in ni_variants:
                    # Create the scale
                    scale = ['C4']  # Sa
                    scale.append(f'{ri}4')  # Ri
                    scale.append(f'{ga}4')  # Ga
                    scale.append(f'{ma}4')  # Ma
                    scale.append('G4')      # Pa
                    scale.append(f'{dha}4') # Dha
                    scale.append(f'{ni}4')  # Ni
                    scale.append('C5')      # Sa
                    
                    # Create MIDI file
                    midi_data = create_raga_sequence(scale)
                    
                    # Save the MIDI file with raga number
                    filename = f'melakarta_{raga_number:02d}.mid'
                    midi_data.write(os.path.join(output_dir, filename))
                    
                    raga_number += 1

print(f'Generated {raga_number-1} Melakarta raga MIDI files in {output_dir}')