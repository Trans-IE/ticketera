import React, { useEffect, useState } from 'react';
import { DatagridSelection } from '../ui/DatagridSelection';
import { CssBaseline, Grid, Paper } from '@mui/material';
import { Box, Container, padding } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Title } from '../ui/Title';
import { GridViewBigData } from '../ui/GridViewBigData';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { grey } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbarDrawerSearch: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 3px",
    // ...theme.mixins.toolbar,
    minHeight: "0px",
  },
  toolbarDrawerArrow: {
    paddingTop: "1px",
    paddingBottom: "1px",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerSearch: {
    width: drawerWidth,
    height: "95vh",
    marginTop: "45px",
    paddingRight: 5,
    overflowX: "hidden",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerSearchOpen: {
    width: drawerWidth,
    height: "95vh",
    marginTop: "45px",
    paddingRight: 5,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerSearchClose: {
    marginTop: "45px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(3) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(5) + 1,
    },
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(0),
    display: "flex",
    //    overflow: 'auto',
    flexDirection: "column",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  iconButtonStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 1,
  },
}));

const drawerWidth = 330;


export const TicketsScreen = () => {

  const classes = useStyles();


  const [resetPaginationGrid, setResetPaginationGrid] = useState(false);
  const { agentsGridDataHasMorePages, setAgentsGridDataHasMorePages } = useState(false);
  const [agentList, setAgentList] = useState([]);
  const [ivrFilterListSelectedConfirm, setivrFilterListSelectedConfirm] = useState([]);
  // Tipo	 Id 	Título	Empresa	Tipo de falla	Responsable 	 Estado	 Creado	Cerrado	T. Trans	T. Cliente

  const columnsData = [
    { id: 'id', label: 'Ticket', cellWidth: 1, visible: true , backgroundColor: "#b5b3b3", color: 'black'},
    { id: 'title', label: 'Titulo', cellWidth: 1, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
    { id: 'empresa', label: 'Empresa', cellWidth: 1, visible: true , backgroundColor: "#b5b3b3", color: 'black' },
    { id: 'tipofalla', label: 'Tipo Falla', cellWidth: 1, visible: true , backgroundColor: "#b5b3b3", color: 'black'},
    { id: 'responsable', label: 'Responsable', cellWidth: 1, visible: true , backgroundColor: "#b5b3b3", color: 'black'},
    { id: 'estado', label: 'Estado', cellWidth: 1, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
    { id: 'creado', label: 'Creado', cellWidth: 1, visible: true, backgroundColor: "#b5b3b3", color: 'black' }
/*     { id: 'cerrado', label: 'Cerrado', minWidth: 100 },
    { id: 'tktrans', label: 'T.Trans', minWidth: 50 },
    { id: 'tkcliente', label: 'T.Cliente', minWidth: 50 } */
  ]

  useEffect(() => {

    setAgentList([
      {
        id: 1,
        title: 'Titulo de ticket 1',
        empresa: 'Empresa 1',
        tipofalla: 'Consulta',
        responsable: 'Juan Perez',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        id: 50,

        title: 'Titulo de ticket 2',
        empresa: 'Empresa 1',
        tipofalla: 'Consulta',
        responsable: 'Juan Perez',
        estado: 'Abierto',
        creado: '01/12/2023'

      },
      {
        id: 163,
        title: 'Titulo de ticket n 3',

        empresa: 'Empresa 1',
        tipofalla: 'Consulta',
        responsable: 'Juan Perez',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        id: 161,
        title: 'Titulo de ticket 4',

        empresa: 'Empresa 1,0',
        tipofalla: 'Consulta',
        responsable: 'Juan Perez',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        id: 76,
        title: 'Titulo de ticket 5',

        empresa: 'Empresa 1,0',
        tipofalla: 'Consulta',
        responsable: 'Juan Perez',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        id: 97,
        title: 'Titulo de ticket 6',

        empresa: 'Empresa 1',
        tipofalla: 'Consulta',
        responsable: 'Juan Perez',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        id: 134,
        title: 'Titulo de ticket 7',

        empresa: 'Empresa 1',
        tipofalla: 'Consulta',
        responsable: 'Juan Perez',
        estado: 'Abierto',
        creado: '01/12/2023'
      }
    ])

    return () => {

    }
  }, [])



  const GridSelectionOnClickHandleSelect = (item) => {
    // obtengo el item seleccionado

    handleCloseModal("Selected", item);
  }

  const GridSelectionOnClickChangePage = (grid_limit, grid_offset) => {

    setResetPaginationGrid(false);
  }

  const handleGridChangePageTickets = (newpage_limit, newpage_offset) => {
    // cambio de pagina
  };

  const editTicket = (ticket) => {

  }


  return (
    <Container component="main" maxWidth="xl" className={classes.container}>
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          {/*           <Backdrop className={classes.backdrop} open={ivrGridDataLoading}>
            <CircularProgress color="inherit" />
          </Backdrop> */}
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="flex-start" justifyContent="flex-start" sx={{ padding: 2, }} >
                  <Title componentVariant="h5">{`Listado de Tickets`}</Title>
                </Box>

              </Grid>

              <Grid item xs={12} style={{ width: '-webkit-fill-available' }}>
                <Paper className={classes.paper}>
                  {
                    agentList.length > 0 && (
                      <GridViewBigData
                        columns={columnsData}
                        data={agentList}
                        customButtonNumber={1} 

                        customButtonEnable={[ true ]}
                        customButtonTooltip={[  "editar"  ]}
                        customButtonIcon={[ <OpenInNewIcon /> ]}
                        handleCustomButton={[ editTicket   ]}


                        initRowsPerPage={50}
                        handleGridChangePage={handleGridChangePageTickets}
                        resetPagination={resetPaginationGrid}
                        gridDataHasMorePages={false}
                        showColumnSelector={false}

                        detailcolumns={[]}
                        oneExpandOnly={false}
                        specialButtonStyle={{ backgroundColor: "#b5b3b3", color: 'black' }}
                        handleOnExpand={(item, expand) => {

                        }}
                        canReorderColumns={ true } 
                        customButtonNumberDetail={0}
                        customButtonEnableDetail={[]}
                        customButtonTooltipDetail={[]}
                        customButtonIconDetail={[]}
                        handleCustomButtonDetail={[]}

                        subDataActionHeaderStyle={{ backgroundColor: grey[400], color: 'black', zIndex: 1 }}
                        subDataActionRowsStyle={{ backgroundColor: grey[50] }}
                        subDataActionColumnShowLeft={true}
                        maxHeight={'calc(100vh - 135px)'}
                      />
                    )
                  }

                </Paper>
              </Grid>


            </Grid>
            {/* <Box pt={4}>
              <Copyright />
            </Box> */}
        </main>


      </div>
    </Container>

  )
}
