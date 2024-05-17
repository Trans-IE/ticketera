import { Box, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ButtonTrans } from '../../ui/ButtonTrans';
import ExtraHoursModal from './ExtraHoursModal';

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

const confirmationModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function WorkingHoursModal({ closeModal }) {
    const [week, setWeek] = useState(0)
    const [tableRows, setTableRows] = useState([])

    const [hoursToAdd, setHoursToAdd] = useState([])

    const [nextWeekButtonDisabled, setNextWeekButtonDisabled] = useState(true)

    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
    useEffect(() => {
        let daysOfTheWeek = getCurrentWeekDates(week)

        setTableRows([
            createData(daysOfTheWeek[0][0], '8 horas trabajadas - 3 horas proyectadas trabajadas', 0, daysOfTheWeek[1][0]),
            createData(daysOfTheWeek[0][1], '8 horas trabajadas - 3 horas proyectadas trabajadas', 0, daysOfTheWeek[1][1]),
            createData(daysOfTheWeek[0][2], '8 horas trabajadas - 3 horas proyectadas trabajadas', 0, daysOfTheWeek[1][2]),
            createData(daysOfTheWeek[0][3], '8 horas trabajadas - 3 horas proyectadas trabajadas', 0, daysOfTheWeek[1][3]),
            createData(daysOfTheWeek[0][4], '8 horas trabajadas - 3 horas proyectadas trabajadas', 0, daysOfTheWeek[1][4]),
            createData(daysOfTheWeek[0][5], '8 horas trabajadas - 3 horas proyectadas trabajadas', 0, daysOfTheWeek[1][5]),
            createData(daysOfTheWeek[0][6], '8 horas trabajadas - 3 horas proyectadas trabajadas', 0, daysOfTheWeek[1][6]),
        ]);
    }, [week])


    function getCurrentWeekDates(weeksAgo = 0) {
        const today = new Date();
        const currentDay = today.getDay();
        const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        const currentWeekDates = [];
        const currentDates = [];

        const mondayDate = new Date(today);
        mondayDate.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1) - (weeksAgo * 7));

        for (let i = 0; i < 7; i++) {
            const date = new Date(mondayDate);
            date.setDate(mondayDate.getDate() + i);
            const dayOfWeek = weekDays[date.getDay()];
            const month = date.toLocaleString('es-ES', { month: 'long' });
            const day = date.getDate();
            currentWeekDates.push(`${dayOfWeek}, ${day} de ${month}`);
            currentDates.push(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`)
        }

        return [currentWeekDates, currentDates]
    }


    function createData(date, hoursWorked, hoursWorkedToAdd, dateString) {
        return { date, hoursWorked, hoursWorkedToAdd, dateString };
    }

    const addCounter = (date, dateString) => {
        const existingDateIndex = findDate(date);
        let hoursToAddArrayCopy = []
        hoursToAddArrayCopy.push(...hoursToAdd)

        if (existingDateIndex !== -1) {
            if (hoursToAddArrayCopy[existingDateIndex].hours < 9) {
                hoursToAddArrayCopy[existingDateIndex].hours += 1;
                if (hoursToAddArrayCopy[existingDateIndex.hours++ === 9]) {
                    setAddHoursButtonDisabled(true)
                }
            }
        } else {
            hoursToAddArrayCopy.push({ date: date, hours: 1, dateString: dateString });
        }
        setHoursToAdd([...hoursToAddArrayCopy])
    }

    const removeCounter = (date) => {
        const existingDateIndex = findDate(date);
        let hoursToAddArrayCopy = []
        hoursToAddArrayCopy.push(...hoursToAdd)

        if (existingDateIndex !== -1) {
            if (hoursToAddArrayCopy[existingDateIndex].hours === 1) {
                hoursToAddArrayCopy.splice(existingDateIndex, 1);
            }
            else {
                hoursToAddArrayCopy[existingDateIndex].hours -= 1;
            }
        }

        setHoursToAdd([...hoursToAddArrayCopy])
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

    const findDate = (date) => {
        return hoursToAdd.findIndex(item => item.date === date)
    }

    const handleAddHours = () => {
        console.log('Horas a agregar: ', hoursToAdd)
        setIsConfirmationModalOpen(true)
    }

    return (
        <Box sx={{ ...style }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '15%', marginBottom: '20px' }}>
                    <h2>Agregar Horas</h2>
                    <h3 style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
                        <Button
                            onClick={() => handleGoToPastWeek()}
                            sx={{ minHeight: '40px', minWidth: '40px', marginRight: '20px', borderRadius: '25px' }}
                        >
                            &lt;
                        </Button>
                        <div style={{ width: '150px', textAlign: 'center' }}>
                            {getWeekString()}
                        </div>
                        <Button
                            disabled={nextWeekButtonDisabled}
                            onClick={() => handleGoToNextWeek()}
                            sx={{ minHeight: '40px', minWidth: '40px', marginLeft: '20px', borderRadius: '25px' }}
                        >
                            &gt;
                        </Button>
                    </h3>
                </div>
                <TableContainer style={{ maxHeight: '75%' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Dia</TableCell>
                                <TableCell >Horas trabajadas cargadas</TableCell>
                                <TableCell align="center">Agregar Horas</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>Agregar Horas Proyectadas</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableRows.map((row) => (
                                <TableRow
                                    key={row.dateString}
                                    sx={{ 'td, th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <span style={{ whiteSpace: 'nowrap' }}>{row.date}</span>
                                    </TableCell>
                                    <TableCell >
                                        <span style={{ whiteSpace: 'nowrap' }}>{row.hoursWorked}</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <span style={{ whiteSpace: 'nowrap' }}>
                                            <Button
                                                disabled={findDate(row.date) === -1}
                                                onClick={() => { removeCounter(row.date) }}
                                                variant='outlined'
                                                sx={{ borderRadius: '25px', padding: 0, minHeight: '28px', minWidth: '28px', marginRight: '10px' }}
                                            >
                                                -
                                            </Button>
                                            <span style={{ userSelect: 'none' }}>
                                                {findDate(row.date) !== -1 ? hoursToAdd[findDate(row.date)].hours : 0}
                                            </span>
                                            <Button
                                                disabled={hoursToAdd[findDate(row.date)]?.hours === 9}
                                                onClick={() => { addCounter(row.date, row.dateString) }}
                                                variant='outlined'
                                                sx={{ borderRadius: '25px', padding: 0, minHeight: '28px', minWidth: '28px', marginLeft: '10px' }}
                                            >
                                                +
                                            </Button>
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <ExtraHoursModal />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ marginTop: '10px', height: '5%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <ButtonTrans onClick={() => handleAddHours()} variant='contained' >Agregar</ButtonTrans>
                    <ButtonTrans onClick={() => closeModal()} variant='outlined' marginLeft>Cancelar</ButtonTrans>
                </div>
                <Modal open={isConfirmationModalOpen}>
                    <Box sx={{ ...confirmationModalStyle }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ height: '10%' }}>
                                Las siguientes horas seran agregadas:
                            </h2>
                            <div style={{ maxHeight: '85%' }}>
                                <div>
                                    <h4>Horas comunes:</h4>
                                    {hoursToAdd.map(item => (
                                        <div>
                                            {`${item.hours} hora/s el dia ${item.date}`}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h4>Horas proyectadas</h4>

                                </div>
                            </div>
                        </div>

                    </Box>
                </Modal>
            </div>
        </Box>
    )
}
