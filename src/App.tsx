import React, { useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { Header } from './components/Header/Header';
import { SideDrawer } from './components/SideDrawer/SideDrawer';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: { ...theme.mixins.toolbar },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const App: React.FC = () => {
    const [open, setOpen] = useState<boolean>(true);
    const classes = useStyles();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <BrowserRouter>
            <div className={classes.root}>
                <CssBaseline />
                <Header open={open} onClick={handleDrawerOpen} />
                <SideDrawer open={open} onClick={handleDrawerClose} />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Switch></Switch>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;
