import * as Yup from 'yup';
import { lengthConstraintMessage, requiredMessage } from '../../utils/AppUtils';

export const yupValidationSchema: Yup.ObjectSchema = Yup.object().shape({
    ime: Yup.string().required(requiredMessage).min(4, lengthConstraintMessage(4)).max(32),
    opis: Yup.string().required(requiredMessage).min(5, lengthConstraintMessage(5)).max(255),
});
