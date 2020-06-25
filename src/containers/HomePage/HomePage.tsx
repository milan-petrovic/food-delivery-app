import React from 'react';
import { MainSection } from '../../components/MainSection/MainSection';
import { Divider, Typography } from '@material-ui/core';
import { RestoraniList } from '../Restorani/RestoraniList';

export const HomePage: React.FC = () => {
    return (
        <div style={{ paddingLeft: '48px', paddingRight: '48px', paddingTop: '16px' }}>
            <MainSection />
            <Typography variant="h6" gutterBottom>
                Restorani
            </Typography>
            <Divider />
            <RestoraniList />
            <Typography variant="h6" gutterBottom style={{ paddingTop: '32px' }}>
                Kategorije
            </Typography>
            <Divider />
        </div>
    );
};