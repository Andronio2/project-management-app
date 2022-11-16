import { createReducer, on } from '@ngrx/store';
import { IBoard } from 'src/app/share/models/board.model';
import { BoardActions } from '../actions/board.action';
import { ColumnActions } from '../actions/column.action';
import { TaskActions } from '../actions/task.action';

export const initialState: IBoard | undefined = undefined;

export const currBoardReducer = createReducer(
  initialState as IBoard | undefined,
  on(BoardActions.boardLoadedAction, (state, { board }): IBoard => board),
  on(
    ColumnActions.allColumnsLoadedAction,
    (state, { columns }): IBoard => ({
      ...state!,
      columns,
    }),
  ),
  on(
    ColumnActions.columnLoadedAction,
    (state, { columnId, column }): IBoard => ({
      ...state!,
      columns: state?.columns
        ? [column]
        : state?.columns?.map((col) => (col.id === columnId ? column : col)),
    }),
  ),
  on(TaskActions.allTasksLoadedAction, (state, { columnId, tasks }): IBoard => {
    const columns = state!.columns!.map((col) => (col.id !== columnId ? col : { ...col, tasks }));
    return { ...state!, columns };
  }),
  on(TaskActions.taskLoadedAction, (state, { columnId, taskId, task }): IBoard => {
    const columns = state!.columns!.map((col) => {
      if (col.id !== columnId) return col;
      else {
        const newTasks = col.tasks?.map((tsk) => (tsk.id === taskId ? task : tsk));
        return {
          ...col,
          tasks: newTasks,
        };
      }
    });
    return { ...state!, columns };
  }),
);
