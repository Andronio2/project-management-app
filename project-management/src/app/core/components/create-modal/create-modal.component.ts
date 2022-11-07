import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBoardModal } from '../../models/modal.model';
import { Store } from '@ngrx/store';
import { BoardActions } from 'src/app/redux/actions/board.action';
import { ColumnActions } from 'src/app/redux/actions/column.action';
import { Selectors } from 'src/app/redux/selectors/board.selectors';
import { UserSelectors } from 'src/app/redux/selectors/user.selectors';
import { UserActions } from 'src/app/redux/actions/users.actions';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent implements OnInit {
  boardForm: FormGroup;

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]);

  description =
    this.data.name !== 'column' &&
    new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]);

  userId = this.data.name === 'task' && new FormControl('', [Validators.required]);

  currBoard$ = this.store.select(Selectors.selectBoard);

  users$ = this.store.select(UserSelectors.selectUsers);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialogRef: MatDialogRef<CreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBoardModal,
  ) {
    this.boardForm = this.fb.group({
      title: this.title,
      ...(this.description && { description: this.description }),
      ...(this.userId && { userId: this.userId }),
    });
  }
  ngOnInit(): void {
    if (this.data.name === 'task') {
      this.store.dispatch(UserActions.getUsers());
    }
  }

  createBoard() {
    switch (this.data.name) {
      case 'board':
        this.store.dispatch(
          BoardActions.createBoardAction({ board: this.boardForm.getRawValue() }),
        );
        break;

      case 'column':
        this.currBoard$.subscribe((currBoard) => {
          if (currBoard) {
            this.store.dispatch(
              ColumnActions.createColumnAction({
                boardId: currBoard.id,
                column: this.boardForm.getRawValue(),
              }),
            );
          }
        });

        break;

      case 'task':
        break;

      default:
        break;
    }
    this.dialogRef.close();
  }

  cancelBoard() {
    this.dialogRef.close();
  }
}
