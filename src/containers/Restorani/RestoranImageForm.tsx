import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { AppRoutes } from '../../utils/constants/routes';
import { Avatar, Button, Container, CssBaseline, Grid, TextField, Typography } from '@material-ui/core';
import { axiosInstance } from '../../api/axios';
import { getRequestImageConfig } from '../../utils/ApiUtils';
import { UserContext } from '../../service/providers/UserContextProvider';
import { makeStyles } from '@material-ui/core/styles';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import { deleteRestoranImage, postRestoranImage } from '../../service/domain/RestoraniService';

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

export const RestoranImageForm: React.FC = (props) => {
    const [notification, setNotification] = useState();
    const matchId = useRouteMatch<{ id: string }>(AppRoutes.RestoranNewImage)?.params.id;
    const [image, setImage] = useState<File>();
    const { user } = useContext(UserContext);
    const classes = useStyles();

    useEffect(() => {
        if (matchId && !isNaN(Number(matchId))) {
            console.log(matchId);
        }
    }, []);

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files[0]) {
            setImage(files[0]);
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('file', image!);

        postRestoranImage(Number(matchId), formData, user?.accessToken!)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
    };

    const handleDelete = () => {
        deleteRestoranImage(Number(matchId), user?.accessToken!)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <QueuePlayNextIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Podesavanje slike restorana
                </Typography>
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
