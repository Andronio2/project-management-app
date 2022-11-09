import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ColumnService } from '../../core/services/API/column.service';
import { errorMessageAction } from '../actions/error-message.action';
import { ColumnActions } from '../actions/column.action';
import { BoardActions } from '../actions/board.action';

@Injectable()
export class ColumnEffects {
  constructor(private actions$: Actions, private columnService: ColumnService) {}

  loadAllColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.getAllColumnsAction),
      switchMap((props) =>
        this.columnService.getAllColumns(props.boardId).pipe(
          map((columns) => {
            if (Array.isArray(columns)) return ColumnActions.allColumnsLoadedAction({ columns });
            else return errorMessageAction({ errorMessage: 'Could not load columns' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  loadColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.getColumnByIdAction),
      switchMap((props) =>
        this.columnService.getColumnById(props.boardId, props.columnId).pipe(
          map((column) => {
            if ('title' in column)
              return ColumnActions.columnLoadedAction({ columnId: props.columnId, column });
            else return errorMessageAction({ errorMessage: 'Could not load column' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  createColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.createColumnAction),
      switchMap((props) =>
        this.columnService.createColumn(props.boardId, props.column).pipe(
          map((column) => {
            if ('title' in column) return BoardActions.getBoardAction({ boardId: props.boardId });
            else return errorMessageAction({ errorMessage: 'Could not create column' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  deleteColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.deleteColumnAction),
      switchMap((props) =>
        this.columnService.deleteColumn(props.boardId, props.columnId).pipe(
          map((response) => {
            if (!response) return BoardActions.getBoardAction({ boardId: props.boardId });
            else return errorMessageAction({ errorMessage: 'Could not delete column' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  updateColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.updateColumnAction),
      switchMap((props) =>
        this.columnService.updateColumn(props.boardId, props.columnId, props.column).pipe(
          map((column) => {
            if ('title' in column) return BoardActions.getBoardAction({ boardId: props.boardId });
            else return errorMessageAction({ errorMessage: 'Could not update column' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
