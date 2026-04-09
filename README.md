<div align="center">
  
# 🎵 DeepRaaga 

**An AI Framework for Learning and Generating Carnatic Ragas**

![UI Screenshot](images/deepraga_ui.png)

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00?logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![CI/CD](https://github.com/sgmoorthy/DeepRaaga/actions/workflows/deploy.yml/badge.svg)](https://github.com/sgmoorthy/DeepRaaga/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

*DeepRaaga is an open-source platform dedicated to modeling the intricate structural beauty of Carnatic music using Artificial Intelligence. By harmonizing traditional heritage with modern machine learning paradigms, we strive to build a computational bridge to India's rich musical legacy.*

</div>

---

## 🌟 Vision: A National Knowledge Repository

Inspired by the visionary dialogue between PM Narendra Modi and veteran composer Ramesh Vinayakam on creating a "National Knowledge Repository" for Indian music, DeepRaaga stands as a foundational step toward that goal.

Carnatic music cannot be reduced to simple discrete notes; it is defined by the continuous, microtonal inflections (**Gamakas**), characteristic melodic pathways (**Sancharas**), and the strict grammatical constraints of ascending (**Arohana**) and descending (**Avarohana**) scales. Our mission is to encode this profound acoustic heritage into robust AI models, moving beyond Western-centric MIR (Music Information Retrieval) to create an open platform that respects, preserves, and innovates upon the grammar of Indian Classical Music.

---

## 🏗️ System Architecture

The project is decoupled into two primary subsystems to ensure scalability and rapid inference:

### 1. Neural Backend (Python)
- **Environment Requirement:** Python 3.10+
- **Data Ingestion:** Conversion of Carnatic compositions (MIDI, MusicXML) into `NoteSequence` and `TFRecord` formats holding deep arrays of pitch bends and timing.
- **Deep Learning Core:** Training of sequence models (RNN/LSTM or Transformer-style) heavily conditioned on specific Raga constraints.
- **Microservices:** A FastAPI/Flask REST layer to expose the `.generate()` methods via endpoints.

### 2. Interaction Layer (React + Vite)
- **Technology Stack:** React 18, Vite 5, Material UI 3
- **Usage:** A modern, glassmorphic Single Page Application (SPA) offering visual generation tools, Raga playback via WebMIDI/Tone.js, and an integrated technical blog.

---

## 🚀 Installation & Local Development

### 🐍 Backend setup (Python 3.10+)

```bash
git clone https://github.com/sgmoorthy/DeepRaaga.git
cd DeepRaaga

# Initialize virtual environment
python -m venv .venv

# Activate environment
source .venv/bin/activate       # Unix/macOS
.\.venv\Scripts\activate        # Windows

# Install ML Dependencies
pip install -r requirements.txt
```
*(Dependencies include `TensorFlow`, `Magenta`, `librosa`, `pretty-midi`, and `FastAPI`)*

### ⚛️ Frontend Setup (React)

```bash
# Install exact dependencies
npm install 

# Spin up high-speed local dev server
npm run dev

# Compile for production
npm run build
```

---

## ⚙️ CI/CD & Automated Deployment

DeepRaaga utilizes robust **GitHub Actions** pipelines to automate testing and deployments natively.

**The Workflow (`.github/workflows/deploy.yml`):**
1. **Trigger:** Activated automatically upon merging code into the `master` branch.
2. **Environment:** Spins up an `ubuntu-latest` container running Node.js.
3. **Build:** Installs dependencies cleanly utilizing `npm ci` and compiles the React application utilizing `npx vite build --base=/DeepRaaga/`.
4. **Deploy:** Artifacts are packaged and pushed directly to the `gh-pages` branch, instantly updating the lived production URL.

*(Note: Contributors do not need to manually push a build. Simply open a PR against `master` and the CI/CD pipeline handles it!)*

---

## 📖 Documentation & The Keyword Blog

DeepRaaga ships with a fully integrated, beautifully stylized publishing platform structurally inspired by Google's *"The Keyword"* blog. 

The frontend incorporates a dynamically mapped Client-Side Router that leverages raw `.md` (Markdown) data without requiring a dedicated backend database. 

### Writing a New Blog Post
1. **Create your Markdown file:** Add your technical writing to `docs/blog/your-new-post.md`.
2. **Handle Media Natively:** Use standard Markdown image syntax (`![alt](/DeepRaaga/blog-images/img.png)`). For YouTube videos, standard hyperlink anchor tags (`[Video](https://www.youtube.com/watch?v=VIDEO_ID)`) are dynamically intercepted by our custom React Markdown engine and converted into secure, auto-responsive `<iframe>` embeds.
3. **Register your Post:** Open `src/components/BlogViewer.jsx` and add your metadata to the `blogs` manifest array:
```javascript
import newPost from '../../docs/blog/your-new-post.md?raw';

{
  slug: 'your-new-post',
  title: 'Your Premium Title Here',
  category: 'Engineering',
  date: 'April 15, 2026',
  image: '/DeepRaaga/blog-images/feature.png', 
  description: 'A brief description that appears on the feed card.',
  content: newPost
}
```
Vite will automatically hot-reload your new post into the responsive grid feed!

---

## 🧠 ML Data Pipeline & Models

### Preprocessing
Data must be grouped by raga under `data/raw/` in MIDI format. To quantize and prepare the data for TensorFlow:
```bash
python data/convert_data.py
```

### Raga-Conditioned Autoregressive Generation
Generation is performed by autoregressively sampling from the trained sequence model while conditioning on a specific Raga Latent Vector:
```bash
python generate.py --raga="Bhairavi" --duration=300 --temperature=0.8
```

---

## 🗺️ Project Roadmap

Building the ultimate AI framework for Carnatic music is an ongoing journey:

- [ ] **Phase 1: Melakarta Integration:** Map all 72 parent scales explicitly.
- [ ] **Phase 2: Rhythmic Tala-Awareness:** Introduce chronological constraints so models respect the 8-beat structure of cycles like *Adi Tala*.
- [ ] **Phase 3: Transformer Infrastructure:** Upgrade baseline `RagaLSTM` nodes to causal Transformers (e.g., MusicLM variants) for improved *Alapana* continuity.
- [ ] **Phase 4: Open API Sandbox:** Offer a real-time web REST API for digital musicians.

---

## 🤝 Contributing

We rely on **Musicologists**, **ML Engineers**, and **React Developers** to build this repository. See our detailed breakdown of roles in [How to Contribute to DeepRaaga](https://github.com/sgmoorthy/DeepRaaga/tree/master/docs/blog/06-how-to-contribute.md). 

1. **Fork** the repo!
2. Create your feature branch: `git checkout -b feature/carnatic-magic`
3. Push to the branch: `git push origin feature/carnatic-magic`
4. Submit a **Pull Request**.

---

## 📜 Academic Citation

If you use DeepRaaga in academic work, please cite the associated paper:
```bibtex
@inproceedings{swaminathan2025deepraaga,
  author = {Gurumurthy Swaminathan},
  title = {DeepRaaga: Learning and Generating Carnatic Ragas with Deep Neural Sequence Models},
  year = {2026},
  booktitle = {Proceedings of the Audio Engineering Society}
}
```

---
<div align="center">
  <strong>DeepRaaga</strong> is an open-source platform created and managed by <strong>Gurumurthy Swaminathan</strong>.<br><br>
  Released under the <a href="LICENSE">MIT License</a>.
</div>