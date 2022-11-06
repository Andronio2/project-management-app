import { ITask } from './task.model';

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks?: ITask[];
}

export interface IColumnDto {
  title: string;
}

export interface IUpdateColumnDto {
  title: string;
  order: number;
}
