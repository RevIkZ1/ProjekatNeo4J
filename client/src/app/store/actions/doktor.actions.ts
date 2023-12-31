import { createAction, props } from '@ngrx/store';
import { DoktorModel } from '../types/doktor.module';
export const getDoktoriForUstanova = createAction(
  '[Zdravstvena ustanova page] get Doktor',
  props<{ id: number }>()
);
export const getDoktoriForUstanovaSuccess = createAction(
  '[Doktor/API] Get Doktor For Ustanova Success',
  props<{ mesta: DoktorModel[] }>()
);
export const ggetDoktoriForUstanovaFailure = createAction(
  '[Zdravstvena ustanova page] Get Doktori Failure',
  props<{ error: string }>()
);

export const putDoktorRFailure = createAction(
  '[Zdravstvena  page] Post Doktor Failure',
  props<{ error: string }>()
);
export const putDoktor = createAction(
  '[Zdravstvena page] Post Doktor',
  props<{
    doktor: DoktorModel;
    id: number;
  }>()
);

export const putDoktorSuccess = createAction(
  '[Zdravstvena page] Post Doktor Success',
  props<{
    doktor: DoktorModel;
  }>()
);

export const getDoktor = createAction(
  '[Zdravstvena page] Get Doktor',
  props<{ id: number }>()
);
export const getDoktorSuccess = createAction(
  '[Zdravstvena page] Get Doktor Success',
  props<{ doktor: DoktorModel }>()
);
export const getDoktorFailure = createAction(
  '[Zdravstvena page] Get Doktor Failure',
  props<{ error: string }>()
);
export const deleteDoktor = createAction(
  '[Zdravstvena Page] Delete Doktor',
  props<{ id: number }>()
);
export const deleteDoktorSuccess = createAction(
  '[Zdravstvena Page] Delete Doktor Success',
  props<{ id: number }>()
);
export const deleteDoktorFailure = createAction(
  '[Zdravstvena Page] Delete Doktor Failure',
  props<{ error: string }>()
);
export const postDoktor = createAction(
  '[Zdravstvena page] Post Doktor',
  props<{
    doktor: DoktorModel;
    id: number;
  }>()
);

export const postPacijentSuccess = createAction(
  '[Zdravstvena page] Post Doktor Success',
  props<{
    doktor: DoktorModel;
  }>()
);

export const postDoktorFailure = createAction(
  '[Zdravstvena  page] Post Doktor Failure',
  props<{ error: string }>()
);
