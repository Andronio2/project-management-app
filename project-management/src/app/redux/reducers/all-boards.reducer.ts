import { createReducer, on } from '@ngrx/store';
import { IBoard } from 'src/app/share/models/board.model';
import { BoardActions } from '../actions/board.action';

export const initialState: IBoard[] = [];

export const allBoardsReducer = createReducer(
  initialState,
  on(BoardActions.allBoardsLoadedAction, (state, { boards }): IBoard[] => boards),
  on(BoardActions.deleteBoardAction, (state, { id }): IBoard[] =>
    state.filter((board) => board.id !== id),
  ),
  on(BoardActions.updateBoardAction, (state, { id, board }): IBoard[] =>
    state.map((oldBoard) => (oldBoard.id !== id ? oldBoard : { ...oldBoard, ...board })),
  ),
);
