import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

import Tooltip from "@mui/material/Tooltip";

const CHIP_MAX_WIDTH = 250;

const CHARACTER_LENGTH = 80;

const EllipsisText = props => {
    const { children } = props;

    let i;
    let text = "";

    
    for (i = 0; i <= 120; i++) {
      text += " ";
    }
  
    return (
      <div
        style={{
          whiteSpace: "pre",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: '100%',
          maxWidth: CHIP_MAX_WIDTH 
        }}
      >
        { (children ).concat(text).slice(0,CHARACTER_LENGTH ) }
      </div>
    );
  };



export const PanelSelectedFilters = ( { filtersData, handleOnDelete } ) => {
  
    const handleChipDelete = dataToDelete => () => {
        // realizar accion de eliminacion en redux
        // agregar propiedades
      handleOnDelete( dataToDelete );
    //  setChipData(chips => chips.filter(chip => chip.source !== chipToDelete.source ));
    };

    return (
        <Paper >
        {filtersData.map( (data, index) => {
  
          return (
            <Tooltip key={`${"tooltipChip" + index}`} title={data.title}>
              <Chip
                size="small" 
                variant="outlined" 
                color="primary"
                key={`${data.source + index}`}
                label={<EllipsisText  >{data.title}</EllipsisText>}
                onDelete={handleChipDelete(data)}
                
              />
            </Tooltip>
          );
        })}
      </Paper>
    )
}
