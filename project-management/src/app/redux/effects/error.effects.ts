import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin, Observable, of, tap, take } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { BoardActions } from '../actions/board.action';
import { BoardsService } from '../../core/services/API/board.service';
import {
  errorMessageAction,
  errorMessageShowedAction,
  showActionAction,
} from '../actions/error-message.action';
import { IBoard } from 'src/app/share/models/board.model';
import { Store } from '@ngrx/store';
import { ModalService } from 'src/app/core/services/modal.service';

@Injectable()
export class ErrorEffects {
  constructor(
    private actions$: Actions,
    private modalService: ModalService,
    private store: Store,
  ) {}

  onError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showActionAction),
      map(({ errorMessage, errorStatus }) => {
        this.modalService.openErrorMod(errorMessage, errorStatus);
        return errorMessageShowedAction();
      }),
    ),
  );
}
