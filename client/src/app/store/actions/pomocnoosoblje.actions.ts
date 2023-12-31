import { createAction, props } from '@ngrx/store';
import { PomocnoOsobljeModel } from '../types/pomocnoosoblje.module';
export const getPomocnoOsobljeForUstanova = createAction(
  '[PomocnoOsoblje page] get PomocnoOsoblje',
  props<{ id: number }>()
);
export const getPomocnoOsobljeForUstanovaSuccess = createAction(
  '[PomocnoOsoblje/API] Get PomocnoOsoblje For Ustanova Success',
  props<{ mesta: PomocnoOsobljeModel[] }>()
);
export const getPomocnoOsobljeForUstanovaFailure = createAction(
  '[PomocnoOsoblje  page] Get PomocnoOsoblje Failure',
  props<{ error: string }>()
);

export const postPomocnoOsobljeSuccess = createAction(
  '[PomocnoOsoblje page] Post PomocnoOsoblje Success',
  props<{
    pomocnoosoblje: PomocnoOsobljeModel;
  }>()
);
export const postPomocnoOsoblje = createAction(
  '[PomocnoOsoblje page] Post PomocnoOsoblje',
  props<{
    pomocnoosoblje: PomocnoOsobljeModel;
    id: number;
  }>()
);

export const postPomocnoOsobljeRFailure = createAction(
  '[PomocnoOsoblje  page] Post PomocnoOsoblje Failure',
  props<{ error: string }>()
);
