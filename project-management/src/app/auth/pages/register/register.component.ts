import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/redux/actions/users.actions';
import { ICreateUserDto, ISigninUserDto } from 'src/app/share/models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private store: Store) {}

  onSubmit(formData: ICreateUserDto | ISigninUserDto) {
    this.store.dispatch(UserActions.SignUp({ user: formData as ICreateUserDto }));
  }
}
