import React, {useEffect, useState} from 'react';
import {Restoran} from '../../utils/constants/types';
import {NotificationProps, theme} from '../../utils/AppUtils';
import {getAllRestorani, pretragaRestorani} from '../../service/domain/RestoraniService';
import {getRestoranImageUrlFromApi, notifyOnReject} from '../../utils/ApiUtils';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import {useHistory} from 'react-router';
import SearchIcon from '@material-ui/icons/Search';
import LoopIcon from '@material-ui/icons/Loop';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 180,
    },
    paper: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export const RestoraniList: React.FC = (props) => {
    const [restorani, setRestorani] = useState<Restoran[]>();
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const classes = useStyles();
    const history = useHistory();
    const [vrijednostPretrage, setSearchValue] = useState<string>('');

    useEffect(() => {
        getAllRestorani()
            .then((response) => {
                setRestorani(response.data);
            })
            .catch((error) => notifyOnReject(setNotification));
    }, []);

    return (
        <>
            <Grid container spacing={2} style={{ paddingTop: 16 }}>
                <Grid item xs={12} sm={8}>
                    <TextField
                        color="secondary"
                        variant="outlined"
                        fullWidth
                        size="small"
                        label="Pretraga restorana"
                        value={vrijednostPretrage}
                        onChange={(event) => setSearchValue(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button
                        color="secondary"
                        variant="contained"
                        fullWidth
                        startIcon={<SearchIcon />}
                        onClick={() => {
                            pretragaRestorani(vrijednostPretrage).then((response) => {
                                setRestorani([...response.data]);
                            });
                        }}>
                        Pretrazi
                    </Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button
                        color="secondary"
                        variant="outlined"
                        fullWidth
                        startIcon={<LoopIcon />}
                        onClick={() => {
                            getAllRestorani().then((response) => {
                                setSearchValue('');
                                setRestorani([...response.data]);
                            });
                        }}>
                        Resetuj
                    </Button>
                </Grid>
            </Grid>
            <Grid container style={{ paddingTop: 20 }} spacing={2}>
                {restorani?.map((restoran, idx) => {
                    let imageUrl = getRestoranImageUrlFromApi(restoran.id!);

                    return (
                        <Grid item xs={12} sm={4} key={idx}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={imageUrl}
                                        title="Slika restorana"
                                        onClick={() => history.push(`/restoran/detalji/${restoran.id!}`)}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {restoran.ime}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {restoran.opis}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="secondary" startIcon={<MotorcycleIcon />}>
                                        {restoran.cijenaDostave + ' DIN'}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};
