import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from '../state.model';

export namespace Selectors {
  export const selectState = createFeatureSelector<IUserState>('user');

  export const selectUsers = createSelector(selectState, (state) => state.allUsers);

  export const selectUser = createSelector(selectState, (state) => state.currUser);
}
