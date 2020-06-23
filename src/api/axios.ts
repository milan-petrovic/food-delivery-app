import axios from 'axios';
import { BaseRoutes } from '../utils/constants/routes';

export const axiosInstance = axios.create({
    baseURL: BaseRoutes.ApiUrl,
    responseType: 'json',
});
