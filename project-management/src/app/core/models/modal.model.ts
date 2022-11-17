export interface IConfirmData {
  title: string;
  question: string;
}

export interface IBoardModal {
  name: string;
  type: string;
  boardId: string;
  columnId: string;
  taskId: string;
}

export interface IErrorModal {
  message: string;
  status: number;
}
