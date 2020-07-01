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
import { UserContext } from '../../service/providers/UserContextProvider';
import { Jelo } from '../../utils/constants/types';
import { deleteJelo, getAllJela } from '../../service/domain/JeloService';
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

export const JeloContainer: React.FC<NotificationProps> = (props) => {
    const classes = useStyles();
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const [jela, setJela] = useState<Jelo[]>();
    const { authenticated, user } = useContext(UserContext);
    const [dialog, setDialog] = useState<{ open: boolean; jelo: Jelo | null }>();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        getJela();
    }, []);

    useEffect(() => {
        if (location && location.state) {
            const pushedNotification = location.state as NotificationProps;
            setNotification({ ...pushedNotification, onClose: () => setNotification(undefined) });
        }
    }, [location]);

    const handleDelete = (jelo: Jelo) => {
        if (authenticated) {
            deleteJelo(jelo, user?.accessToken!)
                .then((response) => {
                    setNotification({
                        message: `Uspesno obrisano jelo ${jelo.ime}`,
                        onClose: () => setNotification(undefined),
                    });
                })
                .catch((error) => {
                    notifyOnReject(setNotification, 'Greska prilikom brisanja jela');
                    setDialog({ open: false, jelo: null });
                })
                .finally(() => {
                    getJela();
                    setDialog({ open: false, jelo: null });
                });
        }
    };

    const getJela = () => {
        getAllJela(user?.restoran!)
            .then((response) => {
                setJela(response.data);
            })
            .catch(notifyOnReject(setNotification));
    };

    const handleOpenDialog = (jelo: Jelo) => {
        setDialog({
            open: true,
            jelo: jelo,
        });
    };

    const handleCloseDialog = () => {
        setDialog({
            open: false,
            jelo: null,
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
                    <DialogTitle id="alert-dialog-title">Potvrda brisanja jela</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`Da li ste sigurni da zelite obrisati jelo ${dialog?.jelo?.ime}?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button size="large" onClick={() => handleDelete(dialog?.jelo!)} color="secondary">
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
                            to={AppRoutes.JelaNew}>
                            Dodaj
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ime</TableCell>
                                <TableCell align="left">Cena</TableCell>
                                <TableCell align="left">Sastav</TableCell>
                                <TableCell align="left">Kategorija</TableCell>
                                <TableCell align="left">Opis</TableCell>
                                <TableCell align="left">Akcije</TableCell>
                                <TableCell align="left">Slike</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {jela?.map((jelo, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell>{jelo.ime}</TableCell>
                                        <TableCell align="left">{jelo.cijena}</TableCell>
                                        <TableCell align="left">{jelo.sastav}</TableCell>
                                        <TableCell align="left">{jelo.kategorijaBean!.ime}</TableCell>
                                        <TableCell align="left">{jelo.opis}</TableCell>
                                        <TableCell align="left">
                                            <IconButton
                                                aria-label="Edit category"
                                                color="secondary"
                                                size="small"
                                                onClick={() => history.push(`/restoran/jela/${jelo.id}`)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="Delete category"
                                                size="small"
                                                onClick={() => handleOpenDialog(jelo!)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="left">
                                            <IconButton
                                                aria-label="Add image"
                                                color="secondary"
                                                size="small"
                                                onClick={() => history.push(`/admin/jela/image/${jelo.id!}`)}>
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
