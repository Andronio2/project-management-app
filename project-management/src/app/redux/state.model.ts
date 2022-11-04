import { IUser } from '../share/models/auth.model';
import { IBoard } from '../share/models/board.model';

export interface AppState {
  errorMessage: string;
  allUsers: IUser[];
  currUser?: IUser;
  allBoards: IBoard[];
  currBoard: IBoard;
}
