import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#0079BF',
          dark: '#005B9A'
        },
        background: {
          default: '#f7f9fc'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#0079BF',
          dark: '#005B9A'
        },
        background: {
          default: '#212121',
          paper: '#2C2C2C'
        }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          transition: background-color 5000s ease-in-out 0s;
          -webkit-box-shadow: 0 0 0 30px #ffffff inset !important;
          -webkit-text-fill-color: rgba(0, 0, 0, 0.87) !important;
          caret-color: rgba(0, 0, 0, 0.87) !important;
        }

        [data-mui-color-scheme="dark"] input:-webkit-autofill,
        [data-mui-color-scheme="dark"] input:-webkit-autofill:hover,
        [data-mui-color-scheme="dark"] input:-webkit-autofill:focus,
        [data-mui-color-scheme="dark"] input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 0px #121212 inset !important;
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #ffffff !important;
        }
      `
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'normal'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': { borderWidth: '0.5px !important' },
          '&:hover fieldset': { borderWidth: '1px !important' },
          '&.Mui-focused fieldset': { borderWidth: '1px !important' }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: '0.875rem' }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      }
    }
  }
})

export default theme

