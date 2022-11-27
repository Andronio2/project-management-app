import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/API/user.service';
import { errorMessageAction } from '../actions/error-message.action';
import { UserActions } from '../actions/users.actions';
import { AuthService } from 'src/app/core/services/API/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.SignIn),
      switchMap(({ user }) =>
        this.authService.signIn(user).pipe(
          map((token) => {
            if ('token' in token) {
              this.router.navigate(['/main']);
              return UserActions.SignInSuccess();
            }
            return errorMessageAction({ errorMessage: token.message });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.SignUp),
      switchMap((action) =>
        this.authService.signUp(action.user).pipe(
          map((user) => {
            if ('id' in user) {
              return UserActions.SignIn({
                user: { login: action.user.login, password: action.user.password },
              });
            }
            return errorMessageAction({ errorMessage: user.message });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => {
            if ('length' in users) {
              return UserActions.getUsersSuccess({ users });
            }
            return errorMessageAction({ errorMessage: users.message });
          }),
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
          map((user) => {
            if ('id' in user) {
              return UserActions.getUserSuccess({ user });
            }
            return errorMessageAction({ errorMessage: user.message });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ id, user }) =>
        this.userService.updateUser(id, user).pipe(
          map((value) => {
            if ('id' in value) {
              return UserActions.getUserSuccess({ user: value });
            }
            return errorMessageAction({ errorMessage: value.message });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() => {
            return UserActions.deleteUsersSuccess();
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {}
}
