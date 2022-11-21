import { createFeatureSelector } from '@ngrx/store';

export const selectTaskState = createFeatureSelector<string>('markTask');
