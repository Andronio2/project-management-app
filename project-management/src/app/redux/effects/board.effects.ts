import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { BoardActions } from '../actions/board.action';
import { BoardsService } from '../../core/services/API/board.service';
import { errorMessageAction } from '../actions/error-message.action';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private boardService: BoardsService) {}

  loadAllBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getAllBoardsAction),
      switchMap(() =>
        this.boardService.getAllBoards().pipe(
          map((boards) => {
            if (Array.isArray(boards)) return BoardActions.allBoardsLoadedAction({ boards });
            else return errorMessageAction({ errorMessage: 'Could not load boards' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  loadBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoardAction),
      switchMap((action) =>
        this.boardService.getBoardById(action.boardId).pipe(
          map((board) => {
            if ('title' in board) return BoardActions.boardLoadedAction({ board });
            else return errorMessageAction({ errorMessage: 'Could not load board' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.createBoardAction),
      switchMap((action) =>
        this.boardService.createBoard(action.board).pipe(
          map((board) => {
            if ('title' in board) return BoardActions.boardCreatedAction({ board });
            else return errorMessageAction({ errorMessage: 'Could not load board' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
