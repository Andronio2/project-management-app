import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/API/auth.service';
import { ISigninUserDto } from 'src/app/share/models/auth.model';
import passwordValidator from '../../validators/passwordValidator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);

  login = new FormControl('', [Validators.required, Validators.minLength(3)]);

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
    this.authService
      .signUp(this.registerForm.getRawValue())
      .pipe(
        tap((value) => {
          if ('login' in value) {
            const userSign: ISigninUserDto = {
              login: value.login,
              password: this.password.value!,
            };
            this.authService.signIn(userSign).subscribe();
          }
        }),
      )
      .subscribe();
  }
}
