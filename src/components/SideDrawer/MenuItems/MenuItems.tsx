import React, { useContext, useEffect } from 'react';
import { Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../../service/providers/UserContextProvider';
import { Roles } from '../../../utils/AppUtils';
import { AppRoutes } from '../../../utils/constants/routes';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import KitchenIcon from '@material-ui/icons/Kitchen';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ListAltIcon from '@material-ui/icons/ListAlt';

interface MainMenuItemsProps {
    role?: string;
}

export const MainMenuItems: React.FC<MainMenuItemsProps> = (props: MainMenuItemsProps) => {
    const { authenticated, user, logoutUser } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {}, [authenticated]);
    return (
        <>
            <>
                {props.role === Roles.RESTORAN && (
                    <>
                        <ListItem button component={Link} to={AppRoutes.Jela}>
                            <ListItemIcon>
                                <FastfoodIcon />
                            </ListItemIcon>
                            <ListItemText primary="Jela" />
                        </ListItem>
                        <ListItem button component={Link} to={AppRoutes.BusinessNarudzbe}>
                            <ListItemIcon>
                                <ListAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Moje narudzbe" />
                        </ListItem>
                    </>
                )}
                {props.role === Roles.ADMIN && (
                    <>
                        <ListItem button component={Link} to={AppRoutes.Restorani}>
                            <ListItemIcon>
                                <RestaurantIcon />
                            </ListItemIcon>
                            <ListItemText primary="Restorani" />
                        </ListItem>
                        <ListItem button component={Link} to={AppRoutes.AdminKategorije}>
                            <ListItemIcon>
                                <KitchenIcon />
                            </ListItemIcon>
                            <ListItemText primary="Kategorije" />
                        </ListItem>
                        <ListItem button component={Link} to={AppRoutes.Narudzbe}>
                            <ListItemIcon>
                                <ListAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Narudzbe" />
                        </ListItem>
                        <ListItem button component={Link} to={AppRoutes.Admini}>
                            <ListItemIcon>
                                <SupervisorAccountIcon />
                            </ListItemIcon>
                            <ListItemText primary="Admini" />
                        </ListItem>
                    </>
                )}
                <Divider />
                <ListItem
                    button
                    onClick={() => {
                        logoutUser && logoutUser();
                        history.push('/');
                    }}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Odjava" />
                </ListItem>
            </>
        </>
    );
};
