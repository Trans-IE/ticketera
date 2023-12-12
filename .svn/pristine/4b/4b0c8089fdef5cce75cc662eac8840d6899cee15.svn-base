import React from 'react';

import { createRoot } from 'react-dom/client';

import TicketeraWebsite from './TicketeraWebsite';

import ErrorBoundary from './components/ErrorBoundary';

import 'fontsource-roboto';

import moment from "moment";

import "moment/locale/es";

moment.locale("es");



import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

// Defino variables globales de estilo 
// 1 - Gama de colores globales de la aplicacion
// 2 - Fuentes de textos

const theme = createTheme({
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
    primary: {
      // #335c7b azul marino mas claro  
      light: '#000000',
      // #00345B azul marino (ponele) 
      main: '#7497f7',
      // #335c7b azul marino mas oscuro  
      dark: '#e1e8ff',
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
    text: {
      // textPrimary: negro #000000
      primary: "#000000",
      // textSecondary: azul claro #3DADD9
      secondary: "#8892b3"

    },
    type: 'light',
  },
});


import '../styles.css';

const divRoot = document.getElementById('root');
const root = createRoot(divRoot);

root.render(<ErrorBoundary ><StyledEngineProvider injectFirst ><ThemeProvider theme={theme}><TicketeraWebsite /></ThemeProvider></StyledEngineProvider></ErrorBoundary>);