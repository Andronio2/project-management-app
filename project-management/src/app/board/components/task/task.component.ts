import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalType } from 'src/app/share/constants/constants';
import { IColumn } from 'src/app/share/models/column.model';
import { ITask } from 'src/app/share/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() fromColumn!: {
    boardId: string;
    column: IColumn;
    task: ITask;
  };

  constructor(private modalService: ModalService) {}

  deleteTask(e: Event, id: string) {
    e.stopPropagation();
    this.modalService.openConfirmDelete(
      ModalType.TASK,
      this.fromColumn.boardId,
      this.fromColumn.column.id,
      id,
    );
  }
}
