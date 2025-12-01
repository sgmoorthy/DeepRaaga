import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material'

import QueueMusicIcon from '@mui/icons-material/QueueMusic'

function Header() {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
        marginBottom: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src="/logo.png"
            alt="DeepRaaga Logo"
            sx={{
              height: 50,
              width: 50,
              mr: 2,
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.05)' },
                '100%': { transform: 'scale(1)' }
              }
            }}
          />
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              letterSpacing: 1.5
            }}
          >
            DeepRaaga
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <QueueMusicIcon sx={{ fontSize: 30, color: 'white' }} />
      </Toolbar>
    </AppBar>
  )
}

export default Header