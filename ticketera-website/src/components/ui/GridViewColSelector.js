import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { IconButton, Paper, Portal, Switch, FormControl, FormGroup, FormLabel, FormControlLabel, ClickAwayListener } from "@mui/material";
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

import { blue } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';


export const GridViewColSelector = ({ columns, handleOnChangeValue, position }) => {

    const propsStyles = { top: (position?.bottom) + 10, left: (position?.left) };
    const [open, setOpen] = React.useState(false);

    const { menuOpen } = useSelector((state) => state.ui, shallowEqual);

    const handleSwitchChange = (event) => {

        let opt = {};

        opt = columns.find(col => (col.id === event.target.name));
        handleOnChangeValue(opt);
    };


    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div sx={{ position: 'relative' }}>
                <IconButton
                    style={{ paddingTop: 0, paddingBottom: 0 }}
                    size="small"
                    onClick={handleClick}
                >
                    <ViewColumnIcon style={{ color: blue[50] }} />
                </IconButton>
                {open ? (
                    <Portal>
                        <Paper elevation={3}                     >
                            <FormControl component="fieldset" size="medium" >
                                <FormLabel component="legend">Visualizar columnas</FormLabel>
                                <FormGroup style={{ marginTop: 10, }} >
                                    {
                                        columns.map((currentCol, index) => {
                                            return (
                                                currentCol.cellWidth !== 0 &&
                                                <FormControlLabel key={"colselswitch " + currentCol.id}
                                                    control={<Switch checked={currentCol.visible} onChange={handleSwitchChange} name={currentCol.id} />}
                                                    label={currentCol.label}
                                                />
                                            )
                                        })
                                    }
                                </FormGroup>
                            </FormControl>
                        </Paper>
                    </Portal>
                ) : null}
            </div>
        </ClickAwayListener>
    );
}
