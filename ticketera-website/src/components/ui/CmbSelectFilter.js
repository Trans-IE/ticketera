import { Autocomplete, Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';


export const CmbSelectFilter = ({
  title,
  data = [],
  fieldName,
  visible,
  handlerOnSelectedItem,
  errorMode = false,
  errorMessage = "",
  defaultValue = null,
  disabled = false,
  expandedStyle = false,
  textColor = "inherit",
  shrink = false,
  size = 'small',
  background,
  borderColor,
  height,
  labelColor = "black",
  customItemTagStyle = null, //{condition:active,style={color:'red}}
  disableClearable = true,
  placeholder = '',
  variant = 'outlined',
  onTextInputChange = (e) => { },
  noOptionsText = 'Sin Opciones',
  trimStartEnd = false
}) => {

  const [cmbDefaultValue, setCmbDefaultValue] = useState(null);

  const sendOptionToFilterListSelected = (newValue) => {
    handlerOnSelectedItem(newValue);
  };

  useEffect(() => {

    return () => {
      setCmbDefaultValue(null);
    }
  }, [])

  useEffect(() => {
    if (defaultValue !== null) {
      setCmbDefaultValue(defaultValue);
    }

  }, [defaultValue]);

  useEffect(() => {
    if (visible === true) {
      setCmbDefaultValue(defaultValue);
    }

  }, [visible]);

  const filterOptions = (options, state) => {
    let { inputValue } = state;
    if (trimStartEnd) {
      inputValue = inputValue?.trimStart().trimEnd() || '';
    }
    return options.filter((option) =>
      option[fieldName].toLowerCase().includes(inputValue.toLowerCase())
    );
  }


  if (visible == true) {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        spacing={1}
        xs={12}
      >
        <Grid item xs={12}>
          <Autocomplete

            renderOption={(props, option) => {
              if (customItemTagStyle && option[customItemTagStyle.condition] === true) {
                return (
                  <Box component="li" {...props} style={customItemTagStyle.style}>
                    {option[fieldName]}
                  </Box>
                )
              } else {
                return (
                  <Box component="li" {...props}>
                    {option[fieldName]}
                  </Box>
                )
              }

            }}
            disabled={disabled}
            disableClearable={disableClearable}
            options={data}
            getOptionLabel={(option) => option[fieldName] ? option[fieldName] : ""}
            onChange={(event, newValue) => {
              setCmbDefaultValue(newValue);
              sendOptionToFilterListSelected(newValue);
            }}
            value={cmbDefaultValue}
            style={{ background, borderColor, height }}
            noOptionsText={noOptionsText}
            filterOptions={filterOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{ shrink: shrink, style: { color: labelColor } }}
                label={shrink ? `${title}` : ""}
                classes={classesTextField}
                error={errorMode}
                helperText={errorMessage}
                fullWidth
                size={size}
                placeholder={placeholder || `${title}`}
                variant={variant}
                style={{ height }}
                onChange={onTextInputChange}
              />
            )}

          />
        </Grid>
      </Grid>
    );
  } else {
    return <></>;
  }
};
