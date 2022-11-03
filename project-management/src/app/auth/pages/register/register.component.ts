import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/API/auth.service';
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

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: this.name,
      login: this.login,
      password: this.password,
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.authService.signUp(this.registerForm.getRawValue()).subscribe();
  }
}
