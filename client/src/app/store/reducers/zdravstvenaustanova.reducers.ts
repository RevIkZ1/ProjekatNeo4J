import {
  ZdravstvenaUstanova,
  ZdravstvenaUstanovaModel,
} from '../types/zdravstvenaustanova.module';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as zdravstvenaUstanovaActions from '../actions/zdravstvenaustanova.actions';
import { createReducer, on } from '@ngrx/store';

export const adapter: EntityAdapter<ZdravstvenaUstanovaModel> =
  createEntityAdapter<ZdravstvenaUstanovaModel>();

export const initialState: EntityState<ZdravstvenaUstanova> =
  adapter.getInitialState({
    isLoading: false,
    error: null,
    update: false,
  });

export const reducer = createReducer(
  initialState,
  on(zdravstvenaUstanovaActions.getZdravstvenaUstanova, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(
    zdravstvenaUstanovaActions.getZdravstvenaUstanovaSuccess,
    (state, action) => {
      return adapter.addMany(action.mesta, { ...state, isLoading: false });
    }
  ),
  on(
    zdravstvenaUstanovaActions.getZdravstvenaUstanovaFailure,
    (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  on(zdravstvenaUstanovaActions.getZdravstvena, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(zdravstvenaUstanovaActions.getZdravstvenaSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    zdravstvenaustanova: action.zdravstvenaustanova,
  })),
  on(zdravstvenaUstanovaActions.getZdravstvenaFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
