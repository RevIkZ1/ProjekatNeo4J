import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PacijentActions from '../actions/pacijent.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { PacijentService } from 'src/app/services/pacijent.service';

@Injectable()
export class PacijentEffects {
  getpacijentFromUstanova$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PacijentActions.getPacijentiForUstanova),
      mergeMap((action) => {
        return this.pacijentService.getPacijentForUstanova(action.id).pipe(
          map((mesta) =>
            PacijentActions.getPacijentiForUstanovaSuccess({ mesta })
          ),
          catchError((error) =>
            of(
              PacijentActions.getPacijentiForUstanovaFailure({
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
      ofType(PacijentActions.postPacijent),
      switchMap((action) => {
        return this.pacijentService
          .postPacijent(action.pacijent, action.id)
          .pipe(
            map(() =>
              PacijentActions.postPacijentSuccess({
                pacijent: action.pacijent,
              })
            ),
            catchError((error) =>
              of(
                PacijentActions.postPacijentRFailure({
                  error: error.message,
                })
              )
            )
          );
      })
    )
  );
  removePacijent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PacijentActions.deletePacijent),
      mergeMap((action) => {
        return this.pacijentService.deletePacijent(action.id).pipe(
          map((id) => PacijentActions.deletePacijentSuccess({ id: action.id })),
          catchError((error) =>
            of(
              PacijentActions.deletePacijentFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  getPacijent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PacijentActions.getPacijent),
      mergeMap((action) => {
        return this.pacijentService.getPacijentByRecept(action.id).pipe(
          map((pacijent) =>
            PacijentActions.getPacijentSuccess({
              pacijent,
            })
          ),
          catchError((error) =>
            of(
              PacijentActions.getPacijentFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  getOnePacijent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PacijentActions.getOnePacijent),
      mergeMap((action) => {
        return this.pacijentService.getOnePacijent(action.id).pipe(
          map((pacijent) =>
            PacijentActions.getOnePacijentSuccess({
              pacijent,
            })
          ),
          catchError((error) =>
            of(
              PacijentActions.getOnePacijentFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  putPacijent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PacijentActions.putPacijent),
      switchMap((action) => {
        return this.pacijentService.putDoktor(action.pacijent, action.id).pipe(
          map(() =>
            PacijentActions.putPacijentSuccess({
              pacijent: action.pacijent,
            })
          ),
          catchError((error) =>
            of(
              PacijentActions.putPacijentFailure({
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
    private pacijentService: PacijentService,
    private router: Router
  ) {}
}
