import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import AlarmIcon from '@mui/icons-material/Alarm';
import IconButton from '@mui/material/IconButton';
import QueueIcon from '@mui/icons-material/Queue';
import { TabItem } from './TabItem';

export const TabsScreen = () => { 

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={2}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One 1" value="1" />
            <Tab label="Item Two 2" value="2" />
{/*             <Tab label="Item Three 3" value="3" /> */}
          </TabList>
          <IconButton color="primary" aria-label="add an alarm">
        <QueueIcon />
      </IconButton>
          </Stack>
        </Box>
        <TabPanel value="1"> <TabItem /> </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
       {/*  <TabPanel value="3">Item Three</TabPanel> */}
      </TabContext>
    </Box>
  );
}
