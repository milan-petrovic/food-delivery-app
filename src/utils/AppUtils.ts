import {createMuiTheme} from '@material-ui/core';

export const drawerWidth = 240;

export enum Roles {
    ADMIN = 'A',
    RESTORAN = 'R',
}

export const requiredMessage = 'Obavezno polje';
export const lengthConstraintMessage = (length: number) => `Mora da sadrzi najmanje ${length} karaktera`;

export interface NotificationProps {
    popupDuration?: number;
    severity?: 'error' | 'warning' | 'success' | 'info';
    message: string;
    onClose(): void; // will invalidate the entire notification object so this can get freshly re-rendered
}

export interface ToggleProps {
    open: boolean;
    onClick(): void;
}

export const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#ffffff',
            dark: '#ffffff',
        },
        secondary: {
            main: '#FFC600',
        },
    },
});
