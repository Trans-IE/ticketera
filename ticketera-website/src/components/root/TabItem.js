import React from 'react';
import { Grid } from '@mui/material';
import { NewTicketScreen } from '../ticket/NewTicketScreen';
import { TicketDetail } from '../ticket/TicketDetail/TicketDetail';

export const TabItem = ({ ticketID }) => {
    console.log('ticket id a mostrar ', ticketID);
    return (
        <>
            {
                ticketID === 0 ?
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        justifyContent={"center"}
                        sx={{ flexGrow: 1, width: '100%', }}
                    >
                        <div style={{ height: '90vh', overflow: 'auto', margin: '20px' }}>
                            <NewTicketScreen />
                        </div>
                    </Grid>
                    :
                    <TicketDetail ticketID={ticketID} />
            }
        </>

    )
}
