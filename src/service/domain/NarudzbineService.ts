import {axiosInstance} from '../../api/axios';
import {getRequestConfig} from '../../utils/ApiUtils';
import {Narudzba} from '../../utils/constants/types';

export const getAllNarudzbine = (accesToken: string) => {
    return axiosInstance.get('/narudzba', getRequestConfig(accesToken));
};

export const postNaruzba = (requestData: Narudzba) => {
    return axiosInstance.post('/narudzba', requestData);
};
