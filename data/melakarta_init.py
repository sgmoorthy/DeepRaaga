import os
import json

# The Complete 72 Melakarta Raga Index
# This forms the foundational grammar backbone for DeepRaaga's dataset.
MELAKARTA_INDEX = {
    1: 'Kanakangi', 2: 'Ratnangi', 3: 'Ganamurti', 4: 'Vanaspati', 5: 'Manavati', 6: 'Tanarupi',
    7: 'Senavati', 8: 'Hanumatodi', 9: 'Dhenuka', 10: 'Natakapriya', 11: 'Kokilapriya', 12: 'Rupavati',
    13: 'Gayakapriya', 14: 'Vakulabharanam', 15: 'Mayamalavagowla', 16: 'Chakravakam', 17: 'Suryakantam', 18: 'Hatakambari',
    19: 'Jhankaradhvani', 20: 'Natabhairavi', 21: 'Keeravani', 22: 'Kharaharapriya', 23: 'Gourimanohari', 24: 'Varunapriya',
    25: 'Mararanjani', 26: 'Charukesi', 27: 'Sarasangi', 28: 'Harikambhoji', 29: 'Dheerasankarabharanam', 30: 'Naganandini',
    31: 'Yagapriya', 32: 'Ragavardhini', 33: 'Gangeyabhushani', 34: 'Vagadheeswari', 35: 'Shulini', 36: 'Chalanata',
    37: 'Salagam', 38: 'Jalarnavam', 39: 'Jhalavarali', 40: 'Navaneetam', 41: 'Pavani', 42: 'Raghupriya',
    43: 'Gavambhodi', 44: 'Bhavapriya', 45: 'Shubhapantuvarali', 46: 'Shadvidhamargini', 47: 'Suvarnangi', 48: 'Divyamani',
    49: 'Dhavalambari', 50: 'Namanarayani', 51: 'Kamavardhani', 52: 'Ramapriya', 53: 'Gamanashrama', 54: 'Vishwambari',
    55: 'Shyamalangi', 56: 'Shanmukhapriya', 57: 'Simhendramadhyamam', 58: 'Hemavati', 59: 'Dharmavati', 60: 'Neetimati',
    61: 'Kantamani', 62: 'Rishabhapriya', 63: 'Latangi', 64: 'Vachaspati', 65: 'Mechakalyani', 66: 'Chitrambari',
    67: 'Sucharitra', 68: 'Jyotiswarupini', 69: 'Dhatuvardhani', 70: 'Nasikabhushani', 71: 'Kosalam', 72: 'Rasikapriya'
}

DATASET_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'DeepRaaga-Dataset')

def initialize_dataset_tree():
    """
    Creates the standardized folder hierarchy for the open-source Carnatic dataset.
    This enables researchers to easily drop MIDI/MusicXML files into the correct buckets.
    """
    if not os.path.exists(DATASET_ROOT):
        os.makedirs(DATASET_ROOT)
        print(f"[*] Initialized root dataset directory at {DATASET_ROOT}")

    melakarta_dir = os.path.join(DATASET_ROOT, 'Melakarta')
    os.makedirs(melakarta_dir, exist_ok=True)
    
    for melakarta_id, raga_name in MELAKARTA_INDEX.items():
        # Format explicitly padded with zeros (e.g., 01_Kanakangi)
        raga_folder = f"{melakarta_id:02d}_{raga_name}"
        raga_path = os.path.join(melakarta_dir, raga_folder)
        
        # We need specific modalities to standardize benchmark tests
        os.makedirs(os.path.join(raga_path, 'midi'), exist_ok=True)
        os.makedirs(os.path.join(raga_path, 'musicxml'), exist_ok=True)
        os.makedirs(os.path.join(raga_path, 'annotations'), exist_ok=True)

    print(f"[*] Successfully generated standardized tree for all 72 Melakarta ragas.")

def write_manifest():
    """
    Writes out a structured manifest for benchmarking tools (useful for Python/Keras datasets).
    """
    manifest_path = os.path.join(DATASET_ROOT, 'manifest.json')
    with open(manifest_path, 'w') as f:
        json.dump(MELAKARTA_INDEX, f, indent=4)
    print(f"[*] Wrote index manifest to {manifest_path}")

def build_dataset_readme():
    """
    Automates the generation of the dataset's README for clear Kaggle/GitHub documentation.
    """
    readme_path = os.path.join(DATASET_ROOT, 'README.md')
    content = """# DeepRaaga Open Dataset Standard

*The highest quality open benchmark repository for Carnatic Artificial Intelligence.*

## Structure
To solve the data bottleneck in Carnatic AI, we've standardized the **72 Melakarta Raga** classification hierarchy. Our dataset strictly adheres to this numerical schema to power supervised and un-supervised machine learning tools.

Each Raga is segmented into:
- `/midi`: Heavily quantized performance midi encapsulating timing and pitch.
- `/musicxml`: Structured sheet data for discrete melodic processing.
- `/annotations`: CSVs detailing *Arohana/Avarohana* limits, phrase bounds, and gamaka approximations.

## Contributing
We welcome contributions. To commit a new performance track:
1. Ensure the track is strictly bound to its parent Raga with minimal foreign Sancharas.
2. Drop it into the corresponding `Melakarta/ID_Name/midi` folder.
3. Open a Pull Request!
"""
    with open(readme_path, 'w') as f:
        f.write(content)
    print(f"[*] Documentation attached.")

if __name__ == "__main__":
    print(f"Initializing DeepRaaga-Dataset Architecture...")
    initialize_dataset_tree()
    write_manifest()
    build_dataset_readme()
    print("Done. DeepRaaga-Dataset is ready for ML ingestion.")
