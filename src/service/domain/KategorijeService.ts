import { axiosInstance } from '../../api/axios';
import { Kategorija } from '../../utils/constants/types';
import { getRequestConfig } from '../../utils/ApiUtils';

export const getAllKategorije = () => {
    return axiosInstance.get('/kategorija');
};

export const postKategorija = (requestData: Kategorija, accessToken: string) => {
    return axiosInstance.post('/kategorija',requestData, getRequestConfig(accessToken));
};

export const deleteKategorija = (kategorija: Kategorija, accesToken: string) => {
    return axiosInstance.delete(`/kategorija/${kategorija.id}`, getRequestConfig(accesToken));
};
