import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth, ToggleProps } from '../../utils/AppUtils.';
import { Divider, Drawer, IconButton, List } from '@material-ui/core';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainMenuItems } from './MenuItems/MenuItems';

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
            <>
                <List>
                    <MainMenuItems role="test" />
                </List>
                <Divider />
            </>
        </Drawer>
    );
};
