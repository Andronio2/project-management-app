import { createReducer, on } from '@ngrx/store';
import { IBoard } from 'src/app/share/models/board.model';
import { ITask } from 'src/app/share/models/task.model';
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
  on(
    ColumnActions.deleteColumnAction,
    (state, { columnId }): IBoard => ({
      ...state!,
      columns: state!.columns!.filter((col) => col.id !== columnId),
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
  on(TaskActions.deleteTaskAction, (state, { columnId, taskId }): IBoard => {
    const columns = state!.columns!.map((col) => {
      if (col.id !== columnId) return col;
      else {
        const newTasks = col.tasks!.filter((tsk) => tsk.id !== taskId);
        return {
          ...col,
          tasks: newTasks,
        };
      }
    });
    return { ...state!, columns };
  }),
  on(TaskActions.updateTaskAction, (state, { columnId, taskId, task }): IBoard => {
    const oldColumn = state!.columns!.find((col) => col.id === columnId)!;
    const oldTask = oldColumn.tasks!.find((tsk) => tsk.id === taskId)!;
    if (task.columnId === columnId) {
      // if same column, then siply update task
      const columns = state!.columns!.map((col) => {
        if (col.id !== columnId) return col;
        else {
          let newTasks: ITask[] | undefined;
          if (task.order > oldTask.order) {
            newTasks = col.tasks?.map((tsk) => {
              if (tsk.id === taskId) return { ...tsk, ...task };
              if (tsk.order > oldTask.order && tsk.order <= task.order)
                return { ...tsk, order: tsk.order - 1 };
              else return tsk;
            });
          } else {
            newTasks = col.tasks?.map((tsk) => {
              if (tsk.id === taskId) return { ...tsk, ...task };
              if (tsk.order >= task.order && tsk.order < oldTask.order)
                return { ...tsk, order: tsk.order + 1 };
              else return tsk;
            });
          }
          return {
            ...col,
            tasks: newTasks,
          };
        }
      });
      return { ...state!, columns };
    } else {
      // move to another column
      const columns = state!.columns!.map((col) => {
        if (col.id === task.columnId) {
          // add task to new column
          const newTasks =
            col.tasks?.map((tsk) => {
              if (tsk.order < task.order) return tsk;
              else
                return {
                  ...tsk,
                  order: tsk.order + 1,
                };
            }) || [];
          newTasks.push({ ...oldTask, ...task });
          return {
            ...col,
            tasks: newTasks,
          };
        } else if (col.id === columnId) {
          // delete from old column
          const newTasks = col.tasks!.filter((tsk) => tsk.id !== taskId);
          return {
            ...col,
            tasks: newTasks,
          };
        } else return col;
      });
      return {
        ...state!,
        columns,
      };
    }
  }),
);
