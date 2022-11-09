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
import { TaskActions } from 'src/app/redux/actions/task.action';
import { ModalType } from 'src/app/share/constants/constants';

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
        if (this.data.type === ModalType.CREATE) {
          this.store.dispatch(
            BoardActions.createBoardAction({ board: this.boardForm.getRawValue() }),
          );
        }
        if (this.data.type === ModalType.UPDATE) {
          this.store.dispatch(
            BoardActions.updateBoardAction({
              id: this.data.boardId,
              board: this.boardForm.getRawValue(),
            }),
          );
        }
        break;

      case 'column':
        if (this.data.type === ModalType.CREATE) {
          this.store.dispatch(
            ColumnActions.createColumnAction({
              boardId: this.data.boardId,
              column: this.boardForm.getRawValue(),
            }),
          );
        }
        if (this.data.type === ModalType.UPDATE) {
          this.store.dispatch(
            ColumnActions.updateColumnAction({
              boardId: this.data.boardId,
              columnId: this.data.columnId,
              column: this.boardForm.getRawValue(),
            }),
          );
        }
        break;

      case 'task':
        if (this.data.type === ModalType.CREATE) {
          this.store.dispatch(
            TaskActions.createTaskAction({
              boardId: this.data.boardId,
              columnId: this.data.columnId,
              task: this.boardForm.getRawValue(),
            }),
          );
        }
        if (this.data.type === ModalType.UPDATE) {
          this.store.dispatch(
            TaskActions.updateTaskAction({
              boardId: this.data.boardId,
              columnId: this.data.columnId,
              taskId: this.data.taskId,
              task: this.boardForm.getRawValue(),
            }),
          );
        }
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
