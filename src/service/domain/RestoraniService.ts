import { axiosInstance } from '../../api/axios';
import { Restoran } from '../../utils/constants/types';
import { getRequestConfig } from '../../utils/ApiUtils';

export const getAllRestorani = () => {
    return axiosInstance.get('/restoran');
};

export const deleteRestoran = (restoran: Restoran, accesToken: string) => {
    return axiosInstance.delete(`/restoran/${restoran.id}`, getRequestConfig(accesToken));
};
