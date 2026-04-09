# Join the Chorus: How to Contribute to DeepRaaga

DeepRaaga is an open-source initiative. Our mission is to digitize and preserve Indian Classical Music using AI, but a project of this scale cannot be built in a silo. We need the collaborative power of Machine Learning engineers, React developers, and Carnatic musicians to build this National Knowledge Repository.

![Open Source Collaboration](/DeepRaaga/blog-images/opensource_contribution.png)

## Who Are We Looking For?

Whether you write Python syntax or musical syntax, there is a place for you in the DeepRaaga repository:

### 1. The Musicologists (Data Contribution)
An AI is only as good as the data it learns from. Currently, our biggest bottleneck is perfectly quantized, annotated MIDI data of rare ragas and complex talas.
* **How to help:** If you are a musician, you can contribute by recording strict Arohana/Avarohana scales and Sancharas into your DAW (Logic, Ableton, FL Studio) and exporting them as MIDI files.
* **Reviewing outputs:** We need trained ears to review the outputs of our generative models and highlight *Apaswaras* (forbidden notes) so we can tune our reinforcement learning penalty weights.

### 2. The ML Engineers (Core Modeling)
If you eat TensorFlow and PyTorch for breakfast, we have complex architectural problems to solve.
* **How to help:** We are looking to transition parts of our `RagaLSTM` pipelines into Transformer-based architectures (e.g., MusicLM derivatives) to capture longer-range dependencies in *Alapanas*.
* **Tala-Awareness:** Help us build our new `Tala_Context_Vector` injection logic to allow rhythmically synced MIDI generation.

### 3. The Frontend Developers (UI/UX)
DeepRaaga's React interface is the bridge between our complex math and the end user.
* **How to help:** We want to build an interactive "Raga Sandbox." This involves heavy use of `Tone.js` and Web Audio APIs for real-time synthesis. If you are passionate about React, visualizations, and WebGL, we need help drawing real-time microtonal pitch graphs for students to compare against.

## Getting Started

Contributing is incredibly simple:
1. **Fork the Repository:** Head over to our [GitHub Repository](https://github.com/sgmoorthy/DeepRaaga) and click Fork.
2. **Setup the Environment:** Follow the `README.md` to spin up the FastAPI backend (`pip install -r requirements.txt`) and the Vite frontend (`npm install && npm run dev`).
3. **Pick an Issue:** Check out the `good-first-issue` labels on our GitHub boards.

Let’s harmonize our heritage together!
