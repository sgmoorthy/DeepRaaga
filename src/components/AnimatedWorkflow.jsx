import { useState, useEffect } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import PianoIcon from '@mui/icons-material/Piano'

// Animation keyframes
const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`

const flow = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px #D35400, 0 0 10px #D35400; }
  50% { box-shadow: 0 0 20px #D35400, 0 0 30px #F1C40F; }
`

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

const dataFlow = keyframes`
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
`

const AnimatedBox = styled(Box)(({ theme, delay = 0 }) => ({
  animation: `${pulse} 2s ease-in-out ${delay}s infinite`,
}))

const FlowingLine = styled(Box)({
  position: 'absolute',
  height: '4px',
  background: 'linear-gradient(90deg, transparent, #F1C40F, transparent)',
  animation: `${flow} 2s linear infinite`,
})

const StepCard = styled(Paper)(({ theme, active }) => ({
  padding: '16px',
  textAlign: 'center',
  background: active 
    ? 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)'
    : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
  border: active ? '2px solid #D35400' : '1px solid #e0e0e0',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  animation: active ? `${glow} 2s ease-in-out infinite` : 'none',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(211, 84, 0, 0.2)',
  },
}))

const steps = [
  { 
    icon: MusicNoteIcon, 
    label: 'MIDI Input', 
    description: 'Raw musical data',
    color: '#1976d2'
  },
  { 
    icon: AutoFixHighIcon, 
    label: 'Preprocessing', 
    description: 'NoteSequences',
    color: '#388e3c'
  },
  { 
    icon: SmartToyIcon, 
    label: 'LSTM Training', 
    description: 'Neural Network',
    color: '#d32f2f'
  },
  { 
    icon: CheckCircleIcon, 
    label: 'Validation', 
    description: 'Raga Grammar',
    color: '#7b1fa2'
  },
  { 
    icon: PianoIcon, 
    label: 'Generation', 
    description: 'Real-time Output',
    color: '#D35400'
  },
]

function AnimatedWorkflow() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box sx={{ width: '100%', py: 3 }}>
      {/* Title */}
      <Typography 
        variant="h6" 
        sx={{ 
          textAlign: 'center', 
          mb: 4, 
          color: '#D35400',
          fontWeight: 600,
          animation: `${float} 3s ease-in-out infinite`,
        }}
      >
        🎵 DeepRaaga AI Pipeline in Action
      </Typography>

      {/* Workflow Steps */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        {/* Connection Lines */}
        <svg 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '10%', 
            width: '80%', 
            height: '4px',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D35400" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#F1C40F" stopOpacity="1" />
              <stop offset="100%" stopColor="#D35400" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <line 
            x1="0" 
            y1="2" 
            x2="100%" 
            y2="2" 
            stroke="url(#lineGradient)" 
            strokeWidth="4"
            strokeDasharray="10,5"
            style={{
              animation: `${dataFlow} 2s linear infinite`,
            }}
          />
        </svg>

        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = index === activeStep
          const isPast = index < activeStep
          
          return (
            <AnimatedBox 
              key={index} 
              delay={index * 0.2}
              sx={{ 
                flex: '1 1 150px', 
                maxWidth: '180px',
                zIndex: 1,
              }}
            >
              <StepCard active={isActive}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mb: 1,
                  animation: isActive ? `${pulse} 1s ease-in-out infinite` : 'none',
                }}>
                  <Icon 
                    sx={{ 
                      fontSize: 40, 
                      color: isActive || isPast ? step.color : '#9e9e9e',
                      transition: 'color 0.3s ease',
                    }} 
                  />
                </Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: isActive ? '#D35400' : (isPast ? '#333' : '#666'),
                    mb: 0.5,
                  }}
                >
                  {step.label}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: isActive ? '#666' : '#999',
                    display: 'block',
                  }}
                >
                  {step.description}
                </Typography>
                {isActive && (
                  <Box 
                    sx={{ 
                      mt: 1, 
                      py: 0.5, 
                      px: 1, 
                      bgcolor: '#D35400', 
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      display: 'inline-block',
                      animation: `${pulse} 1s ease-in-out infinite`,
                    }}
                  >
                    ACTIVE
                  </Box>
                )}
              </StepCard>
            </AnimatedBox>
          )
        })}
      </Box>

      {/* Status Bar */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Paper 
          elevation={2} 
          sx={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 2, 
            px: 3, 
            py: 1.5,
            borderRadius: '25px',
            bgcolor: '#FFF8E1',
            border: '1px solid #F1C40F',
          }}
        >
          <Box 
            sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              bgcolor: '#4caf50',
              animation: `${pulse} 1s ease-in-out infinite`,
            }} 
          />
          <Typography variant="body2" sx={{ color: '#5D4037', fontWeight: 500 }}>
            Step {activeStep + 1} of {steps.length}: {steps[activeStep].label}
          </Typography>
          <Typography variant="caption" sx={{ color: '#8D6E63', ml: 1 }}>
            (Auto-cycling every 2 seconds)
          </Typography>
        </Paper>
      </Box>

      {/* Data Flow Animation */}
      <Box sx={{ mt: 4, position: 'relative', height: '30px', overflow: 'hidden' }}>
        <Typography 
          variant="caption" 
          sx={{ 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)',
            color: '#D35400',
            fontStyle: 'italic',
            animation: `${float} 2s ease-in-out infinite`,
          }}
        >
          ◀ AI processing raga: Mayamalavagowla ▶
        </Typography>
        <Box 
          sx={{ 
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #D35400 50%, transparent 100%)',
            animation: `${flow} 3s linear infinite`,
          }} 
        />
      </Box>
    </Box>
  )
}

export default AnimatedWorkflow
