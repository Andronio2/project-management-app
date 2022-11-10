import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalService } from 'src/app/core/services/modal.service';
import { ColumnActions } from 'src/app/redux/actions/column.action';
import { ModalType } from 'src/app/share/constants/constants';
import { IColumn } from 'src/app/share/models/column.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() fromBoard!: {
    column: IColumn;
    boardId: string;
  };

  columnTitle = '';

  isEditColumnTitle = false;

  constructor(private modalService: ModalService, private store: Store) {}

  ngOnInit(): void {
    this.columnTitle = this.fromBoard.column.title;
  }

  deleteColumn(id: string) {
    this.modalService.openConfirmDelete(ModalType.COLUMN, this.fromBoard.boardId, id);
  }

  createTask(columnId: string) {
    this.modalService.openCreateMod(
      ModalType.CREATE,
      ModalType.TASK,
      this.fromBoard.boardId,
      columnId,
    );
  }

  setEditMode() {
    this.isEditColumnTitle = true;
  }

  editColumn() {
    this.isEditColumnTitle = false;
    this.store.dispatch(
      ColumnActions.updateColumnAction({
        boardId: this.fromBoard.boardId,
        columnId: this.fromBoard.column.id,
        column: {
          title: this.columnTitle,
          order: this.fromBoard.column.order,
        },
      }),
    );
  }

  editTask(id: string) {
    this.modalService.openCreateMod(
      ModalType.UPDATE,
      ModalType.TASK,
      this.fromBoard.boardId,
      this.fromBoard.column.id,
      id,
    );
  }
}
