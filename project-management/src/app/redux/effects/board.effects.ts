import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  allBoardsLoadedAction,
  boardCreatedAction,
  boardLoadedAction,
  createBoardAction,
  getAllBoardsAction,
  getBoardAction,
} from '../actions/board.action';
import { BoardsService } from '../../core/services/API/board.service';
import { errorMessageAction } from '../actions/error-message.action';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private boardService: BoardsService) {}

  loadAllBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllBoardsAction),
      switchMap(() =>
        this.boardService.getAllBoards().pipe(
          map((boards) => {
            if (Array.isArray(boards)) return allBoardsLoadedAction({ boards });
            else return errorMessageAction({ errorMessage: 'Could not load boards' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  loadBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBoardAction),
      switchMap((action) =>
        this.boardService.getBoardById(action.boardId).pipe(
          map((board) => {
            if ('title' in board) return boardLoadedAction({ board });
            else return errorMessageAction({ errorMessage: 'Could not load board' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBoardAction),
      switchMap((action) =>
        this.boardService.createBoard(action.board).pipe(
          map((board) => {
            if ('title' in board) return boardCreatedAction({ board });
            else return errorMessageAction({ errorMessage: 'Could not load board' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
