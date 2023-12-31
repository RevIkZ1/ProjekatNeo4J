import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AdminModel } from '../types/admin.module';
import { AdminState } from '../types/admin.interface';
import { createReducer, on } from '@ngrx/store';
import * as adminActions from '../actions/admin.actions';

export const adapter: EntityAdapter<AdminModel> =
  createEntityAdapter<AdminModel>();

export const initialState: AdminState = adapter.getInitialState({
  isLoading: false,
  isLoggedIn: false,
  error: null,
  admin: null,
});
export const reducers = createReducer(
  initialState,
  on(adminActions.loginUser, (state) => ({ ...state, isLoading: true })),
  on(adminActions.loginUserSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
  })),
  on(adminActions.loginUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
    error: action.error,
  })),
  on(adminActions.logOutUser, (state) => ({ ...state, isLoading: true })),
  on(adminActions.logOutUserSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
  })),
  on(adminActions.logOutUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(adminActions.browserRolead, (state, action) => ({
    ...state,
    isLoading: action.isLoading,
    isLoggedIn: action.isLoggedin,
  }))
);
