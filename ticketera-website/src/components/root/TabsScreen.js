import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import AlarmIcon from '@mui/icons-material/Alarm';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TabItem } from './TabItem';
import { useTheme } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';

export const TabsScreen = () => {
  const theme = useTheme();
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      backgroundColor: theme.palette.background.main,
      borderRadius: '20px 20px 0 0',
      borderBottom: '2px solid',
      borderColor: theme.palette.background.border,
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.primary,
    }),
  );

  const StyledIconTab = styled((props) => <Tab {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      backgroundColor: theme.palette.background.main,
      borderRadius: '20px 20px 0 0',
      borderBottom: '2px solid',
      borderColor: theme.palette.background.border,
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.primary,
      minWidth: '60px'
    }),
  );

  return (
    <Box sx={{ width: '95vw' }}>
      <TabContext value={value}>
        <Box sx={{}}>
          <Stack direction="row"   >
            <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example">
              <StyledTab label="Item One 1" value="1" />
              <StyledTab label="Item Two 2" value="2" />
              {/*             <Tab label="Item Three 3" value="3" /> */}
            </Tabs>
            <StyledIconTab value={0} icon={<AddCircleIcon color="primary"/>}/>

              {/* <IconButton color="primary" aria-label="add an alarm">
                <AddCircleIcon />
              </IconButton> */}
          </Stack>
        </Box>
        <TabPanel value="1">
          <TabItem />
        </TabPanel>
        <TabPanel value="2"></TabPanel>
        {/*  <TabPanel value="3">Item Three</TabPanel> */}
      </TabContext>
    </Box>
  );
}
