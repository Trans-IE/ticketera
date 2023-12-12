import React, { useState, memo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';

export const CheckboxListCtrl = memo( ({ checkedParam, handleOnChecked, options, optionId, optionName, title = "", disabled = false}) => {

  const [checked, setChecked] = useState(checkedParam);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    let newChecked = [];

    if( value === -1 ) {
      newChecked = [];
    }
    else {
      newChecked = [...checked];
    }

    if (currentIndex === -1) {
      // el check esta tildado
      newChecked.push(value);
    } else {
      // el check se destilda
      newChecked.splice(currentIndex, 1);
    }

     setChecked(newChecked);
     handleOnChecked(newChecked);
  }

  if( options.length > 0 ) {
        return (
          
    <FormControl component="fieldset">
      <FormLabel component="title" >{title}</FormLabel>
      <List dense >
        {options.map((opt, index) => {
          const labelId = `chk-list-ctrl-label-${opt[optionId]}`;
            return (
              <ListItem key={index} button disabled={disabled 
                /* OR Si id de options no es "Todos" y "Todos" esta tildado => deshabilita la lista excepto "Todos" */
                || ((opt[optionId] !== -1) && checked.indexOf(-1) !== -1)}> 
                <Checkbox
                  edge='start'
                  onChange={(e) => handleToggle(opt[optionId])}
                  checked={checked.indexOf(opt[optionId]) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }} 
                  style={{ paddingBottom: 0, paddingTop: 0, }}
                />
                <ListItemText id={labelId} primary={` ${opt[optionName]}`} />
              </ListItem>
            );
        })}
      </List>
    </FormControl>
 
        )

      }
      else {
        return (<>
        </>);
      }
});
