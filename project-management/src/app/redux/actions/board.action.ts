import { createAction, props } from '@ngrx/store';
import { IBoard, IBoardDto } from 'src/app/share/models/board.model';

export const getAllBoardsAction = createAction('[BOARD] Get all boards');
export const allBoardsLoadedAction = createAction(
  '[BOARD] All boards loaded',
  props<{ boards: IBoard[] }>(),
);

export const getBoardAction = createAction('[BOARD] Get board', props<{ boardId: string }>());
export const boardLoadedAction = createAction('[BOARD] Get board', props<{ board: IBoard }>());

export const createBoardAction = createAction(
  '[BOARD] Create new board',
  props<{ board: IBoardDto }>(),
);
export const boardCreatedAction = createAction('[BOARD] Board created', props<{ board: IBoard }>());
