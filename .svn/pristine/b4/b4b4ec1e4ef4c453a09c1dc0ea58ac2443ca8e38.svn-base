import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';
import { Stack, Typography } from '@mui/material';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    rounded: theme.spacing(2.5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: grey[200],
  },
  styleFontLabel: {
    ...theme.typography.robotoRegularsz14,
    fontWeight: 0,
    color: grey[500],
  },
  styleLabel: {
    marginTop: theme.spacing(0),
    marginRight: theme.spacing(0),
    marginBottom: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),

    borderTopRightRadius: theme.spacing(2.5),
    borderBottomRightRadius: theme.spacing(2.5),
    borderTopLeftRadius: theme.spacing(2.5),
    borderBottomLeftRadius: theme.spacing(2.5),
  },
  styleFontMessageText: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000'
  },

}));

export const ChatMessageLabel = ({ timestamp, message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: '-5px' }}>
        <Grid item xs={12} >
          <Paper className={classes.paper} elevation={0} >

            <Typography className={clsx(classes.styleFontMessageText, classes.styleLabel)} align="center" >{message}</Typography>

            <Typography className={clsx(classes.styleFontLabel, classes.styleLabel)} align="center" >{timestamp}</Typography>

          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
