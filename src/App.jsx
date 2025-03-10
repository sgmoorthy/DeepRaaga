import { useState } from 'react'
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import RaagaGenerator from './components/RaagaGenerator'
import Header from './components/Header'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e91e63',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
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
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App