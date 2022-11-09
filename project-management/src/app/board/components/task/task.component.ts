import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalType } from 'src/app/share/constants/constants';
import { IColumn } from 'src/app/share/models/column.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() boardColumn!: {
    boardId: string;
    column: IColumn;
  };

  constructor(private modalService: ModalService) {}

  deleteTask(id: string) {
    this.modalService.openConfirmDelete(
      ModalType.TASK,
      this.boardColumn.boardId,
      this.boardColumn.column.id,
      id,
    );
  }

  editTask(id: string) {
    this.modalService.openCreateMod(
      ModalType.UPDATE,
      ModalType.TASK,
      this.boardColumn.boardId,
      this.boardColumn.column.id,
      id,
    );
  }
}
