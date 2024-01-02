import React, { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GridViewBigData } from '../ui/GridViewBigData';
import CircleIcon from "@mui/icons-material/Circle";
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


  const [resetPaginationTickets, setResetPaginationTickets] = useState(false);
  const [rowsPerPageTickets, setRowsPerPageTickets] = useState(10);
  const [actualOffsetTickets, setActualOffsetTickets] = useState(0);

  const [resetPaginationGrid, setResetPaginationGrid] = useState(false);
  const [agentList, setAgentList] = useState([]);
  const [ivrFilterListSelectedConfirm, setivrFilterListSelectedConfirm] = useState([]);
  // Tipo	 Id 	Título	Empresa	Tipo de falla	Responsable 	 Estado	 Creado	Cerrado	T. Trans	T. Cliente

  const columnsData = [
    { id: 'priority', label: '', cellWidth: 0, visible: true },
    { id: 'id', label: 'ID', cellWidth: 0, visible: true },
    { id: 'title', label: 'Titulo', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
    { id: 'empresa', label: 'Empresa', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
    { id: 'tipofalla', label: 'Tipo de falla', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
    { id: 'responsable', label: 'Responsable', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
    { id: 'estado', label: 'Estado', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
    { id: 'creado', label: 'Creado', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' }
    /*     { id: 'cerrado', label: 'Cerrado', minWidth: 100 },
        { id: 'tktrans', label: 'T.Trans', minWidth: 50 },
        { id: 'tkcliente', label: 'T.Cliente', minWidth: 50 } */
  ]

  const setPriority = (priority) => {
    let color = 'black';
    let text = '';

    switch (priority) {
      case 1:
        color = 'green'
        text = 'Prioridad baja'
        break;
      case 2:
        color = 'yellow'
        text = 'Prioridad media'
        break;
      case 3:
        color = 'orange'
        text = 'Prioridad alta'
        break;
      case 4:
        color = 'red'
        text = 'Prioridad muy alta'
        break;
    }

    return (
      <Tooltip title={text}>
        <CircleIcon style={{ color: color }} />
      </Tooltip>
    );
  }

  useEffect(() => {
   setResetPaginationTickets(true);
    setActualOffsetTickets(0);

    setAgentList([
      {
        priority: setPriority(1),
        id: 28179,
        title: 'No entran mensajes a LinkedIn',
        empresa: 'Swiss Medical Group',
        tipofalla: 'Falla',
        responsable: '',
        estado: 'Pendiente de Asignacion',
        creado: '14/12'
      },
      {
        priority: setPriority(4),
        id: 28178,
        title: 'Supervivencia por caida de enlaces...',
        empresa: 'Sancor Seguros',
        tipofalla: 'Configuracion',
        responsable: 'Salvia, Pablo',
        estado: 'Re-Abierto',
        creado: '14/12'

      },
      {
        priority: setPriority(3),
        id: 28177,
        title: 'Quitar regla de grabacion de pantalla a los agentes en el archivo',
        empresa: 'CITYTECH S.A.',
        tipofalla: 'Configuracion',
        responsable: 'Siciliano, Juan Pablo',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        priority: setPriority(2),
        id: 28176,
        title: 'MFA Microsoft Authenticator',
        empresa: 'KPMG',
        tipofalla: 'Consulta',
        responsable: 'Flores, William',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        priority: setPriority(4),
        id: 28175,
        title: 'Certificado SSL Administracion Web',
        empresa: 'KPMG',
        tipofalla: 'Configuracion',
        responsable: 'Guerra, Mauro',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        priority: setPriority(3),
        id: 28174,
        title: 'Upgrade de Avaya',
        empresa: 'YMK S.A',
        tipofalla: 'Actualizacion',
        responsable: 'Aravena, Gustavo',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        priority: setPriority(1),
        id: 28173,
        title: 'CERTIFICADOS EXPRESSWAY',
        empresa: 'Experta',
        tipofalla: 'Reparacion',
        responsable: 'Gonzalez, Diego',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        priority: setPriority(4),
        id: 28175,
        title: 'Certificado SSL Administracion Web',
        empresa: 'KPMG',
        tipofalla: 'Configuracion',
        responsable: 'Guerra, Mauro',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        priority: setPriority(3),
        id: 28174,
        title: 'Upgrade de Avaya',
        empresa: 'YMK S.A',
        tipofalla: 'Actualizacion',
        responsable: 'Aravena, Gustavo',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        priority: setPriority(1),
        id: 28173,
        title: 'CERTIFICADOS EXPRESSWAY',
        empresa: 'Experta',
        tipofalla: 'Reparacion',
        responsable: 'Gonzalez, Diego',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        priority: setPriority(4),
        id: 28175,
        title: 'Certificado SSL Administracion Web',
        empresa: 'KPMG',
        tipofalla: 'Configuracion',
        responsable: 'Guerra, Mauro',
        estado: 'Abierto',
        creado: '01/12/2023'
      },
      {
        priority: setPriority(3),
        id: 28174,
        title: 'Upgrade de Avaya',
        empresa: 'YMK S.A',
        tipofalla: 'Actualizacion',
        responsable: 'Aravena, Gustavo',
        estado: 'Abierto',
        creado: '01/12/2023'
      }
    ])

    return () => {

    }
  }, [])



const handleGridChangePageTickets = (newpage_limit, newpage_offset) => {
    setResetPaginationTickets(false);
    setActualOffsetTickets(newpage_offset)
};

  const GridSelectionOnClickHandleSelect = (item) => {
    // obtengo el item seleccionado
    console.log(item)
    alert(`Entrar al ticket N: ${item.id}`);
  }

  const GridSelectionOnClickChangePage = (grid_limit, grid_offset) => {

    setResetPaginationGrid(false);
  }


  const editTicket = (ticket) => {

  }


  return (

    <div style={{
      width: '95vw', height: '100%', margin: ' 0 auto', padding: '25px'
    }}>
      {
        agentList.length > 0 && (
          <GridViewBigData
            columns={columnsData}
            data={agentList}
            customButtonNumber={0}
            customButtonTooltip={[]}
            customButtonIcon={[]}
            handleCustomButton={[]}
            customButtonEnable={[false]}
            initRowsPerPage={rowsPerPageTickets}
            handleGridChangePage={handleGridChangePageTickets}
            resetPagination={resetPaginationTickets}
            gridDataHasMorePages={true}
            showColumnSelector={false}
            gridSelectionOnClick={GridSelectionOnClickHandleSelect}
            detailcolumns={[]}
            oneExpandOnly={false}
            specialButtonStyle={{ backgroundColor: "#b5b3b3", color: 'black' }}
            handleOnExpand={(item, expand) => {

            }}
            canReorderColumns={true}
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

    </div>


  )
}
