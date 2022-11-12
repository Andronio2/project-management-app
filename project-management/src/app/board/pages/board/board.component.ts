import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { BoardActions } from 'src/app/redux/actions/board.action';
import { Selectors } from 'src/app/redux/selectors/board.selectors';
import { BoardLoadedState, ModalType } from 'src/app/share/constants/constants';
import { IBoard } from 'src/app/share/models/board.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  boardId = '';

  board$: Observable<IBoard | undefined> = new Observable();

  destroy$ = new Subject();

  constructor(
    private store: Store,
    public route: ActivatedRoute,
    private modalService: ModalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.boardId = params['id'];
      const boardId = this.boardId;
      this.store.dispatch(BoardActions.getBoardAction({ boardId }));
      this.board$ = this.store.select(Selectors.selectBoard);
      this.store
        .select(Selectors.selectBoardLoadedState)
        .pipe(takeUntil(this.destroy$))
        .subscribe((state) => {
          if (state === BoardLoadedState.error) this.router.navigate(['/error']);
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  createColumn() {
    this.modalService.openCreateMod(ModalType.CREATE, ModalType.COLUMN, this.boardId);
  }

  goToMainPage() {
    this.router.navigate(['/main']);
  }

  dropTask(event: CdkDragDrop<IBoard>) {
    console.log('taskEvent ', event);
    (window as any).eee = event;
    (window as any).qqq = event.container.data;
    // if (event.container === event.previousContainer) {
    //   moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    // }
    // console.log(this.list);
  }

  dropColumn(event: CdkDragDrop<IBoard>) {
    console.log('ColumnEvent', event);
    (window as any).eee = event;
    (window as any).qqq = event.container.data;
    // if (event.container === event.previousContainer) {
    //   moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    // }
    // console.log(this.list);
  }

  getOtherColumns(columnId: string): string[] {
    let columnList: string[] = [];
    this.board$.pipe(take(1)).subscribe((board) => {
      columnList = board!.columns!.map((column) => column.id);
    });
    return columnList.filter((colId) => colId !== columnId);
  }
}
