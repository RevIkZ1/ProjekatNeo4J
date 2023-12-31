import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter } from '../reducers/doktor.reducers';
import { PregledState } from '../types/pregled.interface';

export const selectPregledFeature =
  createFeatureSelector<PregledState>('Pregled');

export const pregledSelectorUstanovaLoading = createSelector(
  selectPregledFeature,
  (state: PregledState) => state.isLoading
);
export const pregledSelectorUstanova = createSelector(
  selectPregledFeature,
  adapter.getSelectors().selectAll
);
export const pregledSelectorUstanovaError = createSelector(
  selectPregledFeature,
  (state: PregledState) => state.error
);
