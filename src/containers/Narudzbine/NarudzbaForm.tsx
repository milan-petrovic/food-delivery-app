import React, { useEffect, useState } from 'react';
import { NotificationProps } from '../../utils/AppUtils';
import { Narudzba, Restoran, RestoranStavke, Stavka } from '../../utils/constants/types';
import { useHistory, useLocation } from 'react-router';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Container, CssBaseline, LinearProgress, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Notification } from '../../components/Notification/Notification';
import { yupValidationSchema } from './validation';
import { postRestoran } from '../../service/domain/RestoraniService';
import { postNaruzba } from '../../service/domain/NarudzbineService';
import { AppRoutes } from '../../utils/constants/routes';

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
}: FormikProps<Narudzba> & { notification?: NotificationProps; setNotification: VoidFunction }) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {'Unesite podatke o dostavi'}
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
                        fullWidth
                        multiline
                        rows={5}
                        id="napomena"
                        label="Napomena"
                        name="napomena"
                        error={touched.napomena && !!errors.napomena}
                        helperText={touched.napomena && errors.napomena}
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        disabled={isSubmitting}>
                        Zavrsi narudzbu
                    </Button>
                    <LinearProgress color="secondary" hidden={!isSubmitting} />
                </Form>
            </div>
        </Container>
    );
};

const defaultValues: Narudzba = {
    ime: '',
    adresa: '',
    email: '',
    napomena: '',
    restoranBean: null,
    stavke: null,
    tel: '',
};

export const NarudzbaForm: React.FC<NotificationProps> = (props) => {
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const [restoran, setRestoran] = useState<Restoran>();
    const [stavke, setStavke] = useState<Stavka[]>();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const narudzba = location.state as RestoranStavke;

        setRestoran(narudzba.restoran);
        setStavke(narudzba.stavke);
    }, [location]);

    const handleSubmit = (values: Narudzba, formikHelpers: FormikHelpers<Narudzba>) => {
        const { resetForm, setSubmitting } = formikHelpers;

        values.restoranBean = restoran;
        values.stavke = stavke;

        setSubmitting(true);
        postNaruzba(values)
            .then((_) => {
                history.push('/', {
                    message: `Uspesno kreirana porudzbina`,
                    popupDuration: 5000,
                });
            })
            .catch((error) => console.log(error));
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
