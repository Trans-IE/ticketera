import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
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

export default function WorkingHoursModal({ closeModal }) {
    const [counter, setCounter] = useState(0)
    const [week, setWeek] = useState(0)
    const [tableRows, setTableRows] = useState([])

    const [nextWeekButtonDisabled, setNextWeekButtonDisabled] = useState(true)
    const [addHoursButtonDisabled, setAddHoursButtonDisabled] = useState(true)
    const [removeHoursButtonDisabled, setRemoveHoursButtonDisabled] = useState(false)

    useEffect(() => {
        let daysOfTheWeek = getCurrentWeekDates(week)

        setTableRows([
            createData(daysOfTheWeek[0], '8 horas comunes trabajadas - 3 horas proyectadas trabajadas'),
            createData(daysOfTheWeek[1], '8 horas comunes trabajadas - 3 horas proyectadas trabajadas'),
            createData(daysOfTheWeek[2], '8 horas comunes trabajadas - 3 horas proyectadas trabajadas'),
            createData(daysOfTheWeek[3], '8 horas comunes trabajadas - 3 horas proyectadas trabajadas'),
            createData(daysOfTheWeek[4], '8 horas comunes trabajadas - 3 horas proyectadas trabajadas'),
            createData(daysOfTheWeek[5], '8 horas comunes trabajadas - 3 horas proyectadas trabajadas'),
            createData(daysOfTheWeek[6], '8 horas comunes trabajadas - 3 horas proyectadas trabajadas'),
        ]);
    }, [week])


    function getCurrentWeekDates(weeksAgo = 0) {
        const today = new Date();
        const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        const currentWeekDates = [];

        // Calculate the date of Monday for the current week
        const mondayDate = new Date(today);
        mondayDate.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1) - (weeksAgo * 7));

        // Generate the dates for the current week
        for (let i = 0; i < 7; i++) {
            const date = new Date(mondayDate);
            date.setDate(mondayDate.getDate() + i);
            const dayOfWeek = weekDays[date.getDay()];
            const month = date.toLocaleString('es-ES', { month: 'long' });
            const day = date.getDate();
            currentWeekDates.push(`${dayOfWeek}, ${day} de ${month}`);
        }

        return currentWeekDates
    }


    function createData(date, hoursWorked) {
        return { date, hoursWorked };
    }

    const addCounter = () => {
        if (counter < 9) {
            setCounter(counter + 1)
            setAddHoursButtonDisabled(false)
            if (counter + 1 === 9) {
                setRemoveHoursButtonDisabled(true)
            }
        }
    }

    const removeCounter = () => {
        if (counter > 0) {
            setCounter(counter - 1)
            setRemoveHoursButtonDisabled(false)
            if (counter - 1 === 0) {
                setAddHoursButtonDisabled(true)
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
                            {tableRows.map((row) => (
                                <TableRow
                                    key={row.date}
                                    sx={{ 'td, th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.date}
                                    </TableCell>
                                    <TableCell >{row.hoursWorked}</TableCell>
                                    <TableCell align="center">
                                        <div>
                                            <Button
                                                disabled={addHoursButtonDisabled}
                                                onClick={() => { removeCounter() }}
                                                variant='outlined'
                                                sx={{ borderRadius: '25px', padding: 0, minHeight: '28px', minWidth: '28px', marginRight: '10px' }}>
                                                {'-'}
                                            </Button>
                                            {counter}
                                            <Button
                                                disabled={removeHoursButtonDisabled}
                                                onClick={() => { addCounter() }}
                                                variant='outlined'
                                                sx={{ borderRadius: '25px', padding: 0, minHeight: '28px', minWidth: '28px', marginLeft: '10px' }}>
                                                {'+'}
                                            </Button>
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
                    <ButtonTrans onClick={() => closeModal()} variant='contained' >Cancelar</ButtonTrans>
                    <ButtonTrans variant='contained' marginLeft>Guardar</ButtonTrans>
                </div>
            </div>
        </Box>
    )
}
