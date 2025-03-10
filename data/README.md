# Data Directory Structure

This directory contains the training data for the DeepRaaga project.

## Directory Organization

- `raw/`: Contains the original MIDI and MusicXML files
  - `midi/`: MIDI format files (.mid, .midi)
  - `musicxml/`: MusicXML format files (.xml, .mxl)
- `processed/`: Contains the processed TFRecord files
  - `note_sequences/`: NoteSequence proto files
  - `tfrecord/`: Final TFRecord files for training

## Data Guidelines

1. File Formats:
   - MIDI files (.mid, .midi)
   - MusicXML files (.xml, .mxl)

2. Naming Convention:
   - Use descriptive names including raga name
   - Example: `shankarabharanam_varnam_1.mid`

3. Metadata:
   - Include raga name
   - Tala (rhythm) information
   - Composition type (varnam, kriti, etc.)

## Processing Pipeline

1. Place raw files in respective directories (midi/ or musicxml/)
2. Run conversion script to generate NoteSequence protos
3. Generate TFRecord files for training

Note: Ensure all music files are properly attributed and have necessary permissions for use in training.