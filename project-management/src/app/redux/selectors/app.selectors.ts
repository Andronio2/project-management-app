import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state.model';

const selectState = createFeatureSelector<AppState>('app');

export const selectUsers = createSelector(selectState, (state) => state.allUsers);

export const selectUser = createSelector(selectState, (state) => state.currUser);
