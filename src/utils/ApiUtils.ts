import { NotificationProps } from './AppUtils';
import { AxiosError } from 'axios';
import { AppRoutes, BaseRoutes } from './constants/routes';

export const notifyOnReject = (
    setNotification: (value: NotificationProps | undefined) => void,
    defaultErrorMessage = 'Greska na serveru. Provjerite da li su podaci dobri.',
) => {
    return (error: AxiosError<{ errors?: string[] }>) => {
        const errors = error.response?.data?.errors;
        if (errors && errors.length > 0) {
            setNotification({
                message: errors[0],
                severity: 'error',
                onClose: () => setNotification(undefined),
            });
        } else {
            setNotification({
                message: defaultErrorMessage,
                severity: 'error',
                onClose: () => setNotification(undefined),
            });
        }
    };
};

export const getRequestConfig = (
    accessToken: string,
): { headers: { Authorization: string; 'Content-Type': string } } => {
    return {
        headers: {
            Authorization: `${accessToken}`,
            'Content-Type': 'application/json',
        },
    };
};

export const getImageUrlFromApi = (imageId: number) => {
    return BaseRoutes.ImageUrl + `${imageId}.png`;
};
