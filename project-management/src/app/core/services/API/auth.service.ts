import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, tap } from 'rxjs';
import { UserActions } from 'src/app/redux/actions/users.actions';
import { TOKEN_KEY } from 'src/app/share/constants/constants';
import { ICreateUserDto, ISigninUserDto, IToken, IUser } from 'src/app/share/models/auth.model';
import { IErrorResponse } from 'src/app/share/models/error-message.model';
import { TokenService } from '../token.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private errorHandleService: ErrorHandlerService,
    private router: Router,
    private store: Store,
  ) {}

  public isAuth(): boolean {
    return !!this.tokenService.getToken();
  }

  public signUp(user: ICreateUserDto): Observable<IUser | IErrorResponse> {
    const endpoint = '/signup';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<IUser | IErrorResponse>(endpoint, user, { headers })
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public signIn(user: ISigninUserDto): Observable<IToken | IErrorResponse> {
    const endpoint = '/signin';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IToken | IErrorResponse>(endpoint, user, { headers }).pipe(
      catchError((args: any[]) => this.errorHandleService.errorHandler(args)),
      tap((value) => {
        if ('token' in value) {
          localStorage.setItem(TOKEN_KEY, value.token);
          this.store.dispatch(UserActions.getUser({ id: this.tokenService.getId()! }));
        }
      }),
    );
  }

  public logOut() {
    this.tokenService.deleteToken();
    this.store.dispatch(UserActions.LogOut());
    this.router.navigate(['/welcome']);
  }
}
