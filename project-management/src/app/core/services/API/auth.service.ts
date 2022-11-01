import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BASEURL, TOKEN_KEY } from 'src/app/share/constants/constants';
import { IToken, IUser } from 'src/app/share/models/auth.model';
import { IErrorResponse } from 'src/app/share/models/error-message.model';
import { CoreModule } from '../../core.module';
import { LocalStoreService } from '../local-store.service';

@Injectable({
  providedIn: CoreModule,
})
export class AuthService {
  constructor(private http: HttpClient, private localStore: LocalStoreService) {}

  public signUp(user: IUser): Observable<IUser | IErrorResponse> {
    const url = `${BASEURL}/signup`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IUser | IErrorResponse>(url, user, { headers });
  }

  public signIn(user: IUser): Observable<IToken> {
    const url = `${BASEURL}/signin`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IToken>(url, user, { headers }).pipe(
      tap((value) => {
        this.localStore.saveData(TOKEN_KEY, value.token);
      }),
    );
  }
}
