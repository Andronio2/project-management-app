import { createAction, props } from '@ngrx/store';

export const errorMessageAction = createAction(
  '[ERROR_MESSAGE] Show error message',
  props<{ errorMessage: string }>(),
);

export const showActionAction = createAction(
  '[ERROR_MESSAGE] Show error',
  props<{ errorMessage: string; errorStatus: number }>(),
);
