import React from 'react';
import { MainSection } from '../../components/MainSection/MainSection';
import { Divider, Typography } from '@material-ui/core';
import { RestoraniList } from '../Restorani/RestoraniList';
import { KategorijeList } from '../Kategorije/KategorijeList';

export const HomePage: React.FC = () => {
    const section = {
        image:
            'https://images.unsplash.com/photo-1526367790999-0150786686a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
        primaryText: 'Donesi hranu',
        secondaryText: 'Ovo je najbolja aplikacija za dostavu hrane',
    };

    return (
        <div style={{ paddingLeft: '48px', paddingRight: '48px', paddingTop: '16px' }}>
            <MainSection name={section.primaryText} description={section.secondaryText} image={section.image} />
            <Typography variant="h6" gutterBottom>
                Restorani
            </Typography>
            <Divider />
            <RestoraniList />
            <Typography variant="h6" gutterBottom style={{ paddingTop: '32px' }}>
                Kategorije
            </Typography>
            <Divider />
            <KategorijeList />
        </div>
    );
};
