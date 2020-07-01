import { NotificationProps } from '../../utils/AppUtils';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import React, { useContext, useEffect, useState } from 'react';
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
import { Kategorija } from '../../utils/constants/types';
import { deleteKategorija, getAllKategorije } from '../../service/domain/KategorijeService';
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

export const KategorijeContainer: React.FC<NotificationProps> = (props) => {
    const classes = useStyles();
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const [kategorije, setKategorije] = useState<Kategorija[]>();
    const { authenticated, user } = useContext(UserContext);
    const history = useHistory();
    const [dialog, setDialog] = useState<{ open: boolean; kategorija: Kategorija | null }>();
    const location = useLocation();

    useEffect(() => {
        getKategorije();
    }, []);

    useEffect(() => {
        if (location && location.state) {
            const pushedNotification = location.state as NotificationProps;
            setNotification({ ...pushedNotification, onClose: () => setNotification(undefined) });
        }
    }, [location]);

    const handleDelete = (kategorija: Kategorija) => {
        if (authenticated) {
            deleteKategorija(kategorija, user?.accessToken!)
                .then((response) => {
                    setNotification({
                        message: `Uspjesno obrisana kategorija ${kategorija.ime}`,
                        onClose: () => setNotification(undefined),
                    });
                })
                .catch((error) => {
                    notifyOnReject(setNotification, 'Greska prilikom brisanja kategorije');
                    setDialog({ open: false, kategorija: null });
                })
                .finally(() => {
                    getKategorije();
                    setDialog({ open: false, kategorija: null });
                });
        }
    };

    const getKategorije = () => {
        getAllKategorije()
            .then((response) => {
                setKategorije(response.data);
            })
            .catch(notifyOnReject(setNotification));
    };

    const handleOpenDialog = (kategorija: Kategorija) => {
        setDialog({
            open: true,
            kategorija: kategorija,
        });
    };

    const handleCloseDialog = () => {
        setDialog({
            open: false,
            kategorija: null,
        });
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
                    <DialogTitle id="alert-dialog-title">Potvrda brisanja kategorije</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`Da li ste sigurni da zelite obrisati kategoriju ${dialog?.kategorija?.ime}?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button size="large" onClick={() => handleDelete(dialog?.kategorija!)} color="secondary">
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
                            to={AppRoutes.KategorijaNew}>
                            Dodaj
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ime</TableCell>
                                <TableCell align="left">Opis</TableCell>
                                <TableCell align="left">Akcije</TableCell>
                                <TableCell align="left">Slike</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {kategorije?.map((kategorija, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell>{kategorija.ime}</TableCell>
                                        <TableCell align="left">{kategorija.opis}</TableCell>
                                        <TableCell align="left">
                                            <IconButton
                                                aria-label="Edit category"
                                                color="secondary"
                                                size="small"
                                                onClick={() => history.push(`/admin/kategorije/${kategorija.id!}`)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="Delete category"
                                                size="small"
                                                onClick={() => handleOpenDialog(kategorija!)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="left">
                                            <IconButton
                                                aria-label="Add image"
                                                color="secondary"
                                                size="small"
                                                onClick={() =>
                                                    history.push(`/admin/kategorije/image/${kategorija.id!}`)
                                                }>
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
