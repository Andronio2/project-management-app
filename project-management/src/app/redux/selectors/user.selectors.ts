import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from '../state.model';

export namespace Selectors {
  export const selectUserState = createFeatureSelector<IUserState>('user');

  export const selectUsers = createSelector(selectUserState, (state) => state.allUsers);

  export const selectUser = createSelector(selectUserState, (state) => state.currUser);
}
