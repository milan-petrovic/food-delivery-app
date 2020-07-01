import {User} from '../../utils/constants/types';
import {axiosInstance} from '../../api/axios';
import {getRequestConfig} from '../../utils/ApiUtils';

export const postUser = (requestData: User) => {
    return axiosInstance.post('/user', requestData);
};

export const getAllAdmini = (accessToken: string) => {
    return axiosInstance.get('/admins', getRequestConfig(accessToken));
};

export const postAdmin = (requestData: User, accessToken: string) => {
    return axiosInstance.post('/user', requestData, getRequestConfig(accessToken));
};

export const deleteAdmin = (admin: User, accessToken: string) => {
    return axiosInstance.delete(`/user/${admin.id}`, getRequestConfig(accessToken));
};

export const getUserById = (id: number, accesToken: string) => {
    return axiosInstance.get(`/user/${id}`, getRequestConfig(accesToken));
};

export const putUser = (requestData: User, accessToken: string) => {
    return axiosInstance.put('/user', requestData, getRequestConfig(accessToken));
};
