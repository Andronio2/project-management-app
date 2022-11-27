import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL } from 'src/app/share/constants/constants';
import { TokenService } from '../token.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authRegex = /\/(signin|signup)$/gm;
    const headers = {
      ...(!req.url.match(authRegex) && { Authorization: `Bearer ${this.tokenService.getToken()}` }),
    };

    const newReq = req.clone({
      url: `${BASEURL}${req.url}`,
      setHeaders: {
        ...headers,
      },
    });
    return next.handle(newReq);
  }
}
