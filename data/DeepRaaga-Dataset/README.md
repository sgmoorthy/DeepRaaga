# DeepRaaga Open Dataset Standard

*The highest quality open benchmark repository for Carnatic Artificial Intelligence.*

## Structure
To solve the data bottleneck in Carnatic AI, we've standardized the **72 Melakarta Raga** classification hierarchy. Our dataset strictly adheres to this numerical schema to power supervised and un-supervised machine learning tools.

Each Raga is segmented into:
- `/midi`: Heavily quantized performance midi encapsulating timing and pitch.
- `/musicxml`: Structured sheet data for discrete melodic processing.
- `/annotations`: CSVs detailing *Arohana/Avarohana* limits, phrase bounds, and gamaka approximations.

## Contributing
We welcome contributions. To commit a new performance track:
1. Ensure the track is strictly bound to its parent Raga with minimal foreign Sancharas.
2. Drop it into the corresponding `Melakarta/ID_Name/midi` folder.
3. Open a Pull Request!
