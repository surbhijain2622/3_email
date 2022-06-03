import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import PeopleIcon from '@material-ui/icons/People';
import BallotIcon from '@material-ui/icons/Ballot';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
  });

export default function DrawerMenuList(props) {
    
    const classes = useStyles();

    return (
        <div
            className={classes.list}
            role="presentation"
            onClick={props.toggleDrawer(false)}
            onKeyDown={props.toggleDrawer(false)}
        >
            <List>
                <ListItem>
                    <ListItemIcon><DashboardIcon/></ListItemIcon>
                    <ListItemText><Link to="/" className="drawer-list-item-link">Dashboard</Link></ListItemText>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon><PeopleIcon/></ListItemIcon>
                    <ListItemText><Link to="/email/manage" className="drawer-list-item-link">Manage Emails</Link></ListItemText>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon><BallotIcon/></ListItemIcon>
                    <ListItemText><Link to="/chains/manage" className="drawer-list-item-link">Manage Chains</Link></ListItemText>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon><MailIcon/></ListItemIcon>
                    <ListItemText><Link to="/mailcred" className="drawer-list-item-link">Add Mail Credentials</Link></ListItemText>
                </ListItem>
            </List>
        </div>
    )
}
