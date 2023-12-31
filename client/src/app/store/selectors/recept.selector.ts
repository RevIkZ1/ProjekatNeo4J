import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter } from '../reducers/doktor.reducers';
import { ReceptState } from '../types/recept.inrerface';

export const selectReceptFeature = createFeatureSelector<ReceptState>('Recept');

export const receptSelectorUstanovaLoading = createSelector(
  selectReceptFeature,
  (state: ReceptState) => state.isLoading
);
export const receptSelectorUstanova = createSelector(
  selectReceptFeature,
  adapter.getSelectors().selectAll
);
export const receptSelectorUstanovaError = createSelector(
  selectReceptFeature,
  (state: ReceptState) => state.error
);
