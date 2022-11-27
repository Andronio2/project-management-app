import { createReducer, on } from '@ngrx/store';
import { setTaskByIdAction } from '../actions/mark-task.action';

const initialState: string = '';

export const markTaskReducer = createReducer(
  initialState,
  on(setTaskByIdAction, (state, { taskId }) => taskId),
);
