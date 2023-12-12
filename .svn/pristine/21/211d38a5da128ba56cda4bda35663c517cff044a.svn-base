import React, { useState, useEffect, memo } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/lab/Alert';
import Slide from '@mui/material/Slide';
import Collapse from '@mui/material/Collapse';

export const CustomizedSnackbar = memo(  ({openStatus, message, closeFunction = null, autoHideDuration = null, severity = "success"}) => {
  const [openSnackbar, setOpenSnackbar] = useState(openStatus);
  const [messageAlert, setMessageAlert] = useState(message);
  
  useEffect(() => {
    setMessageAlert(message)
    setOpenSnackbar(openStatus);
  })

  const handleClose = (event, reason) => {
    setOpenSnackbar(false);
    if (closeFunction != null) {
      closeFunction();
    }
  };

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <>
      <Snackbar open={openSnackbar} 
      autoHideDuration={autoHideDuration} 
      TransitionComponent={SlideTransition} 
      onClose={handleClose}>
        <Collapse in={openSnackbar}>
          <Alert variant="filled" onClose={handleClose} severity={severity}>{messageAlert}</Alert>
        </Collapse>
      </Snackbar>
    </>
  );
});
