import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth, ToggleProps } from '../../utils/AppUtils';
import {
    Avatar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from '@material-ui/core';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainMenuItems } from './MenuItems/MenuItems';
import { UserContext } from '../../service/providers/UserContextProvider';
import { AppRoutes } from '../../utils/constants/routes';
import { Link } from 'react-router-dom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    avatarColor: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
    },
}));

export const SideDrawer: React.FC<ToggleProps> = ({ onClick, open }: ToggleProps) => {
    const classes = useStyles();
    const { authenticated, user } = useContext(UserContext);

    const getFirstCharacterForAvatar = (username?: string) => {
        return username?.charAt(0).toUpperCase();
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            style={!authenticated ? { display: 'none' } : {}}
            classes={{
                paper: classes.drawerPaper,
            }}>
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {authenticated && (
                        <>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatarColor}>
                                            {getFirstCharacterForAvatar(user && user.username)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user && user.username} />
                                </ListItem>
                            </List>
                            <Divider />
                            <List>{<MainMenuItems role={user?.role} />}</List>
                        </>
                    )}
                    {!authenticated && (
                        <>
                            <ListItem button component={Link} to={AppRoutes.Feed}>
                                <ListItemIcon>
                                    <VpnKeyIcon />
                                </ListItemIcon>
                                <ListItemText primary="Restorani" />
                            </ListItem>
                            <ListItem button component={Link} to={AppRoutes.FeedKategorije}>
                                <ListItemIcon>
                                    <VpnKeyIcon />
                                </ListItemIcon>
                                <ListItemText primary="Kategorije" />
                            </ListItem>
                        </>
                    )}
                </List>
            </div>
        </Drawer>
    );
};
