import { createReducer, on } from '@ngrx/store';
import { BoardActions } from '../actions/board.action';
import { ColumnActions } from '../actions/column.action';
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
    ColumnActions.allColumnsLoadedAction,
    (state, { columns }): IBoardState => ({
      ...state,
      currBoard: { ...state.currBoard!, columns },
    }),
  ),
  on(
    ColumnActions.columnLoadedAction,
    (state, { columnId, column }): IBoardState => ({
      ...state,
      currBoard: {
        ...state.currBoard!,
        columns: state.currBoard?.columns
          ? [column]
          : state.currBoard!.columns?.map((item) => (item.id === columnId ? column : item)),
      },
    }),
  ),
);
