import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token;
  }

  logOut(): void {
    localStorage.removeItem('jwtToken');
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
}
