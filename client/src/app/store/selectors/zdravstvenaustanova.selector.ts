import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ZdravstvenaUstanovaState } from '../types/zdravstvenaustanova.interface';
import { adapter } from '../reducers/zdravstvenaustanova.reducers';
export const selectZdravstvenaUstanovaFeature =
  createFeatureSelector<ZdravstvenaUstanovaState>('ZdravstvenaUstanova');
export const isLoadingZdravstvenaUstanova = createSelector(
  selectZdravstvenaUstanovaFeature,
  (state: ZdravstvenaUstanovaState) => state.isLoading
);
export const ZdravstvenaUstanovaSelector = createSelector(
  selectZdravstvenaUstanovaFeature,
  adapter.getSelectors().selectAll
);
export const stateZdravstvenaUstanovaSelector = createSelector(
  selectZdravstvenaUstanovaFeature,
  (state: ZdravstvenaUstanovaState) => state.error
);
export const isLoadingSelector = createSelector(
  selectZdravstvenaUstanovaFeature,
  (state: ZdravstvenaUstanovaState) => state.isLoading
);
export const zdravstvenaSelector = createSelector(
  selectZdravstvenaUstanovaFeature,
  (state: ZdravstvenaUstanovaState) => state.zdravstvenaustanova
);
export const errorSelector = createSelector(
  selectZdravstvenaUstanovaFeature,
  (state: ZdravstvenaUstanovaState) => state.error
);
