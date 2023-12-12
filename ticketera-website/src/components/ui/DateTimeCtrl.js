import React, { useState } from 'react';
import Typography from '@mui/material/Typography';

import DatePicker, { registerLocale } from "react-datepicker";
import Grid from '@mui/material/Grid';

import es from 'date-fns/locale/es';
registerLocale('es', es)

import "react-datepicker/dist/react-datepicker.css";



export const DateTimeCtrl = ({ title, dateToChange, minDatetime, onDateChange, visible }) => {
    const classes = useStyles();
    const [currentDate, setCurrentDate] = useState(dateToChange);

    const filterPassedTime = time => {
    //    const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return minDatetime.getTime() < selectedDate.getTime();
    }

    if (visible == true) {

        return (
            <Grid container direction="column" justify="center" alignItems="flex-start" spacing={0}>
                <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 1, }} >
                    <Typography variant="body1" align="center" color="textSecondary" className={classes.titleStyle} >
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 0, }} >
                    <DatePicker 
                        showTimeSelect 
                        selected={currentDate}
                        
                        onChange={date => setCurrentDate(date)}
                        
                        locale="es"
                        onCalendarClose={() => onDateChange(currentDate)}
                        fixedHeight
                        showMonthDropdown
                        showYearDropdown
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="Hora"
                        timeInputLabel="Hora"
                        filterTime={(!minDatetime)?null:filterPassedTime}
                        dateFormat="dd/MM/yyyy HH:mm"
                        minDate={((!minDatetime) ? null : minDatetime)}
                    />
                </Grid>
            </Grid>
        )
    }
    else {
        return ( 
            <>
            </>
        )
    }

}
