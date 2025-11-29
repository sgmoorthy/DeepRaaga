# Deep Raaga Project Description

**DeepRaaga** is aimed to teach & train AI with Indian classical music and to generate classical ragas ,and to see how AI having fun with Carnatic music. 

## Traditional Carnatic Instruments
Carnatic music is enriched by its traditional instruments that create its unique sound. Here are some key instruments:

<div style="display: flex; justify-content: space-around; margin: 20px 0;">
  <div style="text-align: center;">
    <img src="/images/carnatic/veena.jpg" alt="Veena" height="200" width="200" style="border-radius: 10px;">
    <p><strong>Veena</strong> - A plucked string instrument fundamental to Carnatic music</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/carnatic/mridangam.jpg" alt="Mridangam" height="200" width="200" style="border-radius: 10px;">
    <p><strong>Mridangam</strong> - The primary rhythmic accompaniment in Carnatic music</p>
  </div>
</div>

<br>Tools  </br>
<img src = "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" height="48" width="48">
<img src = "https://magenta.tensorflow.org/assets/magenta-logo-bottom-text.png" height="48" width="48">


## Following are the proposed steps 

### 1. Environment Setup
Includes package installation for sequence synthesis. May take a few minutes.

- with Docker ?? (TBD)


### 2. Building your Dataset
use convert_dir_to_note_sequences.py
[link]( https://github.com/tensorflow/magenta/tree/master/magenta/scripts)


>Converts music files to NoteSequence protos and writes TFRecord file.
>Currently supports MIDI (.mid, .midi) and MusicXML (.xml, .mxl) files.
<br>Example usage: </br>
 ' $ python magenta/scripts/convert_dir_to_note_sequences.py \
    --input_dir=/path/to/input/dir \
    --output_file=/path/to/tfrecord/file \
    --log=INFO '


### 3. Train your model and evaluate

### 4. Generating performance

### 5. UI screens and presentation

### 6. ineracting with trained model

### 7. Building API interface for the trained model


### Refer Wiki page for more details

- [Wiki](https://github.com/sgmoorthy/DeepRaaga/wiki)
