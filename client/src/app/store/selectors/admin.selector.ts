import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from '../types/admin.interface';

export const selectAdminFeature = createFeatureSelector<AdminState>('Admin');
export const selectorLoading = createSelector(
  selectAdminFeature,
  (state: AdminState) => state.isLoading
);
export const selectorLoggedin = createSelector(
  selectAdminFeature,
  (state: AdminState) => state.isLoggedIn
);
export const selectorError = createSelector(
  selectAdminFeature,
  (state: AdminState) => state.error
);
export const userSelector = createSelector(
  selectAdminFeature,
  (state: AdminState) => state.admin
);
