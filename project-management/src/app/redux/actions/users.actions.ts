import { createAction, props } from '@ngrx/store';
import { ICreateUserDto, ISigninUserDto, IUser } from 'src/app/share/models/auth.model';

export namespace UserActions {
  export const getUsers = createAction('[User] GET_USERS');

  export const getUser = createAction('[User]  GET_EDIT_USER', props<{ id: string }>());

  export const updateUser = createAction(
    '[User]  GET_UPDATE_USER',
    props<{ id: string; user: ICreateUserDto }>(),
  );

  export const deleteUser = createAction('[User]  DELETE_USER', props<{ id: string }>());

  export const getUsersSuccess = createAction(
    '[User]  GET_USERS_SUCCESSES',
    props<{ users: IUser[] }>(),
  );

  export const getUserSuccess = createAction(
    '[User]  GET_EDIT_USER_SUCCESSES',
    props<{ user: IUser }>(),
  );

  export const deleteUsersSuccess = createAction('[User] DELETE_USER_SUCCESSES');

  export const SignUp = createAction('[User] SIGN_UP', props<{ user: ICreateUserDto }>());

  export const SignIn = createAction('[User] SIGN_IN', props<{ user: ISigninUserDto }>());

  export const SignInSuccess = createAction('[User] SIGN_IN_SUCCESS');

  export const LogOut = createAction('[User] LOG_OUT');
}
