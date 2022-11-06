import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBoardState } from '../state.model';

export namespace Selectors {
  export const selectBoardState = createFeatureSelector<IBoardState>('board');

  export const selectBoards = createSelector(selectBoardState, (state) => state.allBoards);

  export const selectBoard = createSelector(selectBoardState, (state) => state.currBoard);

  export const selectColumns = createSelector(
    selectBoardState,
    (state) => state.currBoard?.columns,
  );

  export const selectColumn = createSelector(selectBoardState, (state) => state.currBoard);
  export const selectColumnById = (columnId: string) =>
    createSelector(selectBoardState, (state) =>
      state.currBoard?.columns?.find((column) => column.id === columnId),
    );
}
