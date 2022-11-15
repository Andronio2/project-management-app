import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserSelectors } from 'src/app/redux/selectors/user.selectors';
import { ModalType } from 'src/app/share/constants/constants';
import { IUser } from 'src/app/share/models/auth.model';
import { IColumn } from 'src/app/share/models/column.model';
import { ITask } from 'src/app/share/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input() fromColumn!: {
    boardId: string;
    column: IColumn;
    task: ITask;
  };

  user: IUser | undefined;

  destroy$ = new Subject();

  constructor(private modalService: ModalService, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(UserSelectors.selectUsers)
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.user = users.find((user) => user.id === this.fromColumn.task.userId);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  deleteTask(e: Event, id: string) {
    e.stopPropagation();
    this.modalService.openConfirmDelete(
      ModalType.TASK,
      this.fromColumn.boardId,
      this.fromColumn.column.id,
      id,
    );
  }

  clickBoardMenu(e: Event) {
    e.stopPropagation();
  }
}
