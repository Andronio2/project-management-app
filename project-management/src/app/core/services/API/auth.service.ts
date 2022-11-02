import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TOKEN_KEY } from 'src/app/share/constants/constants';
import { IToken, IUser } from 'src/app/share/models/auth.model';
import { IErrorResponse } from 'src/app/share/models/error-message.model';
import { LocalStoreService } from '../local-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private localStore: LocalStoreService) {}

  public signUp(user: IUser): Observable<IUser | IErrorResponse> {
    const endpoint = '/signup';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IUser | IErrorResponse>(endpoint, user, { headers });
  }

  public signIn(user: IUser): Observable<IToken | IErrorResponse> {
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

  public getToken() {
    return this.localStore.getData(TOKEN_KEY);
  }
}
