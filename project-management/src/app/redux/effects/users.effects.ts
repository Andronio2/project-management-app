import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/API/user.service';
import UserActions from '../actions/users.actions';

@Injectable()
export default class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.getUsersSuccess({ users })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      switchMap((action) =>
        this.userService.getUser(action.id).pipe(
          map((user) => UserActions.getUserSuccess({ user })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
