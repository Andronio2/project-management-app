import { BoardLoadedState } from '../share/constants/constants';
import { IUser } from '../share/models/auth.model';
import { IBoard } from '../share/models/board.model';

export interface IUserState {
  isAuth: boolean;
  allUsers: IUser[];
  currUser?: IUser;
}

export interface IBoardState {
  allBoards: IBoard[];
  currBoard?: IBoard;
}

export interface IAppState {
  user: IUserState;
  board: IBoardState;
  boardLoaded: BoardLoadedState;
  markTask: string;
}
