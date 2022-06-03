import {React} from 'react'
import Typography from '@material-ui/core/Typography';
import logo from '../../static/images/favicon.svg';
import { makeStyles } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import { findByLabelText } from '@testing-library/react';

const useStyles = makeStyles({
    logo: {
        maxWidth: 50,
        maxHeight: 50,
        alignSelf: "center",
    },
    navTitle: {
        display: "flex",
        gap: "10px",
        marginTop: 0,
        justifyContent: "center",
        width: "100%",
    },
    title: {
        lineHeight: 1.6,
        margin: 0,
        alignSelf: "center",
    }
  });

export default function NavLogo(props) {

    const classes = useStyles();
    return (
        <div className={classes.navTitle}>
            <img src={logo} className={classes.logo}/>
            <h3 className={classes.title}>ChainMailer</h3>
        </div>
        
    )
}
