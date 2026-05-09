# DeepRaaga Technical Architecture: A Deep Dive

**Date:** May 9, 2026
**Author:** DeepRaaga Engineering Team

DeepRaaga represents a sophisticated fusion of traditional Carnatic music theory and cutting-edge machine learning. This article provides a comprehensive technical overview of the system architecture, explaining how we teach AI the intricate grammar of Indian classical music.

## System Architecture Overview

DeepRaaga is architected as a decoupled, microservices-based system with two primary subsystems:

```
┌─────────────────────────────────────────────────────────────┐
│                    DeepRaaga System                          │
├──────────────────────────┬──────────────────────────────────┤
│   Neural Backend (Python)│  Interaction Layer (React + Vite)│
│                          │                                  │
│  ┌────────────────────┐  │  ┌────────────────────────────┐  │
│  │ Data Ingestion     │  │  │ React 18 SPA               │  │
│  │ - MIDI/MusicXML    │  │  │ - Material UI 3            │  │
│  │ - NoteSequences    │  │  │ - Tone.js/WebMIDI          │  │
│  └────────────────────┘  │  │ - WaveSurfer.js            │  │
│                          │  └────────────────────────────┘  │
│  ┌────────────────────┐  │                                  │
│  │ Model Training     │  │  ┌────────────────────────────┐  │
│  │ - LSTM Networks    │  │  │ Blog System                │  │
│  │ - Attention Mech.  │  │  │ - Markdown-based           │  │
│  │ - Raga Conditioning│  │  │ - Client-side routing      │  │
│  └────────────────────┘  │  └────────────────────────────┘  │
│                          │                                  │
│  ┌────────────────────┐  │                                  │
│  │ FastAPI Server     │  │                                  │
│  │ - /api/generate    │  │                                  │
│  │ - /api/ragas       │  │                                  │
│  └────────────────────┘  │                                  │
└──────────────────────────┴──────────────────────────────────┘
```

## 1. Neural Backend (Python)

### 1.1 Data Ingestion Pipeline

The foundation of DeepRaaga lies in its ability to process symbolic music representations:

```python
# From data/convert_data.py
from deepraaga_preprocess import NoteSequenceConverter

converter = NoteSequenceConverter(
    quantization_grid=16,  # 16th note intervals
    preserve_pitch_bends=True,
    raga_validation=True
)

note_sequences = converter.process_directory(
    input_dir="data/raw/",
    output_file="data/processed/training.tfrecord"
)
```

**Key Features:**
- **Format Support**: MIDI (.mid, .midi) and MusicXML (.xml, .mxl)
- **Temporal Quantization**: Events snapped to 16th or 32nd note grids
- **Pitch Preservation**: Gamaka (microtonal oscillations) encoded as continuous pitch bend features
- **Raga Validation**: Automatic checking against Arohana/Avarohana rules

### 1.2 The 72 Melakarta Registry

Our dataset follows a standardized namespace structure:

```
data/DeepRaaga-Dataset/
└── Melakarta/
    ├── 01_Kanakangi/
    │   ├── midi/
    │   ├── musicxml/
    │   └── annotations/
    ├── 02_Ratnangi/
    ...
    └── 72_Rasikapriya/
```

Initialize with:
```bash
python data/melakarta_init.py
```

### 1.3 Model Architecture: Raga-Conditioned LSTM

The core generation model uses a specialized LSTM architecture:

```python
# Simplified model structure
class RagaConditionedLSTM(nn.Module):
    def __init__(self, vocab_size, raga_embed_dim, hidden_dim):
        super().__init__()
        self.swara_embedding = nn.Embedding(vocab_size, 128)
        self.raga_embedding = nn.Embedding(72, raga_embed_dim)
        self.lstm = nn.LSTM(
            input_size=128 + raga_embed_dim,
            hidden_size=hidden_dim,
            num_layers=3,
            dropout=0.3
        )
        self.output = nn.Linear(hidden_dim, vocab_size)
    
    def forward(self, swara_seq, raga_id):
        swara_emb = self.swara_embedding(swara_seq)
        raga_emb = self.raga_embedding(raga_id).expand(swara_seq.size(0), -1)
        combined = torch.cat([swara_emb, raga_emb], dim=-1)
        output, _ = self.lstm(combined)
        return self.output(output)
```

**Architecture Highlights:**
- **Dual Embedding**: Separate embeddings for swaras (notes) and ragas
- **Conditioning Vector**: Raga ID biases all LSTM gates
- **Layer Stacking**: 3-layer deep LSTM with 0.3 dropout
- **Autoregressive Generation**: Sampling conditioned on raga context

### 1.4 Training Pipeline

```python
# From train.py
python train.py \
    --data_dir=data/processed/ \
    --model_type=lstm_attention \
    --batch_size=32 \
    --epochs=100 \
    --raga_conditioning=True
```

**Training Features:**
- **Curriculum Learning**: Progressive exposure to complex ragas
- **Raga-Specific Batches**: Ensuring balanced representation
- **Teacher Forcing**: Ground truth conditioning during training
- **Validation**: Real-time raga grammar checking

### 1.5 REST API Layer

FastAPI provides the interface between models and frontend:

```python
# From app.py
from fastapi import FastAPI
from deepraaga_models import RagaGenerator

app = FastAPI()
generator = RagaGenerator.load("models/lstm_attention_v1.pt")

@app.post("/api/generate")
async def generate_raga(request: GenerationRequest):
    notes = generator.generate(
        raga=request.raga,
        duration=request.duration,
        temperature=request.temperature
    )
    return {"notes": notes, "raga": request.raga}
```

## 2. Interaction Layer (React + Vite)

### 2.1 Frontend Architecture

The React SPA is built with modern tooling:

- **Vite 5**: Lightning-fast HMR and optimized builds
- **React 18**: Concurrent features and automatic batching
- **Material UI 3**: Indian-themed design system
- **Tone.js**: Web Audio API synthesis
- **WebMIDI**: Hardware MIDI controller support

### 2.2 Component Hierarchy

```
App.jsx
├── Header.jsx (Navigation and branding)
├── Tabs (AI Demo | Documentation & Blog)
│   ├── RaagaGenerator.jsx (Main interface)
│   │   ├── Piano.jsx (Visual keyboard)
│   │   └── AudioVisualizer.jsx (Waveform display)
│   ├── CarnaticRagaInfo.jsx (Raga reference)
│   └── BlogViewer.jsx (Documentation)
│       ├── BlogFeed.jsx (Post grid)
│       └── BlogPost.jsx (Individual articles)
```

### 2.3 State Management

The RaagaGenerator component manages complex interaction state:

```javascript
// State hooks in RaagaGenerator.jsx
const [selectedRaga, setSelectedRaga] = useState('')
const [duration, setDuration] = useState(30)
const [temperature, setTemperature] = useState(1.0)
const [isGenerating, setIsGenerating] = useState(false)
const [isPlaying, setIsPlaying] = useState(false)
const [currentNote, setCurrentNote] = useState(null)
const [generatedNotes, setGeneratedNotes] = useState([])
```

### 2.4 Audio Pipeline

```javascript
// Piano.jsx Tone.js integration
const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "sine" },
  envelope: {
    attack: 0.05,
    decay: 0.3,
    sustain: 0.4,
    release: 0.8
  }
}).toDestination()

// Carnatic tuning: Just intonation ratios
const SWARA_RATIOS = {
  'S': 1/1,      // Sa
  'R1': 32/31,   // Ri1
  'R2': 16/15,   // Ri2/G1
  // ... etc
}
```

## 3. Raga Grammar Engine

### 3.1 Arohana/Avarohana Validation

Every generated sequence is validated against raga grammar rules:

```python
class RagaValidator:
    def __init__(self, raga_name):
        self.arohana = RAGA_CATALOG[raga_name]['arohana']
        self.avarohana = RAGA_CATALOG[raga_name]['avarohana']
    
    def validate_sequence(self, notes):
        """Check if sequence follows raga grammar"""
        for i, note in enumerate(notes):
            if not self._is_valid_transition(notes[i-1], note):
                return False, f"Invalid transition at position {i}"
        return True, "Valid raga sequence"
```

### 3.2 Sanchara Recognition

Characteristic melodic phrases are identified using pattern matching:

```python
def identify_sancharas(note_sequence, raga):
    """Extract characteristic phrases from generated music"""
    patterns = SANCHARA_DATABASE[raga]
    matches = []
    for pattern in patterns:
        if contains_pattern(note_sequence, pattern):
            matches.append(pattern)
    return matches
```

## 4. CI/CD & Deployment

### 4.1 GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx vite build --base=/DeepRaaga/
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4.2 PyPI Publishing

```bash
# Build and publish packages
python -m build packages/deepraaga-core/
python -m twine upload packages/deepraaga-core/dist/*
```

## 5. Performance Optimizations

### 5.1 Model Inference

- **TorchScript**: Compiled models for faster loading
- **Quantization**: INT8 weights for edge deployment
- **Caching**: Memoized raga embeddings

### 5.2 Frontend

- **Code Splitting**: Lazy-loaded blog components
- **Asset Optimization**: WebP images, compressed MIDI
- **Service Worker**: Offline capability for raga reference

## 6. Future Roadmap

### Phase 1: Melakarta Integration (Current)
- Complete 72 parent scales mapping
- Standardized dataset structure

### Phase 2: Tala-Awareness
- Adi Tala 8-beat cycle integration
- Rhythmic constraint satisfaction

### Phase 3: Transformer Infrastructure
- Causal transformer architecture
- MusicLM-style Alapana generation

### Phase 4: Open API
- Public REST API sandbox
- Rate-limited access for researchers

## Conclusion

DeepRaaga's architecture represents a careful balance between:
- **Computational rigor**: Validated ML pipelines
- **Musical authenticity**: Raga grammar preservation
- **Accessibility**: Simple PyPI installation
- **Extensibility**: Modular package design

The system is designed to grow with the community, incorporating feedback from musicologists and ML researchers alike. As we move toward the vision of a National Knowledge Repository for Indian music, DeepRaaga provides the technical foundation for this ambitious goal.

Explore the code:
- **GitHub**: [https://github.com/sgmoorthy/DeepRaaga](https://github.com/sgmoorthy/DeepRaaga)
- **PyPI**: `pip install deepraaga-core`
- **Docs**: [https://sgmoorthy.github.io/DeepRaaga](https://sgmoorthy.github.io/DeepRaaga)
