export interface ResShowChart {
    title: ResTitleChart[];
    data: ResShowDataChart[];
}

export interface ResTitleChart {
    id: number;
    title: string;
}

export interface ResShowDataChart {
    id: number;
    point: number;
    Text: any;
    createdAt: string;
    updatedAt: string;
    optionId: number;
    reportId: number;
    options: Options;
}

export interface Options {
    id: number;
    nameOption: string;
}
