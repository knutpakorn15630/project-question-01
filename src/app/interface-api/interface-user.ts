export interface ResUser {
    data: ResDataUser[];
}

export interface ResDataUser {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}


export interface ReqUpdateUser {
    id: number;
    password: string;
    firstName: string;
    lastName: string;
    userName: string;
}

export interface ResUpdateUser {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}


export interface ReqCreateUser {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
}

export interface ResCreateUser {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    updatedAt: string;
    createdAt: string;
}



export interface ResDeleteUser {
    msg: string;
}
