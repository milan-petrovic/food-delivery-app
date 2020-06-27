import React, { useState } from 'react';
import { NotificationProps } from '../../utils/AppUtils';
import { Jelo } from '../../utils/constants/types';
import { FormikHelpers } from 'formik';

const defaultValues: Jelo = {
    ime: '',
    opis: '',
    cijena: 0,
    sastav: '',
    restoranBean: null,
    kategorijaBean: null,
};

export const JeloFrom: React.FC<NotificationProps> = (props) => {
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined);

    const handleSubmit = (values: Jelo, formikHelpers: FormikHelpers<Jelo>) => {
        const { resetForm, setSubmitting } = formikHelpers;
    };

    return <p></p>;
};
