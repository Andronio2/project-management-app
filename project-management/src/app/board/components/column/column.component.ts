import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalType } from 'src/app/share/constants/constants';
import { IBoard } from 'src/app/share/models/board.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() board!: {
    board$: Observable<IBoard | undefined>;
    boardId: string;
  };

  columnTitle = '';

  isEditColumnTitle = false;

  constructor(private modalService: ModalService) {}

  deleteColumn(id: string) {
    this.modalService.openConfirmDelete(ModalType.COLUMN, this.board.boardId, id);
  }

  createTask(columnId: string) {
    this.modalService.openCreateMod(ModalType.CREATE, ModalType.TASK, this.board.boardId, columnId);
  }

  setEditMode() {
    this.isEditColumnTitle = true;
  }
}
