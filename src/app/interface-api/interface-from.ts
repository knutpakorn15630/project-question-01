export interface ReqShowForm {
    perPage: number;
    page: number;
}

export interface ResShowForm {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: ResDataForm[];
}

export interface ResDataForm {
    id: number;
    nameForm: string;
    createdAt: string;
    updatedAt: string;
}
