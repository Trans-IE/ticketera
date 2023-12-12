import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const TitleMain = React.memo(({ text = "", filterSelected = [] }) => {

  let stringFilterList = "";
  let stringFilterDateFrom="";
  let stringFilterDateTo="";
  let stringFilter = "";
  if(filterSelected !== null ) {
    filterSelected.forEach(function(item) {
        switch (item.source) {
          case 'DATETIMEFROM':
            stringFilterDateFrom = item.code;
            break;
          case 'DATETIMETO':
            stringFilterDateTo = item.code;
            break;
          default:
            stringFilter += " " + item.title;
            break;
        }
        
        stringFilterList = "Fecha: " + stringFilterDateFrom + " - "+ stringFilterDateTo + " " + stringFilter;
    });
  }
    return (
            <Typography component="div" variant={ (filterSelected.length > 0)?"subtitle1":"h5"}  >
                <Box borderRadius={16} bgcolor="primary.main" color="primary.contrastText" pl={5} mb={1} >
                  { 
                  !filterSelected? text: (( filterSelected.length > 0 )? text + " | " + stringFilterList : text)  
                  }        
                  
                  
                </Box>
            </Typography>
    )
});