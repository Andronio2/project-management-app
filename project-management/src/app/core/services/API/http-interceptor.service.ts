import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL } from 'src/app/share/constants/constants';
import { AuthService } from './auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      url: `${BASEURL}${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
    });
    return next.handle(newReq);
  }
}
