import React from 'react';
import { Grid, Paper } from '@mui/material';
import { ChatConversation } from '../chat/ChatConversation';
import { TicketDetail } from '../ticket/TicketDetail';

export const TabItem = ({ ticketID }) => {
    return (
        <Grid
            container
            direction="row"
            justify="center"
            justifyContent={"center"}
            sx={{ flexGrow: 1, width: '100%', }}
        >
            <TicketDetail ticketID={ticketID} />
        </Grid>
    )
}
