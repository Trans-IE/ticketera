import React from 'react';
import Typography from '@mui/material/Typography';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
      width: 100%;
      height: 100%;
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
      &:hover {
        border-color: ${blue[400]};
      }
  
      &:focus {
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      }
  
      // firefox
      &:focus-visible {
        outline: 0;
      }
    `,
);


export const TicketDetail = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Tk. Numero: 25082
            </Typography>
            <Typography variant="h6" gutterBottom>
                Empresa: Consejo de la Magistratura
            </Typography>
            <Typography variant="h6" gutterBottom>
                Producto: Otro
            </Typography>
            <Typography variant="h6" gutterBottom>
                Creador: López Pereira, Pablo
            </Typography>
            <Typography variant="h6" gutterBottom>
                central1-fpr2 esta caido (URGENTE) - Prioridad Critica
            </Typography>

            <Textarea
                
                aria-label="maximum height"
                placeholder="detalle del ticket"
                defaultValue="es parte del cluster de publishing.
                El dia sabado a la 1 am hubo un reinicio del equipo por corte electrico.
                en el dia de ayer por la mañana esta caido.
                
                Appliance Heartbeat &ndash; Central2-FMC.jusbaires.gov.ar
                Appliance Central1-fpr2.jusbaires.gob.ar is not sending heartbeats. 
                
                c1-n5k
                Eth111/1/1    A CENTRAL1-FPR2 MG notconnec 200       full    1000    1000base-T
                Eth111/1/2    A CENTRAL1-FPR2 G1 notconnec trunk     full    10G     1000base-T
                Eth111/1/3    A CENTRAL1-FPR2-G1 notconnec 1021      full    1000    1000base-T
                Eth112/1/5    A CENTRAL1-FPR2 G2 connected trunk     full    1000    1000base-T
                Eth112/1/6    A CENTRAL1-FPR2 G1 disabled  1022      full    10G     1000base-T"
            />

        </>
    )
}
