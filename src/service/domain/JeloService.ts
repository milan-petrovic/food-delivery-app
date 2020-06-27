import { axiosInstance } from '../../api/axios';
import { getRequestConfig } from '../../utils/ApiUtils';
import { Jelo } from '../../utils/constants/types';

export const getAllJela = (restoran: number, accesToken: string) => {
    return axiosInstance.get(`/${restoran}/jela`, getRequestConfig(accesToken));
};

export const deleteJelo = (jelo: Jelo, accesToken: string) => {
    return axiosInstance.delete(`/jelo/${jelo.id}`, getRequestConfig(accesToken));
};

export const postJelo = (requestData: Jelo, accesToken: string) => {
    return axiosInstance.post('/jelo', requestData, getRequestConfig(accesToken));
};
