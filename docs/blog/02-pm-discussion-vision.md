# Harmonizing Heritage: AI-Driven Preservation of Indian Classical Music

In a landmark conversation between Prime Minister Narendra Modi and musician Ramesh Vinayakam, the focus was clear: India’s musical heritage needs a digital backbone. Vinayakam demonstrated that the "gamakas" (microtonal oscillations) of Carnatic music—long thought to be too fluid for Western notation—could be systematically captured.

[Watch the Discussion](https://www.youtube.com/watch?v=NynwiSIJmkE)

The vision set forth was the creation of a "complete knowledge repository" for the country. DeepRaaga is an open-source response to that call, bridging the gap between ancient melodic grammar and modern Deep Learning.

## The Challenge of Raga Logic
Unlike Western scales, a Raga is a living entity with strict melodic rules:

* **Arohana/Avarohana:** Specific patterns for ascending and descending.
* **Gamakas:** The curves between notes that define a Raga’s "soul."
* **Vadi/Samvadi:** High-significance notes that act as melodic anchors.

## DeepRaaga’s Technical Architecture
To move from raw audio to intelligent generation, DeepRaaga follows a specialized pipeline:

### 1. Data Transformation (The NoteSequence Pipeline)
The project utilizes MIDI and MusicXML as the primary data source. Using a NoteSequence format (pioneered by Magenta), we convert raw musical events into a structured protobuf-based representation.

* **Quantization:** Essential for aligning traditional performances to a temporal grid without losing the pitch-specific identity of the raga.

### 2. The Neural Engine: Raga-Conditioned LSTMs
At its core, DeepRaaga utilizes Recurrent Neural Networks (RNNs), specifically Long Short-Term Memory (LSTM) layers.

* **Sequential Learning:** LSTMs are uniquely suited for music because they "remember" the previous notes, allowing the model to follow the strict phraseology (Sancharas) of a raga.
* **Conditioning:** By passing a Raga_ID as a latent vector, the model is "conditioned" to stay within the boundaries of a specific scale, preventing the AI from "hallucinating" notes outside the permitted set.

### 3. Real-Time Interaction
The stack combines a Python/FastAPI backend (hosting the TensorFlow/PyTorch models) with a React-based frontend. This allows a user to select a Raga (e.g., Mayamalavagowla) and receive a generated MIDI sequence that can be played instantly via Tone.js in the browser.

## The Roadmap: The Science of Musicology
Aligned with the PM's vision of a "complete repository," DeepRaaga is evolving to include:

* **Melakarta Mapping:** Teaching the AI the relationship between parent and derived (Janya) ragas.
* **Tala-Awareness:** Integrating rhythmic cycle constraints so melody and rhythm are generated in sync.
* **Chronobiological Suggestions:** Implementing time-of-day logic to suggest ragas based on traditional performance windows.
