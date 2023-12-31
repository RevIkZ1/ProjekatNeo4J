import { createAction, props } from '@ngrx/store';
import { ZdravstvenaUstanovaModel } from '../types/zdravstvenaustanova.module';

export const getZdravstvenaUstanova = createAction(
  '[ZdravstvenaUstanova Page] Get Zdravstvena Ustanova'
);

export const getZdravstvenaUstanovaSuccess = createAction(
  '[ZdravstvenaUstanova API] Get Zdravstvena Ustanova Success',
  props<{ mesta: ZdravstvenaUstanovaModel[] }>()
);

export const getZdravstvenaUstanovaFailure = createAction(
  '[ZdravstvenaUstanova API] Get Zdravstvena Ustanovaa Failure',
  props<{ error: string }>()
);
export const getZdravstvena = createAction(
  '[AnimeStudio page] Get AnimeStudio',
  props<{ id: number }>()
);
export const getZdravstvenaSuccess = createAction(
  '[AnimeStudio page] Get AnimeStudio Success',
  props<{ zdravstvenaustanova: ZdravstvenaUstanovaModel }>()
);
export const getZdravstvenaFailure = createAction(
  '[AnimeStudio page] Get AnimeStudio Failure',
  props<{ error: string }>()
);
