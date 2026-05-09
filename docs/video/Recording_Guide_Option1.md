# DeepRaaga Technical Demo - Recording Guide (Option 1)

## Pre-Recording Checklist

### 1. Setup Recording Environment
- [ ] Download and install **OBS Studio** (free): https://obsproject.com/
- [ ] OR use **ScreenRec** (free, no watermark): https://screenrec.com/
- [ ] Test microphone - clear audio with no background noise
- [ ] Close unnecessary applications (email, notifications)
- [ ] Set screen resolution to 1920x1080 (Full HD)

### 2. Prepare Demo Environment
```bash
# Start the development server
cd d:\projects\deepRaaga\DeepRaaga
npm run dev

# Open browser at http://localhost:3000
# Ensure all 72 ragas are visible in dropdown
```

### 3. Have These Windows Ready
- Browser (Chrome/Edge) - DeepRaaga web app at localhost:3000
- VS Code - with DeepRaaga code open
- Notepad/Notes - with your script for reference

---

## Recording Setup in OBS

### Scene Configuration
**Scene 1: "Full Screen Demo"**
- Source: Display Capture (your monitor)
- Audio: Microphone

**Scene 2: "VS Code Code"**
- Source: Window Capture (VS Code)

**Scene 3: "Web Interface"**
- Source: Browser Window

### Recording Settings
- **Format**: MP4
- **Resolution**: 1920x1080
- **FPS**: 30
- **Bitrate**: 4000 Kbps

---

## Scene-by-Scene Recording Instructions

### 🎬 SCENE 1: Introduction (0:00-0:45)

**What to show**: DeepRaaga web interface with the AI Demo tab open

**Steps**:
1. Open Chrome to `http://localhost:3000`
2. Maximize browser window
3. Make sure "How DeepRaaga Works" section is visible
4. Start recording
5. Read the introduction from the script

**Narration** (read this):
> "Welcome to DeepRaaga - an AI framework that learns and generates Carnatic ragas using deep neural networks. Carnatic music, one of the world's oldest musical traditions, has intricate grammatical rules. Today, I'll show you how DeepRaaga uses AI to understand and create authentic Carnatic music."

**Visual cue**: Show the full web interface with the 72 Melakarta dropdown

---

### 🎬 SCENE 2: Live Generation Demo (0:45-2:30)

**What to do**:
1. **Select a Raga** from dropdown:
   - Click dropdown
   - Scroll to "Mayamalavagowla" (15th in list)
   - Click to select

2. **Show the workflow section**:
   - Scroll up to show "How DeepRaaga Works" card
   - Point mouse at each workflow step (1-5)

3. **Generate Music**:
   - Temperature: 0.8
   - Length: 64 notes
   - Click "Generate & Play"
   - **Wait for piano animation to play**
   - Let 5-6 notes play (about 10 seconds)
   - Click "Stop"

4. **Show generated output**:
   - Scroll down to show "Generated Sequence" box
   - Highlight the note sequence text

**Narration**:
> "I'm selecting Mayamalavagowla - the 15th Melakarta raga. You can see our five-step pipeline: MIDI preprocessing, NoteSequence conversion, LSTM training with attention, Raga grammar validation, and real-time generation. Now I'll generate a 64-note sequence. Watch the piano keys - each highlighted key is an AI-generated note following Mayamalavagowla's grammar rules."

---

### 🎬 SCENE 3: Show the Code (2:30-4:00)

**Switch to VS Code** (press Alt+Tab or click VS Code)

**Show these files in order**:

1. **Open `src/components/RaagaGenerator.jsx`**
   - Scroll to show the RAGAS array (72 Melakarta list)
   - Highlight a few lines showing the raga names

2. **Open `src/components/Piano.jsx`** (if it exists)
   - Show the piano key rendering code

3. **Open `docs/blog/01-deep-dive-ai-carnatic.md`**
   - Show the technical architecture description

**Narration**:
> "Let's look under the hood. The frontend is built with React and Vite. We have all 72 Melakarta ragas defined as constants. The Piano component renders interactive keys that animate during playback. The architecture follows Google's Magenta approach - converting symbolic music into neural network predictions."

---

### 🎬 SCENE 4: PyPI Package Demo (4:00-5:00)

**Open Terminal/Command Prompt**:

Type these commands (slowly, one by one):

```bash
# Clear screen first
cls

# Show installation
echo "Installing DeepRaaga from PyPI..."
pip install deepraaga-core deepraaga-models

# Show successful install
```

**Then open Python interactive shell**:
```bash
python
```

**Type these Python commands**:
```python
# Type this line
from deepraaga_core import RagaGenerator

# Press Enter

# Type this line  
print("DeepRaaga loaded successfully")

# Press Enter

# Exit Python
exit()
```

**Narration**:
> "DeepRaaga is available as a PyPI package. Install it with pip install deepraaga-core deepraaga-models. The Python API lets you generate ragas programmatically. Here's a quick example importing the RagaGenerator class."

---

### 🎬 SCENE 5: Blog & Documentation (5:00-5:45)

**Back to Browser**:
1. Click "Documentation & Blog" tab
2. Scroll through the blog cards
3. Click on one blog post (e.g., "Introducing naada")
4. Scroll through the content
5. Go back to blog list

**Narration**:
> "The project includes comprehensive documentation. Our blog covers technical deep-dives, the naada PyPI package announcement, and tutorials. Everything is open source and community-driven."

---

### 🎬 SCENE 6: Conclusion (5:45-6:30)

**Back to AI Demo page**:
1. Show the full interface one more time
2. Generate a quick 32-note sequence in a different raga (e.g., "Bhairavi")
3. Let it play for 3-4 notes
4. Stop

**Narration**:
> "DeepRaaga bridges traditional Carnatic music with modern AI. Whether you're a musicologist, developer, or student, you can explore, contribute, and create. Visit github.com/sgmoorthy/DeepRaaga to get started. Thank you for watching!"

---

## Post-Recording Steps

### 1. Review Footage
- [ ] Check audio quality (no background noise)
- [ ] Verify all text is readable
- [ ] Ensure smooth transitions
- [ ] Trim dead air at start/end

### 2. Basic Editing (Free Tools)
**Option A: Windows Photos App**
1. Right-click MP4 → Open with → Photos
2. Click "Edit & Create" → "Trim"
3. Adjust start/end points
4. Save as new video

**Option B: Clipchamp (Windows 11)**
1. Built-in video editor
2. Drag clips to timeline
3. Add text overlays if needed
4. Export at 1080p

### 3. Add Simple Title Card (Optional)
- First 3 seconds: Static image with:
  - DeepRaaga logo
  - Text: "DeepRaaga Technical Demo"
  - Text: "AI-Powered Carnatic Music Generation"

### 4. Export Settings
- **Format**: MP4
- **Resolution**: 1920x1080
- **Bitrate**: 5-8 Mbps
- **File size target**: Under 500MB for easy upload

---

## Upload to YouTube

### 1. YouTube Studio Settings
- **Title**: `DeepRaaga: AI-Powered Carnatic Music Generation - Technical Demo`
- **Description**:
```
DeepRaaga is an open-source AI framework for learning and generating Carnatic ragas using deep neural networks (LSTM + Attention).

🎵 Features:
• 72 Melakarta Ragas support
• Raga grammar validation (Arohana/Avarohana)
• Real-time music generation
• PyPI package available

📦 Installation:
pip install deepraaga-core deepraaga-models

🔗 Links:
• GitHub: https://github.com/sgmoorthy/DeepRaaga
• Live Demo: https://sgmoorthy.github.io/DeepRaaga
• PyPI: https://pypi.org/project/deepraaga-core
• Documentation: https://sgmoorthy.github.io/DeepRaaga/blog

🎥 This demo shows:
0:00 - Introduction
0:45 - Live generation with Mayamalavagowla raga
2:30 - Code architecture walkthrough
4:00 - PyPI package installation
5:00 - Blog and documentation
5:45 - Conclusion

#DeepRaaga #CarnaticMusic #AIMusic #DeepLearning #LSTM #IndianClassicalMusic
```

- **Visibility**: Public
- **Audience**: Not made for kids
- **Tags**: DeepRaaga, Carnatic Music, AI Music, LSTM, TensorFlow, Indian Classical, Music AI, Magenta, PyPI, Open Source
- **Category**: Science & Technology
- **License**: Standard YouTube License

### 2. Thumbnail (Optional)
Create a simple thumbnail (1280x720):
- Background: Gradient (saffron to gold)
- DeepRaaga logo centered
- Text: "Technical Demo" at bottom
- Use Canva (canva.com) - free

### 3. After Upload
- [ ] Copy the YouTube video URL
- [ ] Share the URL with me
- [ ] I'll update the website to embed YOUR video

---

## Troubleshooting

### Issue: Recording is choppy
**Fix**: Lower OBS settings to 720p 30fps

### Issue: Audio not synced
**Fix**: In OBS, set Audio Sync Offset to +100ms

### Issue: Too long (over 8 minutes)
**Fix**: Skip Scene 4 (PyPI demo), go straight to conclusion

### Issue: Mistake during recording
**Fix**: Pause 3 seconds, clap hands (creates spike in audio), continue. Edit out later using the clap as marker.

---

## Quick Start Commands

```bash
# Start everything
cd d:\projects\deepRaaga\DeepRaaga
npm run dev

# In new terminal, start OBS recording
# Open browser to http://localhost:3000
```

---

**Estimated Total Time**: 30-45 minutes (setup + recording + upload)

**Share your YouTube video URL when ready!**
