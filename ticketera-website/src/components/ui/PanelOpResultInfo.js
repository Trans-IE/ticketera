import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles'
import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CancelIcon from '@mui/icons-material/Cancel';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(0),
    },
  },
  styleClose: {
    marginLeft: theme.spacing(2),
  }
}));
// params
// text: texto del mensaje
// stateResult: estado, puede ser inativo (0), cargando (1) o presentando sucess (2) presentando error (3)
export const PanelOpResultInfo = ({ text = "", stateResult = 0, btnCloseOnClick  }) => {
  const classes = useStyles();

  const OnClose = () => {
    btnCloseOnClick();
  };

  if( stateResult !== 0 ) {
    return (

      <div className={classes.root}>
          <Typography component="div" variant={"subtitle2"}  >
            {
              stateResult !== 1 && 
(              <Box borderRadius={16} bgcolor={stateResult===3?"red":"primary.main"} color="primary.contrastText" pt={0} pb={0} pl={1} pr={1}  mt={1} mb={0} >
                  <IconButton aria-label="cerrar" className={classes.margin} size="small" ml={1} mr={1} >
                    <ErrorOutlineIcon color={"error"} fontSize="inherit" />
                  </IconButton>
                  { 
                    text
                  }
                  <IconButton onClick={ OnClose } aria-label="cerrar" className={classes.styleClose} size="small">
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
  else
  {
    return (
      <>
      </>
    );
  }

}
