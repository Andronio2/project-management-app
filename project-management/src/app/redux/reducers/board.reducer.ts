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
      allBoards: [...state.allBoards, board],
    }),
  ),
  on(
    BoardActions.boardDeletedAction,
    (state, { id }): IBoardState => ({
      ...state,
      allBoards: state.allBoards.filter((board) => board.id !== id),
    }),
  ),
  on(
    BoardActions.boardUpdatedAction,
    (state, { id, board }): IBoardState => ({
      ...state,
      allBoards: state.allBoards.map((item) => (item.id !== id ? board : item)),
    }),
  ),
);
