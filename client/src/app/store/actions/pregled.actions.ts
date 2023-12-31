import { createAction, props } from '@ngrx/store';
import { PregledModel } from '../types/pregled.module';
export const getPregledForUstanova = createAction(
  '[Doktor page] get Pregled',
  props<{ id: number }>()
);
export const getPregledForUstanovaSuccess = createAction(
  '[Doktor/API] Get Pregled For Doktor Success',
  props<{ mesta: PregledModel[] }>()
);
export const ggetPregledForUstanovaFailure = createAction(
  '[Doktor page] Get Pregled Failure',
  props<{ error: string }>()
);
export const deletePregled = createAction(
  '[Doktor Page] Delete Pregled',
  props<{ id: number }>()
);
export const deletePregledSuccess = createAction(
  '[Doktor Page] Delete Pregled Success',
  props<{ id: number }>()
);
export const deletePregledFailure = createAction(
  '[Doktor Page] Delete Pregled Failure',
  props<{ error: string }>()
);
export const postPregled = createAction(
  '[Pacijent page] Post Pregled',
  props<{
    pregled: PregledModel;
    id: number;
    id1: number;
  }>()
);

export const postPregledSuccess = createAction(
  '[Pacijent page] Post Pregled Success',
  props<{
    pregled: PregledModel;
  }>()
);

export const postPregledFailure = createAction(
  '[Pacijent  page] Post Pregled Failure',
  props<{ error: string }>()
);
