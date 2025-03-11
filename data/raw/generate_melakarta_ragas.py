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

# Define Melakarta raga names
melakarta_names = {
    1: 'Kanakangi', 2: 'Ratnangi', 3: 'Ganamurthi', 4: 'Vanaspathi', 5: 'Manavathi', 6: 'Tanarupi',
    7: 'Senavathi', 8: 'Hanumathodi', 9: 'Dhenuka', 10: 'Natakapriya', 11: 'Kokilapriya', 12: 'Rupavathi',
    13: 'Gayakapriya', 14: 'Vakulabharanam', 15: 'Mayamalavagowla', 16: 'Chakravakam', 17: 'Suryakantam', 18: 'Hatakambari',
    19: 'Jhankaradhwani', 20: 'Natabhairavi', 21: 'Keeravani', 22: 'Kharaharapriya', 23: 'Gourimanohari', 24: 'Varunapriya',
    25: 'Mararanjani', 26: 'Charukesi', 27: 'Sarasangi', 28: 'Harikambhoji', 29: 'Dheerasankarabharanam', 30: 'Naganandini',
    31: 'Yagapriya', 32: 'Ragavardhini', 33: 'Gangeyabhushani', 34: 'Vagadheeswari', 35: 'Shulini', 36: 'Chalanata',
    37: 'Salagam', 38: 'Jalarnavam', 39: 'Jhalavarali', 40: 'Navanitam', 41: 'Pavani', 42: 'Raghupriya',
    43: 'Gavambodhi', 44: 'Bhavapriya', 45: 'Shubhapantuvarali', 46: 'Shadvidamargini', 47: 'Suvarnangi', 48: 'Divyamani',
    49: 'Dhavalambari', 50: 'Namanarayani', 51: 'Kamavardhini', 52: 'Ramapriya', 53: 'Gamanashrama', 54: 'Vishwambhari',
    55: 'Shamalangi', 56: 'Shanmukhapriya', 57: 'Simhendramadhyamam', 58: 'Hemavathi', 59: 'Dharmavathi', 60: 'Neetimathi',
    61: 'Kantamani', 62: 'Rishabhapriya', 63: 'Latangi', 64: 'Vachaspathi', 65: 'Mechakalyani', 66: 'Chitrambari',
    67: 'Sucharitra', 68: 'Jyotiswarupini', 69: 'Dhatuvardani', 70: 'Nasikabhushani', 71: 'Kosalam', 72: 'Rasikapriya'
}

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
                    
                    # Get the raga name and create filename
                    raga_name = melakarta_names[raga_number]
                    filename = f'{raga_number:02d}_{raga_name}.mid'
                    
                    # Save the MIDI file with raga number and name
                    midi_data.write(os.path.join(output_dir, filename))
                    
                    raga_number += 1

print(f'Generated {raga_number-1} Melakarta raga MIDI files in {output_dir}')