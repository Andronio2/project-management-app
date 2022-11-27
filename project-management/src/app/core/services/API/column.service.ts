import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IColumn, IColumnDto, IUpdateColumnDto } from 'src/app/share/models/column.model';
import { IErrorResponse } from 'src/app/share/models/error-message.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  constructor(private http: HttpClient, private errorHandleService: ErrorHandlerService) {}

  public getAllColumns(boardId: string): Observable<IColumn[] | IErrorResponse> {
    const url = `/boards/${boardId}/columns`;
    return this.http
      .get<IColumn[]>(url)
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public createColumn(boardId: string, column: IColumnDto): Observable<IColumn | IErrorResponse> {
    const url = `/boards/${boardId}/columns`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<IColumn>(url, column, { headers })
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public getColumnById(boardId: string, columnId: string): Observable<IColumn | IErrorResponse> {
    const url = `/boards/${boardId}/columns/${columnId}`;
    return this.http
      .get<IColumn>(url)
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public deleteColumn(boardId: string, columnId: string): Observable<null | IErrorResponse> {
    const url = `/boards/${boardId}/columns/${columnId}`;
    return this.http
      .delete<null>(url)
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public updateColumn(
    boardId: string,
    columnId: string,
    column: IUpdateColumnDto,
  ): Observable<IColumn | IErrorResponse> {
    const url = `/boards/${boardId}/columns/${columnId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put<IColumn>(url, column, { headers })
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }
}
