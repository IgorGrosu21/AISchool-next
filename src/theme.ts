'use client';

import { createTheme, PaletteOptions as MUIPaletteOptions, Palette as MUIPalette } from '@mui/material/styles';
import { accordionSummaryClasses } from '@mui/material/AccordionSummary';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: MUIPalette['primary'];
  }

  interface PaletteOptions {
    tertiary?: MUIPaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    tertiary: true;
  }
}

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data',
  },
  colorSchemes: {
    dark: {
      palette: {
        background: {
          default: '#000',
          paper: '#080816'
        },
        primary: {
          light: '#64b5f6',
          main: '#2196f3',
          dark: '#1976d2',
          contrastText: '#000',
        },
        secondary: {
          light: '#4db6ac',
          main: '#26a69a',
          dark: '#00695c',
          contrastText: '#000',
        },
        tertiary: {
          light: '#ba68c8',
          main: '#9c27b0',
          dark: '#7b1fa2',
          contrastText: '#000'
        },
        text: {
          primary: 'rgba(255, 255, 255, 0.87)',
          secondary: 'rgba(255, 255, 255, 0.6)',
          disabled: 'rgba(255, 255, 255, 0.38)'
        }
      }
    },
    light: {
      palette: {
        background: {
          default: '#fff',
          paper: '#e9f2f7'
        },
        primary: {
          light: '#438bce',
          main: '#146fc2',
          dark: '#0e4d87',
          contrastText: '#fff',
        },
        secondary: {
          light: '#8bce43',
          main: '#00877e',
          dark: '#4d870e',
          contrastText: '#fff',
        },
        tertiary: {
          light: '#8845d1',
          main: '#6814c2',
          dark: '#4c00b3',
          contrastText: '#fff'
        },
        text: {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
          disabled: 'rgba(0, 0, 0, 0.38)'
        }
      },
    }
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
    button: {
      textTransform: 'none'
    },
    h6: {
      fontWeight: 400
    }
  },
  components: {
    MuiAccordion: {
      defaultProps: {
        elevation: 0,
        square: true,
        disableGutters: true
      },
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          '&:not(:last-child)': {
            borderBottom: 0,
          },
          '&::before': {
            display: 'none',
          },
        })
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ theme }) => ({
          flexDirection: 'row-reverse',
          [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
            transform: 'rotate(90deg)',
          },
          [`& .${accordionSummaryClasses.content}`]: {
            marginLeft: theme.spacing(1),
          },
        })
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2),
          borderTop: '1px solid rgba(0, 0, 0, .125)',
          backgroundColor: 'transparent',
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent'
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 'auto',
          '& .MuiChip-label': {
            paddingTop: 6,
            paddingBottom: 6,
            whiteSpace: 'normal',
          }
        }
      }
    }
  }
});

export default theme;