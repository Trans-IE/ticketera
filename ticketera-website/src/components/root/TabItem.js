import React from 'react';
import { Grid, Paper } from '@mui/material';
import { ChatConversation } from '../chat/ChatConversation';
import { NewTicketScreen } from '../ticket/NewTicketScreen';
import { TicketDetail } from '../ticket/TicketDetail/TicketDetail';

export const TabItem = ({ ticketID }) => {
    console.log('ticket id a mostrar ', ticketID);
    return (
        <Grid
            container
            direction="row"
            justify="center"
            justifyContent={"center"}
            sx={{ flexGrow: 1, width: '100%', }}
        >
            {
                ticketID === 0 ?
                    <div style={{ height: '90vh', overflow: 'auto', margin: '20px' }}>
                        <NewTicketScreen />
                    </div>
                    :

                    <TicketDetail ticketID={ticketID} />
            }
        </Grid>
    )
}
