import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/API/auth.service';
import { ISigninUserDto } from 'src/app/share/models/auth.model';
import passwordValidator from '../../validators/passwordValidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  login = new FormControl('', [Validators.required, Validators.minLength(3)]);

  password = new FormControl('', [Validators.required, passwordValidator]);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      login: this.login,
      password: this.password,
    });
  }

  logIn(event: Event) {
    event.preventDefault();
    const userSign: ISigninUserDto = {
      login: this.login.value!,
      password: this.password.value!,
    };
    this.authService.signIn(userSign).subscribe();
  }
}
