import { NotificationProps } from '../../utils/AppUtils';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import React, { useState, useEffect } from 'react';
import { Restoran } from '../../utils/constants/types';
import { getAllRestorani } from '../../service/domain/RestoraniService';
import { notifyOnReject } from '../../utils/ApiUtils';
import {
    makeStyles,
    Container,
    CssBaseline,
    Paper,
    Grid,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Notification } from '../../components/Notification/Notification';
import { MainSection } from '../../components/MainSection/MainSection';
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

export const RestoraniContainer: React.FC<NotificationProps> = (props) => {
    const classes = useStyles();
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const [restorani, setRestorani] = useState<Restoran[]>();

    useEffect(() => {
        getRestorani();
    }, []);

    const getRestorani = () => {
        getAllRestorani()
            .then((response) => {
                setRestorani(response.data);
            })
            .catch(notifyOnReject(setNotification));
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
                                <TableCell>Korisnik</TableCell>
                                <TableCell>Akcije</TableCell>
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
                                        <TableCell align="left">{restoran.usertbl.uname}</TableCell>
                                        <TableCell align="left">
                                            <IconButton aria-label="Edit category" color="secondary" size="small">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="Delete category" size="small">
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
