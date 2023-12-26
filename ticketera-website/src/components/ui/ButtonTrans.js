import React from 'react';
import { Button } from '@mui/material';


export const ButtonTrans = ({text, variant}) => {
    
    return (
        <Button variant={variant} style={{borderRadius: '20px'}}> {text} </Button>
    )
}