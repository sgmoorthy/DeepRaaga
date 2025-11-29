# DeepRaaga 🎵

An AI-powered project to explore and generate Indian Carnatic music using deep learning.

## Project Overview

DeepRaaga is an innovative project that combines artificial intelligence with the rich traditions of Indian Carnatic music. The project aims to teach AI the intricate patterns and structures of Carnatic ragas, enabling it to generate authentic classical compositions while preserving the fundamental rules and aesthetics of this ancient art form.

## Technical Stack

- **TensorFlow** - Core deep learning framework
- **Magenta** - Music generation library by Google
- **Python** - Primary programming language
- **Libraries**:
  - numpy - Numerical computations
  - pretty-midi - MIDI file processing
  - librosa - Music and audio analysis
  - midi2audio - MIDI to audio conversion
  - fluidsynth - Software synthesizer

## Project Structure

```
├── data/                  # Data processing and storage
│   ├── raw/              # Raw MIDI and MusicXML files
│   └── processed/        # Processed TFRecord files
├── model/                # Model architecture and training
├── base/                 # Base classes and utilities
├── docs/                 # Documentation
├── results/              # Generated music outputs
└── test/                 # Test cases
```

## Workflow

1. **Data Preparation**
   - Convert MIDI and MusicXML files to NoteSequence protos
   - Create TFRecord datasets for training
   - Implement data augmentation and preprocessing

2. **Model Training**
   - Train the model on processed Carnatic music datasets
   - Fine-tune parameters for authentic raga generation
   - Evaluate model performance

3. **Music Generation**
   - Generate new compositions based on learned patterns
   - Convert generated sequences to MIDI/audio
   - Validate output against Carnatic music rules

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/DeepRaaga.git
   cd DeepRaaga
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Prepare your dataset**:
   ```bash
   python data/convert_data.py
   ```
   This script converts MIDI and MusicXML files to the required format.

2. **Train the model**:
   ```bash
   python model/basic_model.py
   ```

3. **Generate music**:
   ```bash
   # Coming soon
   python generate.py --raga="Bhairavi" --duration=300
   ```

## Planned Features

1. **Enhanced Raga Support**
   - Expand the model to support more complex ragas
   - Implement raga-specific rules and constraints
   - Add support for different time signatures
   - Develop multi-raga fusion capabilities
   - Improve voice-like qualities in generated music

2. **Interactive Interface**
   - Web-based UI for music generation
   - Real-time parameter adjustment
   - Visual representation of generated music
   - Advanced waveform and notation visualization
   - Recording and input capabilities
   - Collaborative features for musicians

3. **Technical Improvements**
   - Real-time music generation
   - REST API endpoints for model integration
   - Performance optimization for faster generation
   - Extended dataset support
   - Model fine-tuning capabilities
   - Cross-platform compatibility

4. **Educational Features**
   - Interactive raga learning modules
   - Pattern recognition tutorials
   - Composition analysis tools
   - Historical context integration
   - Practice assistance features

5. **Advanced Generation Controls**
   - Tempo and rhythm adjustments
   - Dynamic emotion mapping
   - Style transfer between ragas
   - Custom composition rules
   - Instrument voice separation

6. **Community Features**
   - User composition sharing
   - Collaborative composition tools
   - Feedback and rating system
   - Community challenges and events
   - Resource sharing platform

3. **Advanced Generation Features**
   - Multi-instrument support
   - Tempo and style transfer
   - Collaborative music generation

4. **API Integration**
   - RESTful API for model interaction
   - Cloud deployment support
   - Integration with music production tools

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- TensorFlow Magenta team for their groundbreaking work in music generation
- The Indian classical music community for preserving and sharing this rich tradition

## Contact

For questions and feedback, please open an issue or reach out to the project maintainers.

---

For more detailed information, please visit our [Wiki](https://github.com/sgmoorthy/DeepRaaga/wiki).
