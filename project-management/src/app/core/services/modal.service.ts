import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BoardActions } from 'src/app/redux/actions/board.action';
import { ColumnActions } from 'src/app/redux/actions/column.action';
import { UserActions } from 'src/app/redux/actions/users.actions';
import { ModalType } from 'src/app/share/constants/constants';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { CreateModalComponent } from '../components/create-modal/create-modal.component';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { AuthService } from './API/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog, private store: Store, private authService: AuthService) {}

  public openErrorMod(message: string) {
    const dialogRef = this.dialog.open(ErrorModalComponent, {
      data: {
        message,
      },
      width: '295px',
    });
    setTimeout(() => dialogRef.close(), 3000);
  }

  public openCreateMod(type: string, name: string, boardId?: string) {
    this.dialog.open(CreateModalComponent, {
      minWidth: '300px',
      maxWidth: '500px',
      data: {
        name,
        type,
        boardId,
      },
    });
  }

  public openConfirmDelete(type: ModalType, id: string, columnId?: string, taskId?: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: `Delete ${type}`,
        question: `Are you sure you want to delete this ${type}?`,
      },
      width: '295px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        switch (type) {
          case ModalType.USER:
            this.store.dispatch(UserActions.deleteUser({ id }));
            this.authService.logOut();
            break;
          case ModalType.BOARD:
            this.store.dispatch(BoardActions.deleteBoardAction({ id }));
            break;
          case ModalType.COLUMN:
            if (columnId) {
              this.store.dispatch(ColumnActions.deleteColumnAction({ boardId: id, columnId }));
            }
            break;
          default:
            break;
        }
      }
    });
  }
}
