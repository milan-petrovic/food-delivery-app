import React, {useEffect, useState} from 'react';
import {NotificationProps} from '../../utils/AppUtils';
import {Jelo, Restoran, RestoranStavke, Stavka} from '../../utils/constants/types';
import {useHistory, useRouteMatch} from 'react-router';
import {AppRoutes} from '../../utils/constants/routes';
import {getRestoranById} from '../../service/domain/RestoraniService';
import {getAllJela} from '../../service/domain/JeloService';
import {MainSection} from '../../components/MainSection/MainSection';
import {getJeloImageUrlFromApi, getRestoranImageUrlFromApi} from '../../utils/ApiUtils';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    Hidden,
    List,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    expansionPanelBackground: {
        backgroundColor: theme.palette.grey[200],
    },
}));

export const RestoranDetalji: React.FC = (props) => {
    const history = useHistory();
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const [restoran, setRestoran] = useState<Restoran>();
    const [restoranImage, setRestoranImage] = useState<string>();
    const [jela, setJela] = useState<Jelo[]>();
    const matchId = useRouteMatch<{ id: string }>(AppRoutes.RestoranDetalji)?.params.id;
    const classes = useStyles();
    const [dialog, setDialog] = useState<{ open: boolean; jelo: Jelo | null }>();
    const [stavke, setStavke] = useState<Stavka[]>([]);
    const [sumaKorpe, setSumaKorpe] = useState<number>(0);
    let insertedKolicina: number;

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

    const handleOpenDialog = (jelo: Jelo) => {
        setDialog({ open: true, jelo: jelo });
    };

    const handleCloseDialog = () => {
        setDialog({ open: false, jelo: null });
    };

    const updateKolicina = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        insertedKolicina = Number(event.target.value);
    };

    const handleInformacijeDostave = () => {
        const restoranStavke: RestoranStavke = {
            restoran: restoran!,
            stavke: stavke,
        };

        history.push(AppRoutes.PotvrdaNarudzbe, restoranStavke);
    };

    const addStavka = (jelo: Jelo, kolicina: number) => {
        setStavke([
            ...stavke,
            {
                kolicina: kolicina,
                jeloBean: jelo,
                narudzbaBean: {
                    id: 0,
                },
            },
        ]);
        setSumaKorpe(kolicina * jelo.cijena);
        handleCloseDialog();
    };

    return (
        <div>
            <MainSection image={restoranImage!} name={restoran?.ime!} description={restoran?.opis!} />
            {dialog && dialog.open && (
                <Dialog
                    open={dialog.open}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Odaberite kolicinu</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <TextField
                                color="secondary"
                                id="standard-number"
                                type="number"
                                onChange={(event) => updateKolicina(event)}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            size="large"
                            color="secondary"
                            onClick={() => addStavka(dialog?.jelo!, insertedKolicina)}>
                            Dodaj
                        </Button>
                        <Button size="large" onClick={() => handleCloseDialog()}>
                            Odustani
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <Grid container style={{ padding: '48px' }} spacing={2}>
                <Grid xs={12} md={8} style={{ padding: '16px' }}>
                    <Box fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1}>
                        Jela
                    </Box>
                    <Divider />
                    {jela?.map((jelo, idx) => {
                        let jeloImg = getJeloImageUrlFromApi(jelo.id!);
                        return (
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
                                        <Typography variant="subtitle1" color="secondary">
                                            RSD {jelo.cijena}
                                        </Typography>
                                        <Button
                                            size="medium"
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleOpenDialog(jelo)}
                                            style={{ marginTop: '16px' }}>
                                            Dodaj u korpu
                                        </Button>
                                    </CardContent>
                                </div>
                                <Hidden xsDown>
                                    <CardMedia className={classes.cardMedia} image={jeloImg} />
                                </Hidden>
                            </Card>
                        );
                    })}
                </Grid>
                <Grid xs={12} md={4}>
                    {stavke.length !== 0 ? (
                        <ExpansionPanel className={classes.expansionPanelBackground}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Box fontWeight="fontWeightBold" fontSize={19} style={{ display: 'flex' }}>
                                    <AddShoppingCartIcon className={classes.icon} />
                                    Moja korpa {sumaKorpe} RSD
                                </Box>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <List>
                                            {stavke.map((stavka, idx) => {
                                                let contacanatedString = stavka.kolicina + ' X ' + stavka.jeloBean.ime;
                                                return (
                                                    <>
                                                        <ListItemText
                                                            primary={contacanatedString}
                                                            secondary={stavka.jeloBean.sastav}
                                                        />
                                                    </>
                                                );
                                            })}
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} style={{ paddingRight: '32px', paddingLeft: '32px' }}>
                                        <Button
                                            size="medium"
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            onClick={() => handleInformacijeDostave()}
                                            style={{ marginTop: '16px' }}>
                                            Unesi podatke o dostavi
                                        </Button>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ) : (
                        <></>
                    )}
                    <Paper elevation={0} className={classes.sidebarAboutBox} style={{ marginTop: '16px' }}>
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
