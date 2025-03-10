import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import WaveSurfer from 'wavesurfer.js'

function WaveformDisplay({ audioUrl }) {
  const waveformRef = useRef(null)
  const wavesurferRef = useRef(null)

  useEffect(() => {
    if (waveformRef.current && audioUrl) {
      // Destroy previous instance if it exists
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy()
      }

      // Create new WaveSurfer instance
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#e91e63',
        progressColor: '#f50057',
        cursorColor: '#fff',
        barWidth: 2,
        barGap: 1,
        height: 100,
        normalize: true,
        responsive: true,
      })

      // Load audio file
      wavesurfer.load(audioUrl)

      // Save instance to ref
      wavesurferRef.current = wavesurfer

      // Cleanup on unmount
      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy()
        }
      }
    }
  }, [audioUrl])

  return (
    <Box
      ref={waveformRef}
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 1,
        p: 2,
        mt: 2,
      }}
    />
  )
}

export default WaveformDisplay