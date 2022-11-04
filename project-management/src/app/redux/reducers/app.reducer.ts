import { createReducer, on } from '@ngrx/store';
import UserActions from '../actions/users.actions';
import { AppState } from '../state.model';

export const initialState: AppState = {
  errorMessage: '',
  allUsers: [],
};

export const appReducer = createReducer(
  initialState,
  on(
    UserActions.getUsersSuccess,
    (state, { users }): AppState => ({
      ...state,
      allUsers: users,
    }),
  ),
  on(
    UserActions.getUserSuccess,
    (state, { user }): AppState => ({
      ...state,
      currUser: user,
    }),
  ),
);
