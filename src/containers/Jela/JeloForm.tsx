import React, { useContext, useEffect, useState } from 'react';
import { NotificationProps } from '../../utils/AppUtils';
import { Jelo, Kategorija, Restoran } from '../../utils/constants/types';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { getRestoranById, postRestoran } from '../../service/domain/RestoraniService';
import { UserContext } from '../../service/providers/UserContextProvider';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Notification } from '../../components/Notification/Notification';
import { getAllKategorije } from '../../service/domain/KategorijeService';
import { yupValidationSchema } from './validation';
import { getJeloById, postJelo, putJelo } from '../../service/domain/JeloService';
import { AppRoutes } from '../../utils/constants/routes';
import { notifyOnReject } from '../../utils/ApiUtils';
import { useHistory, useRouteMatch } from 'react-router';
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const InnerForm = ({
    touched,
    errors,
    setValues,
    values,
    isSubmitting,
    notification,
    setNotification,
}: FormikProps<Jelo> & { notification?: NotificationProps; setNotification: VoidFunction }) => {
    const classes = useStyles();
    const [kategorije, setKategorije] = useState<Kategorija[]>();
    const matchId = useRouteMatch<{ id: string }>(AppRoutes.JeloById)?.params.id;
    const [editing, setEditing] = useState<boolean>(false);

    useEffect(() => {
        if (matchId) {
            getJeloById(Number(matchId))
                .then((response) => {
                    const { data } = response;
                    setValues({ ...data });
                    setEditing(true);
                })
                .catch(notifyOnReject(setNotification));
        }
    }, []);

    useEffect(() => {
        getAllKategorije()
            .then((response) => setKategorije(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {editing ? 'Editovanje jela' : 'Unesite podatke o novom jelu'}
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
                        multiline
                        rows={5}
                        name="sastav"
                        label="Sastav jela"
                        error={touched.sastav && !!errors.sastav}
                        helperText={touched.sastav && errors.sastav}
                    />
                    <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        name="cijena"
                        label="Cijena"
                        error={touched.cijena && !!errors.cijena}
                        helperText={touched.cijena && errors.cijena}
                    />
                    <Grid item xs={12}>
                        <FormControl style={{ minWidth: '100%' }}>
                            <InputLabel
                                shrink={!!values.kategorijaBean}
                                required
                                error={touched.kategorijaBean && !!errors.kategorijaBean}
                                id="category-label">
                                Kategorija
                            </InputLabel>
                            <Field
                                id="category-select"
                                as={Select}
                                labelId="category-label"
                                name="kategorijaBean.id"
                                error={touched.kategorijaBean && !!errors.kategorijaBean}
                                input={<Input />}
                                fullWidth
                                MenuProps={MenuProps}>
                                {kategorije?.map((kategorijaBean) => (
                                    <MenuItem key={kategorijaBean.id} value={kategorijaBean.id}>
                                        {kategorijaBean.ime}
                                    </MenuItem>
                                ))}
                            </Field>
                            {touched.kategorijaBean && errors?.kategorijaBean ? (
                                <FormHelperText error>{errors.kategorijaBean}</FormHelperText>
                            ) : null}
                        </FormControl>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        disabled={isSubmitting}>
                        {editing ? 'Edituj jelo' : 'Kreiraj jelo'}
                    </Button>
                    <LinearProgress color="secondary" hidden={!isSubmitting} />
                </Form>
            </div>
        </Container>
    );
};

const defaultValues: Jelo = {
    ime: '',
    opis: '',
    cijena: 0,
    sastav: '',
    restoranBean: null,
    kategorijaBean: null,
};

export const JeloFrom: React.FC<NotificationProps> = (props) => {
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const [restoran, setRestoran] = useState<Restoran>();
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        getRestoranById(user?.restoran!)
            .then((response) => {
                setRestoran(response.data);
                console.log(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleSubmit = (values: Jelo, formikHelpers: FormikHelpers<Jelo>) => {
        const { resetForm, setSubmitting } = formikHelpers;
        setSubmitting(true);
        if (values.id != null) {
            putJelo(values, user?.accessToken!)
                .then((_) => {
                    history.push(AppRoutes.Jela, {
                        message: `Uspjesno editovano jelo ${values.ime}`,
                        popupDuration: 5000,
                    });
                })
                .catch(notifyOnReject(setNotification, 'Greska prilikom editovanja jela'))
                .finally(() => {
                    setSubmitting(false);
                    resetForm();
                });
        } else {
            postJelo(values, user?.accessToken!, restoran!)
                .then((_) => {
                    history.push(AppRoutes.Jela, {
                        message: `Uspjesno kreirano jelo ${values.ime}`,
                        popupDuration: 5000,
                    });
                })
                .catch(notifyOnReject(setNotification, 'Greska prilikom kreiranja jela'))
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
