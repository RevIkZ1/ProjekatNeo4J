import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, of } from 'rxjs';
import { Router } from '@angular/router';
import * as PregledActions from '../actions/pregled.actions';
import { PregledService } from 'src/app/services/pregled.service';

@Injectable()
export class PregledEffects {
  getdoktorFromUstanova$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PregledActions.getPregledForUstanova),
      mergeMap((action) => {
        return this.pregledService.getPregledForDoktor(action.id).pipe(
          map((mesta) =>
            PregledActions.getPregledForUstanovaSuccess({ mesta })
          ),
          catchError((error) =>
            of(
              PregledActions.ggetPregledForUstanovaFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  removePregled$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PregledActions.deletePregled),
      mergeMap((action) => {
        return this.pregledService.deletePregled(action.id).pipe(
          map((id) => PregledActions.deletePregledSuccess({ id: action.id })),
          catchError((error) =>
            of(
              PregledActions.deletePregledFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  postPregled$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PregledActions.postPregled),
      switchMap((action) => {
        return this.pregledService
          .postPregled(action.pregled, action.id, action.id1)
          .pipe(
            map(() =>
              PregledActions.postPregledSuccess({
                pregled: action.pregled,
              })
            ),
            catchError((error) =>
              of(
                PregledActions.postPregledFailure({
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
    private pregledService: PregledService,
    private router: Router
  ) {}
}
