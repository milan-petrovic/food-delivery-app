import React, { useState } from 'react';
import { NotificationProps } from '../../../utils/AppUtils';
import { useHistory } from 'react-router';
import { User } from '../../../utils/constants/types';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Notification } from '../../../components/Notification/Notification';
import { Avatar, Button, Container, CssBaseline, LinearProgress, TextField, Typography } from '@material-ui/core';
import { yupValidationSchema } from './validation';
import { postUser } from '../../../service/domain/KorisniciService';
import { notifyOnReject } from '../../../utils/ApiUtils';

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

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {'Kreiraj novog korisnika'}
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
                        Nastavi dalje
                    </Button>
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

    const handleSubmit = (values: User, formikHelpers: FormikHelpers<User>) => {
        const { setSubmitting, resetForm } = formikHelpers;

        setSubmitting(true);
        postUser(values)
            .then((response) => {
                console.log(response);
            })
            .catch(notifyOnReject(set   Notification, 'Greska prilikom kreiranja korisnika'))
            .finally(() => {
                setSubmitting(false);
            });

        console.log(values);
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
