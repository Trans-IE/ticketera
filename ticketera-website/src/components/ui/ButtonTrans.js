import React from 'react';
import { Button } from '@mui/material';


export const ButtonTrans = ({ variant, children, marginLeft, onClick = {} }) => {

    return (
        <Button variant={variant} onClick={onClick} style={{ borderRadius: '20px', marginLeft: marginLeft ? '5px' : 0 }}> {children} </Button>
    )
}