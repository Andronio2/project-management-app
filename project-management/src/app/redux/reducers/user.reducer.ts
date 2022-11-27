import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/users.actions';
import { IUserState } from '../state.model';

export const initialState: IUserState = {
  allUsers: [],
  isAuth: false,
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
  on(
    UserActions.deleteUsersSuccess,
    (state): IUserState => ({
      ...state,
      currUser: undefined,
      isAuth: false,
    }),
  ),
  on(
    UserActions.SignInSuccess,
    (state): IUserState => ({
      ...state,
      isAuth: true,
    }),
  ),
  on(
    UserActions.LogOut,
    (state): IUserState => ({
      ...state,
      isAuth: false,
    }),
  ),
);
