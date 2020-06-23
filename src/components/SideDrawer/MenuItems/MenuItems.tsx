import React, { useContext, useEffect } from 'react';
import { Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';
import { UserContext } from '../../../service/providers/UserContextProvider';
import { Roles } from '../../../utils/AppUtils.';
import { AppRoutes } from '../../../utils/constants/routes';

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
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Jela" />
                        </ListItem>
                        <ListItem button component={Link} to={AppRoutes.BusinessNarudzbe}>
                            <ListItemIcon>
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Moje narudzbe" />
                        </ListItem>
                    </>
                )}
                {props.role === Roles.ADMIN && (
                    <>
                        <ListItem button component={Link} to={AppRoutes.Restorani}>
                            <ListItemIcon>
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Restorani" />
                        </ListItem>
                        <ListItem button component={Link} to={AppRoutes.AdminKateogrije}>
                            <ListItemIcon>
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Kategorije" />
                        </ListItem>
                        <ListItem button component={Link} to={AppRoutes.AdminKateogrije}>
                            <ListItemIcon>
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Narudzbe" />
                        </ListItem>
                        <ListItem button component={Link} to={AppRoutes.AdminKateogrije}>
                            <ListItemIcon>
                                <AppsIcon />
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
                        <AppsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Odjava" />
                </ListItem>
            </>
        </>
    );
};
