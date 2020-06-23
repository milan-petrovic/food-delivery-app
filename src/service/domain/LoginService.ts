import { axiosInstance } from '../../api/axios';
import { LoginModel } from '../../utils/constants/types';

export const login = (values: LoginModel) => {
    return axiosInstance.post('/login', values);
};
