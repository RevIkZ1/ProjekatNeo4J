import {
  ZdravstvenaUstanova,
  ZdravstvenaUstanovaModel,
} from '../types/zdravstvenaustanova.module';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as PacijentActions from '../actions/pacijent.actions';
import { Pacijent, PacijentModel } from '../types/pacijent.module';

export const adapter: EntityAdapter<PacijentModel> =
  createEntityAdapter<PacijentModel>();

export const initialState: EntityState<Pacijent> = adapter.getInitialState({
  isLoading: false,
  error: null,
  update: false,
});

export const reducer2 = createReducer(
  initialState,

  on(PacijentActions.getPacijentiForUstanova, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PacijentActions.getPacijentiForUstanovaSuccess, (state, action) => {
    return adapter.setAll(action.mesta, { ...state, isLoading: false });
  }),
  on(PacijentActions.getPacijentiForUstanovaFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(PacijentActions.postPacijent, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PacijentActions.postPacijentSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.pacijent, state),
    };
  }),
  on(PacijentActions.postPacijentRFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(PacijentActions.deletePacijent, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PacijentActions.deletePacijentSuccess, (state, action) => {
    return adapter.removeOne(action.id, { ...state, isLoading: false });
  }),
  on(PacijentActions.deletePacijentFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(PacijentActions.getPacijent, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PacijentActions.getPacijentSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    pacijent: action.pacijent,
  })),
  on(PacijentActions.getPacijentFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(PacijentActions.getOnePacijent, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PacijentActions.getOnePacijentSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    pacijent: action.pacijent,
  })),
  on(PacijentActions.getOnePacijentFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(PacijentActions.putPacijent, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PacijentActions.putPacijentSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.pacijent, state),
    };
  }),
  on(PacijentActions.putPacijentFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
