import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
export const GroupedElementsList = ({ mainElement, arrayElements }) => {
  const [open, setOpen] = React.useState(false);
  const [subheaderText, setSubheaderText] = React.useState("");

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 5000 }}
      aria-labelledby="list-steps-subheader"
      subheader={subheaderText === "" ? null
        :
        <ListSubheader component="div" id="list-steps-subheader">
          {subheaderText}
        </ListSubheader>
      }
      disablePadding
    >
      <Collapse in={open} timeout="auto" unmountOnExit>
        {arrayElements}
      </Collapse>
      <ListItem onClick={handleClick} style={{ cursor: arrayElements.length > 0 ? 'pointer' : '' }}
        secondaryAction={
          (arrayElements.length > 0) &&
          <IconButton edge="end" aria-label="comments">
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
        disablePadding fullWidth>
        {mainElement}
      </ListItem>
    </List>
  );
}
