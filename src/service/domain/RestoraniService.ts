import { axiosInstance } from '../../api/axios';
import { Restoran, User } from '../../utils/constants/types';
import { getRequestConfig } from '../../utils/ApiUtils';

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
