import { Box, Button, Modal, TextField, TextareaAutosize } from '@mui/material'
import React, { forwardRef, useState } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ButtonTrans } from '../../ui/ButtonTrans';
import { useDispatch } from 'react-redux';
import { setExtraHours } from '../../../redux/actions/ticketActions';
import { toast } from 'sonner';

const style = {
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

export default function ExtraHoursModal({ ticketId }) {
    const dispatch = useDispatch()

    const [isExtraHoursModalOpen, setIsExtraHoursModalOpen] = useState(false)
    const [currentDate, setCurrentDate] = useState('')
    const [hourRangeStart, setHourRangeStart] = useState('')
    const [hourRangeEnd, setHourRangeEnd] = useState('')
    const [note, setNote] = useState('')

    const CustomDatePickerInput = forwardRef(({ value, onClick }, ref) => (
        <TextField sx={{ width: '125px' }} placeholder='DD/MM/YYYY' value={value} onClick={onClick} ref={ref}>
            {value}
        </TextField>
    ));

    const isFormValid = () => {
        if (note && currentDate && hourRangeEnd && hourRangeStart) {
            return true
        }
        else {
            return false
        }
    }

    const formatDate = (date, hourRange) => {
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        let hours = hourRange.substring(0, 2)
        let minutes = hourRange.slice(-2);
        let seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    }

    const handleAddExtraHours = () => {

        const payload = {
            start: formatDate(currentDate, hourRangeStart),
            end: formatDate(currentDate, hourRangeEnd),
            note: note
        }

        dispatch(setExtraHours(ticketId, payload)).then(res => {
            toast.success(res)
            setIsExtraHoursModalOpen(false)
        })
    }

    return (
        <React.Fragment>
            <ButtonTrans
                onClick={() => setIsExtraHoursModalOpen(true)}
                variant='outlined'
                sx={{ borderRadius: '25px', padding: 0, minHeight: '32px', minWidth: '32px' }}>Agregar Horas Proyectadas</ButtonTrans>
            <Modal open={isExtraHoursModalOpen}>
                <Box sx={{ ...style }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ height: '80%' }}>
                            <h2>Horas proyectadas</h2>
                            <div>
                                <h4>Rango horario</h4>

                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <div>
                                        El dia
                                    </div>
                                    <DatePicker
                                        style={{ padding: '16.5 14' }}
                                        selected={currentDate}
                                        onChange={date => setCurrentDate(date)}
                                        locale="es"
                                        fixedHeight
                                        dateFormat="dd/MM/yyyy"
                                        customInput={<CustomDatePickerInput />}
                                    />
                                    <div>
                                        desde
                                    </div>
                                    <TextField
                                        sx={{ width: '100px' }}
                                        placeholder='HH:MM'
                                        value={hourRangeStart}
                                        onChange={e => setHourRangeStart(e.target.value)}
                                        type='time'
                                    />
                                    {/* <CustomHourInput sx={{ width: '100px' }} placeholder='HH:MM' /> */}
                                    <div>
                                        hasta las
                                    </div>
                                    <TextField
                                        sx={{ width: '100px' }}
                                        placeholder='HH:MM'
                                        value={hourRangeEnd}
                                        onChange={e => setHourRangeEnd(e.target.value)}
                                        type='time'
                                    />
                                    {/* <CustomHourInput sx={{ width: '100px' }} placeholder='HH:MM' /> */}
                                </div>
                            </div>
                            <div>
                                <h4>Nota</h4>
                                <TextField fullWidth multiline rows={5} value={note} onChange={e => setNote(e.target.value)} />
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '15%', marginTop: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <ButtonTrans variant='contained' disabled={!isFormValid()} onClick={handleAddExtraHours}>Agregar horas proyectadas</ButtonTrans>
                            <ButtonTrans variant='outlined' marginLeft onClick={() => setIsExtraHoursModalOpen(false)}>Cancelar</ButtonTrans>
                        </div>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    )
}
