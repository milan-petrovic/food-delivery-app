import React, { useContext, useState, useEffect } from 'react';
import { NotificationProps } from '../../utils/AppUtils';
import { useHistory, useRouteMatch } from 'react-router';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Container, CssBaseline, LinearProgress, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Notification } from '../../components/Notification/Notification';
import { yupValidationSchema } from './validation';
import { UserContext } from '../../service/providers/UserContextProvider';
import { AppRoutes } from '../../utils/constants/routes';
import { notifyOnReject } from '../../utils/ApiUtils';
import { User } from '../../utils/constants/types';
import { postAdmin, getAdminById, putAdmin } from '../../service/domain/KorisniciService';

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
    const matchId = useRouteMatch<{ id: string }>(AppRoutes.AdminById)?.params.id;
    const [editing, setEditing] = useState<boolean>(false);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (matchId && !isNaN(Number(matchId))) {
            getAdminById(Number(matchId),user?.accessToken! )
                .then((response) => {
                    const { data } = response;
                    setValues({ ...data });
                    setEditing(true);
                })
                .catch(notifyOnReject(setNotification));
        }
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                {editing ? 'Editovanje admina' : 'Unesite podatke o novom adminu'}
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
                        label="Korisnicko ime"
                        name="uname"
                        error={touched.uname && !!errors.uname}
                        helperText={touched.uname && errors.uname}
                    />
                    <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="passwd"
                        label="Sifra"
                        name="passwd"
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
                        {editing ? 'Edituj admina' : 'Kreiraj admina'}
                    </Button>
                    <LinearProgress color="secondary" hidden={!isSubmitting} />
                </Form>
            </div>
        </Container>
    );
};

const defaultValues: User = {
    uname: '',
    passwd: '',
    admin: true,
};

export const AdminForm: React.FC<NotificationProps> = (props) => {
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const { user } = useContext(UserContext);
    const history = useHistory();

    const handleSubmit = (values: User, formikHelpers: FormikHelpers<User>) => {
        const { resetForm, setSubmitting } = formikHelpers;
        setSubmitting(true);
        if (values.id != null) {
            putAdmin(values, user?.accessToken!)
                .then((_) => {
                    history.push(AppRoutes.Admini, {
                        message: `Uspesno editovan admin ${values.uname}`,
                        popupDuration: 5000,
                    });
                })
                .catch(notifyOnReject(setNotification, 'Greska prilikom editovanja admina'))
                .finally(() => {
                    setSubmitting(false);
                    resetForm();
                });
        } else {
            postAdmin(values, user?.accessToken!)
                .then((_) => {
                    history.push(AppRoutes.Admini, {
                        message: `Uspesno kreiran admin ${values.uname}`,
                        popupDuration: 5000,
                    });
                })
                .catch(notifyOnReject(setNotification, 'Greska prilikom kreiranja admina'))
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
