import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/API/auth.service';
import { ICreateUserDto, ISigninUserDto } from 'src/app/share/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  logIn(formData: ISigninUserDto | ICreateUserDto) {
    this.authService.signIn(formData).subscribe();
  }
}
