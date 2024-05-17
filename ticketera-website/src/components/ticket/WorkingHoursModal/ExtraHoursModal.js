import { Box, Button, Modal, TextField, TextareaAutosize } from '@mui/material'
import React, { forwardRef, useState } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ButtonTrans } from '../../ui/ButtonTrans';
import InputMask from 'react-input-mask';

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

function CustomHourInput(props) {
    return (
        <InputMask mask='99:99' maskChar="-" {...props}>
            {(inputProps) => <TextField {...inputProps} />}
        </InputMask>
    )
}

export default function ExtraHoursModal() {
    const [isExtraHoursModalOpen, setIsExtraHoursModalOpen] = useState(false)
    const [currentDate, setCurrentDate] = useState('')

    const CustomDatePickerInput = forwardRef(({ value, onClick }, ref) => (
        <TextField sx={{ width: '125px' }} placeholder='DD/MM/YYYY' value={value} onClick={onClick} ref={ref}>
            {value}
        </TextField>
    ));


    return (
        <React.Fragment>
            <Button onClick={() => setIsExtraHoursModalOpen(true)} variant='outlined' sx={{ borderRadius: '25px', padding: 0, minHeight: '32px', minWidth: '32px' }}>+</Button>
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
                                    <CustomHourInput sx={{ width: '100px' }} placeholder='HH:MM' />
                                    <div>
                                        hasta las
                                    </div>
                                    <CustomHourInput sx={{ width: '100px' }} placeholder='HH:MM' />
                                </div>
                            </div>
                            <div>
                                <h4>Nota</h4>
                                <TextField fullWidth multiline rows={5} />
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '15%', marginTop: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <ButtonTrans variant='contained'>Agregar horas proyectadas</ButtonTrans>
                            <ButtonTrans variant='outlined' marginLeft onClick={() => setIsExtraHoursModalOpen(false)}>Cancelar</ButtonTrans>
                        </div>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    )
}
