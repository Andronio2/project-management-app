import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { allBoardsLoadedAction, getAllBoardsAction } from '../actions/board.action';
import { BoardsService } from '../../core/services/API/board.service';
import { errorMessageAction } from '../actions/error-message.action';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private boardService: BoardsService) {}

  loadAllBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllBoardsAction),
      tap(() => console.log('Action active')),
      switchMap(() =>
        this.boardService.getAllBoards().pipe(
          map((boards) => {
            if ('title' in boards) return allBoardsLoadedAction({ boards });
            else return errorMessageAction({ errorMessage: 'Could not load boards' });
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
