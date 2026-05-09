# DeepRaaga Technical Demo Video Script

## Video Metadata
- **Title**: "DeepRaaga: AI-Powered Carnatic Music Generation - Technical Demo"
- **Description**: DeepRaaga is an open-source AI framework for learning and generating Carnatic ragas. This technical demo shows how we use deep neural networks (LSTM + Attention) to understand the grammar of Indian classical music.
- **Tags**: DeepRaaga, Carnatic Music, AI Music Generation, LSTM, Deep Learning, Indian Classical Music, Music AI, TensorFlow, Magenta
- **Target Duration**: 5-7 minutes

---

## Scene 1: Introduction (0:00 - 0:45)

**Visual**: DeepRaaga logo animation + title card

**Narration**:
> "Welcome to DeepRaaga - an AI framework that learns and generates Carnatic ragas using deep neural networks. Carnatic music, one of the world's oldest musical traditions, has intricate grammatical rules that govern how ragas are structured. Today, I'll show you how DeepRaaga uses artificial intelligence to understand and create authentic Carnatic music."

**On-screen text**:
- DeepRaaga: AI for Carnatic Music
- 72 Melakarta Ragas
- LSTM + Attention Neural Networks
- Open Source on GitHub

---

## Scene 2: The Challenge (0:45 - 1:30)

**Visual**: Split screen - Traditional notation vs AI model diagram

**Narration**:
> "Carnatic music is not just about notes - it's about grammar. Every raga has strict rules: the ascending scale called Arohana, the descending scale called Avarohana, and characteristic phrases known as Sancharas. Traditional AI music models fail here because they treat music as random notes. DeepRaaga encodes these grammatical constraints directly into the neural network."

**On-screen diagrams**:
- Arohana/Avarohana scale diagrams for Mayamalavagowla
- Forbidden notes (Apaswaras) highlighted in red
- Sanchara phrase examples

---

## Scene 3: Architecture Overview (1:30 - 2:45)

**Visual**: System architecture diagram with animated data flow

**Narration**:
> "DeepRaaga has two main components. The backend uses Python with TensorFlow and Magenta for the neural network. The frontend is a React application with a piano interface and audio visualization. The core innovation is our Raga-Conditioned LSTM architecture."

**Technical diagram showing**:
```
MIDI Input → NoteSequence Converter → LSTM Encoder → Attention Mechanism → Raga Condition Vector → Note Generator → MIDI Output
```

**Narration continues**:
> "We convert MIDI files into NoteSequences - Google's symbolic music format. Each note includes pitch, timing, and crucially, pitch bends for Gamakas - those microtonal oscillations that define Carnatic music."

---

## Scene 4: The Model - Deep Dive (2:45 - 4:00)

**Visual**: Code snippets + animated model architecture

**Narration**:
> "Our model uses a 3-layer LSTM with 256 hidden units. But here's the key: we inject a Raga Condition Vector at every timestep. This vector biases the LSTM's gates to favor notes that belong to the target raga."

**Show code**:
```python
# Raga-conditioned LSTM cell
class RagaLSTM(nn.Module):
    def forward(self, swara_seq, raga_id):
        swara_emb = self.swara_embedding(swara_seq)  # 128-dim
        raga_emb = self.raga_embedding(raga_id)      # 64-dim
        combined = torch.cat([swara_emb, raga_emb], dim=-1)
        output, _ = self.lstm(combined)
        return self.output(output)
```

**Narration**:
> "The attention mechanism helps the model learn long-range dependencies - essential for capturing the structure of a Carnatic composition. We train on sequences of 128 notes, with curriculum learning that gradually introduces more complex ragas."

---

## Scene 5: Training Process (4:00 - 4:45)

**Visual**: Training loss graph + model checkpoint saves

**Narration**:
> "Training happens on the 72 Melakarta ragas - the parent scales of Carnatic music. We use categorical cross-entropy loss with a validation check: generated sequences must pass Arohana/Avarohana validation. If the model suggests a forbidden note, we penalize it heavily."

**Show training metrics**:
- Epoch: 50/100
- Loss: 0.847
- Validation Accuracy: 94.2%
- Raga Grammar Compliance: 96.8%

**Narration**:
> "After 50 epochs, our model achieves 94% validation accuracy with 96% grammar compliance. Each training run generates checkpoints that we can load for inference."

---

## Scene 6: Live Demo - Generating a Raga (4:45 - 5:45)

**Visual**: Screen recording of DeepRaaga web interface

**Narration**:
> "Now let's see it in action. I'm selecting Mayamalavagowla - the 15th Melakarta raga. You can see the Arohana and Avarohana scales displayed. I'll set the temperature to 0.8 for balanced creativity."

**Actions shown**:
1. Select "Mayamalavagowla" from dropdown
2. Set temperature slider to 0.8
3. Set duration to 64 notes
4. Click "Generate"
5. Watch piano keys animate with generated notes

**Narration**:
> "The model generates 64 notes following Mayamalavagowla grammar. Watch the piano visualization - each highlighted key corresponds to a generated note. The sequence respects the ascending and descending scale rules automatically."

---

## Scene 7: Validation & Output (5:45 - 6:15)

**Visual**: Generated sequence display + MIDI export

**Narration**:
> "The generated sequence is automatically validated against raga grammar. Here we can see: Arohana valid - check. Avarohana valid - check. No forbidden notes detected. The output can be exported as MIDI for playback in any music software, or used directly in our web player."

**Show on screen**:
- Generated notes: S R1 G3 M1 P D1 N3 S'...
- Validation: ✓ Arohana, ✓ Avarohana, ✓ Sanchara detected
- Export buttons: "Download MIDI", "Play Audio"

---

## Scene 8: PyPI Package & API (6:15 - 6:45)

**Visual**: Terminal recording showing pip install and API usage

**Narration**:
> "DeepRaaga is available as a PyPI package. Install with pip install deepraaga-core deepraaga-models. The package includes a FastAPI server for REST endpoints. Start the server with one command: deepraaga-api --port 8000. Now any application can generate ragas via HTTP requests."

**Show commands**:
```bash
pip install deepraaga-core deepraaga-models deepraaga-api
python -c "from deepraaga import generate; print(generate('Bhairavi', 32))"
deepraaga-api --port 8000
```

---

## Scene 9: Conclusion & Call to Action (6:45 - 7:00)

**Visual**: GitHub repo screenshot + contribution guidelines

**Narration**:
> "DeepRaaga is open source. We welcome contributions from musicologists, ML engineers, and developers. Visit github.com/sgmoorthy/DeepRaaga to explore the code, try the demo, or contribute to our National Knowledge Repository for Indian music. Thank you for watching."

**On-screen links**:
- GitHub: github.com/sgmoorthy/DeepRaaga
- PyPI: pip install deepraaga-core
- Live Demo: sgmoorthy.github.io/DeepRaaga

---

## Recording Tips

1. **Screen Recording**: Use OBS Studio or similar
2. **Audio**: Record narration separately for clarity
3. **Code Highlights**: Use VS Code with Carnatic-themed colors
4. **Music**: Include short generated raga samples (10-15 seconds)
5. **Captions**: Add subtitles for accessibility

## Video Chapters
- 0:00 Introduction
- 0:45 The Challenge
- 1:30 Architecture
- 2:45 The Model
- 4:00 Training
- 4:45 Live Demo
- 5:45 Validation
- 6:15 PyPI Package
- 6:45 Conclusion

## Music Samples to Include
Include 10-15 second clips of:
- Original training MIDI (Mayamalavagowla)
- AI-generated sequence (same raga)
- Comparison showing grammar compliance

---

*Generated for DeepRaaga - https://github.com/sgmoorthy/DeepRaaga*
