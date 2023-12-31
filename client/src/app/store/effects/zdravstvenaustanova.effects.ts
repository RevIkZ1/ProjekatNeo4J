import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ZdravstvenaUstanovaActions from '../actions/zdravstvenaustanova.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ZdravstenaUstanovaService } from 'src/app/services/zdravstvenaUstanova.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ZdravstvenaUstanovaEffects {
  getZdravstvenaUstanova$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ZdravstvenaUstanovaActions.getZdravstvenaUstanova),
      mergeMap(() => {
        return this.zdravstvenaUstanovaService.getAllZdravstvenaUstanova().pipe(
          map((mesta) =>
            ZdravstvenaUstanovaActions.getZdravstvenaUstanovaSuccess({ mesta })
          ),
          catchError((error) =>
            of(
              ZdravstvenaUstanovaActions.getZdravstvenaUstanovaFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  getZdravstvena$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ZdravstvenaUstanovaActions.getZdravstvena),
      mergeMap((action) => {
        return this.zdravstvenaUstanovaService
          .getAllZdravstvenaUstanovaId(action.id)
          .pipe(
            map((zdravstvenaustanova) =>
              ZdravstvenaUstanovaActions.getZdravstvenaSuccess({
                zdravstvenaustanova,
              })
            ),
            catchError((error) =>
              of(
                ZdravstvenaUstanovaActions.getZdravstvenaFailure({
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
    private zdravstvenaUstanovaService: ZdravstenaUstanovaService,
    private router: Router
  ) {}
}
