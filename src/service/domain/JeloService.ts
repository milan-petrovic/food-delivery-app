import { axiosInstance } from '../../api/axios';
import { getRequestConfig, getRequestImageConfig } from '../../utils/ApiUtils';
import { Jelo, Restoran } from '../../utils/constants/types';

export const getAllJela = (restoran: number, accesToken: string) => {
    return axiosInstance.get(`/${restoran}/jela`, getRequestConfig(accesToken));
};

export const deleteJelo = (jelo: Jelo, accesToken: string) => {
    return axiosInstance.delete(`/jelo/${jelo.id}`, getRequestConfig(accesToken));
};

export const postJelo = (requestData: Jelo, accesToken: string, restoran: Restoran) => {
    requestData.restoranBean = restoran;
    return axiosInstance.post('/jelo', requestData, getRequestConfig(accesToken));
};

export const postJeloImage = (jeloId: number, formData: FormData, accessToken: string) => {
    return axiosInstance.post(`/jelo/${jeloId}/img`, formData, getRequestImageConfig(accessToken));
};

export const deleteJeloImage = (jeloId: number, accessToken: string) => {
    return axiosInstance.delete(`/jelo/${jeloId}/img`, getRequestImageConfig(accessToken));
};
