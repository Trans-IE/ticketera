import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export const TextfieldSearch = ({ title = "", textFieldMaxLength = 15, onSearchClick, onSearchCloseClick }) => {

    const [textValue, setTextValue] = useState("");

    const debouncedValue = useDebouncedValue(textValue, 500);

    useEffect(() => {

      // cada vez que termina de ingresar un texto y pasan 1,5 segundos , hago una busqueda parcial sobre el texto.

      
      onSearchPressClick();

  
    }, [debouncedValue])

    const onSearchPressClick = () => {
      if (textValue.length >= 1) { 
        onSearchClick(textValue);
      } else {
        onSearchClosePressClick();
      }
    }

    const onSearchClosePressClick = () => {
      setTextValue("");
      onSearchCloseClick();
    }

    const clearControls = () => {
        setTextValue("");
    }

    const handleTextChange = (event) => {

        if (event.target.value.length > textFieldMaxLength) return;

        setTextValue(event.target.value);

    };

    const handleOnKeyDownTextField = (e) => {
        if (e.key === "Enter") {

            onSearchClick(textValue)
           
        }
    };


    return (
      <Paper
        component="div" 
        elevation={0} 
        sx={{ p: '0px 0px', display: 'flex', alignItems: 'center', width: '100%'}} 
      >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="busqueda" disabled /* onClick={ () => onSearchPressClick()  } */ >
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={ title } 
        inputProps={{ 'aria-label': { title } }} 
        value={textValue} 
        
        onChange={handleTextChange}
        onKeyDown={(e) => handleOnKeyDownTextField(e)}

      />

      {
        (textValue.length > 0) && 
      <IconButton type="button" sx={{ p: '10px' }} aria-label="busqueda" onClick={ () => onSearchClosePressClick()  }>
        <CloseIcon />
      </IconButton>
      }
      
      </Paper>
    );

  }
