import { createTheme } from '@mui/material/styles';

const globalTheme = createTheme({
  palette: {
    primary: {
      main: '#333333',
      // main: '#2e7d32',
    },
    secondary: {
      main: '#6b4094',
    },
    input: {
      main: '#296D6A',
    },
    error: {
      main: '#ff4040',
    },
    warning: {
      main: '#ff7f40',
    },
    info: {
      main: '#2E5CFF',
    },
    littleGrey: {
      main: '#F6F6F6',
      light: 'rgb(246,246,246, 0.4)',
    },
    lightGrey: {
      main: '#A4A6AB',
      dark: '#939599',
    },
    darkGrey: {
      main: '#3F3F3F',
    },
    grey: {
      main: '#686D76',
    },
    purple: {
      main: '#A26BBE',
    },
    green: {
      main: '#C2D500',
    },
    fb: {
      main: '#555694',
    },
    background: {
      main: '#f2f2f2',
      // main: '#fffde7',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
});

const theme = createTheme(
  {
    components: {
      // MuiOutlinedInput: {
      //   styleOverrides: {
      //     root: {
      //       width: '100%',
      //       borderRadius: '5px',
      //       backgroundColor: '#F6FAFC',
      //       color: '#827F7F',
      //     },
      //     notchedOutline: {
      //       borderColor: 'transparent',
      //     },
      //   },
      // },
      // MuiFormControl: {
      //   styleOverrides: {
      //     root: {
      //       width: '100%',
      //       borderRadius: '5px',
      //     },
      //   },
      // },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '5px',
            textTransform: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
  globalTheme,
);

export default theme;
