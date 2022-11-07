import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/redux/actions/users.actions';
import { ICreateUserDto, ISigninUserDto } from 'src/app/share/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private store: Store) {}

  logIn(formData: ISigninUserDto | ICreateUserDto) {
    this.store.dispatch(UserActions.SignIn({ user: formData }));
  }
}
