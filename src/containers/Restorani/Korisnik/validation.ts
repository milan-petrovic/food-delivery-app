import * as Yup from 'yup';
import { lengthConstraintMessage, requiredMessage } from '../../../utils/AppUtils';

export const yupValidationSchema: Yup.ObjectSchema = Yup.object().shape({
    uname: Yup.string().required(requiredMessage).min(5, lengthConstraintMessage(5)).max(32),
    passwd: Yup.string().required(requiredMessage).min(6, lengthConstraintMessage(6)).max(255),
});
