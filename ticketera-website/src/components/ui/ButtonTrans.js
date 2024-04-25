import React from 'react';
import { Button } from '@mui/material';


export const ButtonTrans = ({ variant, children, marginLeft, onClick = () => { }, color = 'primary', disabled = false }) => {

    return (
        <Button variant={variant} disabled={disabled} color={color} onClick={onClick} style={{ borderRadius: '20px', marginLeft: marginLeft ? '5px' : 0 }}> {children} </Button>
    )
}