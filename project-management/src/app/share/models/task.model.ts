export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: File[];
}

export interface File {
  filename: string;
  fileSize: number;
}

export interface ITaskCreateDto {
  title: string;
  description: string;
  userId: string;
}

export interface ITaskUpdateDto {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
