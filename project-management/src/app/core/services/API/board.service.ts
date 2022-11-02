import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IBoard, IBoardDto } from 'src/app/share/models/board.model';
import { IErrorResponse } from 'src/app/share/models/error-message.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient, private errorHandleService: ErrorHandlerService) {}

  public getAllBoards(): Observable<IBoard[] | IErrorResponse> {
    const url = `/boards`;
    return this.http
      .get<IBoard[]>(url)
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public createBoard(board: IBoardDto): Observable<IBoard | IErrorResponse> {
    const url = `/boards`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<IBoard>(url, board, { headers })
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public getBoardById(id: string): Observable<IBoard | IErrorResponse> {
    const url = `/boards/${id}`;
    return this.http
      .get<IBoard>(url)
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public deleteBoard(id: string): Observable<null | IErrorResponse> {
    const url = `/boards/${id}`;
    return this.http
      .delete<null>(url)
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public updateBoard(id: string, board: IBoardDto): Observable<IBoard | IErrorResponse> {
    const url = `/boards/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put<IBoard>(url, board, { headers })
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }
}
