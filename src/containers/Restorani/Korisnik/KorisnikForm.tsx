import React, {useContext, useEffect, useState} from 'react';
import {NotificationProps} from '../../../utils/AppUtils';
import {useHistory, useLocation, useRouteMatch} from 'react-router';
import {Restoran, User} from '../../../utils/constants/types';
import {Field, Form, Formik, FormikHelpers, FormikProps} from 'formik';
import PersonIcon from '@material-ui/icons/Person';
import {makeStyles} from '@material-ui/core/styles';
import {Notification} from '../../../components/Notification/Notification';
import {Avatar, Button, Container, CssBaseline, LinearProgress, TextField, Typography} from '@material-ui/core';
import {yupValidationSchema} from './validation';
import {getUserById, postUser, putUser} from '../../../service/domain/KorisniciService';
import {notifyOnReject} from '../../../utils/ApiUtils';
import {AppRoutes} from '../../../utils/constants/routes';
import {UserContext} from '../../../service/providers/UserContextProvider';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const InnerForm = ({
    touched,
    errors,
    setValues,
    isSubmitting,
    notification,
    setNotification,
}: FormikProps<User> & { notification?: NotificationProps; setNotification: VoidFunction }) => {
    const classes = useStyles();
    const matchId = useRouteMatch<{ id: string }>(AppRoutes.RestoranKorisnikById)?.params.id;
    const [editing, setEditing] = useState<boolean>(false);
    const { user } = useContext(UserContext);
    const history = useHistory();
    const [restoran, setRestoran] = useState<Restoran>();
    const location = useLocation();

    useEffect(() => {
        if (matchId && !isNaN(Number(matchId))) {
            getUserById(Number(matchId), user?.accessToken!)
                .then((response) => {
                    const { data } = response;
                    setValues({ ...data });
                    setEditing(true);
                })
                .catch(notifyOnReject(setNotification));
        }
    }, []);

    useEffect(() => {
        if (location && location.state) {
            setRestoran(location.state as Restoran);
        }
    }, [location]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {editing ? 'Edituj korisnicke podatke' : 'Unesite korisnicke podatke'}
                </Typography>
                {notification && (
                    <Notification
                        popupDuration={notification.popupDuration}
                        message={notification.message}
                        onClose={notification.onClose}
                        severity={notification.severity}
                    />
                )}
                <Form className={classes.form}>
                    <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        color="secondary"
                        required
                        fullWidth
                        id="uname"
                        label="Username"
                        name="uname"
                        error={touched.uname && !!errors.uname}
                        helperText={touched.uname && errors.uname}
                    />
                    <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        color="secondary"
                        fullWidth
                        type="password"
                        name="passwd"
                        label="Password"
                        error={touched.passwd && !!errors.passwd}
                        helperText={touched.passwd && errors.passwd}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        disabled={isSubmitting}>
                        {editing ? 'Azuriraj i nastavi dalje' : 'Nastavi dalje'}
                    </Button>
                    {editing && (
                        <Button
                            fullWidth
                            onClick={() => history.push(`/admin/restorani/${restoran?.id!}`)}
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            disabled={isSubmitting}>
                            Preskoci
                        </Button>
                    )}
                    <LinearProgress color="secondary" hidden={!isSubmitting} />
                </Form>
            </div>
        </Container>
    );
};

const defaultValues: User = {
    admin: false,
    uname: '',
    passwd: '',
};

export const KorisnikForm: React.FC<NotificationProps> = (props) => {
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const history = useHistory();
    const location = useLocation();
    const [restoran, setRestoran] = useState<Restoran>();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (location && location.state) {
            setRestoran(location.state as Restoran);
        }
    }, [location]);

    const handleSubmit = (values: User, formikHelpers: FormikHelpers<User>) => {
        const { setSubmitting, resetForm } = formikHelpers;

        console.log(values);

        setSubmitting(true);
        if (values.id != null) {
            putUser(values, user?.accessToken!)
                .then((response) => {
                    history.push(`/admin/restorani/${restoran?.id!}`);
                })
                .catch(notifyOnReject(setNotification, 'Greska prilikom kreiranja korisnika'))
                .finally(() => {
                    setSubmitting(false);
                    resetForm();
                });
        } else {
            postUser(values)
                .then((response) => {
                    history.push(AppRoutes.RestoranNew, response.data);
                })
                .catch(notifyOnReject(setNotification, 'Greska prilikom kreiranja korisnika'))
                .finally(() => {
                    setSubmitting(false);
                    resetForm();
                });
        }
    };

    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={true}
            initialValues={defaultValues}
            validationSchema={yupValidationSchema}
            onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}>
            {(formikProps) => (
                <InnerForm
                    {...formikProps}
                    {...props}
                    notification={notification}
                    setNotification={setNotification as VoidFunction}
                />
            )}
        </Formik>
    );
};
