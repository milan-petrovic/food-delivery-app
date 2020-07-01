import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ToggleProps } from '../../utils/AppUtils';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { UserContext } from '../../service/providers/UserContextProvider';
import { Link, useHistory } from 'react-router-dom';
import { AppRoutes } from '../../utils/constants/routes';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
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
    const history = useHistory();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                    onClick={() => history.push('/')}>
                    Food delivery
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
