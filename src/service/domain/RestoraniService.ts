import { axiosInstance } from '../../api/axios';

export const getAllRestorani = () => {
    return axiosInstance.get('/restoran');
};
