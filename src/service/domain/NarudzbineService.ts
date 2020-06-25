import { axiosInstance } from '../../api/axios';
import { getRequestConfig } from '../../utils/ApiUtils';

export const getAllNarudzbine = (accesToken: string) => {
    return axiosInstance.get('/narudzba', getRequestConfig(accesToken));
};
