import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { UserActions } from 'src/app/redux/actions/users.actions';
import { IUser } from 'src/app/share/models/auth.model';
import { TokenService } from 'src/app/core/services/token.service';
import { UserSelectors } from 'src/app/redux/selectors/user.selectors';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import passwordValidator from '../../validators/passwordValidator';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalType } from 'src/app/share/constants/constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isEditMode: boolean = false;

  user$: Observable<IUser | undefined> = this.store.select(UserSelectors.selectUser).pipe(
    tap((user) => {
      if (user) {
        this.login.setValue(user.login);
        this.name.setValue(user.name);
      }
    }),
  );

  userId: string | null;

  editForm: FormGroup;

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]);

  login = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]);

  password = new FormControl('', [Validators.required, passwordValidator]);

  constructor(
    private store: Store,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private modalService: ModalService,
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

  public toggleEdit(event?: Event) {
    event?.preventDefault();
    this.isEditMode = !this.isEditMode;
  }

  public openDialog(event: Event) {
    event.preventDefault();
    if (this.userId) {
      this.modalService.openConfirmDelete(ModalType.USER, this.userId);
    }
  }
}
