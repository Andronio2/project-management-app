import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllBoardsAction } from 'src/app/redux/actions/board.action';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getAllBoardsAction());
  }
}
