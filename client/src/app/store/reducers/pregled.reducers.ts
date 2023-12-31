import {
  ZdravstvenaUstanova,
  ZdravstvenaUstanovaModel,
} from '../types/zdravstvenaustanova.module';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as DoktorActions from '../actions/doktor.actions';
import { Pregled, PregledModel } from '../types/pregled.module';
import * as PregledActions from '../actions/pregled.actions';

export const adapter: EntityAdapter<PregledModel> =
  createEntityAdapter<PregledModel>();

export const initialState: EntityState<Pregled> = adapter.getInitialState({
  isLoading: false,
  error: null,
  update: false,
});

export const reducer4 = createReducer(
  initialState,

  on(PregledActions.getPregledForUstanova, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PregledActions.getPregledForUstanovaSuccess, (state, action) => {
    return adapter.setAll(action.mesta, { ...state, isLoading: false });
  }),
  on(PregledActions.ggetPregledForUstanovaFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(PregledActions.deletePregled, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PregledActions.deletePregledSuccess, (state, action) => {
    return adapter.removeOne(action.id, { ...state, isLoading: false });
  }),
  on(PregledActions.deletePregledFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(PregledActions.postPregled, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PregledActions.postPregledSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.pregled, state),
    };
  }),
  on(PregledActions.postPregledFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
