import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, of } from 'rxjs';
import { Router } from '@angular/router';
import * as ReceptActions from '../actions/recept.actions';
import { DoktorService } from 'src/app/services/doktor.service';
import { ReceptService } from 'src/app/services/recept.service';

@Injectable()
export class ReceptEffects {
  postDoktor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceptActions.postRecept),
      switchMap((action) => {
        return this.receptService
          .postDoktor(action.recept, action.id, action.id1)
          .pipe(
            map(() =>
              ReceptActions.postDoktorSuccess({
                recept: action.recept,
              })
            ),
            catchError((error) =>
              of(
                ReceptActions.postReceptRFailure({
                  error: error.message,
                })
              )
            )
          );
      })
    )
  );
  getreceptFromUstanova$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceptActions.getReceptForUstanova),
      mergeMap((action) => {
        return this.receptService.getReceptForPacijent(action.id).pipe(
          map((mesta) => ReceptActions.getReceptForUstanovaSuccess({ mesta })),
          catchError((error) =>
            of(
              ReceptActions.ggetReceptForUstanovaFailure({
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
    private receptService: ReceptService,
    private router: Router
  ) {}
}
