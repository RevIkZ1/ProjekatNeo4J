import {
  ZdravstvenaUstanova,
  ZdravstvenaUstanovaModel,
} from '../types/zdravstvenaustanova.module';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as PomocnoOsobljeActions from '../actions/pomocnoosoblje.actions';
import {
  PomocnoOsoblje,
  PomocnoOsobljeModel,
} from '../types/pomocnoosoblje.module';

export const adapter: EntityAdapter<PomocnoOsobljeModel> =
  createEntityAdapter<PomocnoOsobljeModel>();

export const initialState: EntityState<PomocnoOsoblje> =
  adapter.getInitialState({
    isLoading: false,
    error: null,
    update: false,
  });
export const reducer7 = createReducer(
  initialState,

  on(PomocnoOsobljeActions.getPomocnoOsobljeForUstanova, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(
    PomocnoOsobljeActions.getPomocnoOsobljeForUstanovaSuccess,
    (state, action) => {
      return adapter.setAll(action.mesta, { ...state, isLoading: false });
    }
  ),
  on(
    PomocnoOsobljeActions.getPomocnoOsobljeForUstanovaFailure,
    (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  on(PomocnoOsobljeActions.postPomocnoOsoblje, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PomocnoOsobljeActions.postPomocnoOsobljeSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.pomocnoosoblje, state),
    };
  }),
  on(PomocnoOsobljeActions.postPomocnoOsobljeRFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
