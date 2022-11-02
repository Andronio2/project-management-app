import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { errorMessageAction } from 'src/app/redux/actions/error-message.action';
import { IErrorResponse } from 'src/app/share/models/error-message.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private store: Store) {}

  public errorHandler(this: ErrorHandlerService, ...args: any[]): Observable<IErrorResponse> {
    const error = args[0];
    const message = error.error.message ? error.error.message : error.message;
    this.store.dispatch(errorMessageAction(message));
    return of({
      statusCode: error.status,
      message,
    });
  }
}
