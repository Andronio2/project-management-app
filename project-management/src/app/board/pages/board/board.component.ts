import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { BoardActions } from 'src/app/redux/actions/board.action';
import { ColumnActions } from 'src/app/redux/actions/column.action';
import { TaskActions } from 'src/app/redux/actions/task.action';
import { Selectors } from 'src/app/redux/selectors/board.selectors';
import { ModalType } from 'src/app/share/constants/constants';
import { IBoard } from 'src/app/share/models/board.model';
import { IColumn } from 'src/app/share/models/column.model';
import { ITask } from 'src/app/share/models/task.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  boardId = '';

  columnId = '';

  board$: Observable<IBoard | undefined> = new Observable();

  columns$: Observable<IColumn[] | undefined> = new Observable();

  tasks$: Observable<ITask[] | undefined> = new Observable();

  destroy$ = new Subject();

  constructor(
    private store: Store,
    public route: ActivatedRoute,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.boardId = params['id'];
      const boardId = this.boardId;
      this.store.dispatch(BoardActions.getBoardAction({ boardId }));
      this.board$ = this.store.select(Selectors.selectBoard);
      this.store.dispatch(ColumnActions.getAllColumnsAction({ boardId }));
      this.columns$ = this.store.select(Selectors.selectColumns)

      this.columns$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        value?.forEach((item) => {
          this.store.dispatch(TaskActions.getAllTasksAction({ boardId, item.id }));
          this.tasks$ = this.store.select(Selectors.selectColumns);
          console.log(item)
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  createColumn() {
    this.modalService.openCreateMod(ModalType.CREATE, ModalType.COLUMN);
  }

  createTask() {
    this.modalService.openCreateMod(ModalType.CREATE, ModalType.TASK);
  }
}
