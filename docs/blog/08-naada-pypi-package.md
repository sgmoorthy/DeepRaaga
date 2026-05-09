# Introducing naada: The PyPI Package for Carnatic AI

**Date:** May 9, 2026
**Author:** DeepRaaga Core Team

We are thrilled to announce the release of **naada** (नाद) — a comprehensive PyPI package ecosystem that brings the power of DeepRaaga's Carnatic music AI directly to your Python environment.

## What is naada?

> *"naada (नाद) — Sanskrit for the primordial vibration from which all music descends"*

naada is the official PyPI distribution of the DeepRaaga framework, providing researchers, musicians, and developers with easy access to state-of-the-art AI models trained on Carnatic music traditions. Whether you're a data scientist exploring music generation or a musician seeking computational assistance, naada bridges the gap between traditional Indian classical music and modern machine learning.

## Package Architecture

naada is organized as a modular package suite, allowing you to install only what you need:

| Package | Purpose | Install Command |
|---------|---------|----------------|
| `deepraaga-core` | Base models and data structures | `pip install deepraaga-core` |
| `deepraaga-preprocess` | Data processing and MIDI conversion | `pip install deepraaga-preprocess` |
| `deepraaga-models` | Neural networks and training | `pip install deepraaga-models` |
| `deepraaga-api` | REST API server | `pip install deepraaga-api` |

### Quick Installation

Install all packages at once:

```bash
pip install deepraaga-core deepraaga-preprocess deepraaga-models deepraaga-api
```

Or install individually based on your needs:

```bash
# For model inference only
pip install deepraaga-core deepraaga-models

# For data processing workflows
pip install deepraaga-core deepraaga-preprocess

# For full API server deployment
pip install deepraaga-api
```

## Quick Start Guide

### 1. Start the API Server

The fastest way to get started is using the pre-built API server:

```bash
pip install deepraaga-api
deepraaga-api --port 8000
```

Your API will be running at `http://localhost:8000` with interactive documentation at `http://localhost:8000/docs`.

### 2. Generate Your First Raga

```python
from deepraaga_core import RagaGenerator
from deepraaga_models import LSTMModel

# Initialize the generator
generator = RagaGenerator(model=LSTMModel())

# Generate a Mayamalavagowla sequence
notes = generator.generate(
    raga="Mayamalavagowla",
    duration=64,
    temperature=0.8
)

print(f"Generated sequence: {notes}")
```

### 3. Convert to MIDI

```python
from deepraaga_preprocess import NoteSequenceConverter

converter = NoteSequenceConverter()
midi_file = converter.to_midi(notes, output_path="my_raga.mid")
```

## GitHub Repository

The complete source code, including the React frontend and example notebooks, is available on GitHub:

**[https://github.com/sgmoorthy/naada](https://github.com/sgmoorthy/naada)**

The repository includes:
- Full-stack development setup
- Jupyter tutorial notebooks
- Dataset scaffolding tools
- Contributing guidelines

## Tutorial Notebook

For a hands-on introduction, explore our comprehensive tutorial notebook:

**[DeepRaaga_Tutorial.ipynb](https://github.com/sgmoorthy/naada/blob/master/examples/DeepRaaga_Tutorial.ipynb)**

Run it directly in Google Colab:
[https://colab.research.google.com/github/sgmoorthy/naada/blob/master/examples/DeepRaaga_Tutorial.ipynb](https://colab.research.google.com/github/sgmoorthy/naada/blob/master/examples/DeepRaaga_Tutorial.ipynb)

## Why naada?

1. **Modular Design**: Install only what you need, keeping dependencies minimal
2. **Production Ready**: Pre-trained models available immediately via PyPI
3. **Research Friendly**: Full access to model internals for academic research
4. **Community Driven**: Open source with contributions from musicologists and ML engineers

## Roadmap

- **v0.1** — Core LSTM+Attention model, 72 Melakarta scaffold, React SPA, GitHub Pages
- **v0.2** — Raga grammar validation layer, Gamaka notation in annotations
- **v0.3** — Tala / rhythmic awareness (Adi Tala 8-beat cycle)
- **v0.4** — Transformer upgrade (causal, MusicLM-style Alapana generation)
- **v1.0** — Open REST API sandbox + PyPI stable release

## Join the Community

We welcome contributions from:
- **Musicologists** — Raga grammar expertise and annotation validation
- **ML Engineers** — Model improvements and training optimizations
- **React Developers** — Frontend enhancements and UI/UX improvements

```bash
git checkout -b feature/your-raga-magic
git commit -m "feat: add Bhairavi gamaka annotations"
git push origin feature/your-raga-magic
# → Open a Pull Request!
```

## Academic Citation

If you use naada in your research:

```bibtex
@software{swaminathan2026naada,
  author = {Gurumurthy Swaminathan},
  title = {naada: An AI Framework for Learning and Generating Carnatic Ragas},
  year = {2026},
  url = {https://github.com/sgmoorthy/naada},
  note = {PyPI: https://pypi.org/project/deepraaga-core/}
}
```

Install naada today and begin your journey into AI-powered Carnatic music generation!

```bash
pip install deepraaga-core deepraaga-models
```
