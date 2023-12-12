import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export const InvalidSession = () => {



  return (
    <Container component="main" maxWidth="sm" className="animate__animated animate__backInDown">
      <CssBaseline />
      <div >
        <Typography component="h1" variant="h5">
          Acceso Invalido
        </Typography>
        <div  >

          <Typography component="h2" variant="h5">
            No tiene acceso con los roles asociados
          </Typography>

        </div>


      </div>

    </Container>
  )

}
