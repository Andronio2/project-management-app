import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      login: this.login,
      password: this.password,
    });
  }
}
