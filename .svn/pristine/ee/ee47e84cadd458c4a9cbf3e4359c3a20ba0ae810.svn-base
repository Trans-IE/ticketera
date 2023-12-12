import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { IconButton, Paper, Portal, Switch, FormControl, FormGroup, FormLabel, FormControlLabel, ClickAwayListener } from "@mui/material";
import { makeStyles } from '@mui/styles'
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

import { blue } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';


const useStyles = makeStyles((theme, props) => ({
    root: {
        position: 'relative',
    },
    dropdown: {
        position: 'fixed',
        width: 200,
        top: theme.spacing(29),
        left: theme.spacing(45),
        transform: 'translate(-50%, -50%)',
        border: '1px solid',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        backgroundColor: alpha("#ffffff", 0.9),
    },
    dropdownDrawerClose: {
        position: 'fixed',
        width: 200,
        top: (props) => props.top,
        left: theme.spacing(17),
        border: '1px solid',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        backgroundColor: alpha("#ffffff", 1),
        zIndex: 5
    }
}));



export const GridViewColSelector = ({ columns, handleOnChangeValue, position }) => {

    const propsStyles = { top: (position?.bottom) + 10, left: (position?.left) };
    const classes = useStyles(propsStyles);
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
            <div className={classes.root}>
                <IconButton
                    style={{ paddingTop: 0, paddingBottom: 0 }}
                    size="small"
                    onClick={handleClick}
                >
                    <ViewColumnIcon style={{ color: blue[50] }} />
                </IconButton>
                {open ? (
                    <Portal>
                        <Paper elevation={3}

                            className={
                                menuOpen === false
                                    ? classes.dropdownDrawerClose
                                    : classes.dropdown
                            }
                        >
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
