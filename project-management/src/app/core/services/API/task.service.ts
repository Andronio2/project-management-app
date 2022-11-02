import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { errorMessageAction } from 'src/app/redux/actions/error-message.action';
import { IErrorResponse } from 'src/app/share/models/error-message.model';
import { ITask, ITaskCreate, ITaskUpdate } from 'src/app/share/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient, private store: Store) {}

  public getAllTasks(boardId: string, columnId: string): Observable<ITask[] | IErrorResponse> {
    const url = `boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.get<ITask[]>(url).pipe(catchError(this.errorHandler.bind(this)));
  }

  public createTask(
    boardId: string,
    columnId: string,
    task: ITaskCreate,
  ): Observable<ITask | IErrorResponse> {
    const url = `boards/${boardId}/columns/${columnId}/tasks`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<ITask>(url, task, { headers })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  public getTaskById(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Observable<ITask | IErrorResponse> {
    const url = `boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.http.get<ITask>(url).pipe(catchError(this.errorHandler.bind(this)));
  }

  public deleteTask(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Observable<null | IErrorResponse> {
    const url = `boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.http.delete<null>(url).pipe(catchError(this.errorHandler.bind(this)));
  }

  public updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    task: ITaskUpdate,
  ): Observable<ITask | IErrorResponse> {
    const url = `boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put<ITask>(url, task, { headers })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(this: TaskService, ...args: any[]): Observable<IErrorResponse> {
    const error = args[0];
    const message = error.error.message ? error.error.message : error.message;
    this.store.dispatch(errorMessageAction(message));
    return of({
      statusCode: error.status,
      message,
    });
  }
}
