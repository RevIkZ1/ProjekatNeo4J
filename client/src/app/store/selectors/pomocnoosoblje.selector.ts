import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter } from '../reducers/pomocnoosoblje.reducers';
import { PomocnoOsoboljeState } from '../types/pomocnoosoblje.interface';

export const selectPomocnoOsobljeFeature =
  createFeatureSelector<PomocnoOsoboljeState>('PomocnoOsoblje');

export const pomocnoOsobljeSelectorUstanovaLoading = createSelector(
  selectPomocnoOsobljeFeature,
  (state: PomocnoOsoboljeState) => state.isLoading
);
export const pomocnoOsobljeSelectorUstanova = createSelector(
  selectPomocnoOsobljeFeature,
  adapter.getSelectors().selectAll
);
export const pomocnoOsobljeSelectorUstanovaError = createSelector(
  selectPomocnoOsobljeFeature,
  (state: PomocnoOsoboljeState) => state.error
);
export const pomocnoOsobljeSelector = createSelector(
  selectPomocnoOsobljeFeature,
  (state: PomocnoOsoboljeState) => state.pomocnoosoblje
);
