import { IBackendRes, ICompany, IAccount, IUser, IModelPaginate, IGetAccount, IProduct, IVoucher } from '@/types/backend';
import axios from 'config/axios-customize';

/**
 * 
Module Auth
 */
export const callRegister = (name: string, email: string, password: string, age: number, gender: string, address: string) => {
    return axios.post<IBackendRes<IUser>>('/api/v1/auth/register', { name, email, password, age, gender, address })
}

export const callLogin = (username: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>('/admins/login', { username, password })
}

export const callFetchAccount = () => {
    return axios.get<IBackendRes<IGetAccount>>('/admin/profile')
}

export const callRefreshToken = () => {
    return axios.get<IBackendRes<IAccount>>('/api/v1/auth/refresh')
}

export const callLogout = () => {
    return axios.post<IBackendRes<string>>('/api/v1/auth/logout')
}


/**
 * Upload single file
 */
export const callUploadSingleFile = (file: any, folderType: string) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileUpload', file);
    return axios<IBackendRes<{ fileName: string }>>({
        method: 'post',
        url: 'files/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "folder_type": folderType
        },
    });
}


/**
 * 
Module Company
 */
export const callCreateCompany = (name: string, address: string, description: string) => {
    return axios.post<IBackendRes<ICompany>>('/api/v1/companies', { name, address, description })
}

export const callUpdateCompany = (id: string, name: string, address: string, description: string) => {
    return axios.patch<IBackendRes<ICompany>>(`/api/v1/companies/${id}`, { name, address, description })
}

export const callDeleteCompany = (id: string) => {
    return axios.delete<IBackendRes<ICompany>>(`/api/v1/companies/${id}`);
}

export const callFetchCompany = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<ICompany>>>(`/api/v1/companies?${query}`);
}


/**
 * 
Module User
 */
export const callCreateUser = (user: IUser) => {
    return axios.post<IBackendRes<IUser>>('/admins', { ...user })
}

export const callUpdateUser = (user: IUser) => {
    return axios.patch<IBackendRes<IUser>>(`/admins`, { ...user })
}

export const callDeleteUser = (id: string) => {
    return axios.delete<IBackendRes<IUser>>(`/admins/${id}`);
}

export const callFetchUser = () => {
    return axios.get<IBackendRes<IModelPaginate<IUser>>>(`/admins/admin`);
}

/**
 * 
Module Product
 */
export const callCreateProduct = (product: IProduct) => {
    return axios.post<IBackendRes<IProduct>>('/products', { ...product })
}

export const callUpdateProduct = (product: IProduct) => {
    return axios.patch<IBackendRes<IProduct>>(`/products`, { ...product })
}

export const callDeleteProduct = (id: string) => {
    return axios.delete<IBackendRes<IProduct>>(`/products/${id}`);
}

export const callFetchProduct = () => {
    return axios.get<IBackendRes<IModelPaginate<IProduct>>>(`/products`);
}

/**
 * 
Module Voucher
 */
export const callCreateVoucher = (voucher: IVoucher) => {
    return axios.post<IBackendRes<IVoucher>>('/vouchers', { ...voucher })
}

export const callUpdateVoucher = (voucher: IVoucher) => {
    return axios.patch<IBackendRes<IVoucher>>(`/vouchers`, { ...voucher })
}

export const callDeleteVoucher = (id: string) => {
    return axios.delete<IBackendRes<IVoucher>>(`/vouchers/${id}`);
}

export const callFetchVoucher = () => {
    return axios.get<IBackendRes<IModelPaginate<IVoucher>>>(`/vouchers`);
}

