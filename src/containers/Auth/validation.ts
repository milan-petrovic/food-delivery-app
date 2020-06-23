import * as Yup from 'yup';
import { lengthConstraintMessage, requiredMessage } from '../../utils/AppUtils.';

export const yupValidationSchema: Yup.ObjectSchema = Yup.object().shape({
    username: Yup.string().required(requiredMessage).min(4, lengthConstraintMessage(4)).max(32),
    password: Yup.string().required(requiredMessage).min(8, lengthConstraintMessage(8)).max(32),
});
