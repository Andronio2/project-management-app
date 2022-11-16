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
  on(ColumnActions.updateColumnAction, (state, { columnId, column }): IBoard => {
    const newOrder = column.order;
    let oldOrder = 0;
    let columns = state!.columns!.map((col) => {
      if (col.id === columnId) {
        oldOrder = col.order;
        return { ...col, title: column.title };
      } else return col;
    });
    if (oldOrder !== newOrder) {
      // if old & new order are not match, then do reorder
      if (oldOrder < newOrder) {
        columns = columns.map((col) => {
          if (col.order === oldOrder) return { ...col, order: newOrder };
          return col.order > oldOrder && col.order <= newOrder
            ? { ...col, order: col.order - 1 }
            : col;
        });
      } else {
        columns = columns.map((col) => {
          if (col.order === oldOrder) return { ...col, order: newOrder };
          return col.order >= newOrder && col.order < oldOrder
            ? { ...col, order: col.order + 1 }
            : col;
        });
      }
    }
    return {
      ...state!,
      columns,
    };
  }),
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
