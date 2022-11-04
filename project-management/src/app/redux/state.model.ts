import { IUser } from '../share/models/auth.model';

export interface AppState {
  errorMessage: string;
  allUsers: IUser[];
  currUser?: IUser;
}
