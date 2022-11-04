import { IAppState } from '../state.model';
import { userReducer } from './user.reducer';

export const appReducer: IAppState = {
  errorMessage,
  user: userReducer,
  board,
};
