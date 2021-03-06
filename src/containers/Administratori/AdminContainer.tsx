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
import { deleteAdmin, getAllAdmini } from '../../service/domain/KorisniciService';
import { User } from '../../utils/constants/types';
import { AppRoutes } from '../../utils/constants/routes';

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

export const AdminContainer: React.FC<NotificationProps> = (props) => {
    const classes = useStyles();
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const [admini, setAdmini] = useState<User[]>();
    const { authenticated, user } = useContext(UserContext);
    const [dialog, setDialog] = useState<{ open: boolean; admin: User | null }>();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        getAdmini();
    }, []);

    useEffect(() => {
        if (location && location.state) {
            const pushedNotification = location.state as NotificationProps;
            setNotification({ ...pushedNotification, onClose: () => setNotification(undefined) });
        }
    }, [location]);

    const getAdmini = () => {
        getAllAdmini(user?.accessToken!)
            .then((response) => {
                setAdmini(response.data);
            })
            .catch(notifyOnReject(setNotification));
    };

    const handleDelete = (admin: User) => {
        if (authenticated) {
            deleteAdmin(admin, user?.accessToken!)
                .then((response) => {
                    setNotification({
                        message: `Uspesno obrisan admin ${admin.uname}`,
                        onClose: () => setNotification(undefined),
                    });
                })
                .catch((error) => {
                    notifyOnReject(setNotification, 'Greska prilikom brisanja admina');
                    setDialog({ open: false, admin: null });
                })
                .finally(() => {
                    getAdmini();
                    setDialog({ open: false, admin: null });
                });
        }
    };

    const handleOpenDialog = (admin: User) => {
        setDialog({
            open: true,
            admin: admin,
        });
    };

    const handleCloseDialog = () => {
        setDialog({
            open: false,
            admin: null,
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
                    <DialogTitle id="alert-dialog-title">Potvrda brisanja admina</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`Da li ste sigurni da zelite obrisati admina ${dialog?.admin?.uname}?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button size="large" onClick={() => handleDelete(dialog?.admin!)} color="secondary">
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
                            to={AppRoutes.AdminNew}>
                            Dodaj
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID Admina</TableCell>
                                <TableCell align="center">Korisnicko ime</TableCell>
                                <TableCell align="right">Akcije</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {admini?.map((admin, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell>{admin.id}</TableCell>
                                        <TableCell align="center">{admin.uname}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                aria-label="Edit category"
                                                color="secondary"
                                                size="small"
                                                onClick={() => history.push(`/admini/${admin.id}`)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="Delete category"
                                                size="small"
                                                onClick={() => handleOpenDialog(admin!)}>
                                                <DeleteIcon />
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
