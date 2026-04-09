# Inside the DeepRaaga Neural Engine: Code Internals

We often talk about the profound implications of merging Deep Learning with ancient musical grammar. Today, we're popping the hood to show you exactly how the DeepRaaga core models operate on a code level.

![DeepRaaga Code Internals](/DeepRaaga/blog-images/deepraaga_code_internals.png)

## 1. The Preprocessing Pipeline (`data_ingestion.py`)

Before a neural network can generate a Carnatic Sanchara, it must understand the raw audio. We don't feed raw waveform data (like `.wav` or `.mp3`) directly into our LSTM block; the dimensionality is too high to effectively parse logical raga grammar.

Instead, we extract semantic data:
```python
def extract_note_sequence(midi_path):
    """
    Parses complex MIDI files into Magenta NoteSequences,
    preserving pitch bends and gamaka arrays.
    """
    raw_sequence = midi_io.midi_file_to_note_sequence(midi_path)
    quantized_sequence = sequences_lib.quantize_note_sequence(raw_sequence, steps_per_quarter=4)
    return quantized_sequence
```
By utilizing `NoteSequence` protobufs, we structure the music into an array of discrete and continuous events, maintaining the microtonal bends essential to Carnatic ragas.

## 2. Raga-Conditioned LSTM Training Loop (`train_model.py`)

The magic behind DeepRaaga is the **Conditioning Vector**. We do not use a single monolithic model for all Indian music. We inject the *Raga_ID* straight into the LSTM state.

```python
# Pseudo-code for our conditioning block
class RagaLSTM(tf.keras.Model):
    def __init__(self, vocab_size, raga_classes):
        super(RagaLSTM, self).__init__()
        self.raga_embedding = tf.keras.layers.Embedding(raga_classes, 64)
        self.note_embedding = tf.keras.layers.Embedding(vocab_size, 128)
        self.lstm = tf.keras.layers.LSTM(256, return_sequences=True)
        self.dense = tf.keras.layers.Dense(vocab_size, activation='softmax')

    def call(self, inputs, raga_id):
        # The raga latent vector acts as a strong bias
        condition = self.raga_embedding(raga_id)
        x = self.note_embedding(inputs)
        
        # Inject context alongside the sequence data
        context_injected = tf.concat([x, condition], axis=-1)
        lstm_out = self.lstm(context_injected)
        return self.dense(lstm_out)
```
This forces the LSTM to constrain its probabilistic output strictly to the allowed *Arohana/Avarohana* of the injected context.

## 3. Real-Time Generation via FastAPI (`app.py`)

To make these models accessible on the web, we wrap the inference logic in an asynchronous FastAPI server. When you adjust the "Temperature" or "Raga" sliders on our React frontend, a REST call triggers the generation:

```python
@app.post("/api/generate")
async def generate_melody(request: GenerationRequest):
    raga_vector = get_raga_embedding(request.raga_name)
    seed_sequence = generate_seed(request.raga_name)
    
    # Run autoregressive generation
    output = model.generate(
        seed=seed_sequence, 
        condition=raga_vector, 
        temperature=request.temperature
    )
    
    return {"midi_data": sequence_to_midi_base64(output)}
```

By decoupling the Heavy ML operations from the frontend, DeepRaaga achieves ultra-fast inference while letting you play the generated MIDI results seamlessly through `Tone.js`.
