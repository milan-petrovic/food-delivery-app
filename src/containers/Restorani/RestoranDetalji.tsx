import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../service/providers/UserContextProvider';
import { NotificationProps } from '../../utils/AppUtils';
import { Jelo, Restoran } from '../../utils/constants/types';
import { useRouteMatch } from 'react-router';
import { AppRoutes } from '../../utils/constants/routes';
import { getRestoranById } from '../../service/domain/RestoraniService';
import { getAllJela } from '../../service/domain/JeloService';
import { MainSection } from '../../components/MainSection/MainSection';
import { getJeloImageUrlFromApi, getRestoranImageUrlFromApi } from '../../utils/ApiUtils';
import {
    Box,
    ButtonBase,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Hidden,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
    sidebarAboutBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
    },
    icon: {
        marginRight: theme.spacing(0.5),
        marginTop: theme.spacing(0.3),
        width: 20,
        height: 20,
    },
    card: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 240,
    },
}));

export const RestoranDetalji: React.FC = (props) => {
    const { user } = useContext(UserContext);
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const [restoran, setRestoran] = useState<Restoran>();
    const [restoranImage, setRestoranImage] = useState<string>();
    const [jela, setJela] = useState<Jelo[]>();
    const matchId = useRouteMatch<{ id: string }>(AppRoutes.RestoranDetalji)?.params.id;
    const classes = useStyles();

    useEffect(() => {
        getRestoranById(Number(matchId)).then((response) => {
            setRestoran(response.data);
            setRestoranImage(getRestoranImageUrlFromApi(Number(matchId)));
            console.log(response.data);
        });
        getAllJela(Number(matchId)).then((response) => {
            setJela(response.data);
            console.log(response.data);
        });
    }, []);

    return (
        <div>
            <MainSection image={restoranImage!} name={restoran?.ime!} description={restoran?.opis!} />
            <Grid container style={{ padding: '48px' }} spacing={2}>
                <Grid xs={12} md={8} style={{ padding: '16px' }}>
                    <Box fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1}>
                        Jela
                    </Box>
                    <Divider />
                    {jela?.map((jelo, idx) => {
                        let jeloImg = getJeloImageUrlFromApi(jelo.id!);
                        return (
                            <CardActionArea onClick={() => console.log('click')}>
                                <Card className={classes.card}>
                                    <div className={classes.cardDetails}>
                                        <CardContent>
                                            <Typography component="h2" variant="h5">
                                                {jelo.ime}
                                            </Typography>
                                            <Typography variant="subtitle1" paragraph>
                                                {jelo.opis}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                {jelo.sastav}
                                            </Typography>
                                            <Typography variant="subtitle1" color="primary">
                                                RSD {jelo.cijena}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <Hidden xsDown>
                                        <CardMedia className={classes.cardMedia} image={jeloImg} />
                                    </Hidden>
                                </Card>
                            </CardActionArea>
                        );
                    })}
                </Grid>
                <Grid xs={12} md={4}>
                    <Paper elevation={0} className={classes.sidebarAboutBox}>
                        <Grid container>
                            <Grid xs={12}>
                                <Box fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1}>
                                    Informacije o restoranu
                                </Box>
                            </Grid>
                            <Grid xs={12}>
                                <Box fontWeight="fontWeightBold" fontSize={19} m={1} style={{ display: 'flex' }}>
                                    <HomeIcon className={classes.icon} />
                                    Adresa
                                </Box>
                                <Box m={1} style={{ display: 'flex' }}>
                                    <div className={classes.icon} /> {restoran?.adresa}
                                </Box>
                            </Grid>
                            <Grid xs={12}>
                                <Box fontWeight="fontWeightBold" fontSize={19} m={1} style={{ display: 'flex' }}>
                                    <MailOutlineIcon className={classes.icon} />
                                    E-mail
                                </Box>
                                <Box m={1} style={{ display: 'flex' }}>
                                    <div className={classes.icon} /> {restoran?.email}
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid xs={12}>
                                <Box fontWeight="fontWeightBold" fontSize={19} m={1} style={{ display: 'flex' }}>
                                    <PhoneIcon className={classes.icon} />
                                    Telefon
                                </Box>
                                <Box m={1} style={{ display: 'flex' }}>
                                    <div className={classes.icon} /> {restoran?.tel}
                                </Box>
                            </Grid>
                            <Grid xs={12}>
                                <Box fontWeight="fontWeightBold" fontSize={19} m={1} style={{ display: 'flex' }}>
                                    <AccessTimeIcon className={classes.icon} />
                                    Radno vrijeme
                                </Box>
                                <Box m={1} style={{ display: 'flex' }}>
                                    <div className={classes.icon} />
                                    {restoran?.radnoVrijeme}
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid xs={12}>
                                <Box fontWeight="fontWeightBold" fontSize={19} m={1} style={{ display: 'flex' }}>
                                    <DirectionsBikeIcon className={classes.icon} />
                                    Dostava
                                </Box>
                                <Box m={1} style={{ display: 'flex' }}>
                                    <div className={classes.icon} /> {restoran?.cijenaDostave}
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};
