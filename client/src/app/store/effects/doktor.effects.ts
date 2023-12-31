import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, of } from 'rxjs';
import { Router } from '@angular/router';
import * as DoktorActions from '../actions/doktor.actions';
import { DoktorService } from 'src/app/services/doktor.service';

@Injectable()
export class DoktorEffects {
  getdoktorFromUstanova$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoktorActions.getDoktoriForUstanova),
      mergeMap((action) => {
        return this.doktorService.getDoktorForUstanova(action.id).pipe(
          map((mesta) => DoktorActions.getDoktoriForUstanovaSuccess({ mesta })),
          catchError((error) =>
            of(
              DoktorActions.ggetDoktoriForUstanovaFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );

  postDoktor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoktorActions.postDoktor),
      switchMap((action) => {
        return this.doktorService.postDoktor(action.doktor, action.id).pipe(
          map(() =>
            DoktorActions.postPacijentSuccess({
              doktor: action.doktor,
            })
          ),
          catchError((error) =>
            of(
              DoktorActions.postDoktorFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  putDoktor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoktorActions.putDoktor),
      switchMap((action) => {
        return this.doktorService.putDoktor(action.doktor, action.id).pipe(
          map(() =>
            DoktorActions.putDoktorSuccess({
              doktor: action.doktor,
            })
          ),
          catchError((error) =>
            of(
              DoktorActions.putDoktorRFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  getDoktor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoktorActions.getDoktor),
      mergeMap((action) => {
        return this.doktorService.getDoktorById(action.id).pipe(
          map((doktor) =>
            DoktorActions.getDoktorSuccess({
              doktor,
            })
          ),
          catchError((error) =>
            of(
              DoktorActions.getDoktorFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  removeDoktor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoktorActions.deleteDoktor),
      mergeMap((action) => {
        return this.doktorService.deleteDoktor(action.id).pipe(
          map((id) => DoktorActions.deleteDoktorSuccess({ id: action.id })),
          catchError((error) =>
            of(
              DoktorActions.deleteDoktorFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private doktorService: DoktorService,
    private router: Router
  ) {}
}
