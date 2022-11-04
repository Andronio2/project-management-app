import { createReducer, on } from '@ngrx/store';
import { BoardActions } from '../actions/board.action';
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
    BoardActions.boardCreatedAction,
    (state, { board }): IBoardState => ({
      ...state,
      allBoards: state.allBoards.concat([board]),
    }),
  ),
);
