import { NotificationProps } from '../../utils/AppUtils';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import React, { useContext, useEffect, useState } from 'react';
import { Restoran } from '../../utils/constants/types';
import { deleteRestoran, deleteRestoranImage, getAllRestorani } from '../../service/domain/RestoraniService';
import { notifyOnReject } from '../../utils/ApiUtils';
import {
    Button,
    Container,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Notification } from '../../components/Notification/Notification';
import { UserContext } from '../../service/providers/UserContextProvider';
import { AppRoutes } from '../../utils/constants/routes';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    paper: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        float: 'right',
        margin: theme.spacing(2),
    },
}));

export const RestoraniContainer: React.FC<NotificationProps> = (props) => {
    const classes = useStyles();
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const [restorani, setRestorani] = useState<Restoran[]>();
    const { authenticated, user } = useContext(UserContext);
    const [dialog, setDialog] = useState<{ open: boolean; restoran: Restoran | null }>();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        getRestorani();
    }, []);

    useEffect(() => {
        if (location && location.state) {
            const pushedNotification = location.state as NotificationProps;
            setNotification({ ...pushedNotification, onClose: () => setNotification(undefined) });
        }
    }, [location]);

    const handleDelete = (restoran: Restoran) => {
        if (authenticated) {
            deleteRestoran(restoran, user?.accessToken!)
                .then((response) => {
                    setNotification({
                        message: `Uspjesno obrisan restoran ${restoran.ime}`,
                        onClose: () => setNotification(undefined),
                    });
                })
                .catch((error) => {
                    notifyOnReject(setNotification, 'Greska prilikom brisanja restorana');
                    setDialog({ open: false, restoran: null });
                })
                .finally(() => {
                    getRestorani();
                    setDialog({ open: false, restoran: null });
                });
        }
    };

    const getRestorani = () => {
        getAllRestorani()
            .then((response) => {
                setRestorani(response.data);
            })
            .catch(notifyOnReject(setNotification));
    };

    const handleOpenDialog = (restoran: Restoran) => {
        setDialog({
            open: true,
            restoran: restoran,
        });
    };

    const handleCloseDialog = () => {
        setDialog({
            open: false,
            restoran: null,
        });
    };

    const handleDeleteImage = (restoranId: number) => {
        deleteRestoranImage(restoranId, user?.accessToken!)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            {notification && (
                <Notification
                    popupDuration={notification?.popupDuration}
                    message={notification?.message}
                    onClose={notification?.onClose}
                    severity={notification?.severity}
                />
            )}
            {dialog && dialog.open && (
                <Dialog
                    open={dialog.open}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Potvrda brisanja restorana</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`Da li ste sigurni da zelite obrisati restoran ${dialog?.restoran?.ime}?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button size="large" onClick={() => handleDelete(dialog?.restoran!)} color="secondary">
                            Potvrdi
                        </Button>
                        <Button size="large" onClick={() => handleCloseDialog()}>
                            Odustani
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12} sm={9}></Grid>
                    <Grid item xs={12} sm={3}>
                        <Button
                            color="secondary"
                            variant="outlined"
                            className={classes.button}
                            startIcon={<AddIcon />}
                            component={Link}
                            to={AppRoutes.RestoranKorisniciNew}>
                            Dodaj
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ime</TableCell>
                                <TableCell>Adresa</TableCell>
                                <TableCell>Telefon</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Opis</TableCell>
                                <TableCell>Radno vrijeme</TableCell>
                                <TableCell>Cijena dostave</TableCell>
                                <TableCell>Korisnik</TableCell>
                                <TableCell>Akcije</TableCell>
                                <TableCell>Slika</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restorani?.map((restoran, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell>{restoran.ime}</TableCell>
                                        <TableCell align="left">{restoran.adresa}</TableCell>
                                        <TableCell align="left">{restoran.tel}</TableCell>
                                        <TableCell align="left">{restoran.email}</TableCell>
                                        <TableCell align="left">{restoran.opis}</TableCell>
                                        <TableCell align="left">{restoran.radnoVrijeme}</TableCell>
                                        <TableCell align="left">{restoran.cijenaDostave}</TableCell>
                                        <TableCell align="left">{restoran.usertbl!.uname}</TableCell>
                                        <TableCell align="left">
                                            <IconButton
                                                aria-label="Edit category"
                                                color="secondary"
                                                size="small"
                                                onClick={() =>
                                                    history.push(
                                                        `/admin/restorani/korisnik/${restoran.usertbl?.id!}`,
                                                        restoran,
                                                    )
                                                }>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="Delete category"
                                                size="small"
                                                onClick={() => handleOpenDialog(restoran!)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="left">
                                            <IconButton
                                                aria-label="Add image"
                                                color="secondary"
                                                size="small"
                                                onClick={() => history.push(`/admin/restorani/image/${restoran.id!}`)}>
                                                <SettingsIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};
