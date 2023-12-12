import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/lab/Autocomplete';
import Grid from '@mui/material/Grid';

export const CmbFilterCombineWithTextField = ({ title, data, fieldName, visible, textFieldLabel, textFieldType, textFieldMaxLength, handlerOnSelectedItem, onlyTextFieldEvent = false }) => {
    const classes = useStyles();

    const [inputValue, setInputValue] = React.useState('');
    const [codeToFind, setCodeToFind] = useState("");

    const sendOptionToFilterListSelected = (newValue) => {
        // envia evento de combo si esta propiedad no esta activa
        if (!onlyTextFieldEvent)
            handlerOnSelectedItem(newValue);

        clearControls();
    }

    const handleOnChangeTextField = (e) => {
        if (e.target.value.length > textFieldMaxLength) return;
        setCodeToFind(e.target.value);
    }

    const handleOnKeyDownTextField = (e) => {
        if (e.key === 'Enter') {
            handlerOnSelectedItem(codeToFind, inputValue);

            clearControls();
        }
    }

    const clearControls = () => {
        setCodeToFind("");
    }

    if (visible == true) {
        return (
            <Grid container direction="row" justify="center" alignItems="stretch" spacing={1}>
                <Grid item xs={8}>
                    <Autocomplete

                        disableClearable
                        sx={{
                            marginLeft: '10px',
                            marginRight: '15px',
                            marginTop: '0px',
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '0.5rem',
                        }}
                        options={data}
                        getOptionLabel={(option) => option[fieldName]}
                        onChange={(event, newValue) => {
                            sendOptionToFilterListSelected(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);

                        }}
                        renderInput={(params) => <TextField {...params}
                            fullWidth
                            size="small"
                            label={`${title}`} />}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        sx={{  }}
                        label={textFieldLabel}
                        type={textFieldType}
                        value={codeToFind}
                        onChange={(e) => handleOnChangeTextField(e)}
                        onKeyDown={(e) => handleOnKeyDownTextField(e)}
                        // InputLabelProps={{
                        //     shrink: true,
                        // }} 
                        InputProps={{
                            classes: {
                                input: { fontSize: 12, },
                            },
                        }}
                        variant="standard"
                        fullWidth
                        size="small"
                    />
                </Grid>
            </Grid>
        )
    }
    else {
        return (
            <>
            </>
        )
    }
}
