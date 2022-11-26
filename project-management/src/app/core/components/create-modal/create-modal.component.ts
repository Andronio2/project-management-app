import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { debounceTime, Subject, take, takeUntil } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { ITaskCreateDto } from 'src/app/share/models/task.model';
import { IBoardDto } from 'src/app/share/models/board.model';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent implements OnInit, OnDestroy {
  type: string = `${this.translocoService.translate(
    `authAndModal.modalQuestion.${this.data.type}`,
  )}`;

  name: string = `${this.translocoService.translate(
    `authAndModal.modalQuestion.${this.data.name}`,
  )}`;

  boardForm: FormGroup;

  updateData = {
    title: '',
    description: '',
    userId: '',
    order: 0,
  };

  title = new FormControl(this.updateData.title, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]);

  description =
    this.data.name !== 'column' &&
    new FormControl(this.updateData.description, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]);

  userId =
    this.data.name === 'task' && new FormControl(this.updateData.userId, [Validators.required]);

  currBoard$ = this.store.select(Selectors.selectBoard);

  allBoards$ = this.store.select(Selectors.selectBoards);

  users$ = this.store.select(UserSelectors.selectUsers);

  destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialogRef: MatDialogRef<CreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBoardModal,
    private translocoService: TranslocoService,
  ) {
    this.currBoard$.pipe(take(1)).subscribe((board) => {
      if (this.data.type === ModalType.UPDATE && board) {
        switch (this.data.name) {
          case ModalType.COLUMN:
            const col = board.columns!.find((column) => column.id === this.data.columnId)!;
            this.updateData.title = col.title;
            this.updateData.order = col.order;
            break;
          case ModalType.TASK:
            const tsk = board
              .columns!.find((column) => column.id === this.data.columnId)!
              .tasks!.find((task) => task.id === this.data.taskId)!;
            this.updateData.title = tsk.title;
            this.updateData.description = tsk.description;
            this.updateData.order = tsk.order;
            this.updateData.userId = tsk.userId;
            break;
          default:
            break;
        }
      }
    });
    this.allBoards$.pipe(take(1)).subscribe((boards) => {
      if (this.data.type === ModalType.UPDATE && this.data.name === ModalType.BOARD) {
        const brd = boards.find((board) => board.id === this.data.boardId)!;
        this.updateData.title = brd.title;
        this.updateData.description = brd.description;
      }
    });
    this.boardForm = this.fb.group({
      title: this.title,
      ...(this.description && { description: this.description }),
      ...(this.userId && { userId: this.userId }),
      ...(this.data.type === ModalType.UPDATE &&
        this.data.name !== ModalType.BOARD && { order: this.updateData.order }),
    });
  }
  ngOnInit(): void {
    if (this.data.name === 'task') {
      this.store.dispatch(UserActions.getUsers());
    }
    this.title.setValue(this.updateData.title);
    if (this.description) {
      this.description.setValue(this.updateData.description);
    }
    if (this.userId) {
      this.userId.setValue(this.updateData.userId);
    }

    const controls = [this.title];
    if (this.description) {
      controls.push(this.description);
    }

    controls.forEach((control) => {
      control?.valueChanges
        .pipe(takeUntil(this.destroy$), debounceTime(300))
        .subscribe((change) => {
          if (change === null) {
            return;
          }
          const trimmed = change.trim();
          if (!trimmed.length) {
            control.setValue('');
          }
        });
    });
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
          const newData: IBoardDto = this.boardForm.getRawValue();
          if (
            newData.title !== this.updateData.title ||
            newData.description !== this.updateData.description
          ) {
            this.store.dispatch(
              BoardActions.updateBoardAction({
                id: this.data.boardId,
                board: this.boardForm.getRawValue(),
              }),
            );
          }
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
          const newData: ITaskCreateDto = this.boardForm.getRawValue();
          if (
            newData.title !== this.updateData.title ||
            newData.description !== this.updateData.description ||
            newData.userId !== this.updateData.userId
          ) {
            this.store.dispatch(
              TaskActions.updateTaskAction({
                boardId: this.data.boardId,
                columnId: this.data.columnId,
                taskId: this.data.taskId,
                task: {
                  ...this.updateData,
                  ...newData,
                  boardId: this.data.boardId,
                  columnId: this.data.columnId,
                },
              }),
            );
          }
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
