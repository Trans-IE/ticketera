import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';

import { styled } from "@mui/material/styles";
import { blue, red, grey } from '@mui/material/colors';
import { Tooltip } from '@mui/material';
/* 
const ToogleButtonStyled = styled(ToggleButton)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }
`;

 */
//TEST PULL REQUEST con cambios

const ToogleButtonStyled = styled(ToggleButton)(({ theme, borderRadius, borderColor, colorHover, colorSelected, colorBackground, borderSize, padding }) => ({
  //  color: theme.palette.primary.main,
  borderRadius: borderRadius,
  borderColor: borderColor ? borderColor : theme.palette.secondary.main,
  backgroundColor: colorBackground ? colorBackground : null,
  padding: padding ? padding : theme.spacing(0),
  border: borderSize ? borderSize : 1,
  width: "35px",
  ":hover": {
    color: colorHover,
  },
  '&.Mui-selected': {
    color: colorSelected ? colorSelected : theme.palette.secondary.main,
    //backgroundColor: colorBackground?colorBackground: null,
    backgroundColor: 'transparent',

  },

}));

// ver https://mui.com/material-ui/react-speed-dial/



export const ToogleButtonCtrl = ({ tooltipMsg = "", initSelected = false, customButtonIcon, customButtonIconSeleted, additionalData = 0, toogleButtonOnChange, colorHover, colorSelected, borderColor, padding }) => {
  const [selected, setSelected] = useState(initSelected);

  const onChange = (selectedValue) => {
    setSelected(selectedValue);
    toogleButtonOnChange(selectedValue, additionalData);
  }

  return (
    <Tooltip title={tooltipMsg}>
      <ToogleButtonStyled
        borderRadius={50}
        colorHover={colorHover ? colorHover : red[500]}
        colorSelected={colorSelected ? colorSelected : blue[500]}
        borderColor={borderColor ? borderColor : red[500]}
        padding={padding}
        //  colorBackground={null}
        borderSize={10}
        value="check"
        size="small"
        selected={selected}
        onChange={() => {

          onChange(!selected);
        }}
      >
        {(!selected) ? customButtonIcon : customButtonIconSeleted}
      </ToogleButtonStyled>
    </Tooltip>
  )
}
