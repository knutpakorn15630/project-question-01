export interface ResShowQuestion {
  id: number;
  nameForm: string;
  createdAt: string;
  updatedAt: string;
  maintitle: ResMainTitle[];
}

export interface ResMainTitle {
  id: number;
  mainTitle: string;
  Statement: string;
  StatementEnd?: string;
  createdAt: string;
  updatedAt: string;
  mainformId: number;
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
  maintitleId: number;
  mainTitleId: number;
  isCheck: boolean;
  options: ResOption[];
}

export interface ResOption {
  id: number;
  nameOption: string;
  text: any;
  point?: number;
  createdAt: string;
  updatedAt: string;
  isSelect: boolean;
  titleId: number;
}




// ----------------------------- บันทึก-----------------------------------


export interface ReqDataQuestion {
  formId: number;
  mainTitle: ReqMainTitle[];
}

export interface ReqMainTitle {
  id: number;
  titles: ReqTitle[];
}

export interface ReqTitle {
  id: number;
  options: ReqOption[];
}

export interface ReqOption {
  id: number;
}

export interface ResDataQuestion {
  mean: number;
}
