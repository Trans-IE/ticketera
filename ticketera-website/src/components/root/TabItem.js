import React from 'react';
import { Grid, Paper } from '@mui/material';
import { ChatConversation } from '../chat/ChatConversation';
import { TicketDetail } from '../ticket/TicketDetail';
import { NewTicketScreen } from '../ticket/NewTicketScreen';

export const TabItem = ({ ticketID }) => {
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
