import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from '../create-board/create-board.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  public openCreateMod() {
    this.dialog.open(CreateBoardComponent, {
      minWidth: '300px',
      maxWidth: '500px',
    });
  }
}
