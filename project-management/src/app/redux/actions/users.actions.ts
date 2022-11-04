import { createAction, props } from '@ngrx/store';
import { ICreateUserDto, IUser } from 'src/app/share/models/auth.model';

namespace UserActions {
  export const getUsers = createAction('[User] GET_USERS');

  export const getUser = createAction('[User]  GET_EDIT_USER', props<{ id: string }>());

  export const updateUser = createAction(
    '[User]  GET_UPDATE_USER',
    props<{ id: string; user: ICreateUserDto }>(),
  );

  export const getUsersSuccess = createAction(
    '[User]  GET_USERS_SUCCESSES',
    props<{ users: IUser[] }>(),
  );

  export const getUserSuccess = createAction(
    '[User]  GET_EDIT_USER_SUCCESSES',
    props<{ user: IUser }>(),
  );
}

export default UserActions;
