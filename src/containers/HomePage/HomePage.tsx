import React from 'react';
import { MainSection } from '../../components/MainSection/MainSection';
import { Divider, Typography } from '@material-ui/core';

export const HomePage: React.FC = () => {
    return (
        <div style={{ paddingLeft: '48px', paddingRight: '48px', paddingTop: '16px' }}>
            <MainSection />
            <Typography variant="h6" gutterBottom>
                Restorani
            </Typography>
            <Divider />
        </div>
    );
};
