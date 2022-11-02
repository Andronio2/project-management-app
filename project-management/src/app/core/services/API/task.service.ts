import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IErrorResponse } from 'src/app/share/models/error-message.model';
import { ITask, ITaskCreate, ITaskUpdate } from 'src/app/share/models/task.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient, private errorHandleService: ErrorHandlerService) {}

  public getAllTasks(boardId: string, columnId: string): Observable<ITask[] | IErrorResponse> {
    const url = `boards/${boardId}/columns/${columnId}/tasks`;
    return this.http
      .get<ITask[]>(url)
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
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
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public getTaskById(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Observable<ITask | IErrorResponse> {
    const url = `boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.http
      .get<ITask>(url)
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }

  public deleteTask(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Observable<null | IErrorResponse> {
    const url = `boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.http
      .delete<null>(url)
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
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
      .pipe(catchError((args: any[]) => this.errorHandleService.errorHandler(args)));
  }
}
