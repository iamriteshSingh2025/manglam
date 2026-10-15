import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0F172A', // Deep slate navy
      light: '#1E293B',
      dark: '#0A0F1D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#EA580C', // Construction Safety Orange
      light: '#FB923C',
      dark: '#C2410C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B',
      light: '#FEF3C7',
      dark: '#B45309',
    },
    success: {
      main: '#16A34A',
      light: '#DCFCE7',
      dark: '#15803D',
    },
    info: {
      main: '#2563EB',
      light: '#EFF6FF',
      dark: '#1D4ED8',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#64748B',
    },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.1)',
          },
        },
        containedSecondary: {
          backgroundColor: '#EA580C',
          '&:hover': {
            backgroundColor: '#C2410C',
            boxShadow: '0 4px 16px rgba(234, 88, 12, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)',
          border: '1px solid #E2E8F0',
          transition: 'all 0.25s ease-in-out',
          '&:hover': {
            boxShadow: '0 12px 24px -6px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.04)',
            borderColor: '#CBD5E1',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
          border: '1px solid #E2E8F0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
  },
});
