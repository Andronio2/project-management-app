import { createReducer, on } from '@ngrx/store';
import { BoardActions } from '../actions/board.action';
import { ColumnActions } from '../actions/column.action';
import { TaskActions } from '../actions/task.action';
import { IBoardState } from '../state.model';

export const initialState: IBoardState = {
  allBoards: [],
};

export const boardReducer = createReducer(
  initialState,
  on(
    BoardActions.allBoardsLoadedAction,
    (state, { boards }): IBoardState => ({
      ...state,
      allBoards: boards,
    }),
  ),
  on(
    BoardActions.boardLoadedAction,
    (state, { board }): IBoardState => ({
      ...state,
      currBoard: board,
    }),
  ),
  on(
    ColumnActions.allColumnsLoadedAction,
    (state, { columns }): IBoardState => ({
      ...state,
      currBoard: { ...state.currBoard!, columns },
    }),
  ),
  on(
    ColumnActions.columnLoadedAction,
    (state, { columnId, column }): IBoardState => ({
      ...state,
      currBoard: {
        ...state.currBoard!,
        columns: state.currBoard?.columns
          ? [column]
          : state.currBoard!.columns?.map((col) => (col.id === columnId ? column : col)),
      },
    }),
  ),
  on(TaskActions.allTasksLoadedAction, (state, { columnId, tasks }): IBoardState => {
    const currBoard = state.currBoard!;
    const columns = currBoard.columns!.map((col) =>
      col.id !== columnId ? col : { ...col, tasks },
    );
    const newState = {
      ...state,
      currBoard: {
        ...currBoard,
        columns,
      },
    };
    return newState;
  }),
  on(TaskActions.taskLoadedAction, (state, { columnId, taskId, task }): IBoardState => {
    const currBoard = state.currBoard!;
    const columns = currBoard.columns!.map((col) => {
      if (col.id !== columnId) return col;
      else {
        const newTasks = col.tasks?.map((tsk) => (tsk.id === taskId ? task : tsk));
        return {
          ...col,
          tasks: newTasks,
        };
      }
    });
    const newState = {
      ...state,
      currBoard: {
        ...currBoard,
        columns,
      },
    };
    return newState;
  }),
);
