import {React, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerMenuList from './DrawerMenuList';

export default function DrawerMenu() {

    const [drawerState, setDrawerState] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setDrawerState(open);
      };

    return (
        <div>
            <MenuIcon onClick={toggleDrawer(true)}/>
            <Drawer open={drawerState} onClose={toggleDrawer(false)}>
                <DrawerMenuList toggleDrawer={toggleDrawer}/>
            </Drawer>
        </div>
    )
}
