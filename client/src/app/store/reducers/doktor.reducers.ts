import {
  ZdravstvenaUstanova,
  ZdravstvenaUstanovaModel,
} from '../types/zdravstvenaustanova.module';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as DoktorActions from '../actions/doktor.actions';
import { Doktor, DoktorModel } from '../types/doktor.module';

export const adapter: EntityAdapter<DoktorModel> =
  createEntityAdapter<DoktorModel>();

export const initialState: EntityState<Doktor> = adapter.getInitialState({
  isLoading: false,
  error: null,
  update: false,
});

export const reducer1 = createReducer(
  initialState,

  on(DoktorActions.getDoktoriForUstanova, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(DoktorActions.getDoktoriForUstanovaSuccess, (state, action) => {
    return adapter.setAll(action.mesta, { ...state, isLoading: false });
  }),
  on(DoktorActions.ggetDoktoriForUstanovaFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(DoktorActions.postDoktor, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(DoktorActions.postPacijentSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.doktor, state),
    };
  }),
  on(DoktorActions.postDoktorFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(DoktorActions.putDoktor, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(DoktorActions.putDoktorSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.doktor, state),
    };
  }),
  on(DoktorActions.putDoktorRFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(DoktorActions.getDoktor, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(DoktorActions.getDoktorSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    doktor: action.doktor,
  })),
  on(DoktorActions.getDoktorFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(DoktorActions.deleteDoktor, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(DoktorActions.deleteDoktorSuccess, (state, action) => {
    return adapter.removeOne(action.id, { ...state, isLoading: false });
  }),
  on(DoktorActions.deleteDoktorFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
