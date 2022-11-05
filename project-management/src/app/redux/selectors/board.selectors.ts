import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBoardState } from '../state.model';

export namespace Selectors {
  export const selectBoardState = createFeatureSelector<IBoardState>('board');

  export const selectBoards = createSelector(selectBoardState, (state) => state.allBoards);

  export const selectUser = createSelector(selectBoardState, (state) => state.currBoard);
}
