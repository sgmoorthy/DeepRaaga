# Deep Dive: Understanding the DeepRaaga Tutorial Notebook

**Date:** May 9, 2026
**Author:** DeepRaaga Education Team

The DeepRaaga Tutorial Notebook (`DeepRaaga_Tutorial.ipynb`) is a comprehensive, hands-on guide that walks users through the entire workflow of AI-powered Carnatic music generation. This article provides a detailed technical analysis of the notebook's contents, explaining the concepts and code for users at all levels.

## Notebook Overview

**Location**: `examples/DeepRaaga_Tutorial.ipynb`  
**GitHub**: [View on GitHub](https://github.com/sgmoorthy/naada/blob/master/examples/DeepRaaga_Tutorial.ipynb)  
**Colab**: [Open in Google Colab](https://colab.research.google.com/github/sgmoorthy/naada/blob/master/examples/DeepRaaga_Tutorial.ipynb)

The notebook is structured in progressive sections, each building upon the previous:

1. **Environment Setup** — Installing and configuring naada packages
2. **Data Understanding** — Exploring the 72 Melakarta dataset structure
3. **Preprocessing** — Converting MIDI to model-ready formats
4. **Model Architecture** — Understanding the LSTM+Attention network
5. **Training** — Fine-tuning models on specific ragas
6. **Generation** — Creating new Carnatic sequences
7. **Evaluation** — Validating raga grammar compliance
8. **Export** — Converting to playable formats

## Section 1: Environment Setup

### Cell 1.1: Package Installation

```python
# Install from PyPI (production)
!pip install deepraaga-core deepraaga-preprocess deepraaga-models

# Or for development (editable install)
# !pip install -e packages/deepraaga-core
# !pip install -e packages/deepraaga-models
```

**Technical Note**: The notebook automatically detects the environment (Colab vs. local) and adjusts installation paths accordingly.

### Cell 1.2: Environment Validation

```python
import deepraaga_core
import deepraaga_models
import deepraaga_preprocess

print(f"deepraaga-core version: {deepraaga_core.__version__}")
print(f"deepraaga-models version: {deepraaga_models.__version__}")
print(f"deepraaga-preprocess version: {deepraaga_preprocess.__version__}")

# Verify CUDA availability for GPU acceleration
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
```

**Expected Output**:
```
deepraaga-core version: 0.1.2
deepraaga-models version: 0.1.2
deepraaga-preprocess version: 0.1.1
CUDA available: True
GPU: Tesla T4
```

## Section 2: Data Understanding

### Cell 2.1: The Melakarta System

```python
from deepraaga_core.catalog import MelakartaRagas

catalog = MelakartaRagas()
print(f"Total Melakarta Ragas: {len(catalog)}")

# Display first 10 ragas with their scales
for i, raga in enumerate(catalog.list_ragas()[:10], 1):
    info = catalog.get_raga_info(raga)
    print(f"{i:02d}. {raga}")
    print(f"    Arohana (ascending):  {' '.join(info['arohana'])}")
    print(f"    Avarohana (descending): {' '.join(info['avarohana'])}")
    print()
```

**Output**:
```
Total Melakarta Ragas: 72

01. Kanakangi
    Arohana (ascending):  S R1 G1 M1 P D1 N1 S'
    Avarohana (descending): S' N1 D1 P M1 G1 R1 S

02. Ratnangi
    Arohana (ascending):  S R1 G1 M1 P D1 N2 S'
    Avarohana (descending): S' N2 D1 P M1 G1 R1 S
...
```

### Cell 2.2: Dataset Structure Exploration

```python
import os
from pathlib import Path

def explore_dataset(base_path="data/DeepRaaga-Dataset/Melakarta"):
    """Visualize the dataset directory structure"""
    stats = {
        'ragas': 0,
        'midi_files': 0,
        'musicxml_files': 0,
        'annotation_files': 0
    }
    
    for raga_dir in sorted(Path(base_path).iterdir()):
        if raga_dir.is_dir():
            stats['ragas'] += 1
            midi_dir = raga_dir / 'midi'
            xml_dir = raga_dir / 'musicxml'
            ann_dir = raga_dir / 'annotations'
            
            stats['midi_files'] += len(list(midi_dir.glob('*.mid')))
            stats['musicxml_files'] += len(list(xml_dir.glob('*.xml')))
            stats['annotation_files'] += len(list(ann_dir.glob('*.json')))
    
    return stats

stats = explore_dataset()
print("Dataset Statistics:")
print(f"  - Ragas covered: {stats['ragas']}/72")
print(f"  - MIDI files: {stats['midi_files']}")
print(f"  - MusicXML files: {stats['musicxml_files']}")
print(f"  - Annotation files: {stats['annotation_files']}")
```

## Section 3: Preprocessing Pipeline

### Cell 3.1: MIDI to NoteSequence Conversion

```python
from deepraaga_preprocess import NoteSequenceConverter
from deepraaga_core.io import load_midi

# Initialize converter with Carnatic-specific settings
converter = NoteSequenceConverter(
    quantization_grid=16,      # 16th note precision
    tempo_bpm=120,              # Standard Carnatic tempo
    preserve_pitch_bends=True,   # Critical for Gamakas
    raga_aware=True             # Validate against raga grammar
)

# Load a sample MIDI file
midi_path = "data/DeepRaaga-Dataset/Melakarta/15_Mayamalavagowla/midi/sample.mid"
midi_data = load_midi(midi_path)

# Convert to NoteSequence
note_sequence = converter.midi_to_sequence(midi_data)

print(f"Converted sequence:")
print(f"  - Total notes: {len(note_sequence.notes)}")
print(f"  - Duration: {note_sequence.total_time:.2f}s")
print(f"  - Pitch range: {min(n.pitch for n in note_sequence.notes)} - {max(n.pitch for n in note_sequence.notes)}")
```

### Cell 3.2: Visualizing Note Sequences

```python
import matplotlib.pyplot as plt
import matplotlib.patches as patches

def plot_note_sequence(note_sequence, title="Note Sequence"):
    """Visualize notes as a piano roll"""
    fig, ax = plt.subplots(figsize=(15, 6))
    
    for note in note_sequence.notes:
        rect = patches.Rectangle(
            (note.start_time, note.pitch - 0.4),
            note.end_time - note.start_time,
            0.8,
            linewidth=1,
            edgecolor='blue',
            facecolor='lightblue'
        )
        ax.add_patch(rect)
        
        # Add pitch bend indicators
        if note.pitch_bends:
            for bend in note.pitch_bends:
                ax.plot(bend.time, note.pitch + bend.amount/100, 
                       'ro', markersize=3)
    
    ax.set_xlim(0, note_sequence.total_time)
    ax.set_ylim(50, 90)
    ax.set_xlabel("Time (seconds)")
    ax.set_ylabel("MIDI Pitch")
    ax.set_title(title)
    plt.show()

plot_note_sequence(note_sequence, "Mayamalavagowla Sample")
```

## Section 4: Model Architecture Deep Dive

### Cell 4.1: Model Initialization

```python
from deepraaga_models import RagaLSTM, RagaAttention

# Create model configuration
config = {
    'vocab_size': 128,           # MIDI note range
    'raga_embed_dim': 64,       # Raga conditioning vector
    'hidden_dim': 256,          # LSTM hidden state
    'num_layers': 3,            # Stacked LSTM layers
    'dropout': 0.3,
    'attention_heads': 8,         # Multi-head attention
    'max_sequence_length': 512
}

# Initialize model
model = RagaLSTM(**config)

print("Model Architecture:")
print(model)
print(f"\nTotal parameters: {sum(p.numel() for p in model.parameters()):,}")
```

**Output**:
```
Model Architecture:
RagaLSTM(
  (swara_embedding): Embedding(128, 128)
  (raga_embedding): Embedding(72, 64)
  (lstm): LSTM(192, 256, num_layers=3, dropout=0.3)
  (attention): RagaAttention(
    (query): Linear(in_features=256, out_features=256)
    (key): Linear(in_features=256, out_features=256)
    (value): Linear(in_features=256, out_features=256)
  )
  (output): Linear(in_features=256, out_features=128)
)

Total parameters: 4,521,024
```

### Cell 4.2: Understanding Raga Conditioning

```python
def visualize_raga_embedding(model, raga_names):
    """Visualize how different ragas are embedded in latent space"""
    from sklearn.decomposition import PCA
    
    raga_ids = [catalog.get_raga_id(name) for name in raga_names]
    embeddings = model.raga_embedding(torch.tensor(raga_ids)).detach().numpy()
    
    # Reduce to 2D for visualization
    pca = PCA(n_components=2)
    coords = pca.fit_transform(embeddings)
    
    plt.figure(figsize=(12, 8))
    for i, (name, coord) in enumerate(zip(raga_names, coords)):
        plt.scatter(coord[0], coord[1], s=100)
        plt.annotate(name, (coord[0], coord[1]), 
                    xytext=(5, 5), textcoords='offset points')
    
    plt.title("Raga Embeddings in Latent Space (PCA)")
    plt.xlabel(f"PC1 ({pca.explained_variance_ratio_[0]:.1%} variance)")
    plt.ylabel(f"PC2 ({pca.explained_variance_ratio_[1]:.1%} variance)")
    plt.grid(True, alpha=0.3)
    plt.show()

# Compare similar ragas
similar_ragas = ['Mayamalavagowla', 'Natakapriya', 'Gayakapriya']
visualize_raga_embedding(model, similar_ragas)
```

## Section 5: Training Workflow

### Cell 5.1: Data Loading

```python
from deepraaga_models.data import RagaDataset
from torch.utils.data import DataLoader

# Create dataset
dataset = RagaDataset(
    data_dir="data/processed/",
    sequence_length=128,
    raga_conditioning=True
)

# Split into train/validation
train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size
train_dataset, val_dataset = torch.utils.data.random_split(
    dataset, [train_size, val_size]
)

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32)

print(f"Training samples: {len(train_dataset)}")
print(f"Validation samples: {len(val_dataset)}")
```

### Cell 5.2: Training Loop

```python
from deepraaga_models.training import RagaTrainer
import torch.optim as optim

# Setup training
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)
optimizer = optim.Adam(model.parameters(), lr=0.001)
trainer = RagaTrainer(model, optimizer, device)

# Training loop with validation
history = trainer.fit(
    train_loader=train_loader,
    val_loader=val_loader,
    epochs=50,
    early_stopping_patience=5
)

# Plot training history
plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(history['train_loss'], label='Train Loss')
plt.plot(history['val_loss'], label='Validation Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.title('Training Progress')

plt.subplot(1, 2, 2)
plt.plot(history['val_accuracy'], label='Validation Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.title('Raga Grammar Compliance')
plt.show()
```

## Section 6: Music Generation

### Cell 6.1: Basic Generation

```python
from deepraaga_models.generation import RagaGenerator

# Initialize generator with trained model
generator = RagaGenerator(model, device)

# Generate a new sequence
seed_sequence = ['S', 'R1', 'G3', 'M1', 'P']  # Mayamalavagowla opening

generated = generator.generate(
    raga='Mayamalavagowla',
    seed=seed_sequence,
    length=64,
    temperature=0.8,      # Higher = more creative
    top_k=40              # Nucleus sampling
)

print("Generated sequence:")
print(' '.join(generated))
```

### Cell 6.2: Temperature Analysis

```python
def compare_temperatures(generator, raga, seed, temperatures=[0.5, 0.8, 1.0, 1.2]):
    """Show how temperature affects generation"""
    fig, axes = plt.subplots(len(temperatures), 1, figsize=(15, 12))
    
    for ax, temp in zip(axes, temperatures):
        seq = generator.generate(raga=raga, seed=seed, length=32, temperature=temp)
        
        # Convert to MIDI pitches for visualization
        pitches = [swara_to_midi(s) for s in seq]
        times = range(len(pitches))
        
        ax.plot(times, pitches, 'o-', markersize=4)
        ax.set_title(f"Temperature = {temp}")
        ax.set_ylabel("MIDI Pitch")
        ax.set_ylim(60, 80)
        ax.grid(True, alpha=0.3)
    
    plt.xlabel("Note Index")
    plt.tight_layout()
    plt.show()

compare_temperatures(generator, 'Mayamalavagowla', ['S', 'R1', 'G3'])
```

## Section 7: Raga Grammar Validation

### Cell 7.1: Validation Pipeline

```python
from deepraaga_core.validation import RagaValidator

validator = RagaValidator()

# Validate generated sequence
results = validator.validate(
    sequence=generated,
    raga='Mayamalavagowla',
    checks=['arohana', 'avarohana', 'sanchara', 'apaswara']
)

print("Validation Results:")
for check, passed in results.items():
    status = "✓" if passed else "✗"
    print(f"  {status} {check}: {'PASS' if passed else 'FAIL'}")
```

### Cell 7.2: Sanchara Detection

```python
from deepraaga_core.patterns import SancharaDetector

detector = SancharaDetector()

# Detect characteristic phrases
sancharas = detector.find_sancharas(
    sequence=generated,
    raga='Mayamalavagowla',
    min_confidence=0.7
)

print(f"\nDetected Sancharas: {len(sancharas)}")
for s in sancharas[:5]:  # Show top 5
    print(f"  - {s['name']} (confidence: {s['confidence']:.2f})")
    print(f"    Notes: {' '.join(s['notes'])}")
```

## Section 8: Export and Playback

### Cell 8.1: MIDI Export

```python
from deepraaga_preprocess import sequence_to_midi

# Convert to MIDI file
midi_file = sequence_to_midi(
    sequence=generated,
    tempo=120,
    output_path="generated_raga.mid",
    add_pitch_bends=True
)

print(f"Exported to: {midi_file}")

# Download in Colab
from google.colab import files
files.download("generated_raga.mid")
```

### Cell 8.2: Audio Synthesis (Colab)

```python
# Convert MIDI to audio using FluidSynth
!apt-get install -y fluidsynth
!pip install pyfluidsynth

import fluidsynth

fs = fluidsynth.Synth()
fs.start()

# Load a Carnatic soundfont (download required)
sfid = fs.sfload("carnatic_soundfont.sf2")
fs.program_select(0, sfid, 0, 0)

# Play the generated MIDI
fs.midi_to_audio("generated_raga.mid", "generated_raga.wav")

# Play in notebook
from IPython.display import Audio
Audio("generated_raga.wav")
```

## Conclusion

The DeepRaaga Tutorial Notebook provides a complete educational pathway from installation to music generation. By working through each section, users gain:

1. **Theoretical Understanding**: How Carnatic music theory maps to computational structures
2. **Practical Skills**: Hands-on experience with ML pipelines for music
3. **Research Foundation**: Knowledge to extend the system for new ragas and applications

The notebook is designed to be:
- **Self-contained**: All dependencies installable via pip
- **Interactive**: Immediate visual and audio feedback
- **Extensible**: Modular cells that can be adapted for research

Continue your journey:
- Try different ragas from the 72 Melakarta catalog
- Experiment with model hyperparameters
- Contribute new compositions to the dataset

[Open the Notebook in Colab →](https://colab.research.google.com/github/sgmoorthy/naada/blob/master/examples/DeepRaaga_Tutorial.ipynb)
