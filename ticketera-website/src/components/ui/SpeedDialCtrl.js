import React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';


  const sdStyle= {
    '& .MuiFab-primary': { width: 22, height: 22, minHeight: 0, '& .MuiSpeedDialIcon-icon': { fontSize: 24 }  }
  }

  const actionSize = {
    width: 32,
    height: 32,
  }

export const SpeedDialCtrl = ({actions, onClickItem}) => {

    const handleOnClickItem = (key) => {

        onClickItem(key);
 
    }

    return (
            <SpeedDial 
            ariaLabel="SpeedDial" 
            sx={sdStyle} 
            direction={"right"}
            icon={<SpeedDialIcon />}
            >
            {actions.map((action) => (
                <SpeedDialAction
                key={action.name} 
                icon={action.icon} 
                tooltipTitle={action.name} 
                sx={actionSize} 
                onClick={ () => handleOnClickItem(action.key) }
                />
            ))}
            </SpeedDial>
    )
}
