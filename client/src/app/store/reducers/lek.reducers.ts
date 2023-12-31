import {
  ZdravstvenaUstanova,
  ZdravstvenaUstanovaModel,
} from '../types/zdravstvenaustanova.module';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as LekActions from '../actions/lek.actions';
import { Lek, LekModel } from '../types/lek.module';

export const adapter: EntityAdapter<LekModel> = createEntityAdapter<LekModel>();

export const initialState: EntityState<Lek> = adapter.getInitialState({
  isLoading: false,
  error: null,
  update: false,
});

export const reducer6 = createReducer(
  initialState,
  on(LekActions.putLek, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(LekActions.putLekSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.lek, state),
    };
  }),
  on(LekActions.putLekFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(LekActions.getLekoviForUstanova, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(LekActions.getLekoviForUstanovaSuccess, (state, action) => {
    return adapter.setAll(action.mesta, { ...state, isLoading: false });
  }),
  on(LekActions.getLekoviForUstanovaFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(LekActions.postLek, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(LekActions.postLekSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.lek, state),
    };
  }),
  on(LekActions.postLekRFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
