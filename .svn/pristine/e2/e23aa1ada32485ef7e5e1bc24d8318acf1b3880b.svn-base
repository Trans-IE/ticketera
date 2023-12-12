import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const Copyright = ({ version, color = 'rgba(0, 52, 91, 1)' }) => {

  return (
    <>
      <Typography variant="body2" align="center" style={{ color }} >
        {"Creado por "}
        <Link color="inherit" href="https://www.transadvanced.tech/" target="_blank" rel="noopener noreferrer">
          Trans I.E.S.A.
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography variant="body2" align="center" style={{ color }} >
        {"Todos los derechos reservados."}
        {
          "Versión: " + version
        }
      </Typography>
    </>
  )
}
