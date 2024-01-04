import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
import { editTicketTabShownChange } from '../../redux/actions/userInterfaceActions';
import { NewTicketScreen } from '../ticket/NewTicketScreen';

export const TabsScreen = (props) => {

  const theme = useTheme();
  const [value, setValue] = useState('1');
  const dispatch = useDispatch();
  const { config } = useSelector((state) => state.auth, shallowEqual);
  const { editTicketTabShown } = useSelector((state) => state.ui, shallowEqual)

  const handleChange = (event, newValue) => {
    dispatch ( editTicketTabShownChange( parseInt(newValue) ) );
    setValue(newValue);
  };

  const handleClickTab = ( ) => {



    dispatch ( editTicketTabShownChange( parseInt(value) ) );

  }


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
      minWidth: '60px',
      opacity: '1'
    }),
  );

  return (
    <Box sx={{ width: '95vw' }}>
      <TabContext value={value}>
        <Box sx={{}}>
          <Stack direction="row"   >
            <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example">
              <StyledTab label="Ticket 28179" value="1"  onClick={handleClickTab} />
              {/*             <Tab label="Item Three 3" value="3" /> */}
            </Tabs>
            <StyledIconTab value={0} icon={<AddCircleIcon color="primary"/>}/>
          </Stack>
        </Box>
        <TabPanel value="1" style={{display: !editTicketTabShown ? 'none' : 'block'}}>
          <TabItem />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
