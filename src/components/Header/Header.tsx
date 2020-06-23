import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth, ToggleProps } from '../../utils/AppUtils';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { UserContext } from '../../service/providers/UserContextProvider';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../utils/constants/routes';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },

    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        fontSize: '35px',
        fontWeight: 300,
    },
}));

export const Header: React.FC<ToggleProps> = (props: { open: boolean; onClick: () => void }) => {
    const classes = useStyles();
    const { authenticated } = useContext(UserContext);

    return (
        <AppBar position="absolute" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.onClick}
                    className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}>
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Dostava hrane
                </Typography>
                {!authenticated && (
                    <Button color="secondary" variant="outlined" component={Link} to={AppRoutes.Login}>
                        Prijavi se
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};
