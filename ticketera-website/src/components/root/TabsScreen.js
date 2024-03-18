import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TabItem } from './TabItem';
import { useTheme } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import { editTicketTabShownChange } from '../../redux/actions/userInterfaceActions';
import { NewTicketScreen } from '../ticket/NewTicketScreen';
import { object } from 'prop-types';
import { arrayTabsAddNew } from '../../redux/actions/userInterfaceActions';

export const TabsScreen = () => {

  const theme = useTheme();
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();
  const { config } = useSelector((state) => state.auth, shallowEqual);
  const { editTicketTabShown, arrayTabs } = useSelector((state) => state.ui, shallowEqual);

  const handleChange = (event, newValue) => {
    dispatch(editTicketTabShownChange(parseInt(newValue)));
    setValue(newValue);
  };

  const handleClickTab = (objTab) => {
    dispatch(editTicketTabShownChange(parseInt(value)));
  }

  const handleCreateNewTicket = () => {

    let tabNew = new Object();
    // definir constantes con tipos asociados a la operacion_ 
    // 0: crear ticket 1: editar ticket 2: abm de empresas 3: abm marcas 
    tabNew.type = 0;
    tabNew.title = "Nuevo Ticket";
    tabNew.id = 0;
    tabNew.index = arrayTabs.length + 1;

    dispatch(arrayTabsAddNew(tabNew));
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row"   >
            <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example">

              {

                arrayTabs.map((objTab, i) => {
                  //  console.log(columns[colIdx])
                  return (
                    <StyledTab key={objTab.index} index={i} label={objTab.title} value={i} onClick={() => { handleClickTab(objTab) }} />
                  );
                })

              }

            </Tabs>
            <StyledIconTab value={0} icon={<AddCircleIcon color="primary" />} onClick={handleCreateNewTicket} />
          </Stack>
        </Box>
        {
          arrayTabs.map((objTab, i) => {
            console.log('objTab', objTab)
            return (
              editTicketTabShown === -1 ?
                <></> :
                <TabPanel key={objTab.index} index={i} value={i} style={{ padding: 0, display: (editTicketTabShown === -1) ? 'none' : 'block' }}>
                  <TabItem ticketID={objTab.id} />
                </TabPanel>
            );
          })
        }
      </TabContext>
    </Box>
  );
}
