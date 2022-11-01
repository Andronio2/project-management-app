import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL } from 'src/app/share/constants/constants';
import { IToken, IUser } from 'src/app/share/models/auth.model';
import { IErrorResponse } from 'src/app/share/models/error-message.model';
import { CoreModule } from '../../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public signUp(user: IUser): Observable<IUser | IErrorResponse> {
    const url = `${BASEURL}/signup`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IUser | IErrorResponse>(url, user, { headers });
  }

  public signIn(user: IUser): Observable<IToken | IErrorResponse> {
    const url = `${BASEURL}/signin`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IToken | IErrorResponse>(url, user, { headers });
  }
}
