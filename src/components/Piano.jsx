import { useEffect, useState, useRef } from 'react'
import { Box, Typography } from '@mui/material'



// Map Western notes to Sruthi (Kattai) scale
const SRUTHI_MAPPING = {
  'C': '1 kattai',
  'C#': '1.5 kattai',
  'D': '2 kattai',
  'D#': '2.5 kattai',
  'E': '3 kattai',
  'F': '4 kattai',
  'F#': '4.5 kattai',
  'G': '5 kattai',
  'G#': '5.5 kattai',
  'A': '6 kattai',
  'A#': '6.5 kattai',
  'B': '7 kattai'
}



// Map keyboard keys to notes with octaves
const KEY_MAPPING = {
  // Lower octave
  'z': 'C3',
  'x': 'D3',
  'c': 'E3',
  'v': 'F3',
  'b': 'G3',
  'n': 'A3',
  'm': 'B3',
  's': 'C#3',
  'd': 'D#3',
  'g': 'F#3',
  'h': 'G#3',
  'j': 'A#3',

  // Middle octave
  'q': 'C4',
  'w': 'D4',
  'e': 'E4',
  'r': 'F4',
  't': 'G4',
  'y': 'A4',
  'u': 'B4',
  '2': 'C#4',
  '3': 'D#4',
  '5': 'F#4',
  '6': 'G#4',
  '7': 'A#4',

  // Upper octave
  'i': 'C5',
  'o': 'D5',
  'p': 'E5',
  '[': 'F5',
  ']': 'G5',
  '\\': 'A5',
  '9': 'C#5',
  '0': 'D#5',
  '=': 'F#5'
}

const pianoStyles = {
  container: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#000',
    padding: '10px',
    borderRadius: '8px',
  }
}

function Piano({ onNotePlay, playedNote }) {
  const [activeNote, setActiveNote] = useState(null)
  const [carnaticNote, setCarnaticNote] = useState(null)
  const [audioContext, setAudioContext] = useState(null)
  const oscillatorRef = useRef(null)

  useEffect(() => {
    // Initialize AudioContext on component mount
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    setAudioContext(ctx)

    return () => {
      // Cleanup AudioContext on unmount
      if (ctx) {
        ctx.close()
      }
    }
  }, [])

  const playNote = (frequency) => {
    if (!audioContext) return

    // Ensure context is running
    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }

    console.log('Playing note:', frequency)

    // For monophonic voice effect with legato, we could ramp down previous note here
    // But for now, let's allow slight overlap for smoother transition (release tail)
    // We only force stop if we need to strictly cut off (like lifting a key)
    // oscillatorRef.current will point to the NEW oscillator

    const t = audioContext.currentTime
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    const filterNode = audioContext.createBiquadFilter()

    // Vibrato (LFO)
    const lfo = audioContext.createOscillator()
    const lfoGain = audioContext.createGain()

    // Configure Oscillator (Voice-like source)
    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(frequency, t)

    // Configure Filter (Vocal tract simulation)
    // Dynamic cutoff based on pitch to keep brightness consistent
    filterNode.type = 'lowpass'
    filterNode.frequency.setValueAtTime(frequency * 4, t)
    filterNode.Q.value = 1

    // Configure Vibrato
    lfo.type = 'sine'
    lfo.frequency.setValueAtTime(5.5, t) // ~5.5Hz vibrato
    lfoGain.gain.setValueAtTime(5, t) // Depth

    // Connect Vibrato
    lfo.connect(lfoGain)
    lfoGain.connect(oscillator.frequency)

    // Envelope (ADSR) - Singing style
    // Duration: ~1.4s sound in a 1.5s slot
    gainNode.gain.setValueAtTime(0, t)
    gainNode.gain.linearRampToValueAtTime(0.5, t + 0.1) // Attack
    gainNode.gain.linearRampToValueAtTime(0.4, t + 0.4) // Decay
    gainNode.gain.setValueAtTime(0.4, t + 1.0) // Sustain
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 1.4) // Release

    // Connections
    oscillator.connect(filterNode)
    filterNode.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Start
    oscillator.start(t)
    lfo.start(t)

    // Stop automatically
    oscillator.stop(t + 1.5)
    lfo.stop(t + 1.5)

    oscillatorRef.current = oscillator
    oscillator.lfo = lfo
  }

  const stopNote = () => {
    // Only used for manual key release
    if (oscillatorRef.current) {
      try {
        // We could ramp down here, but for simplicity just stop
        // or let it finish its natural release if it was a generated note?
        // For manual play, we might want immediate stop.
        // But since we use auto-stop in playNote, this is mostly for cleanup.
        oscillatorRef.current.stop()
        oscillatorRef.current.disconnect()
      } catch (e) { }
      oscillatorRef.current = null
    }
  }

  const handleNoteClick = (note) => {
    if (!audioContext) return
    setActiveNote(note)
    const carnatic = NOTE_MAPPING[note]
    const frequency = NOTE_FREQUENCIES[note]
    setCarnaticNote(carnatic)
    playNote(frequency)
    if (onNotePlay) {
      onNotePlay({ western: note, carnatic, sruthi: SRUTHI_MAPPING[note] })
    }
  }

  // Handle external note playback
  useEffect(() => {
    if (playedNote && NOTE_FREQUENCIES[playedNote]) {
      setActiveNote(playedNote)
      const frequency = NOTE_FREQUENCIES[playedNote]
      playNote(frequency)

      // Auto release visual after duration
      const timer = setTimeout(() => {
        setActiveNote(null)
      }, 1400) // Match the audio duration roughly

      return () => clearTimeout(timer)
    }
  }, [playedNote, audioContext])

  useEffect(() => {
    const handleKeyDown = (event) => {
      const note = KEY_MAPPING[event.key.toLowerCase()]
      if (note && !activeNote) {
        handleNoteClick(note)
      }
    }

    const handleKeyUp = () => {
      setActiveNote(null)
      setCarnaticNote(null)
      stopNote()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      stopNote()
    }
  }, [onNotePlay, activeNote, audioContext])

  const renderPianoKey = (note, isBlack = false) => {
    const isActive = activeNote === note
    return (
      <Box
        key={note}
        onMouseDown={() => handleNoteClick(note)}
        onMouseUp={() => {
          setActiveNote(null)
          setCarnaticNote(null)
          stopNote()
        }}
        onMouseLeave={() => {
          setActiveNote(null)
          setCarnaticNote(null)
          stopNote()
        }}
        sx={{
          position: isBlack ? 'absolute' : 'relative',
          width: isBlack ? '30px' : '50px',
          height: isBlack ? '120px' : '180px',
          backgroundColor: isBlack
            ? isActive ? '#666' : '#000'
            : isActive ? '#ddd' : '#fff',
          border: '1px solid #000',
          borderRadius: '0 0 4px 4px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 1,
          zIndex: isBlack ? 1 : 0,
          marginLeft: isBlack ? '-15px' : 0,
          marginRight: isBlack ? '-15px' : 0,
          '&:hover': {
            backgroundColor: isBlack ? '#666' : '#ddd'
          }
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: isBlack ? '#fff' : '#000',
            fontWeight: 'bold',
            fontSize: '0.7rem'
          }}
        >
          {note}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: isBlack ? '#fff' : '#000',
            fontSize: '0.6rem'
          }}
        >
          {NOTE_MAPPING[note]}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: isBlack ? '#fff' : '#000',
            fontSize: '0.5rem'
          }}
        >
          {SRUTHI_MAPPING[note]}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Typography variant="h6" gutterBottom>
        Virtual Piano (Use keyboard keys Z-M for lower octave, Q-U for middle octave, I-] for upper octave)
      </Typography>
      <Box sx={pianoStyles.container}>
        {/* Lower Octave */}
        <Box sx={{ display: 'flex', gap: 0.5, position: 'relative', mb: 4 }}>
          {['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'].map(note => renderPianoKey(note))}
          <Box sx={{ position: 'absolute', display: 'flex', left: '45px' }}>
            {['C#3', 'D#3', null, 'F#3', 'G#3', 'A#3'].map((note, index) => (
              note ? renderPianoKey(note, true) : <Box key={index} sx={{ width: '50px' }} />
            ))}
          </Box>
        </Box>

        {/* Middle Octave */}
        <Box sx={{ display: 'flex', gap: 0.5, position: 'relative', mb: 4 }}>
          {['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'].map(note => renderPianoKey(note))}
          <Box sx={{ position: 'absolute', display: 'flex', left: '45px' }}>
            {['C#4', 'D#4', null, 'F#4', 'G#4', 'A#4'].map((note, index) => (
              note ? renderPianoKey(note, true) : <Box key={index} sx={{ width: '50px' }} />
            ))}
          </Box>
        </Box>

        {/* Upper Octave */}
        <Box sx={{ display: 'flex', gap: 0.5, position: 'relative' }}>
          {['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'].map(note => renderPianoKey(note))}
          <Box sx={{ position: 'absolute', display: 'flex', left: '45px' }}>
            {['C#5', 'D#5', null, 'F#5', 'G#5', 'A#5'].map((note, index) => (
              note ? renderPianoKey(note, true) : <Box key={index} sx={{ width: '50px' }} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Piano

// Update NOTE_FREQUENCIES with octaves
const NOTE_FREQUENCIES = {
  // Octave 3
  'C3': 130.81,
  'C#3': 138.59,
  'D3': 146.83,
  'D#3': 155.56,
  'E3': 164.81,
  'F3': 174.61,
  'F#3': 185.00,
  'G3': 196.00,
  'G#3': 207.65,
  'A3': 220.00,
  'A#3': 233.08,
  'B3': 246.94,

  // Octave 4
  'C4': 261.63,
  'C#4': 277.18,
  'D4': 293.66,
  'D#4': 311.13,
  'E4': 329.63,
  'F4': 349.23,
  'F#4': 369.99,
  'G4': 392.00,
  'G#4': 415.30,
  'A4': 440.00,
  'A#4': 466.16,
  'B4': 493.88,

  // Octave 5
  'C5': 523.25,
  'C#5': 554.37,
  'D5': 587.33,
  'D#5': 622.25,
  'E5': 659.25,
  'F5': 698.46,
  'F#5': 739.99,
  'G5': 783.99,
  'G#5': 830.61,
  'A5': 880.00,
  'A#5': 932.33,
  'B5': 987.77
}

// Update NOTE_MAPPING with octaves
const NOTE_MAPPING = {
  // Octave 3
  'C3': 'Sa₃',
  'C#3': 'Ri₁₃',
  'D3': 'Ri₂₃',
  'D#3': 'Ga₁₃',
  'E3': 'Ga₂₃',
  'F3': 'Ma₁₃',
  'F#3': 'Ma₂₃',
  'G3': 'Pa₃',
  'G#3': 'Dha₁₃',
  'A3': 'Dha₂₃',
  'A#3': 'Ni₁₃',
  'B3': 'Ni₂₃',

  // Octave 4
  'C4': 'Sa₄',
  'C#4': 'Ri₁₄',
  'D4': 'Ri₂₄',
  'D#4': 'Ga₁₄',
  'E4': 'Ga₂₄',
  'F4': 'Ma₁₄',
  'F#4': 'Ma₂₄',
  'G4': 'Pa₄',
  'G#4': 'Dha₁₄',
  'A4': 'Dha₂₄',
  'A#4': 'Ni₁₄',
  'B4': 'Ni₂₄',

  // Octave 5
  'C5': 'Sa₅',
  'C#5': 'Ri₁₅',
  'D5': 'Ri₂₅',
  'D#5': 'Ga₁₅',
  'E5': 'Ga₂₅',
  'F5': 'Ma₁₅',
  'F#5': 'Ma₂₅',
  'G5': 'Pa₅',
  'G#5': 'Dha₁₅',
  'A5': 'Dha₂₅',
  'A#5': 'Ni₁₅',
  'B5': 'Ni₂₅'
}