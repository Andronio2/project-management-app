import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardLoadedState } from 'src/app/share/constants/constants';
import { IBoardState } from '../state.model';

export namespace Selectors {
  export const selectBoardState = createFeatureSelector<IBoardState>('board');
  export const selectBoardLoadedState = createFeatureSelector<BoardLoadedState>('boardLoaded');

  export const selectBoards = createSelector(selectBoardState, (state) => state.allBoards);

  export const selectBoard = createSelector(selectBoardState, (state) => state.currBoard);

  export const selectColumns = createSelector(
    selectBoardState,
    (state) => state.currBoard?.columns,
  );

  export const selectColumnById = (columnId: string) =>
    createSelector(selectBoardState, (state) =>
      state.currBoard?.columns?.find((column) => column.id === columnId),
    );

  export const selectTasks = (columnId: string) =>
    createSelector(selectColumnById(columnId), (state) => state?.tasks);

  export const selectTasksBiId = (columnId: string, taskId: string) =>
    createSelector(selectColumnById(columnId), (state) =>
      state?.tasks?.find((task) => task.id === taskId),
    );
}
