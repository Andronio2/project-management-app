import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { BoardActions } from 'src/app/redux/actions/board.action';
import { Selectors } from 'src/app/redux/selectors/board.selectors';
import { IBoard } from 'src/app/share/models/board.model';
import { ModalType } from 'src/app/share/constants/constants';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ITask } from 'src/app/share/models/task.model';
import { IColumn } from 'src/app/share/models/column.model';
import { UserActions } from 'src/app/redux/actions/users.actions';
import { UserSelectors } from 'src/app/redux/selectors/user.selectors';
import { IUser } from 'src/app/share/models/auth.model';
import { setTaskByIdAction } from 'src/app/redux/actions/mark-task.action';
import { MatMenuTrigger } from '@angular/material/menu';

interface ISearchOption {
  task: ITask;
  board: IBoard;
  column: IColumn;
}

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit, OnDestroy {
  boards$ = new Observable<IBoard[]>();

  destroy$ = new Subject();

  myControl = new FormControl<string | ISearchOption>('');
  options: ISearchOption[] = [];
  filteredOptions$!: Observable<ISearchOption[]>;

  user: IUser | undefined;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(private store: Store, private modalService: ModalService, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUsers());
    this.store.dispatch(BoardActions.getAllBoardsAction());
    this.boards$ = this.store.select(Selectors.selectBoards);
    this.boards$.pipe(takeUntil(this.destroy$)).subscribe((boards) => {
      this.options = [];
      boards.forEach((board) => {
        board.columns?.forEach((column) => {
          column.tasks?.forEach((task) => {
            this.options.push({ task, board, column });
          });
        });
      });
    });
    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const title = typeof value === 'string' ? value : value?.task.title;
        return title ? this._filter(title as string) : this.options.slice();
      }),
    );
    this.store.dispatch(setTaskByIdAction({ taskId: '' }));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  displayFn(task: ITask): string {
    return task && task.title ? task.title : '';
  }

  private _filter(title: string) {
    const filterValue = title.toLowerCase();
    return this.options.filter((option) => {
      this.store
        .select(UserSelectors.selectUsers)
        .pipe(takeUntil(this.destroy$))
        .subscribe((users) => {
          this.user = users.find((user) => user.id === option.task.userId);
        });
      return (
        option.task.title.toLowerCase().includes(filterValue) ||
        option.task.description.toLowerCase().includes(filterValue) ||
        option.task.id.toLowerCase().includes(filterValue) ||
        this.user?.login.toLowerCase().includes(filterValue)
      );
    });
  }

  editBoard(e: Event, id: string) {
    this.trigger.closeMenu();
    this.modalService.openCreateMod(ModalType.UPDATE, ModalType.BOARD, id);
  }

  deleteBoard(e: Event, id: string) {
    this.modalService.openConfirmDelete(ModalType.BOARD, id);
  }

  createBoard() {
    this.modalService.openCreateMod(ModalType.CREATE, ModalType.BOARD);
  }

  saveTaskIdToStore(boardId: string, taskId: string) {
    this.store.dispatch(setTaskByIdAction({ taskId }));
    setTimeout(() => this.store.dispatch(setTaskByIdAction({ taskId: '' })), 5000);
    this.goToBoardPage(boardId);
  }

  goToBoardPage(boardId: string) {
    this.router.navigate(['/board', boardId]);
  }

  clickBoardMenu(e: Event) {
    e.stopPropagation();
  }
}
