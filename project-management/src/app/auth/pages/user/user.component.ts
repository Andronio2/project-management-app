import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import UserActions from 'src/app/redux/actions/users.actions';
import { IUser } from 'src/app/share/models/auth.model';
import { TokenService } from 'src/app/core/services/token.service';
import Selectors from 'src/app/redux/selectors/app.selectors';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import passwordValidator from '../../validators/passwordValidator';
import { UserService } from 'src/app/core/services/API/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isEditMode: boolean = false;

  user$: Observable<IUser | undefined> = this.store.select(Selectors.selectUser);

  userId: string | null;

  editForm: FormGroup;

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);

  login = new FormControl('', [Validators.required, Validators.minLength(3)]);

  password = new FormControl('', [Validators.required, passwordValidator]);

  constructor(
    private store: Store,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    this.userId = this.tokenService.getId();
    this.editForm = this.fb.group({
      name: this.name,
      login: this.login,
      password: this.password,
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    if (this.userId) {
      const id = this.userId;
      this.store.dispatch(UserActions.getUser({ id }));
    }
  }

  public onSubmit() {
    if (this.userId) {
      this.store.dispatch(
        UserActions.updateUser({
          id: this.userId,
          user: this.editForm.getRawValue(),
        }),
      );
      this.toggleEdit();
    }
  }

  public toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }
}
