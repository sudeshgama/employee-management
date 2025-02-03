import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { authFeature } from '../store/reducer/auth.reducer';
import { logout } from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private store$ = inject(Store);

  isLoggedIn(): Observable<boolean> {
    return this.store$.select(authFeature.selectIsLoggedIn);
  }

  logOut(): void {
    this.store$.dispatch(() => logout());
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post('http://localhost:3001/signIn', { email, password })
      .pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      );
  }

  signUp(email: string, name: string, password: string, role: string): Observable<any> {
    return this.httpClient.post('http://localhost:3001/employee', { email, name, password, role });
  }

  getToken(): Observable<string> {
    return this.store$.select(authFeature.selectToken);
  }

  isAdmin(): Observable<boolean> {
    return this.store$.select(authFeature.selectIsAdmin);
  }
}
