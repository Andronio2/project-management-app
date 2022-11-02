import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TOKEN_KEY } from 'src/app/share/constants/constants';
import { ICreateUserDto, ISigninUserDto, IToken, IUser } from 'src/app/share/models/auth.model';
import { IErrorResponse } from 'src/app/share/models/error-message.model';
import { LocalStoreService } from '../local-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStore: LocalStoreService,
    private router: Router,
  ) {}

  public isAuth(): boolean {
    return !!this.getToken();
  }

  public signUp(user: ICreateUserDto): Observable<IUser | IErrorResponse> {
    const endpoint = '/signup';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IUser | IErrorResponse>(endpoint, user, { headers });
  }

  public signIn(user: ISigninUserDto): Observable<IToken | IErrorResponse> {
    const endpoint = '/signin';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IToken | IErrorResponse>(endpoint, user, { headers }).pipe(
      tap((value) => {
        if ('token' in value) {
          this.localStore.saveData(TOKEN_KEY, value.token);
        }
      }),
    );
  }

  public getToken(): string | null {
    const token: string | null = this.localStore.getData(TOKEN_KEY);
    if (token) {
      if (this.isTokenExpired(token)) {
        return token;
      } else {
        this.localStore.removeData(TOKEN_KEY);
        this.router.navigate(['./welcome']);
      }
    }
    return null;
  }

  public isTokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return expiry * 1000 > Date.now();
  }
}
