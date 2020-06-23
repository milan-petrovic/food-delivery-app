import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';

interface MainMenuItemsProps {
    role: string;
}

export const MainMenuItems: React.FC<MainMenuItemsProps> = (props: MainMenuItemsProps) => {
    return (
        <>
            <ListItem button component={Link} to="">
                <ListItemIcon>
                    <AppsIcon />
                </ListItemIcon>
                <ListItemText primary="Test" />
            </ListItem>
        </>
    );
};
