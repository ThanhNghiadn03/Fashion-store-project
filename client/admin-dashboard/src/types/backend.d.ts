export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IModelPaginate<T> {
    meta: {
        // current: number;
        // pageSize: number;
        // pages: number;
        // total: number;
    },
    result: T[]
}

export interface IAccount {
    access_token: string;
    user: {
        _id: string;
        role: string;
        email: string;
        name: string
    }
}

export interface IGetAccount extends Omit<IAccount, "access_token"> { }

export interface ICompany {
    _id?: string;
    name?: string;
    address?: string;
    description?: string;
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}



export interface IUser {
    _id?: string;
    firstName: string;
    email: string;
    password?: string;
    // age: number;
    lastName: string;
    phoneNumber: string;
    idRole?: string;
    // company?: {
    //     _id: string;
    //     name: string;
    // }
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICustomer {
    _id?: string;
    firstName: string;
    email: string;
    password?: string;
    // age: number;
    lastName: string;
    phoneNumber: string;
    idRole?: string;
    // company?: {
    //     _id: string;
    //     name: string;
    // }
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}



export interface IProduct {
    _id?: string;
    nameProduct,
    price,
    discount,
    descriptionProduct,
    imageProduct,
    quantity,
    idCategory,
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}
export interface IVoucher {
    _id?: string;
    idVoucher,
    typeVoucher,
    discount,
    quantity,
    descriptionVoucher,
    startDate,
    endDate,
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

