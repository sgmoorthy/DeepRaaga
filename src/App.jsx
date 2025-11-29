import { useState } from 'react'
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import RaagaGenerator from './components/RaagaGenerator'
import Header from './components/Header'
import CarnaticRagaInfo from './components/CarnaticRagaInfo'

const indianTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D35400', // Saffron / Deep Orange
    },
    secondary: {
      main: '#F1C40F', // Gold / Mustard
    },
    background: {
      default: '#FFF8E1', // Cream / Off-White
      paper: '#FFFFFF',
    },
    text: {
      primary: '#4E342E', // Dark Maroon/Brown
      secondary: '#8D6E63',
    },
  },
  typography: {
    fontFamily: '"Merriweather", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#D35400',
    },
    h5: {
      fontWeight: 600,
      color: '#BF360C',
    },
    h6: {
      fontWeight: 600,
      color: '#E67E22',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #F1C40F', // Gold border
          backgroundImage: 'linear-gradient(to bottom right, #ffffff, #fffde7)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
  },
})

function App() {
  console.log('App component rendering');
  return (
    <ThemeProvider theme={indianTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <RaagaGenerator />
          <CarnaticRagaInfo />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App