import React from 'react'
import { makeStyles, useTheme } from '@mui/styles';
import { Divider, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { arrayTabsAddNew } from '../../../redux/actions/userInterfaceActions';

const useStyles = makeStyles((theme) => ({
    project: {
        color: theme.palette.trans.light,
        userSelect: 'none',
        cursor: 'pointer',
        margin: '10px 0',
        padding: '5px',
        '&:hover': {
            backgroundColor: theme.palette.background.light,
            borderRadius: '10px'
        },
    }
}));

export default function ProjectsDrawer(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { arrayTabs } = useSelector((state) => state.ui, shallowEqual);


    const dumbData = [
        {
            name: '28939 - PATIO OLMOS - Upgrade Avaya - Casasola Javier',
            level: 0,
            id: 28939
        },
        {
            name: '28941 - PATIO OLMOS - Upgrade Avaya - Aravena Gustavo',
            level: 1,
            id: 28941
        },
        {
            name: '28938 - PATIO OLMOS - Upgrade Avaya - Siciliano Juan Pablo',
            level: 1,
            id: 28938
        },
        {
            name: '28937 - PATIO OLMOS - Configuracion Avaya - Casasola Javier',
            level: 2,
            id: 28937
        },
    ]

    const formatName = (level, name) => {
        let formattedName = name

        for (let i = 0; i < level; i++) {
            formattedName = `--` + formattedName
        }

        return formattedName
    }

    const handleGoToTicket = (ticketId) => {
        console.log('entre')
        let tabNew = new Object();
        // definir constantes con tipos asociados a la operacion_ 
        // 0: crear ticket 1: editar ticket 2: abm de empresas 3: abm marcas 
        tabNew.type = 0;
        tabNew.title = `Ticket ${ticketId}`;
        tabNew.id = ticketId;
        tabNew.index = arrayTabs.length;

        dispatch(arrayTabsAddNew(tabNew));
        props.handleCloseDrawer()
    }

    return (
        <div style={{ margin: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Árbol de proyectos </h2>
                <IconButton onClick={props.handleCloseDrawer}>
                    <NavigateBeforeIcon />
                </IconButton>
            </div>
            <Divider />
            {dumbData.map(data => {
                return (
                    <div key={data.id} className={classes.project} onClick={() => { handleGoToTicket(data.id) }}>
                        {formatName(data.level, data.name)}
                    </div>
                )
            })}
        </div>
    )
}
