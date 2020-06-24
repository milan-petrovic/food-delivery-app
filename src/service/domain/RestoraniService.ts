import { axiosInstance } from '../../api/axios';
import { Restoran } from '../../utils/constants/types';
import { getRequestConfig, getRequestConfigDelete } from '../../utils/ApiUtils';

export const getAllRestorani = () => {
    return axiosInstance.get('/restoran');
};

export const deleteRestoran = (restoran: Restoran, accesToken: string) => {
    return axiosInstance.delete('/restoran', getRequestConfigDelete(restoran, accesToken));
};
