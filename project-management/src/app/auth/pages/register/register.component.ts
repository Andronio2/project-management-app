import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/API/auth.service';
import { ICreateUserDto, ISigninUserDto } from 'src/app/share/models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  onSubmit(formData: ICreateUserDto | ISigninUserDto) {
    this.authService.signUp(formData as ICreateUserDto).subscribe((value) => {
      if ('login' in value) {
        const userSign: ISigninUserDto = {
          login: value.login,
          password: formData.password,
        };
        this.authService.signIn(userSign).subscribe();
      }
    });
  }
}
