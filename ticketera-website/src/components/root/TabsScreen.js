import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { TabItem } from './TabItem';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import { arrayTabsClose, editTicketTabShownChange, mainMenuShownChange } from '../../redux/actions/userInterfaceActions';
import { arrayTabsAddNew } from '../../redux/actions/userInterfaceActions';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const TabsScreen = () => {

  const theme = useTheme();
  const [value, setValue] = useState(-1);
  const dispatch = useDispatch();
  const { config } = useSelector((state) => state.auth, shallowEqual);
  const { editTicketTabShown, arrayTabs, uiMainMenuShown } = useSelector((state) => state.ui, shallowEqual);

  const handleChange = (event, newValue) => {
    console.log('llamo al handlechage con value ', newValue);
    dispatch(editTicketTabShownChange(parseInt(newValue)));
    setValue(newValue);
  };

  useEffect(() => {
    setValue(editTicketTabShown);



    return () => {

    }
  }, [editTicketTabShown])

  useEffect(() => {

    console.log('uiMainMenuShown tab', uiMainMenuShown);
    if (arrayTabs?.length > 0 /* && uiMainMenuShown === -1 */) {
      console.log(arrayTabs.length);
      handleChange(null, arrayTabs.length - 1)
    }
    else {
      dispatch(mainMenuShownChange(1))
    }
  }, [arrayTabs?.length])



  const newTicketProcess = () => {
    try {
      let tabNew = new Object();
      // definir constantes con tipos asociados a la operacion_ 
      // 0: crear ticket 1: editar ticket 2: abm de empresas 3: abm marcas 
      tabNew.type = 0;
      tabNew.title = "Nuevo Ticket";
      tabNew.id = 0;
      tabNew.index = arrayTabs.length;


      console.log(`create new ticket `);
      dispatch(arrayTabsAddNew(tabNew))

      return tabNew;

    } catch (error) {
      return null;
    }

  }

  const handleCreateNewTicket = () => {

    const tab = newTicketProcess();
  }

  const handleCloseTab = (e, index) => {
    console.log('Cerrando...', index)
    e.stopPropagation();
    dispatch(arrayTabsClose(index))
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
      <TabContext value={value.toString()}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row"   >
            <Tabs value={editTicketTabShown} onChange={handleChange} aria-label="lab API tabs example">
              {
                arrayTabs.map((objTab, i) => {
                  return (
                    // <StyledTab key={objTab.index} index={i} label={objTab.title} value={i} onClick={() => { handleClickTab(objTab) }} />
                    <StyledTab key={objTab.index} index={i} value={i} label={
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {objTab.title}
                        <IconButton sx={{ margin: 0, padding: 0, marginLeft: '10px' }} component="span" onClick={(e) => { handleCloseTab(e, objTab.index) }}>
                          <CloseIcon sx={{ fontSize: 18, color: 'gray' }} />
                        </IconButton>
                      </span>
                    } />

                  );
                })

              }
            </Tabs>
            <StyledIconTab value={0} icon={<AddCircleIcon color="primary" />} onClick={handleCreateNewTicket} />

          </Stack>
        </Box>
        {
          arrayTabs.map((objTab, i) => {
            return (
              editTicketTabShown === -1 ?
                <div key={objTab.index}></div> :
                <TabPanel key={objTab.index} index={i} value={i.toString()} style={{ padding: 0, display: (editTicketTabShown === -1) ? 'none' : 'block' }}>
                  <TabItem ticketID={objTab.id} />
                </TabPanel>
            );
          })
        }
      </TabContext>
    </Box>
  );
}
