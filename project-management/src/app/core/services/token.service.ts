import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from 'src/app/share/constants/constants';

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
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return expiry * 1000 > Date.now();
  }
}
