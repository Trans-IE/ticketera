import React from 'react';
import { Button } from '@mui/material';


export const ButtonTrans = ({ variant, children, marginLeft }) => {

    return (
        <Button variant={variant} style={{ borderRadius: '20px', marginLeft: marginLeft ? '5px' : 0 }}> {children} </Button>
    )
}