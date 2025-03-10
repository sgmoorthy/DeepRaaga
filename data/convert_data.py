import os
import tensorflow as tf
from magenta.music import midi_io
from magenta.music import musicxml_reader
from magenta.music import note_sequence_io
from magenta.music import sequences_lib

def convert_files_to_note_sequences(input_dir, output_dir):
    """Convert MIDI and MusicXML files to NoteSequence protos.

    Args:
        input_dir: Directory containing input files (.mid, .midi, .xml, .mxl)
        output_dir: Output directory for NoteSequence files
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for root, _, files in os.walk(input_dir):
        for file in files:
            input_path = os.path.join(root, file)
            filename, ext = os.path.splitext(file)
            output_path = os.path.join(output_dir, f"{filename}.tfrecord")

            # Skip if output already exists
            if os.path.exists(output_path):
                print(f"Skipping {file} - output already exists")
                continue

            try:
                # Convert MIDI files
                if ext.lower() in [".mid", ".midi"]:
                    sequence = midi_io.midi_file_to_note_sequence(input_path)
                # Convert MusicXML files
                elif ext.lower() in [".xml", ".mxl"]:
                    sequence = musicxml_reader.musicxml_file_to_sequence_proto(input_path)
                else:
                    print(f"Skipping {file} - unsupported format")
                    continue

                # Validate and clean up the sequence
                if sequence.notes:
                    sequence = sequences_lib.apply_sustain_control_changes(sequence)
                    note_sequence_io.write_sequence_to_file(sequence, output_path)
                    print(f"Converted {file} to NoteSequence")
                else:
                    print(f"Skipping {file} - no notes found")

            except Exception as e:
                print(f"Error processing {file}: {str(e)}")

def create_tfrecord_dataset(note_sequences_dir, output_path):
    """Create TFRecord dataset from NoteSequence files.

    Args:
        note_sequences_dir: Directory containing NoteSequence files
        output_path: Path for output TFRecord file
    """
    writer = tf.io.TFRecordWriter(output_path)

    for root, _, files in os.walk(note_sequences_dir):
        for file in files:
            if not file.endswith(".tfrecord"):
                continue

            input_path = os.path.join(root, file)
            try:
                sequence = note_sequence_io.read_sequence_from_file(input_path)
                if sequence.notes:
                    writer.write(sequence.SerializeToString())
                    print(f"Added {file} to TFRecord dataset")
            except Exception as e:
                print(f"Error processing {file}: {str(e)}")

    writer.close()
    print(f"Created TFRecord dataset at {output_path}")

def main():
    # Directory paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    midi_dir = os.path.join(base_dir, "raw", "midi")
    musicxml_dir = os.path.join(base_dir, "raw", "musicxml")
    note_sequences_dir = os.path.join(base_dir, "processed", "note_sequences")
    tfrecord_dir = os.path.join(base_dir, "processed", "tfrecord")

    # Convert MIDI files
    print("\nProcessing MIDI files...")
    convert_files_to_note_sequences(midi_dir, note_sequences_dir)

    # Convert MusicXML files
    print("\nProcessing MusicXML files...")
    convert_files_to_note_sequences(musicxml_dir, note_sequences_dir)

    # Create TFRecord dataset
    print("\nCreating TFRecord dataset...")
    tfrecord_path = os.path.join(tfrecord_dir, "training_data.tfrecord")
    create_tfrecord_dataset(note_sequences_dir, tfrecord_path)

if __name__ == "__main__":
    main()