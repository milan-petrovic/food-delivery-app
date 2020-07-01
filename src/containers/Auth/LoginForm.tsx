import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Avatar, Button, CssBaseline, Grid, Paper, TextField, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {NotificationProps, Roles} from '../../utils/AppUtils';
import {DecodedToken, LoginModel} from '../../utils/constants/types';
import {Field, Form, Formik, FormikHelpers, FormikProps} from 'formik';
import {Notification} from '../../components/Notification/Notification';
import {useHistory} from 'react-router';
import {UserContext} from '../../service/providers/UserContextProvider';
import {yupValidationSchema} from './validation';
import {login} from '../../service/domain/LoginService';
import {notifyOnReject} from '../../utils/ApiUtils';
import jwt from 'jwt-decode';
import {AppRoutes} from '../../utils/constants/routes';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage:
            'url(https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
    isValid,
    setValues,
    values,
    isSubmitting,
    setFieldValue,
    notification,
    setNotification,
}: FormikProps<LoginModel> & { notification?: NotificationProps; setNotification: VoidFunction }) => {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Prijavi se
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
                            id="username"
                            label="Username"
                            name="username"
                            error={touched.username && !!errors.username}
                            helperText={touched.username && errors.username}
                        />
                        <Field
                            as={TextField}
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            error={touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}>
                            Prijavi se
                        </Button>
                    </Form>
                </div>
            </Grid>
        </Grid>
    );
};

const defaultValues: LoginModel = {
    username: '',
    password: '',
};

export const LoginForm: React.FC<NotificationProps> = (props) => {
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const history = useHistory();
    const { loginUser } = useContext(UserContext);

    const handleSubmit = (values: LoginModel, formikHelpers: FormikHelpers<LoginModel>) => {
        const { setSubmitting, resetForm } = formikHelpers;

        setSubmitting(true);
        login(values)
            .then((response) => {
                const accesToken = response.data;
                const decodedToken: DecodedToken = jwt(response.data);

                loginUser &&
                    loginUser({
                        accessToken: accesToken,
                        username: decodedToken.username,
                        role: decodedToken.type,
                        id: decodedToken.jti,
                        restoran: decodedToken.restoran,
                    });

                if (decodedToken.type === Roles.ADMIN) {
                    history.push(AppRoutes.Restorani);
                } else {
                    history.push(AppRoutes.Jela);
                }
            })
            .catch(notifyOnReject(setNotification, 'Pogresan username ili password.'))
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={true}
            initialValues={defaultValues}
            validationSchema={yupValidationSchema}
            onSubmit={(loginModel, formikHelpers) => handleSubmit(loginModel, formikHelpers)}>
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
