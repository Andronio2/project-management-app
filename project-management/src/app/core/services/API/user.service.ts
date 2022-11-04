import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ICreateUserDto, IUser } from 'src/app/share/models/auth.model';
import { IErrorResponse } from 'src/app/share/models/error-message.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint: string = '/users';

  constructor(private http: HttpClient, private errorHandleService: ErrorHandlerService) {}

  public getUsers(): Observable<IUser[] | IErrorResponse> {
    return this.http
      .get<IUser[]>(this.endpoint)
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public getUser(id: string): Observable<IUser | IErrorResponse> {
    return this.http
      .get<IUser>(`${this.endpoint}/${id}`)
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public updateUser(id: string, user: ICreateUserDto): Observable<IUser | IErrorResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put<IUser>(`${this.endpoint}/${id}`, user, { headers })
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public deleteUser(id: string): Observable<IUser | IErrorResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .delete<IUser>(`${this.endpoint}/${id}`, { headers })
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }
}
