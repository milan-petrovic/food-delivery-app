import React, { useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { Header } from './components/Header/Header';
import { SideDrawer } from './components/SideDrawer/SideDrawer';
import { UserContextProvider } from './service/providers/UserContextProvider';
import { AppRoutes } from './utils/constants/routes';
import { LoginForm } from './containers/Auth/LoginForm';
import { RestoraniContainer } from './containers/Restorani/RestoraniContainer';
import { KategorijeContainer } from './containers/Kategorije/KategorijeContainer';
import { HomePage } from './containers/HomePage/HomePage';
import { KorisnikForm } from './containers/Restorani/Korisnik/KorisnikForm';
import { NarudzbineContainer } from './containers/Narudzbine/NarudzbineContainer';
import { RestoranForm } from './containers/Restorani/RestoranForm';
import { RestoranImageForm } from './containers/Restorani/RestoranImageForm';
import { JeloContainer } from './containers/Jela/JeloContainer';

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
        <UserContextProvider>
            <BrowserRouter>
                <div className={classes.root}>
                    <CssBaseline />
                    <Header open={open} onClick={handleDrawerOpen} />
                    <SideDrawer open={open} onClick={handleDrawerClose} />
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Switch>
                            <Route path={AppRoutes.Login} exact component={LoginForm} />
                            <Route path={AppRoutes.Restorani} exact component={RestoraniContainer} />
                            <Route path={AppRoutes.RestoranKorisniciNew} exact component={KorisnikForm} />
                            <Route path={AppRoutes.RestoranNew} exact component={RestoranForm} />
                            <Route path={AppRoutes.RestoranNewImage} exact component={RestoranImageForm} />
                            <Route path={AppRoutes.AdminKategorije} exact component={KategorijeContainer} />
                            <Route path={AppRoutes.Narudzbe} exact component={NarudzbineContainer} />
                            <Route path={AppRoutes.Jela} exact component={JeloContainer} />
                            <Route path="/" exact component={HomePage} />
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        </UserContextProvider>
    );
};

export default App;
