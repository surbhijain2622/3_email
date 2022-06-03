import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  rootBackground:{
      position: "fixed",
      width: "100vw",
      height: "100vh",
      zIndex: 9999,
      backgroundColor: "white",
      opacity: 0.8,
      display: "grid",
      placeItems: "center",
  }
}));

export default function Loader() {
  const classes = useStyles();

  const isLoading = useSelector((state) => state.app.loading);

  return (
    <>{isLoading && <div className={classes.rootBackground}>
        <div className={classes.root}>
            <CircularProgress color="secondary" />
        </div>
    </div>}</>
  );
}