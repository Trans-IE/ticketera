import React, { createContext, useEffect, useState } from 'react';

import { createRoot } from 'react-dom/client';

import TicketeraWebsite from './TicketeraWebsite';

import ErrorBoundary from './components/ErrorBoundary';

import 'fontsource-roboto';

import moment from "moment";

import "moment/locale/es";

moment.locale("es");

import { esES } from '@mui/material/locale';

import '../styles.css';

import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import encryptStorage from './helpers/storageEncrypter';

// Defino variables globales de estilo 
//
// 1 - Gama de colores globales de la aplicacion
// 2 - Fuentes de textos

const lightTheme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
    ].join(','),
    fontSize: 12,
    robotoRegularsz16: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 16,
    },
    robotoRegularsz14: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: 14,
    },
    robotoRegularsz12: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 8,
    },
    robotoBoldsz12: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 12,
    },
    robotoBoldsz20: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 20,
    },
    robotoBoldsz30: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 30,
    },
    robotoBoldsz37: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 37,
    },
    robotoMediumsz16: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 14,
    },
    robotoMediumsz20: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 20,
    },
  },
  palette: {
    oposite: 'black',
    trans: {
      light: '#0095DA',
      main: '#23558e',
      dark: '#18315B'
    },
    background: {
      dark: 'white',
      main: '#eee',
      light: '#ddd',
      border: '#ccc ',
      background: '#dadada',
      reddishBackground: '#ffdcdc'
    },
    primary: {
      light: '#000000',
      main: '#0095DA',
      contrastText: '#f0f4ff',
    },
    secondary: {
      light: '#e5e5ff',
      main: '#e5e5ff',
      dark: '#e5e5ff',
      contrastText: '#000000',
    },
    tertiary: {
      main: '#777'
    },
    text: {
      primary: "#333",
      secondary: "#fff",
      tertiary: "#555"

    },
    mode: 'light',
  },
  esES,
});

const darkTheme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
    ].join(','),
    fontSize: 12,
    robotoRegularsz16: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 16,
    },
    robotoRegularsz14: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: 14,
    },
    robotoRegularsz12: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 8,
    },
    robotoBoldsz12: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 12,
    },
    robotoBoldsz20: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 20,
    },
    robotoBoldsz30: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 30,
    },
    robotoBoldsz37: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 37,
    },
    robotoMediumsz16: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 14,
    },
    robotoMediumsz20: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 20,
    },
  },
  palette: {
    oposite: 'white',
    trans: {
      light: '#0095DA',
      main: '#23558e',
      dark: '#18315B'
    },
    background: {
      dark: '#2c2c2c',
      main: '#383838',
      light: '#474747',
      border: '#474747',
      background: '#2c2c2c',
      reddishBackground: '#543838'
    },
    primary: {
      // #335c7b azul marino mas claro  
      light: '#000000',
      // #00345B azul marino (ponele) 
      main: '#0095DA',
      // #335c7b azul marino mas oscuro  
      dark: 'rgb(34, 37, 39)',
      // texto de contraste: azul claro #335c7b (revisar)
      contrastText: '#f0f4ff',
    },
    secondary: {
      // #90caf9: azul mas claro
      light: '#e5e5ff',
      // #3DADD9: azul claro
      main: '#e5e5ff',
      // #1976d2: azul mas oscuro
      dark: '#e5e5ff',
      // texto de contraste: azul claro #2699FB (revisar)
      contrastText: '#000000',
    },
    tertiary: {
      main: '#ddd'
    },
    text: {
      // textPrimary: negro #000000
      primary: "#fafafa",
      // textSecondary: azul claro #3DADD9
      secondary: "#fff",
      tertiary: "#bbb"

    },
    mode: 'dark',
  },
  esES,
});


export const ThemeContext = createContext();

const ThemeProviderWrapper = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState('dark');

  useEffect(() => {
    // Retrieve theme variable from local storage
    var theme = encryptStorage.getItem("theme");

    // Check if theme variable exists in local storage
    if (theme === null) {
      // If theme variable doesn't exist, set default theme
      theme = "dark"; // Set default theme here
      encryptStorage.setItem("theme", theme);
    }
    else {
      setIsDarkMode(theme === 'dark' ? 'dark' : 'light')
    }

  }, [])


  const toggleTheme = () => {
    let changeTheme = isDarkMode === 'dark' ? 'light' : 'dark';
    setIsDarkMode(changeTheme);
    encryptStorage.setItem("theme", changeTheme);
  };

  const theme = isDarkMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

const App = () => {

  return (
    <ErrorBoundary>
      <StyledEngineProvider injectFirst>
        <ThemeProviderWrapper>
          <TicketeraWebsite />
        </ThemeProviderWrapper>
      </StyledEngineProvider>
    </ErrorBoundary>
  );
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);