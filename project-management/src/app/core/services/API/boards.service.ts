import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard, IBoardDto } from 'src/app/share/models/board.model';
import { IErrorResponse } from 'src/app/share/models/error-message.model';
import { BASEURL } from '../../../share/constants/constants';
import { CoreModule } from '../../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class BoardsService {
  constructor(private http: HttpClient) {}

  public getAllBoards(): Observable<IBoard[] | IErrorResponse> {
    const url = `${BASEURL}/boards`;
    return this.http.get<IBoard[] | IErrorResponse>(url);
  }

  public createBoard(board: IBoardDto): Observable<IBoard[] | IErrorResponse> {
    const url = `${BASEURL}/boards`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IBoard[] | IErrorResponse>(url, board, { headers });
  }

  public getBoardById(id: string): Observable<IBoard | IErrorResponse> {
    const url = `${BASEURL}/boards/${id}`;
    return this.http.get<IBoard | IErrorResponse>(url);
  }

  public deleteBoard(id: string): Observable<null | IErrorResponse> {
    const url = `${BASEURL}/boards/${id}`;
    return this.http.delete<null | IErrorResponse>(url);
  }

  public updateBoard(id: string, board: IBoardDto): Observable<IBoard | IErrorResponse> {
    const url = `${BASEURL}/boards/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IBoard | IErrorResponse>(url, board, { headers });
  }
}
