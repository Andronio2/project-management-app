import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/share/models/auth.model';
import { IErrorResponse } from 'src/app/share/models/error-message.model';

namespace UserActions {
  export const getUsers = createAction('[User] GET_USERS');

  export const getUser = createAction('[User]  GET_EDIT_USER', props<{ id: string }>());

  export const getUsersSuccess = createAction(
    '[User]  GET_USERS_SUCCESSES',
    props<{ users: IUser[] | IErrorResponse }>(),
  );

  export const getUserSuccess = createAction(
    '[User]  GET_EDIT_USER_SUCCESSES',
    props<{ user: IUser | IErrorResponse }>(),
  );
}

export default UserActions;
