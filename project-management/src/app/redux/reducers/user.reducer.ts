import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/users.actions';
import { IUserState } from '../state.model';

export const initialState: IUserState = {
  allUsers: [],
};

export const userReducer = createReducer(
  initialState,
  on(
    UserActions.getUsersSuccess,
    (state, { users }): IUserState => ({
      ...state,
      allUsers: users,
    }),
  ),
  on(
    UserActions.getUserSuccess,
    (state, { user }): IUserState => ({
      ...state,
      currUser: user,
    }),
  ),
);
