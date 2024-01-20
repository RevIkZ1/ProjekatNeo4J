import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, of } from 'rxjs';
import { Router } from '@angular/router';
import * as LekActions from '../actions/lek.actions';
import { LekService } from 'src/app/services/lek.service';

@Injectable()
export class LekEffects {
  putLek$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LekActions.putLek),
      switchMap((action) => {
        return this.lekService.putLek(action.lek, action.id, action.id1).pipe(
          map(() =>
            LekActions.putLekSuccess({
              lek: action.lek,
            })
          ),
          catchError((error) =>
            of(
              LekActions.putLekFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  getLekForUstanova$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LekActions.getLekoviForUstanova),
      mergeMap((action) => {
        return this.lekService.getLekForUstanova(action.id).pipe(
          map((mesta) => LekActions.getLekoviForUstanovaSuccess({ mesta })),
          catchError((error) =>
            of(
              LekActions.getLekoviForUstanovaFailure({
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
      ofType(LekActions.postLek),
      switchMap((action) => {
        return this.lekService.postDoktor(action.lek, action.id).pipe(
          map(() =>
            LekActions.postLekSuccess({
              lek: action.lek,
            })
          ),
          catchError((error) =>
            of(
              LekActions.postLekRFailure({
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
    private lekService: LekService,
    private router: Router
  ) {}
}
