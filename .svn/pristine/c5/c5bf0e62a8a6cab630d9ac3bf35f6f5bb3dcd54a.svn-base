import React from 'react';
import { Grid, Paper } from '@mui/material';
import { ChatConversation } from '../chat/ChatConversation';
import { TicketDetail } from '../ticket/TicketDetail';

export const TabItem = () => {
    return (
        <Grid
            container
            direction="row"
            justify="center" 
            justifyContent={"center"}
            spacing={2} 
            sx={{ flexGrow: 1, width: '100%', }} 
        >
            <Grid item lg={4} md={4} sm={4} xs={4} component={Paper} sx={{ display: { xs: 'none', sm: 'block' } }} >
                {/* <div>DATOS DEL TICKET</div> */}
                <TicketDetail />
            </Grid>

            <Grid item lg={8} md={8} sm={8} xs={8} component={Paper} sx={{ display: { xs: 'none', sm: 'block' } }} >

                {/* <div > CHAT DE CONVERSACION </div> */}
                <ChatConversation />

            </Grid>

        </Grid>
    )
}
