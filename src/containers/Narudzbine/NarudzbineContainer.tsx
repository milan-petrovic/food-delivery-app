import {NotificationProps} from '../../utils/AppUtils';
import React, {useContext, useEffect, useState} from 'react';
import {notifyOnReject} from '../../utils/ApiUtils';
import {
    Container,
    CssBaseline,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import {Notification} from '../../components/Notification/Notification';
import {Narudzba} from '../../utils/constants/types';
import {UserContext} from '../../service/providers/UserContextProvider';
import {getAllNarudzbine} from '../../service/domain/NarudzbineService';

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

export const NarudzbineContainer: React.FC<NotificationProps> = (props) => {
    const classes = useStyles();
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const [narudzbine, setNarudzbine] = useState<Narudzba[]>();
    const { user } = useContext(UserContext);

    useEffect(() => {
        getNarudzbine(user?.accessToken!);
    }, []);

    const getNarudzbine = (accessToken: string) => {
        getAllNarudzbine(accessToken)
            .then((response) => {
                setNarudzbine(response.data);
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
                <TableContainer>
                    <Table className={classes.table} aria-label="simple-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ime</TableCell>
                                <TableCell>Telefon</TableCell>
                                <TableCell>Adresa</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Napomena</TableCell>
                                <TableCell>Naziv restorana</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {narudzbine?.map((narudzbina, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell>{narudzbina.ime!}</TableCell>
                                        <TableCell align="left">{narudzbina.tel!}</TableCell>
                                        <TableCell align="left">{narudzbina.adresa!}</TableCell>
                                        <TableCell align="left">{narudzbina.email!}</TableCell>
                                        <TableCell align="left">{narudzbina.napomena!}</TableCell>
                                        <TableCell align="left">{narudzbina.restoranBean!.ime}</TableCell>
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
