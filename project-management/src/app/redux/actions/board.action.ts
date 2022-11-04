import { createAction, props } from '@ngrx/store';
import { IBoard } from 'src/app/share/models/board.model';

export const getAllBoardsAction = createAction('[BOARD] Get all boards');
export const allBoardsLoadedAction = createAction(
  '[BOARD] All boards loaded',
  props<{ boards: IBoard[] }>(),
);

export const getBoardAction = createAction('[BOARD] Get board', props<{ boardId: string }>());
