import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DoktorState } from '../types/doktor.interface';
import { adapter } from '../reducers/doktor.reducers';

export const selectDoktoriFeature =
  createFeatureSelector<DoktorState>('Doktor');

export const doktorSelectorUstanovaLoading = createSelector(
  selectDoktoriFeature,
  (state: DoktorState) => state.isLoading
);
export const doktorSelectorUstanova = createSelector(
  selectDoktoriFeature,
  adapter.getSelectors().selectAll
);
export const doktorSelectorUstanovaError = createSelector(
  selectDoktoriFeature,
  (state: DoktorState) => state.error
);
export const doktorSelector = createSelector(
  selectDoktoriFeature,
  (state: DoktorState) => state.doktor
);
