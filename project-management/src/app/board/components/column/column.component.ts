import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal.service';
import { ColumnActions } from 'src/app/redux/actions/column.action';
import { TaskActions } from 'src/app/redux/actions/task.action';
import { Selectors } from 'src/app/redux/selectors/board.selectors';
import { selectTaskState } from 'src/app/redux/selectors/mark-task.selectors';
import { ModalType } from 'src/app/share/constants/constants';
import { IUser } from 'src/app/share/models/auth.model';
import { IBoard } from 'src/app/share/models/board.model';
import { IColumn } from 'src/app/share/models/column.model';
import { ITask } from 'src/app/share/models/task.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit, OnDestroy {
  @Input() fromBoard!: {
    column: IColumn;
    boardId: string;
    users: IUser[];
    selected$: Observable<string>;
  };

  @Output() dragDisableEvent = new EventEmitter<boolean>();

  board$ = this.store.select(Selectors.selectBoard);

  columnTitle = '';

  isEditColumnTitle = false;

  selected = 'allUsers';

  taskId$ = new Observable<string>();

  destroy$ = new Subject();

  constructor(private modalService: ModalService, private store: Store) {}

  ngOnInit(): void {
    this.columnTitle = this.fromBoard.column.title;
    this.fromBoard.selected$.pipe(takeUntil(this.destroy$)).subscribe((selected) => {
      this.selected = selected;
    });
    this.taskId$ = this.store.select(selectTaskState);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
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
    this.dragDisableEvent.emit(true);
  }

  editColumn() {
    this.isEditColumnTitle = false;
    this.dragDisableEvent.emit(false);
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

  dropTask(event: CdkDragDrop<IBoard>) {
    const id = event.item.element.nativeElement.id;
    const oldColumnId = event.previousContainer.id;
    const columnId = event.container.id;
    const order = event.currentIndex + 1;
    const boardId = this.fromBoard.boardId;

    this.store
      .select(Selectors.selectTasksById(oldColumnId, id))
      .pipe(take(1))
      .subscribe((taskInfo) => {
        const title = taskInfo!.title;
        const description = taskInfo!.description;
        const userId = taskInfo!.userId;
        const task = {
          title,
          order,
          description,
          userId,
          boardId,
          columnId,
        };
        this.store.dispatch(
          TaskActions.updateTaskAction({
            boardId,
            columnId: oldColumnId,
            taskId: id,
            task,
          }),
        );
      });
  }

  getOtherColumns(columnId: string): string[] {
    let columnList: string[] = [];
    this.board$.pipe(take(1)).subscribe((board) => {
      columnList = board!.columns!.map((column) => column.id);
    });
    return columnList.filter((colId) => colId !== columnId);
  }
}
