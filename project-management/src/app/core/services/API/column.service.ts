import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IColumn, IColumnDto } from 'src/app/share/models/column.model';
import { IErrorResponse } from 'src/app/share/models/error-message.model';
import { Store } from '@ngrx/store';
import { errorMessageAction } from 'src/app/redux/actions/error-message.action';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  constructor(private http: HttpClient, private store: Store) {}

  public getAllColumns(boardId: string): Observable<IColumn[] | IErrorResponse> {
    const url = `boards/${boardId}/columns`;
    return this.http.get<IColumn[]>(url).pipe(catchError(this.errorHandler.bind(this)));
  }

  public createColumn(boardId: string, column: IColumnDto): Observable<IColumn | IErrorResponse> {
    const url = `boards/${boardId}/columns`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<IColumn>(url, column, { headers })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  public getColumnById(boardId: string, columnId: string): Observable<IColumn | IErrorResponse> {
    const url = `boards/${boardId}/columns/${columnId}`;
    return this.http.get<IColumn>(url).pipe(catchError(this.errorHandler.bind(this)));
  }

  public deleteColumn(boardId: string, columnId: string): Observable<null | IErrorResponse> {
    const url = `boards/${boardId}/columns/${columnId}`;
    return this.http.delete<null>(url).pipe(catchError(this.errorHandler.bind(this)));
  }

  public updateColumn(
    boardId: string,
    columnId: string,
    column: IColumnDto,
  ): Observable<IColumn | IErrorResponse> {
    const url = `boards/${boardId}/columns/${columnId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put<IColumn>(url, column, { headers })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(this: ColumnService, ...args: any[]): Observable<IErrorResponse> {
    const error = args[0];
    const message = error.error.message ? error.error.message : error.message;
    this.store.dispatch(errorMessageAction(message));
    return of({
      statusCode: error.status,
      message,
    });
  }
}
