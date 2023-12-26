import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Rating from '@mui/material/Rating';
import { Button, Tooltip } from '@mui/material';
import { useTheme } from '@mui/styles';

export const DataTable = () => {
    const theme = useTheme()

    function createData(
        priority,
        name,
        calories,
        fat,
        carbs,
        protein,
        state,
        created
    ) {
        return { priority, name, calories, fat, carbs, protein, state, created };
    }

    const rows = [
        createData(1, 28179, 'No entran mensajes a LinkedIn', 'Swiss Medical Group', 'Falla', '', 'Pendiente de Asignacion', '14/12'),
        createData(4, 28178, 'Supervivencia por caida de enlaces...', 'Sancor Seguros', 'Configuracion', 'Salvia, Pablo', 'Re-abierto', '14/12'),
        createData(3, 28177, 'Quitar regla de grabacion de pantalla a los agentes en el archivo', 'CITYTECH S.A.', 'Configuracion', 'Siciliano, Juan Pablo', 'Pendiente de Trans', '13/12'),
        createData(2, 28176, 'MFA Microsoft Authenticator', 'KPMG', 'Consulta', 'Flores, William', 'Pendiente de Trans', '02/12'),
        createData(4, 28175, 'Certificado SSL Administracion Web', 'KPMG', 'Configuracion', 'Guerra, Mauro', 'Pendiente de Cierre', '22/11'),
        createData(3, 28174, 'Upgrade de Avaya', 'YMK S.A.', 'Actualizacion', 'Aravena, Gustavo', 'Pendiente de Trans', '22/11'),
        createData(1, 29173, 'CERTIFICADOS EXPRESSWAY', 'Experta', 'Reparacion', 'Gonzalez, Diego', 'Pendiente de Cliente', '16/10'),
        createData(4, 28172, 'Desvio de llamada a celulares', 'PROSEGUR', 'Configuracion', 'Dragone, Gustavo', 'Pendiente de Cierre', '03/10'),
        createData(4, 28171, 'Configuracion preatencion Suc-Mendoza', 'PROSEGUR', 'Configuracion', 'Siciliano, Juan Pablo', 'Pendiente de cliente', '04/08'),
        createData(2, 28170, 'Revision Ports PBX', 'Metrotel', 'Consulta', 'Romero Monfort, Diego', 'Pendiente de Trans', '03/08'),
        createData(2, 28169, 'S/ Interno 60150', 'SAME', 'Falla', 'Dragone, Gustavo', 'Pendiente de Cliente', '07/01')
    ];

    const priorityColor = (priority) => {
        let color = 'black';

        switch (priority) {
            case 1:
                color = 'green'
                break;
            case 2:
                color = 'yellow'
                break;
            case 3:
                color = 'orange'
                break;
            case 4:
                color = 'red'
                break;
        }

        return color;
    }
    const priorityText = (priority) => {
        let text = '';

        switch (priority) {
            case 1:
                text = 'Prioridad baja'
                break;
            case 2:
                text = 'Prioridad media'
                break;
            case 3:
                text = 'Prioridad alta'
                break;
            case 4:
                text = 'Prioridad muy alta'
                break;
        }

        return text;
    }


    return (
        <div style={{
            width: '1600px', height: '100%', margin: ' 0 auto', padding: '25px'
        }}>
            <TableContainer style={{ borderRadius: '20px', border: '1px solid', borderColor: theme.palette.background.border }} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ backgroundColor: theme.palette.background.dark }}>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Titulo</TableCell>
                            <TableCell>Empresa</TableCell>
                            <TableCell>Tipo de falla</TableCell>
                            <TableCell>Responsable</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Creado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ backgroundColor: theme.palette.background.main }}>
                        {rows.map((row) => (
                            <TableRow
                                hover
                                key={row.name}
                                style={{ cursor: 'pointer' }}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={ () => window.location.href = `${window.location.href}/${row.name}`}
                            >
                                <TableCell component="th" scope="row">
                                    <Tooltip title={priorityText(row.priority)}>
                                        <CircleIcon style={{ color: priorityColor(row.priority) }} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.calories}</TableCell>
                                <TableCell>{row.fat}</TableCell>
                                <TableCell>{row.carbs}</TableCell>
                                <TableCell>{row.protein}</TableCell>
                                <TableCell>{row.state}</TableCell>
                                <TableCell>{row.created}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={10}
                page={0}
                onPageChange={() => { }}
                onRowsPerPageChange={() => { }}
            />
        </div>
    );
}