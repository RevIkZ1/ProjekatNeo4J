import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, of } from 'rxjs';
import { Router } from '@angular/router';
import { LekService } from 'src/app/services/lek.service';
import * as PomocnoOsobljeActions from '../actions/pomocnoosoblje.actions';
import { PomocnoOsobljeService } from 'src/app/services/pomocnoosoblje.service';

@Injectable()
export class PomocnoOsobljeEffects {
  getLekForUstanova$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PomocnoOsobljeActions.getPomocnoOsobljeForUstanova),
      mergeMap((action) => {
        return this.pomocnoOsobljeService.getLekForUstanova(action.id).pipe(
          map((mesta) =>
            PomocnoOsobljeActions.getPomocnoOsobljeForUstanovaSuccess({ mesta })
          ),
          catchError((error) =>
            of(
              PomocnoOsobljeActions.getPomocnoOsobljeForUstanovaFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  postLek$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PomocnoOsobljeActions.postPomocnoOsoblje),
      switchMap((action) => {
        return this.pomocnoOsobljeService
          .postDoktor(action.pomocnoosoblje, action.id)
          .pipe(
            map(() =>
              PomocnoOsobljeActions.postPomocnoOsobljeSuccess({
                pomocnoosoblje: action.pomocnoosoblje,
              })
            ),
            catchError((error) =>
              of(
                PomocnoOsobljeActions.postPomocnoOsobljeRFailure({
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
    private pomocnoOsobljeService: PomocnoOsobljeService,
    private router: Router
  ) {}
}
