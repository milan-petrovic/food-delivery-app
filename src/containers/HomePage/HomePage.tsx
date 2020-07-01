import React, { useEffect, useState } from 'react';
import { MainSection } from '../../components/MainSection/MainSection';
import { Box, Divider } from '@material-ui/core';
import { RestoraniList } from '../Restorani/RestoraniList';
import { KategorijeList } from '../Kategorije/KategorijeList';
import { useLocation } from 'react-router';
import { NotificationProps } from '../../utils/AppUtils';
import { Notification } from '../../components/Notification/Notification';

export const HomePage: React.FC = () => {
    const section = {
        image:
            'https://images.unsplash.com/photo-1526367790999-0150786686a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
        primaryText: 'Food delivery',
        secondaryText: 'Porucite hranu iz vaseg omiljenog restorana u nekoliko klikova',
    };

    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);
    const location = useLocation();

    useEffect(() => {
        if (location && location.state) {
            const pushedNotification = location.state as NotificationProps;
            setNotification({ ...pushedNotification, onClose: () => setNotification(undefined) });
        }
    }, [location]);

    return (
        <div style={{ paddingLeft: '48px', paddingRight: '48px', paddingTop: '16px' }}>
            <MainSection name={section.primaryText} description={section.secondaryText} image={section.image} />
            {notification && (
                <Notification
                    popupDuration={notification?.popupDuration}
                    message={notification?.message}
                    onClose={notification?.onClose}
                    severity={notification?.severity}
                />
            )}
            <Box fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1}>
                Restorani
            </Box>
            <Divider />
            <RestoraniList />
            <Box fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1} style={{ marginTop: '16px' }}>
                Kategorije
            </Box>
            <Divider />
            <KategorijeList />
        </div>
    );
};
