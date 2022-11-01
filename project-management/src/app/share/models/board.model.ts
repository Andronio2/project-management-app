import { IColumn } from './column.model';

export interface IBoard {
  id: string;
  title: string;
  description: string;
  columns?: IColumn[];
}

export interface IBoardDto {
  title: string;
  description: string;
}
