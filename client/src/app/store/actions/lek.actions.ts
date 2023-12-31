import { createAction, props } from '@ngrx/store';
import { LekModel } from '../types/lek.module';

export const putLekFailure = createAction(
  '[Pacijent  page] Post Lek Failure',
  props<{ error: string }>()
);
export const putLek = createAction(
  '[Pacijent page] Post Lek',
  props<{
    lek: LekModel;
    id: number;
  }>()
);

export const putLekSuccess = createAction(
  '[Pacijent page] Post Lek Success',
  props<{
    lek: LekModel;
  }>()
);
export const getLekoviForUstanova = createAction(
  '[Zdravstvena ustanova page] get Lek',
  props<{ id: number }>()
);
export const getLekoviForUstanovaSuccess = createAction(
  '[Zdravstvena ustanova/API] Get Lek For Ustanova Success',
  props<{ mesta: LekModel[] }>()
);
export const getLekoviForUstanovaFailure = createAction(
  '[Zdravstvena ustanova page] Get Lek Failure',
  props<{ error: string }>()
);

export const postLekSuccess = createAction(
  '[Lek page] Post Lek Success',
  props<{
    lek: LekModel;
  }>()
);
export const postLek = createAction(
  '[Lek page] Post Lek',
  props<{
    lek: LekModel;
    id: number;
  }>()
);

export const postLekRFailure = createAction(
  '[Lek  page] Post Lek Failure',
  props<{ error: string }>()
);
