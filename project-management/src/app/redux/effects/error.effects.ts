import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { showActionAction } from '../actions/error-message.action';
import { Store } from '@ngrx/store';
import { ModalService } from 'src/app/core/services/modal.service';

@Injectable()
export class ErrorEffects {
  constructor(
    private actions$: Actions,
    private modalService: ModalService,
    private store: Store,
  ) {}

  onError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(showActionAction),
        tap(({ errorMessage, errorStatus }) => {
          this.modalService.openErrorMod(errorMessage, errorStatus);
        }),
      ),
    { dispatch: false },
  );
}
