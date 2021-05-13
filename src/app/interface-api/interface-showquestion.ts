export interface ResShowQuestion {
  id: number;
  nameForm: string;
  createdAt: string;
  updatedAt: string;
  mainTitle: ResMainTitle[];
}

export interface ResMainTitle {
  id: number;
  mainTitle: string;
  Statement: string;
  StatementEnd?: string;
  createdAt: string;
  updatedAt: string;
  mainFormId: number;
  titles: ResTitle[];
}

export interface ResTitle {
  id: number;
  title: string;
  min: number;
  max: number;
  createdAt: string;
  updatedAt: string;
  mainTitleId: number;
  options: ResOption[];
}

export interface ResOption {
  id: number;
  nameOption: string;
  text: any;
  point?: number;
  createdAt: string;
  updatedAt: string;
  titleId: number;
  isSelect: boolean;
}
