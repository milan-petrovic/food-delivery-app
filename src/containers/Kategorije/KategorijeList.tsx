import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {NotificationProps} from '../../utils/AppUtils';
import {Kategorija} from '../../utils/constants/types';
import {getAllKategorije} from '../../service/domain/KategorijeService';
import {getKategorijaImageUrlFromApi, notifyOnReject} from '../../utils/ApiUtils';
import {Card, CardActionArea, CardMedia, Grid, Typography} from '@material-ui/core';
import {useHistory} from 'react-router';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 240,
    },
});

export const KategorijeList: React.FC = (props) => {
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const classes = useStyles();
    const [kategorije, setKategorije] = useState<Kategorija[]>();
    const history = useHistory();

    useEffect(() => {
        getAllKategorije()
            .then((response) => {
                setKategorije(response.data);
            })
            .catch(notifyOnReject(setNotification));
    }, []);

    return (
        <Grid container style={{ paddingTop: 20 }} spacing={2}>
            {kategorije?.map((kategorija, idx) => {
                let imageUrl = getKategorijaImageUrlFromApi(kategorija.id!);

                return (
                    <Grid item xs={12} sm={4} key={idx}>
                        <Card className={classes.root}>
                            <CardActionArea
                                onClick={() =>
                                    console.log(history.push(`/kategorije/detalji/${kategorija.id}`, kategorija))
                                }>
                                <CardMedia className={classes.media} image={imageUrl} title="Slika restorana" />
                            </CardActionArea>
                        </Card>
                        <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {kategorija.ime}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {kategorija.opis}
                            </Typography>
                        </div>
                    </Grid>
                );
            })}
        </Grid>
    );
};
