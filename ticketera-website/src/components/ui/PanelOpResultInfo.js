import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CancelIcon from '@mui/icons-material/Cancel';

// params
// text: texto del mensaje
// stateResult: estado, puede ser inativo (0), cargando (1) o presentando sucess (2) presentando error (3)
export const PanelOpResultInfo = ({ text = "", stateResult = 0, btnCloseOnClick }) => {

  const OnClose = () => {
    btnCloseOnClick();
  };

  if (stateResult !== 0) {
    return (

      <div >
        <Typography component="div" variant={"subtitle2"}  >
          {
            stateResult !== 1 &&
            (<Box borderRadius={16} bgcolor={stateResult === 3 ? "red" : "primary.main"} color="primary.contrastText" pt={0} pb={0} pl={1} pr={1} mt={1} mb={0} >
              <IconButton aria-label="cerrar" size="small" ml={1} mr={1} >
                <ErrorOutlineIcon color={"error"} fontSize="inherit" />
              </IconButton>
              {
                text
              }
              <IconButton onClick={OnClose} aria-label="cerrar" size="small">
                <CancelIcon color={"error"} fontSize="inherit" />
              </IconButton>
            </Box>)
          }

          {
            stateResult === 1 &&
            <CircularProgress color="inherit" />
          }

        </Typography>
      </div>
    );
  }
  else {
    return (
      <>
      </>
    );
  }

}
