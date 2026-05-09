import { useState, useCallback, useRef, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Chip
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import Piano from './Piano'

const RAGAS = [
  // Melakarta Ragas
  'Kanakangi', 'Ratnangi', 'Ganamurthi', 'Vanaspathi', 'Manavathi', 'Tanarupi',
  'Senavathi', 'Hanumathodi', 'Dhenuka', 'Natakapriya', 'Kokilapriya', 'Rupavathi',
  'Gayakapriya', 'Vakulabharanam', 'Mayamalavagowla', 'Chakravakam', 'Suryakantam', 'Hatakambari',
  'Jhankaradhwani', 'Natabhairavi', 'Keeravani', 'Kharaharapriya', 'Gourimanohari', 'Varunapriya',
  'Mararanjani', 'Charukesi', 'Sarasangi', 'Harikambhoji', 'Dheerasankarabharanam', 'Naganandini',
  'Yagapriya', 'Ragavardhini', 'Gangeyabhushani', 'Vagadheeswari', 'Shulini', 'Chalanata',
  'Salagam', 'Jalarnavam', 'Jhalavarali', 'Navanitam', 'Pavani', 'Raghupriya',
  'Gavambodhi', 'Bhavapriya', 'Shubhapantuvarali', 'Shadvidamargini', 'Suvarnangi', 'Divyamani',
  'Dhavalambari', 'Namanarayani', 'Kamavardhini', 'Ramapriya', 'Gamanashrama', 'Vishwambhari',
  'Shamalangi', 'Shanmukhapriya', 'Simhendramadhyamam', 'Hemavathi', 'Dharmavathi', 'Neetimathi',
  'Kantamani', 'Rishabhapriya', 'Latangi', 'Vachaspathi', 'Mechakalyani', 'Chitrambari',
  'Sucharitra', 'Jyotiswarupini', 'Dhatuvardani', 'Nasikabhushani', 'Kosalam', 'Rasikapriya'
]

function RaagaGenerator() {
  const [selectedRaga, setSelectedRaga] = useState('')
  const [duration, setDuration] = useState(30) // Duration in number of notes
  const [temperature, setTemperature] = useState(1.0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentNote, setCurrentNote] = useState(null)
  const [generatedNotes, setGeneratedNotes] = useState([])
  const [error, setError] = useState(null)

  const playbackTimeoutRef = useRef(null)

  const handleRagaSelect = (event) => {
    setSelectedRaga(event.target.value)
  }

  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue)
  }

  const handleDurationChange = (event, newValue) => {
    setDuration(newValue)
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    setGeneratedNotes([])

    try {
      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raga: selectedRaga,
          duration: duration,
          temperature: temperature
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate music')
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setGeneratedNotes(data.notes)
      setIsGenerating(false)
      playSequence(data.notes)

    } catch (err) {
      console.error('Generation error:', err)
      setError(err.message)
      setIsGenerating(false)
    }
  }

  const playSequence = (notes) => {
    setIsPlaying(true)
    let index = 0

    const playNext = () => {
      if (index >= notes.length) {
        setIsPlaying(false)
        setCurrentNote(null)
        return
      }

      const note = notes[index]
      setCurrentNote(note)
      index++

      // Play next note after 1500ms (matches the 1.5s envelope)
      playbackTimeoutRef.current = setTimeout(playNext, 1500)
    }

    playNext()
  }

  const handleStop = () => {
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current)
    }
    setIsPlaying(false)
    setIsGenerating(false)
    setCurrentNote(null)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current)
      }
    }
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      {/* Technical Demo Video Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)' }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ color: '#D35400', fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmartToyIcon /> How DeepRaaga Works
          </Typography>
          <Typography variant="body1" sx={{ color: '#5D4037', mb: 2 }}>
            Watch how our AI understands and generates authentic Carnatic ragas using deep neural networks trained on traditional compositions.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip icon={<MusicNoteIcon />} label="72 Melakarta Ragas" color="primary" size="small" />
            <Chip icon={<SmartToyIcon />} label="LSTM + Attention" color="secondary" size="small" />
            <Chip label="Raga Grammar Validation" color="success" size="small" />
            <Chip label="Real-time Generation" color="info" size="small" />
          </Box>
        </Box>

        {/* Embedded Technical Video */}
        <Box sx={{ position: 'relative', paddingTop: '56.25%', width: '100%', mb: 2 }}>
          <Box
            component="iframe"
            src="https://www.youtube.com/embed/O8hMDRZVhWM?rel=0"
            title="DeepRaaga Technical Demo - AI Carnatic Music Generation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '12px',
              border: '2px solid #F1C40F',
            }}
          />
        </Box>

        <Typography variant="body2" sx={{ color: '#8D6E63', fontStyle: 'italic', textAlign: 'center' }}>
          The video demonstrates: 1) Data preprocessing from MIDI to NoteSequences, 2) Raga-conditioned LSTM training,
          3) Grammar validation against Arohana/Avarohana rules, 4) Real-time generation and playback.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Select Raga</InputLabel>
              <Select
                value={selectedRaga}
                label="Select Raga"
                onChange={handleRagaSelect}
              >
                {RAGAS.map((raga) => (
                  <MenuItem key={raga} value={raga}>
                    {raga}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography gutterBottom>Temperature: {temperature}</Typography>
            <Slider
              value={temperature}
              onChange={handleTemperatureChange}
              min={0.1}
              max={2.0}
              step={0.1}
              marks
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography gutterBottom>Length (notes): {duration}</Typography>
            <Slider
              value={duration}
              onChange={handleDurationChange}
              min={10}
              max={100}
              step={10}
              marks
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={12} container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={isGenerating || isPlaying ? <StopIcon /> : <PlayArrowIcon />}
                onClick={isGenerating || isPlaying ? handleStop : handleGenerate}
                disabled={!selectedRaga || isGenerating}
              >
                {isGenerating ? 'Generating...' : isPlaying ? 'Stop' : 'Generate & Play'}
              </Button>
            </Grid>
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Piano playedNote={currentNote} />

            {generatedNotes.length > 0 && !isPlaying && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => playSequence(generatedNotes)}
                >
                  Replay
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={() => console.log('Save clicked')}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setGeneratedNotes([]);
                    setCurrentNote(null);
                  }}
                >
                  Clear
                </Button>
              </Box>
            )}

            {generatedNotes.length > 0 && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>Generated Sequence:</Typography>
                <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                  {generatedNotes.join(' - ')}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default RaagaGenerator