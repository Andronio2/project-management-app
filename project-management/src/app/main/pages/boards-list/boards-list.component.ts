import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { BoardActions } from 'src/app/redux/actions/board.action';
import { Selectors } from 'src/app/redux/selectors/board.selectors';
import { IBoard } from 'src/app/share/models/board.model';
import { ModalType } from 'src/app/share/constants/constants';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  boards: IBoard[] = [];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(BoardActions.getAllBoardsAction());
    this.store
      .select(Selectors.selectBoards)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.boards = value;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  deleteBoard(id: string) {
    this.store.dispatch(BoardActions.deleteBoardAction({ id }));
  }

  createBoard() {
    this.modalService.openCreateMod(ModalType.CREATE, ModalType.BOARD);
  }
}
