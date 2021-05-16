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
  titleId: number;
  isSelect: boolean;
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
  text: string;
}
