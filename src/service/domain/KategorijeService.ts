import { axiosInstance } from "../../api/axios";

export const getAllKategorije = () =>{
    return axiosInstance.get('/kategorija');
};