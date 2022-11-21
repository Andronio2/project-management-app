import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { ProgressBarService } from '../progress-bar.service';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(private progressBar: ProgressBarService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    setTimeout(() => this.progressBar.show());
    return next.handle(req).pipe(
      tap({
        error: () => this.progressBar.hide(),
      }),
      finalize(() => this.progressBar.hide()),
    );
  }
}
