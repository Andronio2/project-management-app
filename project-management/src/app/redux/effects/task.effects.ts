import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TaskService } from '../../core/services/API/task.service';
import { BoardActions } from '../actions/board.action';
import { errorMessageAction } from '../actions/error-message.action';
import { TaskActions } from '../actions/task.action';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  loadAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.getAllTasksAction),
      switchMap((props) =>
        this.taskService.getAllTasks(props.boardId, props.columnId).pipe(
          map((tasks) => {
            if (Array.isArray(tasks))
              return TaskActions.allTasksLoadedAction({ columnId: props.columnId, tasks });
            else return errorMessageAction({ errorMessage: 'Could not load tasks' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  loadTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.getTaskByIdAction),
      switchMap((props) =>
        this.taskService.getTaskById(props.boardId, props.columnId, props.taskId).pipe(
          map((task) => {
            if ('title' in task)
              return TaskActions.taskLoadedAction({
                columnId: props.columnId,
                taskId: props.taskId,
                task,
              });
            else return errorMessageAction({ errorMessage: 'Could not load column' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTaskAction),
      switchMap((props) =>
        this.taskService.createTask(props.boardId, props.columnId, props.task).pipe(
          map((task) => {
            if ('title' in task) return BoardActions.getBoardAction({ boardId: props.boardId });
            else return errorMessageAction({ errorMessage: 'Could not create board' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTaskAction),
      switchMap((props) =>
        this.taskService.deleteTask(props.boardId, props.columnId, props.taskId).pipe(
          map((response) => {
            if (!response) return BoardActions.getBoardAction({ boardId: props.boardId });
            else return errorMessageAction({ errorMessage: 'Could not delete task' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTaskAction),
      switchMap((props) =>
        this.taskService.updateTask(props.boardId, props.columnId, props.taskId, props.task).pipe(
          map((board) => {
            if ('title' in board) return BoardActions.getBoardAction({ boardId: props.boardId });
            else return errorMessageAction({ errorMessage: 'Could not update task' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
