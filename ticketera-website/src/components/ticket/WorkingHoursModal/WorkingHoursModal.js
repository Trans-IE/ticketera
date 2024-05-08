import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react'
import { ButtonTrans } from '../../ui/ButtonTrans';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function WorkingHoursModal() {
    const [counter, setCounter] = useState(0)
    const [week, setWeek] = useState(0)

    const [nextWeekButtonDisabled, setNextWeekButtonDisabled] = useState(true)
    const [lessHoursButtonDisabled, setLessHoursButtonDisabled] = useState(true)
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Lunes 6 de Mayo', '8 horas comunes trabajadas - 3 horas proyectadas trabajadas', 6.0, 24, 4.0),
        createData('Martes 7 de Mayo', '8 horas comunes trabajadas - 3 horas proyectadas trabajadas', 9.0, 37, 4.3),
        createData('Miercoles 8 de Mayo', '8 horas comunes trabajadas - 3 horas proyectadas trabajadas', 16.0, 24, 6.0),
        createData('Jueves 9 de Mayo', '8 horas comunes trabajadas - 3 horas proyectadas trabajadas', 3.7, 67, 4.3),
        createData('Viernes 10 de Mayo', '8 horas comunes trabajadas - 3 horas proyectadas trabajadas', 16.0, 49, 3.9),
        createData('Sabado 11 de Mayo', '8 horas comunes trabajadas - 3 horas proyectadas trabajadas', 16.0, 49, 3.9),
        createData('Domingo 12 de Mayo', '8 horas comunes trabajadas - 3 horas proyectadas trabajadas', 16.0, 49, 3.9),

    ];

    const addCounter = () => {
        if (counter < 9) {
            setCounter(counter + 1)
            setLessHoursButtonDisabled(false)
        }
    }

    const removeCounter = () => {
        if (counter > 0) {
            setCounter(counter - 1)
            if (counter - 1 === 0) {
                setLessHoursButtonDisabled(true)
            }
        }
    }

    const getWeekString = () => {
        let weekString = '';

        switch (week) {
            case 0:
                weekString = 'Esta semana'
                break;
            case 1:
                weekString = 'Semana pasada'
                break;
            case 2: weekString = `Hace ${week} semanas`
                break;
            default:
                weekString = `Hace ${week} semanas`;
                break;
        }

        return weekString
    }

    const handleGoToPastWeek = () => {
        setWeek(week + 1);
        setNextWeekButtonDisabled(false)
    }

    const handleGoToNextWeek = () => {
        if (week > 0) {
            setWeek(week - 1)
            if (week - 1 === 0) {
                setNextWeekButtonDisabled(true)
            }
        }
    }
    return (
        <Box sx={{ ...style }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '15%' }}>
                    <h2>Agregar Horas</h2>
                    <h3 style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
                        <Button onClick={() => handleGoToPastWeek()} sx={{ minHeight: '40px', minWidth: '40px', marginRight: '20px', borderRadius: '25px' }}>{'<'}</Button>
                        <div style={{ width: '150px', textAlign: 'center' }}>
                            {getWeekString()}
                        </div>
                        <Button disabled={nextWeekButtonDisabled} onClick={() => handleGoToNextWeek()} sx={{ minHeight: '40px', minWidth: '40px', marginLeft: '20px', borderRadius: '25px' }}>{'>'}</Button>
                    </h3>
                </div>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Dia</TableCell>
                                <TableCell >Horas trabajadas</TableCell>
                                <TableCell align="center">Agregar Horas</TableCell>
                                <TableCell align="center">Agregar Horas Proyectadas</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ 'td, th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell >{row.calories}</TableCell>
                                    <TableCell align="center">
                                        <div>
                                            <Button disabled={lessHoursButtonDisabled} onClick={() => { removeCounter() }} variant='outlined' sx={{ borderRadius: '25px', padding: 0, minHeight: '28px', minWidth: '28px', marginRight: '10px' }}>{'<'}</Button>
                                            {counter}
                                            <Button onClick={() => { addCounter() }} variant='outlined' sx={{ borderRadius: '25px', padding: 0, minHeight: '28px', minWidth: '28px', marginLeft: '10px' }}>{'>'}</Button>
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant='outlined' sx={{ borderRadius: '25px', padding: 0, minHeight: '32px', minWidth: '32px' }}>{'+'}</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>
                    <ButtonTrans variant='contained'>Guardar</ButtonTrans>
                </div>
            </div>
        </Box>
    )
}
