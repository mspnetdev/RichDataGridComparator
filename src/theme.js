import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f766e'
    },
    secondary: {
      main: '#d97706'
    },
    background: {
      default: '#f5efe6',
      paper: '#fffaf4'
    },
    text: {
      primary: '#1f2937',
      secondary: '#4b5563'
    }
  },
  typography: {
    fontFamily: '"Trebuchet MS", "Segoe UI", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.04em'
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.03em'
    },
    h5: {
      fontWeight: 700
    }
  },
  shape: {
    borderRadius: 0
  }
});

export default theme;