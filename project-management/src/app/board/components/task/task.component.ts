import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalType } from 'src/app/share/constants/constants';
import { IUser } from 'src/app/share/models/auth.model';
import { IColumn } from 'src/app/share/models/column.model';
import { ITask } from 'src/app/share/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() fromColumn!: {
    boardId: string;
    column: IColumn;
    task: ITask;
    users: IUser[];
  };

  user: IUser | undefined;

  destroy$ = new Subject();

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.user = this.fromColumn.users.find((user) => user.id === this.fromColumn.task.userId);
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
