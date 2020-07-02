import * as Yup from 'yup';
import { lengthConstraintMessage, requiredMessage } from '../../utils/AppUtils';

export const yupValidationSchema: Yup.ObjectSchema = Yup.object().shape({
    ime: Yup.string().required(requiredMessage).min(4, lengthConstraintMessage(4)).max(255),
    opis: Yup.string().required(requiredMessage).min(5, lengthConstraintMessage(5)).max(255),
    sastav: Yup.string().required(requiredMessage).min(5, lengthConstraintMessage(5)).max(255),
    cijena: Yup.number(),
    kategorijaBean: Yup.object()
        .required('Morate odabrati kategoriju')
        // need to set this nullable true so yup can evaluate null against required and throw the required message, instead of it evaluating null type against Yup.object
        .nullable(true)
        .shape({
            id: Yup.number().positive('Morate odabrati validnu kategoriju'),
        }),
});
