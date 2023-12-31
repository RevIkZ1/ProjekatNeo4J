import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter } from '../reducers/pacijent.reducers';
import { PacijentState } from '../types/pacijent.interface';

export const selectPacijentiFeature =
  createFeatureSelector<PacijentState>('Pacijent');

export const pacijentSelectorUstanovaLoading = createSelector(
  selectPacijentiFeature,
  (state: PacijentState) => state.isLoading
);
export const pacijentSelectorUstanova = createSelector(
  selectPacijentiFeature,
  adapter.getSelectors().selectAll
);
export const pacijentSelectorUstanovaError = createSelector(
  selectPacijentiFeature,
  (state: PacijentState) => state.error
);
export const pacijentSelector = createSelector(
  selectPacijentiFeature,
  (state: PacijentState) => state.pacijent
);
