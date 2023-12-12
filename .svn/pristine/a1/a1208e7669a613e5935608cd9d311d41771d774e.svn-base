import React, { useState } from 'react'

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export const MenuIcons = ({ openIcon, mainIcon,  tooltipMessage, actions, onClickItem}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };

  const handleOnClickItem = (key) => {
    setAnchorEl(null);
    onClickItem(key);
  }
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title={tooltipMessage}>
          <IconButton
            onClick={handleClick} 
            size="small" 
            sx={{ ml: 2 }} 
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 24, height: 24, bgcolor: "#00345B" }}>{open?openIcon:mainIcon}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 10,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.2,
              mr: 1
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 5,
              bgcolor: "background.paper",
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {actions.map((action) => (
        <MenuItem onClick={() => handleOnClickItem(action.key)} sx={{ margin: 0, padding: 1, minHeight: 1, }}>
          <ListItemIcon>
            {action.icon}
          </ListItemIcon>
          {action.name}
        </MenuItem>
        ))}
      </Menu>
    </>
  );
}