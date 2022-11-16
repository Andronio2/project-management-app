import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal.service';
import { BoardActions } from 'src/app/redux/actions/board.action';
import { Selectors } from 'src/app/redux/selectors/board.selectors';
import { BoardLoadedState, ModalType } from 'src/app/share/constants/constants';
import { IBoard } from 'src/app/share/models/board.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ColumnActions } from 'src/app/redux/actions/column.action';
import { UserActions } from 'src/app/redux/actions/users.actions';
import { UserSelectors } from 'src/app/redux/selectors/user.selectors';
import { IUser } from 'src/app/share/models/auth.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  boardId = '';

  board$: Observable<IBoard | undefined> = new Observable();

  destroy$ = new Subject();

  isDragDisable = false;

  users: IUser[] = [];

  selected = 'allUsers';

  selected$ = new Subject<string>();

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
    this.store.dispatch(UserActions.getUsers());
    this.store
      .select(UserSelectors.selectUsers)
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.users = users;
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

  dropColumn(event: CdkDragDrop<IBoard>) {
    console.log(event);
    const columnId = event.item.element.nativeElement.getAttribute('data-col-id')!;
    const order = event.currentIndex + 1;
    this.store
      .select(Selectors.selectColumnById(columnId))
      .pipe(take(1))
      .subscribe((columnInfo) => {
        const title = columnInfo!.title;
        const column = { title, order };
        this.store.dispatch(
          ColumnActions.updateColumnAction({
            boardId: this.boardId,
            columnId,
            column,
          }),
        );
      });
  }

  setDragDisable(isDisable: boolean) {
    this.isDragDisable = isDisable;
  }
}
