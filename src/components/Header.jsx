import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <MusicNoteIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DeepRaaga
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header