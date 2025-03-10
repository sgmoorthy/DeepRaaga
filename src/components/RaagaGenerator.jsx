import { useState } from 'react'
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
  TextField,
  Typography,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import WaveformDisplay from './WaveformDisplay'

const RAGAS = [
  'Bhairavi',
  'Kalyani',
  'Shankarabharanam',
  'Todi',
  'Kambhoji',
]

function RaagaGenerator() {
  const [selectedRaga, setSelectedRaga] = useState('')
  const [duration, setDuration] = useState(300)
  const [temperature, setTemperature] = useState(1.0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      // TODO: Implement API call to generate music
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          raga: selectedRaga,
          duration,
          temperature,
        }),
      })
      const data = await response.json()
      setAudioUrl(data.audioUrl)
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Raga Generator
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Select Raga</InputLabel>
              <Select
                value={selectedRaga}
                label="Select Raga"
                onChange={(e) => setSelectedRaga(e.target.value)}
              >
                {RAGAS.map((raga) => (
                  <MenuItem key={raga} value={raga}>
                    {raga}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Duration (seconds)</Typography>
            <Slider
              value={duration}
              onChange={(e, value) => setDuration(value)}
              min={60}
              max={600}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Temperature</Typography>
            <Slider
              value={temperature}
              onChange={(e, value) => setTemperature(value)}
              min={0.1}
              max={2.0}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerate}
              disabled={!selectedRaga || isGenerating}
              startIcon={isGenerating ? <StopIcon /> : <PlayArrowIcon />}
            >
              {isGenerating ? 'Generating...' : 'Generate'}
            </Button>
          </Grid>
          {audioUrl && (
            <Grid item xs={12}>
              <WaveformDisplay audioUrl={audioUrl} />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default RaagaGenerator