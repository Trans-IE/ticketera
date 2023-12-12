import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// ejemplo param 1 => const options = [{ id: 0, label: 'Administrador' }, { id: 6, label: 'SkillAdmin' }]


export const RadioButtonsGroup = ( {idChecked,options, handleOnChangeValue , legend = "" } ) => {
 const [value, setValue] = React.useState(idChecked);

  const handleChange = (event) => {
  
    setValue(event.target.value);
    let opt = {};

    opt = options.find( o => ( o.id === event.target.value) );
    handleOnChangeValue(opt);
  };
 
  return (
    <FormControl component="fieldset"  >
      <FormLabel component="legend">{ legend }</FormLabel>
      <RadioGroup row
        aria-label={ legend }
        value={value}
        onChange={handleChange}
      >

        {
          options.map((option ) => (
            
            <FormControlLabel
            value={option.id}
            key={option.id}
            control={<Radio />}
            label={option.label}
            checked={value.toString() === option.id}
            labelPlacement="end"
            />

          ))

        }
      </RadioGroup>
    </FormControl>
  );
}
