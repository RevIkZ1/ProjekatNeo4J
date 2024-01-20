import { createAction, props } from '@ngrx/store';
import { PacijentModel } from '../types/pacijent.module';
export const getPacijentiForUstanova = createAction(
  '[Zdravstvena ustanova page] get Pacijent',
  props<{ id: number }>()
);
export const getPacijentiForUstanovaSuccess = createAction(
  '[Doktor/API] Get Pacijent For Ustanova Success',
  props<{ mesta: PacijentModel[] }>()
);
export const getPacijentiForUstanovaFailure = createAction(
  '[Zdravstvena ustanova page] Get Pacijent Failure',
  props<{ error: string }>()
);
export const postPacijent = createAction(
  '[Zdravstvena page] Post Pacijent',
  props<{
    pacijent: PacijentModel;
    id: number;
  }>()
);

export const postPacijentSuccess = createAction(
  '[Zdravstvena page] Post Pacijent Success',
  props<{
    pacijent: PacijentModel;
  }>()
);

export const postPacijentRFailure = createAction(
  '[Zdravstvena  page] Post Pacijent Failure',
  props<{ error: string }>()
);
export const deletePacijent = createAction(
  '[Zdravstvena Page] Delete Pacijent',
  props<{ id: number }>()
);
export const deletePacijentSuccess = createAction(
  '[Zdravstvena Page] Delete Pacijent Success',
  props<{ id: number }>()
);
export const deletePacijentFailure = createAction(
  '[Zdravstvena Page] Delete Pacijent Failure',
  props<{ error: string }>()
);
export const getPacijent = createAction(
  '[Doktor page] Get Pacijent',
  props<{ id: number }>()
);
export const getPacijentSuccess = createAction(
  '[Doktor page] Get Pacijent Success',
  props<{ pacijent: PacijentModel }>()
);
export const getPacijentFailure = createAction(
  '[Doktor page] Get Pacijent Failure',
  props<{ error: string }>()
);
export const getOnePacijent = createAction(
  '[Pacijent page] Get Pacijent',
  props<{ id: number }>()
);
export const getOnePacijentSuccess = createAction(
  '[Pacijent page] Get Pacijent Success',
  props<{ pacijent: PacijentModel }>()
);
export const getOnePacijentFailure = createAction(
  '[Pacijent page] Get Pacijent Failure',
  props<{ error: string }>()
);
export const putPacijent = createAction(
  '[Pacijent page] Post Pacijent',
  props<{
    pacijent: PacijentModel;
    id: number;
  }>()
);

export const putPacijentSuccess = createAction(
  '[Pacijent page] Post Pacijent Success',
  props<{
    pacijent: PacijentModel;
  }>()
);

export const putPacijentFailure = createAction(
  '[Pacijent  page] Post Pacijent Failure',
  props<{ error: string }>()
);
