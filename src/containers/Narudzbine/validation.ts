import * as Yup from 'yup';
import { lengthConstraintMessage, requiredMessage } from '../../utils/AppUtils';

export const yupValidationSchema: Yup.ObjectSchema = Yup.object().shape({
    ime: Yup.string().required(requiredMessage).min(5, lengthConstraintMessage(5)).max(32),
    napomena: Yup.string().min(5, lengthConstraintMessage(5)).max(255),
    adresa: Yup.string().required(requiredMessage).min(5, lengthConstraintMessage(5)).max(32),
    email: Yup.string().required(requiredMessage).min(5, lengthConstraintMessage(5)).max(32),
    tel: Yup.string().required(requiredMessage).min(8, lengthConstraintMessage(8)).max(32),
});
