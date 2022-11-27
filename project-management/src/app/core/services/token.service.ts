import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EXP_TIME, TOKEN_KEY } from 'src/app/share/constants/constants';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { IJWTDecode } from 'src/app/share/models/auth.model';
import { Store } from '@ngrx/store';
import { showActionAction } from 'src/app/redux/actions/error-message.action';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router, private store: Store) {}

  public getToken(): string | null {
    const token: string | null = localStorage.getItem(TOKEN_KEY);
    if (token) {
      if (!this.isTokenExpired(token)) {
        return token;
      } else {
        localStorage.removeItem(TOKEN_KEY);
        this.router.navigate(['./welcome']);
      }
    }
    return null;
  }

  public isTokenExpired(token: string): boolean {
    try {
      const decode = jwtDecode<JwtPayload>(token);
      if (decode.iat) {
        const expire = (+decode.iat + EXP_TIME) * 1000;
        return Date.now() > expire;
      }
    } catch {
      this.store.dispatch(
        showActionAction({ errorMessage: 'User unauthorized', errorStatus: 401 }),
      );
    }
    return true;
  }

  public getId(): string | null {
    try {
      const token = this.getToken();
      if (token) {
        const decode = jwtDecode<IJWTDecode>(token);
        return decode.userId;
      }
    } catch {
      showActionAction({ errorMessage: 'Can not get user id from token', errorStatus: 401 });
    }
    return null;
  }

  public deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
