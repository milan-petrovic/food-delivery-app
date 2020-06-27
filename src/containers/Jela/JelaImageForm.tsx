import React, { useContext, useState } from 'react';
import { NotificationProps } from '../../utils/AppUtils';
import { useHistory, useRouteMatch } from 'react-router';
import { AppRoutes } from '../../utils/constants/routes';
import { UserContext } from '../../service/providers/UserContextProvider';
import { notifyOnReject } from '../../utils/ApiUtils';
import { deleteKategorijaImage, postKategorijaImage } from '../../service/domain/KategorijeService';
import { Avatar, Button, Container, CssBaseline, Grid, TextField, Typography } from '@material-ui/core';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import { Notification } from '../../components/Notification/Notification';
import { makeStyles } from '@material-ui/core/styles';
import { deleteJeloImage, postJeloImage } from '../../service/domain/JeloService';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    input: {
        display: 'none',
    },
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export const JelaImageForm: React.FC = (props) => {
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const matchId = useRouteMatch<{ id: string }>(AppRoutes.JelaNewImage)?.params.id;
    const [image, setImage] = useState<File>();
    const { user } = useContext(UserContext);
    const classes = useStyles();
    const history = useHistory();

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files[0]) {
            setImage(files[0]);
        } else {
            notifyOnReject(setNotification, 'Morate odabrati sliku');
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('file', image!);

        postJeloImage(Number(matchId), formData, user?.accessToken!)
            .then((response) => {
                history.push(AppRoutes.Jela, {
                    message: 'Uspjesno dodana slika',
                    popupDuration: 5000,
                });
            })
            .catch(notifyOnReject(setNotification, 'Greska prilikom uploada slike.'));
    };

    const handleDelete = () => {
        deleteJeloImage(Number(matchId), user?.accessToken!)
            .then((response) => {
                setNotification({
                    message: 'Uspjesno obrisana slika',
                    onClose: () => undefined,
                });
            })
            .catch(notifyOnReject(setNotification, 'Greska prilikom uploada slike.'));
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <QueuePlayNextIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Podesavanje slike kategorije
                </Typography>
                {notification && (
                    <Notification
                        popupDuration={notification.popupDuration}
                        message={notification.message}
                        onClose={notification.onClose}
                        severity={notification.severity}
                    />
                )}
                <Grid container alignItems="center" justify="space-between" className={classes.form}>
                    <Grid item xs={9}>
                        <TextField
                            value={image?.name!} // workaround for issue https://github.com/mui-org/material-ui/issues/4904
                            fullWidth
                            required
                            disabled
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <input
                            className={classes.input}
                            id="event-image"
                            type="file"
                            onChange={(event) => handleFile(event)}
                        />
                        <label htmlFor="event-image">
                            <Button variant="contained" color="primary" component="span" fullWidth>
                                Odaberi
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            size="large"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => handleSubmit()}>
                            Dodaj
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            size="large"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => handleDelete()}>
                            Obrisi prethodnu
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};
