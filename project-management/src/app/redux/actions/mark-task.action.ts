import { createAction, props } from '@ngrx/store';

export const setTaskByIdAction = createAction(
  '[MARK_TASK] Set task by id',
  props<{ taskId: string }>(),
);
