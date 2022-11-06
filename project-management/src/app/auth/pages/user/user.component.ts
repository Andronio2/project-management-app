import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserActions } from 'src/app/redux/actions/users.actions';
import { IUser } from 'src/app/share/models/auth.model';
import { TokenService } from 'src/app/core/services/token.service';
import { UserSelectors } from 'src/app/redux/selectors/user.selectors';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import passwordValidator from '../../validators/passwordValidator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../../core/components/confirm-modal/confirm-modal.component';
import { AuthService } from 'src/app/core/services/API/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isEditMode: boolean = false;

  user$: Observable<IUser | undefined> = this.store.select(UserSelectors.selectUser);

  userId: string | null;

  editForm: FormGroup;

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);

  login = new FormControl('', [Validators.required, Validators.minLength(3)]);

  password = new FormControl('', [Validators.required, passwordValidator]);

  constructor(
    private store: Store,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
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
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Delete profile',
        question: 'Are you sure you want to delete profile?',
      },
      width: '295px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && this.userId) {
        this.store.dispatch(UserActions.deleteUser({ id: this.userId }));
        this.authService.logOut();
      }
    });
  }
}
