import { IUser } from '../share/models/auth.model';
import { IBoard } from '../share/models/board.model';

export interface IUserState {
  allUsers: IUser[];
  currUser?: IUser;
}

export interface IBoardState {
  allBoards: IBoard[];
  currBoard?: IBoard;
}

export interface IAppState {
  errorMessage: string;
  user: IUserState;
  board: IBoardState;
}
