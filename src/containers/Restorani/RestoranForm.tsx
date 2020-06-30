import React, { useContext, useEffect, useState } from 'react';
import { NotificationProps } from '../../utils/AppUtils';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { Restoran, User } from '../../utils/constants/types';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Container, CssBaseline, LinearProgress, TextField, Typography } from '@material-ui/core';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { Notification } from '../../components/Notification/Notification';
import { yupValidationSchema } from './validation';
import { getRestoranById, postRestoran, putRestoran } from '../../service/domain/RestoraniService';
import { UserContext } from '../../service/providers/UserContextProvider';
import { AppRoutes } from '../../utils/constants/routes';
import { notifyOnReject } from '../../utils/ApiUtils';
import { boolean } from 'yup';

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
}: FormikProps<Restoran> & { notification?: NotificationProps; setNotification: VoidFunction }) => {
    const classes = useStyles();
    const matchId = useRouteMatch<{ id: string }>(AppRoutes.RestoranById)?.params.id;
    const [editing, setEditing] = useState<boolean>(false);

    useEffect(() => {
        if (matchId && !isNaN(Number(matchId))) {
            getRestoranById(Number(matchId)).then((response) => {
                const { data } = response;
                setValues({ ...data });
                setEditing(true);
            });
        }
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <RestaurantIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {editing ? 'Azuriraj podatke o restoranu' : 'Unesite podatke o restoranu'}
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
                        required
                        fullWidth
                        id="ime"
                        label="Ime"
                        name="ime"
                        error={touched.ime && !!errors.ime}
                        helperText={touched.ime && errors.ime}
                    />
                    <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={5}
                        id="opis"
                        label="Opis"
                        name="opis"
                        error={touched.opis && !!errors.opis}
                        helperText={touched.opis && errors.opis}
                    />
                    <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="email"
                        name="email"
                        label="Email"
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                    />
                    <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="tel"
                        label="Telefon"
                        error={touched.tel && !!errors.tel}
                        helperText={touched.tel && errors.tel}
                    />
                    <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="adresa"
                        label="Adresa"
                        error={touched.adresa && !!errors.adresa}
                        helperText={touched.adresa && errors.adresa}
                    />
                    <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="radnoVrijeme"
                        label="Radno vrijeme"
                        error={touched.radnoVrijeme && !!errors.radnoVrijeme}
                        helperText={touched.radnoVrijeme && errors.radnoVrijeme}
                    />
                    <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        name="cijenaDostave"
                        label="Cijena dostave"
                        error={touched.cijenaDostave && !!errors.cijenaDostave}
                        helperText={touched.cijenaDostave && errors.cijenaDostave}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        disabled={isSubmitting}>
                        {editing ? 'Azuriraj restoran' : 'Kreiraj restoran'}
                    </Button>
                    <LinearProgress color="secondary" hidden={!isSubmitting} />
                </Form>
            </div>
        </Container>
    );
};

const defaultValues: Restoran = {
    ime: '',
    adresa: '',
    tel: '',
    cijenaDostave: 0,
    radnoVrijeme: '',
    opis: '',
    email: '',
    usertbl: null,
};

export const RestoranForm: React.FC<NotificationProps> = (props) => {
    const location = useLocation();
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const [createdUser, setCreatedUser] = useState<User>();
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (location && location.state) {
            const createdUserVar = location.state as User;
            setCreatedUser(createdUserVar);
        }
    }, [location]);

    const handleSubmit = (values: Restoran, formikHelpers: FormikHelpers<Restoran>) => {
        const { resetForm, setSubmitting } = formikHelpers;
        setSubmitting(true);

        if (values.id !== null) {
            putRestoran(values, user?.accessToken!)
                .then((_) => {
                    history.push(AppRoutes.Restorani, {
                        message: `Uspjesno editovan restoran ${values.ime}`,
                        popupDuration: 5000,
                    });
                })
                .catch(notifyOnReject(setNotification, 'Greska prilikom editovanja restorana'))
                .finally(() => {
                    setSubmitting(false);
                    resetForm();
                });
        } else {
            postRestoran(values, user?.accessToken!, createdUser!)
                .then((_) => {
                    history.push(AppRoutes.Restorani, {
                        message: `Uspjesno kreiran restoran ${values.ime}`,
                        popupDuration: 5000,
                    });
                })
                .catch(notifyOnReject(setNotification, 'Greska prilikom kreiranja restorana'))
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
