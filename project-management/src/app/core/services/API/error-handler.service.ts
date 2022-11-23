import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { showActionAction } from 'src/app/redux/actions/error-message.action';
import { IErrorResponse } from 'src/app/share/models/error-message.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private store: Store) {}

  public errorHandler(this: ErrorHandlerService, ...args: any[]): Observable<IErrorResponse> {
    const error = args[0];
    const message = error.error.message ? error.error.message : error.message;
    const errorStatus = error.error.status ? error.error.status : error.status;

    this.store.dispatch(showActionAction({ errorMessage: message, errorStatus }));
    return of({
      statusCode: error.status,
      message,
    });
  }
}
