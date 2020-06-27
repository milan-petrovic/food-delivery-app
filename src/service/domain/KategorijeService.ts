import { axiosInstance } from '../../api/axios';
import { Kategorija } from '../../utils/constants/types';
import { getRequestConfig, getRequestImageConfig } from '../../utils/ApiUtils';

export const getAllKategorije = () => {
    return axiosInstance.get('/kategorija');
};

export const postKategorija = (requestData: Kategorija, accessToken: string) => {
    return axiosInstance.post('/kategorija', requestData, getRequestConfig(accessToken));
};

export const deleteKategorija = (kategorija: Kategorija, accesToken: string) => {
    return axiosInstance.delete(`/kategorija/${kategorija.id}`, getRequestConfig(accesToken));
};

export const postKategorijaImage = (kategorijaId: number, formData: FormData, accessToken: string) => {
    return axiosInstance.post(`/kategorija/${kategorijaId}/img`, formData, getRequestImageConfig(accessToken));
};

export const deleteKategorijaImage = (kategorijaId: number, accessToken: string) => {
    return axiosInstance.delete(`/kategorija/${kategorijaId}/img`, getRequestImageConfig(accessToken));
};
