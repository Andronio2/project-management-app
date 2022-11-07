import { createAction, props } from '@ngrx/store';
import { ITask, ITaskCreateDto, ITaskUpdateDto } from 'src/app/share/models/task.model';

export namespace TaskActions {
  export const getAllTasksAction = createAction(
    '[TASK] Get all tasks',
    props<{ boardId: string; columnId: string }>(),
  );
  export const allTasksLoadedAction = createAction(
    '[TASK] All tasks loaded',
    props<{ columnId: string; tasks: ITask[] }>(),
  );

  export const getTaskByIdAction = createAction(
    '[TASK] Get task by id',
    props<{ boardId: string; columnId: string; taskId: string }>(),
  );
  export const taskLoadedAction = createAction(
    '[TASK] Task loaded',
    props<{ columnId: string; taskId: string; task: ITask }>(),
  );

  export const createTaskAction = createAction(
    '[TASK] Create new task',
    props<{ boardId: string; columnId: string; task: ITaskCreateDto }>(),
  );

  export const deleteTaskAction = createAction(
    '[TASK] Delete task',
    props<{ boardId: string; columnId: string; taskId: string }>(),
  );

  export const updateTaskAction = createAction(
    '[TASK] Update task',
    props<{ boardId: string; columnId: string; taskId: string; task: ITaskUpdateDto }>(),
  );
}
