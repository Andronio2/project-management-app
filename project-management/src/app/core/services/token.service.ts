import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EXP_TIME, TOKEN_KEY } from 'src/app/share/constants/constants';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router) {}

  public getToken(): string | null {
    const token: string | null = localStorage.getItem(TOKEN_KEY);
    if (token) {
      if (this.isTokenExpired(token)) {
        return token;
      } else {
        localStorage.removeItem(TOKEN_KEY);
        this.router.navigate(['./welcome']);
      }
    }
    return null;
  }

  public isTokenExpired(token: string): boolean {
    const decode: { iat: string } = jwtDecode(token);
    const expire = (+decode.iat + EXP_TIME) * 1000;
    return expire > +new Date();
  }
}
