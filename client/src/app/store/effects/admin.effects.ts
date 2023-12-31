import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { createAction } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as adminActions from '../actions/admin.actions';
import { catchError, defer, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AdminEffects {
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(adminActions.loginUser),
      mergeMap((admin) => {
        return this.loginService
          .login(admin.user.username, admin.user.password)
          .pipe(
            map(() => adminActions.loginUserSuccess({ message: 'Uspesno' })),
            catchError((error) =>
              of(adminActions.loginUserFailure({ error: error.message }))
            )
          );
      })
    )
  );
  logInUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(adminActions.loginUserSuccess),
        tap(() => {
          this.authService.getLoggedUser().subscribe((admin) => {
            localStorage.setItem('loggedUser', JSON.stringify(admin));
            localStorage.setItem('isLoggedIn', 'true');
          });
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
  logInUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(adminActions.loginUserFailure),
        tap(() => {
          alert('Pogresni username ili sifra');
        })
      ),
    { dispatch: false }
  );
  logOutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(adminActions.logOutUser),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() =>
            adminActions.logOutUserSuccess({ message: 'Uspesno izlogovan' })
          ),
          catchError((error) => of(adminActions.logOutUserFailure({ error })))
        )
      )
    )
  );
  logOutUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(adminActions.logOutUserSuccess),
        tap(() => {
          localStorage.removeItem('loggedUser');
          localStorage.removeItem('isLoggedIn');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {}
}
