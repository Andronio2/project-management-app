import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
export class BoardsListComponent implements OnInit {
  boards$: Observable<IBoard[]> = new Observable();

  searchValue = '';

  constructor(private store: Store, private modalService: ModalService) {}

  ngOnInit(): void {
    this.store.dispatch(BoardActions.getAllBoardsAction());
    this.boards$ = this.store.select(Selectors.selectBoards);
  }

  deleteBoard(id: string) {
    this.modalService.openConfirmDelete(ModalType.BOARD, id);
  }

  createBoard() {
    this.modalService.openCreateMod(ModalType.CREATE, ModalType.BOARD);
  }
}
