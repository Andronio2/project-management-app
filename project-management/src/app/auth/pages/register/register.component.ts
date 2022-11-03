import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import passwordValidator from '../../validators/passwordValidator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  name = new FormControl('', [Validators.required]);

  login = new FormControl('', [Validators.required]);

  password = new FormControl('', [Validators.required, passwordValidator]);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: this.name,
      login: this.login,
      password: this.password,
    });
  }
}
