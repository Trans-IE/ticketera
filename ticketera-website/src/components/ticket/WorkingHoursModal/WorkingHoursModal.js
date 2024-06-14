import { Box, Button, IconButton, ListItem, ListItemButton, ListItemText, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ButtonTrans } from '../../ui/ButtonTrans';
import ExtraHoursModal from './ExtraHoursModal';
import { useDispatch } from 'react-redux';
import { getHours, getProjectedHours, getTotalHours, setHours } from '../../../redux/actions/ticketActions';
import { toast } from 'sonner';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '80%',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '20px',
    border: '1px solid',
};

const confirmationModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '60%',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '20px',
    border: '1px solid',
};

export default function WorkingHoursModal({ ticketId, closeModal }) {
    const dispatch = useDispatch()
    const theme = useTheme()

    const [week, setWeek] = useState(0)
    const [tableRows, setTableRows] = useState([])

    const [hoursToAdd, setHoursToAdd] = useState([])

    const [nextWeekButtonDisabled, setNextWeekButtonDisabled] = useState(true)

    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
    const [loadedHours, setLoadedHours] = useState([])
    const [loadedProjectedHours, setLoadedProjectedHours] = useState([])
    const [loadedTotalHours, setLoadedTotalHours] = useState()

    useEffect(() => {
        dispatch(getHours(ticketId)).then(res => {
            setLoadedHours(formatGetHours(res, 'comunes'))
        })
        dispatch(getProjectedHours(ticketId)).then(res => {
            setLoadedProjectedHours(formatGetHours(res, 'proyectadas'))
        })
        dispatch(getTotalHours(ticketId)).then(res => {
            console.log(res[0])
            setLoadedTotalHours(res[0])
        })
    }, [])


    useEffect(() => {
        let daysOfTheWeek = getCurrentWeekDates(week)

        setTableRows([
            createData(daysOfTheWeek[0][0], createLoadedHoursRow(daysOfTheWeek[1][0]), 0, daysOfTheWeek[1][0]),
            createData(daysOfTheWeek[0][1], createLoadedHoursRow(daysOfTheWeek[1][1]), 0, daysOfTheWeek[1][1]),
            createData(daysOfTheWeek[0][2], createLoadedHoursRow(daysOfTheWeek[1][2]), 0, daysOfTheWeek[1][2]),
            createData(daysOfTheWeek[0][3], createLoadedHoursRow(daysOfTheWeek[1][3]), 0, daysOfTheWeek[1][3]),
            createData(daysOfTheWeek[0][4], createLoadedHoursRow(daysOfTheWeek[1][4]), 0, daysOfTheWeek[1][4]),
            createData(daysOfTheWeek[0][5], createLoadedHoursRow(daysOfTheWeek[1][5]), 0, daysOfTheWeek[1][5]),
            createData(daysOfTheWeek[0][6], createLoadedHoursRow(daysOfTheWeek[1][6]), 0, daysOfTheWeek[1][6]),
        ]);
    }, [week, loadedHours, loadedProjectedHours])


    function createData(date, hoursWorked, hoursWorkedToAdd, dateString) {
        return { date, hoursWorked, hoursWorkedToAdd, dateString };
    }

    const createLoadedHoursRow = (date) => {
        return (
            <div>
                <span style={{ color: 'green' }}>{getHorasForDate(date)}</span> horas comunes - <span style={{ color: 'red' }}>{getProjectedHorasForDate(date)}</span> horas proyectadas
            </div>
        )
    }

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
            currentDates.push(formatDate(date))
        }

        return [currentWeekDates, currentDates]
    }


    const formatGetHours = (dates, type) => {
        let formattedData = []

        if (type === 'comunes') {
            dates.forEach(date => {
                date.fecha_accion_hs = date.fecha_accion_hs.substring(0, 10)
                formattedData.push(date)
            })
        }
        else {
            dates.forEach(date => {
                const fecha_accion_hs = date.fecha_inicio.substring(0, 10)
                const start = new Date(date.fecha_inicio)
                const end = new Date(date.fecha_fin)
                const durationMilliseconds = end - start

                const hours = Math.floor(durationMilliseconds / (1000 * 60 * 60)).toString().padStart(2, '0')
                const minutes = Math.floor((durationMilliseconds % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0')
                const seconds = Math.floor((durationMilliseconds % (1000 * 60)) / 1000).toString().padStart(2, '0')

                const horas = `${hours}:${minutes}:${seconds}`

                formattedData.push({
                    fecha_accion_hs,
                    horas
                })
            })
        }

        return mergeAndSumHours(formattedData)
    }


    const getHorasForDate = (date) => {
        const foundData = loadedHours.find(item => item.fecha_accion_hs === date);
        return foundData ? foundData.horas.slice(0, -3) : "00:00";
    };

    const getProjectedHorasForDate = (date) => {
        const foundData = loadedProjectedHours.find(item => item.fecha_accion_hs === date);
        return foundData ? foundData.horas.slice(0, -3) : "00:00";
    };

    //No preguntar acerca de esta funcion
    const mergeAndSumHours = (data) => {
        // Function to sum time strings
        const sumTimes = (times) => {
            let totalMinutes = times.reduce((total, time) => {
                const [hours, minutes] = time.split(':').map(Number);
                return total + (hours * 60) + minutes;
            }, 0);

            const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
            const minutes = (totalMinutes % 60).toString().padStart(2, '0');

            return `${hours}:${minutes}:00`;
        };

        // Group by fecha_accion_hs and sum horas
        const mergedData = Object.values(data.reduce((acc, { fecha_accion_hs, horas }) => {
            if (!acc[fecha_accion_hs]) {
                acc[fecha_accion_hs] = { fecha_accion_hs, horas: [] };
            }
            acc[fecha_accion_hs].horas.push(horas);
            return acc;
        }, {})).map(({ fecha_accion_hs, horas }) => ({
            fecha_accion_hs: fecha_accion_hs + ' 00:00:00',
            horas: sumTimes(horas)
        }));

        return mergedData;
    };

    function formatDate(date) {
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0')
        let day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day} 00:00:00`
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

    const handleSendnewHours = () => {
        let payload = []

        hoursToAdd.forEach(item => {
            payload.push({
                ticket_id: ticketId,
                horas: `0${item.hours}:00:00`,
                fecha_accion_hs: item.dateString
            })
        })
        dispatch(setHours(payload)).then(res => {
            toast.success('Horas agregadas correctamente')
            closeModal()
        })
    }

    const isDateInTheFuture = (date) => {
        const formattedDate = new Date(date)
        const currentDate = new Date()

        if (formattedDate > currentDate) {
            return true
        }
        else {
            return false
        }
    }

    const handleDeleteHourToLoad = (data) => {
        let arrayCopy = [...hoursToAdd]
        let indexToRemove = arrayCopy.findIndex(item => item.date === data)
        arrayCopy.splice(indexToRemove, 1);
        setHoursToAdd(arrayCopy);
    }

    const formatTotalHours = (hour, minute) => {
        let hours = isNaN(hour) ? 0 : hour;
        let minutes = isNaN(minute) ? 0 : minute;

        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    const getTotalHoursString = () => {
        let regularHours = '';
        let extraHours = '';

        if (loadedTotalHours?.total_hours_horas_extras) {
            extraHours = <span style={{ color: 'red' }}>{formatTotalHours(loadedTotalHours.total_hours_horas_extras.hours, loadedTotalHours.total_hours_horas_extras.minutes)}</span>
        }
        if (loadedTotalHours?.total_hours_tickets_acciones) {
            regularHours = <span style={{ color: 'green' }}>{formatTotalHours(loadedTotalHours.total_hours_tickets_acciones.hours, loadedTotalHours.total_hours_tickets_acciones.minutes)}</span>
        }

        if (regularHours !== '' || extraHours !== '') {
            return <h4>Totales: {regularHours} comunes{extraHours !== '' && regularHours !== '' && ' - '}{extraHours} projectadas</h4>
        }
        else {
            return ''
        }
    }

    return (
        <Box sx={{ ...style, borderColor: theme.palette.background.border, bgcolor: theme.palette.background.background }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '15%', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>Agregar Horas</h2>

                        <ExtraHoursModal ticketId={ticketId} />
                    </div>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableRows.map((row) => (
                                <TableRow
                                    hover
                                    key={row.dateString}
                                    sx={{ 'td, th': { border: 0, fontSize: 14 } }}
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
                                                disabled={findDate(row.date) === -1 || isDateInTheFuture(row.dateString)}
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
                                                disabled={hoursToAdd[findDate(row.date)]?.hours === 9 || isDateInTheFuture(row.dateString)}
                                                onClick={() => { addCounter(row.date, row.dateString) }}
                                                variant='outlined'
                                                sx={{ borderRadius: '25px', padding: 0, minHeight: '28px', minWidth: '28px', marginLeft: '10px' }}
                                            >
                                                +
                                            </Button>
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ margin: '10px 0' }}>{getTotalHoursString()}</div>
                <div style={{ marginTop: '10px', height: '5%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <ButtonTrans onClick={() => setIsConfirmationModalOpen(true)} disabled={!hoursToAdd.length} variant='contained' >Agregar</ButtonTrans>
                    <ButtonTrans onClick={() => closeModal()} variant='outlined' marginLeft>Cerrar</ButtonTrans>
                </div>
                <Modal open={isConfirmationModalOpen}>
                    <Box sx={{ ...confirmationModalStyle, borderColor: theme.palette.background.border, bgcolor: theme.palette.background.background, }}>
                        <div style={{ height: '100%', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div style={{ height: '90%' }}>
                                <h2 style={{ marginBottom: '25px' }}>
                                    Las siguientes horas seran agregadas:
                                </h2>
                                <div style={{ height: '80%', overflow: 'auto' }}>
                                    <div>
                                        {hoursToAdd.length ?
                                            hoursToAdd.map(item => (
                                                <ListItem
                                                    key={item.date}
                                                    secondaryAction={
                                                        <IconButton edge="end" aria-label="comments" onClick={() => { handleDeleteHourToLoad(item.date) }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    }
                                                    disablePadding
                                                >
                                                    <ListItemButton >
                                                        <ListItemText primary={`${item.hours} ${item.hours === 1 ? 'hora' : 'horas'} el dia ${item.date}`} />
                                                    </ListItemButton>
                                                </ListItem>
                                            )) :
                                            <>No hay horas enlistadas para cargar</>
                                        }

                                    </div>
                                </div>
                            </div>

                            <div>
                                <ButtonTrans variant='contained' disabled={!hoursToAdd.length} onClick={handleSendnewHours}>Aceptar</ButtonTrans>
                                <ButtonTrans variant='outlined' marginLeft onClick={() => setIsConfirmationModalOpen(false)}>Volver</ButtonTrans>
                            </div>

                        </div>
                    </Box>
                </Modal>
            </div>
        </Box>
    )
}
