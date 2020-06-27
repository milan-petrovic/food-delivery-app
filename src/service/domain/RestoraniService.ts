import { axiosInstance } from '../../api/axios';
import { Restoran, User } from '../../utils/constants/types';
import { getRequestConfig, getRequestImageConfig } from '../../utils/ApiUtils';

export const getAllRestorani = () => {
    return axiosInstance.get('/restoran');
};

export const deleteRestoran = (restoran: Restoran, accesToken: string) => {
    return axiosInstance.delete(`/restoran/${restoran.id}`, getRequestConfig(accesToken));
};

export const postRestoran = (requestData: Restoran, accessToken: string, createdUser: User) => {
    requestData.usertbl = createdUser;
    console.log(requestData);
    return axiosInstance.post('/restoran', requestData, getRequestConfig(accessToken));
};

export const postRestoranImage = (restoranId: number, formData: FormData, accessToken: string) => {
    return axiosInstance.post(`/restoran/${restoranId}/img`, formData, getRequestImageConfig(accessToken));
};

export const deleteRestoranImage = (restoranId: number, accessToken: string) => {
    return axiosInstance.delete(`/restoran/${restoranId}/img`, getRequestImageConfig(accessToken));
};

export const getRestoranById = (restoranId: number) => {
    return axiosInstance.get(`/restoran/${restoranId}`);
};
