import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { map, Observable, switchMap, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // get the  token from store
    return this.authService.getToken().pipe(
      take(1),
      switchMap((token) => {
        if (token) {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            },
          });

          return next.handle(authReq);
        }
        return next.handle(req)
      }))
  }
}