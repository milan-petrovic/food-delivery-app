import { User } from '../../utils/constants/types';
import { axiosInstance } from '../../api/axios';
import { getRequestConfig } from '../../utils/ApiUtils';

export const postUser = (requestData: User) => {
    return axiosInstance.post('/user', requestData);
};

export const getAllAdmini = (accessToken: string) => {
    return axiosInstance.get('/admins', getRequestConfig(accessToken))
};

export const deleteAdmin = (admin: User, accessToken: string) => {
    return axiosInstance.delete(`/user/${admin.id}`, getRequestConfig(accessToken));
};