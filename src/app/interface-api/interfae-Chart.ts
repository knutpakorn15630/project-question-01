export interface ResShowChart {
    data: ResTitleChart[];
}

export interface ResTitleChart {
    id: number;
    title: string;
    options: ResShowDataChart[];
}

export interface ResShowDataChart {
    id: number;
    nameOption: string;
    textOptionChart: string;
    titleId: number;
    answers: Options[];
}

export interface Options {
    id: number;
    nameOption: string;
}

