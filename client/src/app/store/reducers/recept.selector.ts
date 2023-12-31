import {
  ZdravstvenaUstanova,
  ZdravstvenaUstanovaModel,
} from '../types/zdravstvenaustanova.module';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as ReceptActions from '../actions/recept.actions';

export const adapter: EntityAdapter<ZdravstvenaUstanovaModel> =
  createEntityAdapter<ZdravstvenaUstanovaModel>();

export const initialState: EntityState<ZdravstvenaUstanova> =
  adapter.getInitialState({
    isLoading: false,
    error: null,
    update: false,
  });
export const reducer5 = createReducer(
  initialState,

  on(ReceptActions.postRecept, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ReceptActions.postDoktorSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.recept, state),
    };
  }),
  on(ReceptActions.postReceptRFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(ReceptActions.getReceptForUstanova, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ReceptActions.getReceptForUstanovaSuccess, (state, action) => {
    return adapter.setAll(action.mesta, { ...state, isLoading: false });
  }),
  on(ReceptActions.ggetReceptForUstanovaFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
