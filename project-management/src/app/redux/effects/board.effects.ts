import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { BoardActions } from '../actions/board.action';
import { BoardsService } from '../../core/services/API/board.service';
import { errorMessageAction } from '../actions/error-message.action';
import { IBoard } from 'src/app/share/models/board.model';
import { Store } from '@ngrx/store';
import { BoardLoadedState } from 'src/app/share/constants/constants';

@Injectable()
export class BoardEffects {
  constructor(
    private actions$: Actions,
    private boardService: BoardsService,
    private store: Store,
  ) {}

  loadAllBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getAllBoardsAction),
      switchMap(() => this.boardService.getAllBoards()),
      switchMap((boards) => {
        if (Array.isArray(boards)) {
          return forkJoin(
            boards.map((board) => this.boardService.getBoardById(board.id) as Observable<IBoard>),
          );
        } else return of({ errorMessage: 'Could not load boards' });
      }),
      map((boards) => {
        if (Array.isArray(boards)) {
          return BoardActions.allBoardsLoadedAction({ boards });
        } else return errorMessageAction({ errorMessage: 'Could not load boards' });
      }),
      catchError(() => EMPTY),
    ),
  );

  loadBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoardAction),
      switchMap((action) => this.boardService.getBoardById(action.boardId)),
      map((board) => {
        if ('title' in board) {
          this.store.dispatch(BoardActions.boardRequestDone({ done: BoardLoadedState.loaded }));
          return BoardActions.boardLoadedAction({ board });
        } else {
          this.store.dispatch(BoardActions.boardRequestDone({ done: BoardLoadedState.error }));
          return errorMessageAction({ errorMessage: 'Could not load board' });
        }
      }),
      catchError(() => EMPTY),
    ),
  );

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.createBoardAction),
      switchMap((action) =>
        this.boardService.createBoard(action.board).pipe(
          map((board) => {
            if ('title' in board) return BoardActions.getAllBoardsAction();
            else return errorMessageAction({ errorMessage: 'Could not create board' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.deleteBoardAction),
      switchMap((action) =>
        this.boardService.deleteBoard(action.id).pipe(
          map((response) => {
            if (!response) return BoardActions.getAllBoardsAction();
            else return errorMessageAction({ errorMessage: 'Could not delete board' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.updateBoardAction),
      switchMap((action) =>
        this.boardService.updateBoard(action.id, action.board).pipe(
          map((board) => {
            if ('title' in board) return BoardActions.getAllBoardsAction();
            else return errorMessageAction({ errorMessage: 'Could not update board' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
