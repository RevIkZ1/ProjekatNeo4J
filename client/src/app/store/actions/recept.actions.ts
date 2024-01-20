import { createAction, props } from '@ngrx/store';
import { ReceptModel } from '../types/recept.module';

export const postRecept = createAction(
  '[Doktor page] Post Recept',
  props<{
    recept: ReceptModel;
    id: number;
    id1: number;
  }>()
);

export const postDoktorSuccess = createAction(
  '[Doktor page] Post Recept Success',
  props<{
    recept: ReceptModel;
  }>()
);

export const postReceptRFailure = createAction(
  '[Doktor  page] Post Recept Failure',
  props<{ error: string }>()
);
export const getReceptForUstanova = createAction(
  '[Pacijent page] get Recept',
  props<{ id: number }>()
);
export const getReceptForUstanovaSuccess = createAction(
  '[Pacijent/API] Get Recept For Doktor Success',
  props<{ mesta: ReceptModel[] }>()
);
export const ggetReceptForUstanovaFailure = createAction(
  '[Pacijent page] Get Recept Failure',
  props<{ error: string }>()
);
export const deleteRecept = createAction(
  '[Pacijent Page] Delete Recept',
  props<{ id: number }>()
);
export const deleteReceptSuccess = createAction(
  '[Pacijent Page] Delete Recept Success',
  props<{ id: number }>()
);
export const deleteReceptFailure = createAction(
  '[Pacijent Page] Delete Recept Failure',
  props<{ error: string }>()
);
