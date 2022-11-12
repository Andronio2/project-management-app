import { createReducer, on } from '@ngrx/store';
import { BoardLoadedState } from 'src/app/share/constants/constants';
import { BoardActions } from '../actions/board.action';

const initialState: BoardLoadedState = BoardLoadedState.unknown as BoardLoadedState;

export const boardStatusReducer = createReducer(
  initialState,
  on(BoardActions.boardRequestDone, (state, { done }) => done),
);
