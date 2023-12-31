import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter } from '../reducers/lek.reducers';
import { LekState } from '../types/lek.interface';

export const selectLekFeature = createFeatureSelector<LekState>('Lek');

export const lekSelectorUstanovaLoading = createSelector(
  selectLekFeature,
  (state: LekState) => state.isLoading
);
export const lekSelectorUstanova = createSelector(
  selectLekFeature,
  adapter.getSelectors().selectAll
);
export const lekSelectorUstanovaError = createSelector(
  selectLekFeature,
  (state: LekState) => state.error
);
export const lekSelector = createSelector(
  selectLekFeature,
  (state: LekState) => state.lek
);
