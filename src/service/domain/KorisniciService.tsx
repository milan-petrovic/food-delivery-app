import { User } from '../../utils/constants/types';
import { axiosInstance } from '../../api/axios';

export const postUser = (requestData: User) => {
    return axiosInstance.post('/user', requestData);
};
