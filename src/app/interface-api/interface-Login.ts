export interface ReqLogin {
    userName: string;
    password: string;
}

export interface ResLogin {
    accessToken: string;
    refreshToken: string;
    data: ResLoginData;
}

export interface ResLoginData {
    id: number;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
}


export interface ServiceLogin {
    accessToken: string;
    refreshToken: string;
    data: ResServiceLoginData;
}

export interface ResServiceLoginData {
    id: number;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
}
