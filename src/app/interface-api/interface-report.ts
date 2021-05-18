
export interface ReqReport {
    perPage: number;
    page: number;
}

export interface ResReport {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: ResDataReport[];
}

export interface ResDataReport {
    id: number;
    mainFormName: string;
    mean: number;
    text: string;
    createdAt: string;
    updatedAt: string;
    mainFormId: number;
    answers: Answer[];
}

export interface Answer {
    id: number;
    point: number;
    text: any;
    options: Options;
}

export interface Options {
    id: number;
    nameOption: string;
}


