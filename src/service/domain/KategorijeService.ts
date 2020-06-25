import { axiosInstance } from '../../api/axios';
import { Kategorija } from '../../utils/constants/types';
import { getRequestConfig } from '../../utils/ApiUtils';

export const getAllKategorije = () => {
    return axiosInstance.get('/kategorija');
};

export const deleteKategorija = (kategorija: Kategorija, accesToken: string) => {
    return axiosInstance.delete(`/kategorija/${kategorija.id}`, getRequestConfig(accesToken));
};