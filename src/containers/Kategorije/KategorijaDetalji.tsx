import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { AppRoutes } from '../../utils/constants/routes';
import { Jelo, Kategorija } from '../../utils/constants/types';
import { getJelaByKategorija } from '../../service/domain/JeloService';
import { getJeloImageUrlFromApi, getKategorijaImageUrlFromApi, notifyOnReject } from '../../utils/ApiUtils';
import { NotificationProps } from '../../utils/AppUtils';
import { MainSection } from '../../components/MainSection/MainSection';
import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 240,
    },
}));

export const KategorijaDetalji: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const matchId = useRouteMatch<{ id: string }>(AppRoutes.KategorijaDetalji)?.params.id;
    const [kategorija, setKategorija] = useState<Kategorija>();
    const [jela, setJela] = useState<Jelo[]>();
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const [kategorijaImage, setKategorijaImage] = useState<string>();
    const classes = useStyles();

    useEffect(() => {
        getJelaByKategorija(Number(matchId))
            .then((response) => setJela(response.data))
            .catch((error) => notifyOnReject(setNotification));
        setKategorijaImage(getKategorijaImageUrlFromApi(Number(matchId)));
    }, []);

    useEffect(() => {
        setKategorija(location.state as Kategorija);
    }, [location]);

    return (
        <>
            <div style={{ padding: '48px' }}>
                <Box fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1}>
                    {kategorija?.ime}
                </Box>
                <Divider />
                {jela?.map((jelo, idx) => {
                    let jeloImg = getJeloImageUrlFromApi(jelo.id!);
                    return (
                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                                <CardContent>
                                    <Typography component="h2" variant="h5">
                                        {jelo.ime}
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph>
                                        {jelo.opis}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {jelo.sastav}
                                    </Typography>
                                    <Typography variant="subtitle1" color="secondary">
                                        RSD {jelo.cijena}
                                    </Typography>
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => history.push(`/restoran/detalji/${jelo.restoranBean?.id}`)}
                                        style={{ marginTop: '16px' }}>
                                        Poruci iz restorana
                                    </Button>
                                </CardContent>
                            </div>
                            <Hidden xsDown>
                                <CardMedia className={classes.cardMedia} image={jeloImg} />
                            </Hidden>
                        </Card>
                    );
                })}
            </div>
        </>
    );
};
