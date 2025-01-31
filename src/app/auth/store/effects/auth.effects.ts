import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import { login, loginFailure, loginSuccess } from "../actions/auth.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      mergeMap(action => {
        const { email, password } = action;
        return this.authService.login(email, password).pipe(
          map((response) => {
            return loginSuccess({ employee: response })
          }),
          catchError((error: HttpErrorResponse) => {
            return of(loginFailure({ error: error?.error?.message }))
          })
        );
      })
    )
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap(() => {
        this.router.navigate(['/home']);
      })
    )
  }, {
    dispatch: false // this effect does not dispatch another action
  })
}