import React, { useContext, useState } from 'react';
import { NotificationProps } from '../../utils/AppUtils';
import { useHistory } from 'react-router';
import { Kategorija } from '../../utils/constants/types';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Container, CssBaseline, LinearProgress, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Notification } from '../../components/Notification/Notification';
import { yupValidationSchema } from './validation';
import { UserContext } from '../../service/providers/UserContextProvider';
import { AppRoutes } from '../../utils/constants/routes';
import { notifyOnReject } from '../../utils/ApiUtils';
import { postKategorija } from '../../service/domain/KategorijeService';

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
}: FormikProps<Kategorija> & { notification?: NotificationProps; setNotification: VoidFunction }) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {'Unesite podatke o kategoriji'}
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        disabled={isSubmitting}>
                        Kreiraj kategoriju
                    </Button>
                    <LinearProgress color="secondary" hidden={!isSubmitting} />
                </Form>
            </div>
        </Container>
    );
};

const defaultValues: Kategorija = {
    ime: '',
    opis: '',
};

export const KategorijaForm: React.FC<NotificationProps> = (props) => {
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const { user } = useContext(UserContext);
    const history = useHistory();

    const handleSubmit = (values: Kategorija, formikHelpers: FormikHelpers<Kategorija>) => {
        const { resetForm, setSubmitting } = formikHelpers;
        setSubmitting(true);

        postKategorija(values, user?.accessToken!)
            .then((_) => {
                history.push(AppRoutes.AdminKategorije, {
                    message: `Uspesno kreirana kategorija ${values.ime}`,
                    popupDuration: 5000,
                });
            })
            .catch(notifyOnReject(setNotification, 'Greska prilikom kreiranja kategorije'))
            .finally(() => {
                setSubmitting(false);
                resetForm();
            });
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
