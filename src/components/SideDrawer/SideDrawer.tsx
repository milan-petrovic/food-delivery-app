import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth, ToggleProps } from '../../utils/AppUtils.';
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
} from '@material-ui/core';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainMenuItems } from './MenuItems/MenuItems';
import { UserContext } from '../../service/providers/UserContextProvider';
import { AppRoutes } from '../../utils/constants/routes';
import { Link } from 'react-router-dom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(8),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
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
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}>
            <div className={classes.toolbarIcon}>
                <IconButton onClick={onClick}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
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
                        <ListItem button component={Link} to={AppRoutes.FeedKateogrije}>
                            <ListItemIcon>
                                <VpnKeyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Kategorije" />
                        </ListItem>
                    </>
                )}
            </List>
        </Drawer>
    );
};
